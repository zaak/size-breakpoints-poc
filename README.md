# Size Breakpoints PoC

## Usage

```
npm install
node app.js [PATH TO IMAGE] (polynomial|linear)
```

## Output

- `Sample WxH` - Width and height dimensions of the test sample.
- `Sample FSize [B]` - File size of the test sample in bytes.
- `Predicted WxH` - Image dimensions returned by predictor.
- `Real FSize [B]` - File size of the image created using predicted width and height.
- `FSize Accurateness [%]` - Accurateness of the predictor based on requested image file size, and the file size of the image created using predicted width and height.


![screenshot](https://cloud.githubusercontent.com/assets/803299/19219082/49f9532a-8e0a-11e6-9c87-20d22a4238c5.png)
