const async = require( 'bluebird' ).coroutine;
const chalk = require( 'chalk' );
const Predictor = require( './predictor' );
const sharp = require( 'sharp' );
const Table = require( 'cli-table' );

function usage() {
	return console.log( 'node app.js [PATH TO IMAGE] (polynomial|linear)' );
}

const main = async( function*() {
	if ( !process.argv[ 2 ] ) {
		return usage();
	}

	const interpolationType = process.argv[ 3 ] || 'polynomial';

	if ( ![ 'polynomial', 'linear' ].includes( interpolationType ) ) {
		return usage();
	}

	const imagePath = process.argv[ 2 ];
	const predictor = new Predictor( imagePath );

	console.log( chalk.cyan( 'Using image: ' + imagePath ) );
	console.log( chalk.cyan( 'Learning...' ) );
	const learningStart = Date.now();
	yield predictor.learn();
	const learningTime = Date.now() - learningStart;
	console.log( chalk.green( `Finished learning after ${learningTime} milliseconds.` ) );
	console.log( chalk.cyan( 'Running simulation...' ) );

	const table = new Table( {
		head: [ 'Sample WxH', 'Sample FSize [B]', 'Predicted WxH', 'Real FSize [B]', 'FSize Accurateness [%]' ].map( v => chalk.cyan( v ) )
	} );

	// Emulate some requests for images with given file size
	for ( let multiplier = 0.01; multiplier < 1; multiplier += 0.07 ) {

		const testSampleWidth = Math.ceil( multiplier * predictor.imageWidth );
		const testSampleHeight = Math.ceil( multiplier * predictor.imageHeight );
		const testSampleFileSize = ( yield sharp( imagePath ).resize( testSampleWidth, testSampleHeight ).toBuffer() ).length;

		const { width, height } = predictor.predict( testSampleFileSize, interpolationType );

		const realFileSize = ( yield sharp( imagePath ).resize( width, height ).toBuffer() ).length;

		process.stdout.write( '.' );
		table.push( [
			`${testSampleWidth}x${testSampleHeight}`,
			testSampleFileSize,
			`${width}x${height}`,
			realFileSize,
			realFileSize / testSampleFileSize * 100
		] );
	}

	process.stdout.write( '\n' );
	console.log( table.toString() );
} );

main();