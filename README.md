# Size Breakpoints PoC

## Usage

```
npm install
node app.js [PATH TO IMAGE] (polynomial|linear)
```

## Output

- `Sample WxH` - Width and height dimensions of the test sample.
- `Sample FSize [B]` - File size of the test sample in bytes.
- `Predicted WxH` - Image dimensions returned by the predictor (for file size of the test sample).
- `Real FSize [B]` - File size of the image created using predicted width and height.
- `FSize Ratio [%]` - Accuracy of the predictor expressed as a percentage ratio of the requested file size, and the file size of the image created using predicted width and height. The closer to exactly 100%, the better.


![screenshot](https://cloud.githubusercontent.com/assets/803299/19219520/a6293bf0-8e15-11e6-839a-5bbc8fd8a758.png)

