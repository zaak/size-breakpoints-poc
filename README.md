# Size Breakpoints PoC

## Usage

```
npm install
node app.js [PATH TO IMAGE] (polynomial|linear)
```

## Output

- `Sample WxH` - Width and height dimensions of the test sample.
- `Sample FSize [B]` - File size of the test sample in bytes.
- `Predicted WxH` - Image dimensions returned by predictor (for file size of the test sample).
- `Real FSize [B]` - File size of the image created using predicted width and height.
- `FSize Ratio [%]` - Accurateness of the predictor expressed as percentage ratio of the requested image file size, and the file size of the image created using predicted width and height. The closest to 100%, the better.


![screenshot](https://cloud.githubusercontent.com/assets/803299/19219503/49da2bf2-8e15-11e6-8b1d-c3a0b89b7949.png)

