const everpolate = require( 'everpolate' );
const sharp = require( 'sharp' );
const async = require( 'bluebird' ).coroutine;
const imagemin = require( 'imagemin' );
const imageminMozjpeg = require( 'imagemin-mozjpeg' );
const imageminPngquant = require( 'imagemin-pngquant' );

class Predictor {
	/**
	 * Constructor.
	 *
	 * @param {String} imagePath
	 */
	constructor( imagePath ) {
		this.xs = [];
		this.ys = [];
		this.imageWHratio = null;
		this.imageWidth = null;
		this.imageHeight = null;
		this.imagePath = imagePath;
	}

	get learn() {
		const that = this;

		return async( function*() {
			const metadata = yield sharp( this.imagePath ).metadata();

			that.imageWidth = metadata.width;
			that.imageHeight = metadata.height;
			that.imageWHratio = metadata.width / metadata.height;

			for ( let multiplier = 0.01; multiplier < 1.4; multiplier += 0.1 ) {

				const lWidth = Math.ceil( multiplier * metadata.width );
				const lHeight = Math.ceil( multiplier * metadata.height );
				const originalBuffer = yield that.resizeOriginalImage( lWidth, lHeight );
				const lFileBuffer = yield imagemin.buffer( originalBuffer, {
					plugins: [
						imageminMozjpeg(),
						imageminPngquant( { quality: '65-80' } )
					]
				} );

				that.xs.push( lFileBuffer.length );
				that.ys.push( lWidth * lHeight );
			}
		} );
	}

	resizeOriginalImage( width, height ) {
		return sharp( this.imagePath ).resize( width, height ).toBuffer();
	}

	predict( targetSize, type = 'polynomial' ) {
		const numOfPixels = everpolate[ type ]( targetSize, this.xs, this.ys );

		return this.calculateDimensions( numOfPixels );
	}

	calculateDimensions( numOfPixels ) {
		const height = Math.ceil( Math.sqrt( Math.abs( numOfPixels ) / this.imageWHratio ) );
		const width = Math.ceil( height * this.imageWHratio );

		return { width: width, height: height };
	}
}

module.exports = Predictor;