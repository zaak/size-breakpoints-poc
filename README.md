# Size Breakpoints PoC

## Usage

```
npm install
node app.js [PATH TO IMAGE] (polynomial|linear)
```

## Output

`Sample WxH` - Width and height dimensions of the test sample.
`Sample FSize [B]` - File size of the test sample in bytes.
`Predicted WxH` - Image dimensions returned by predictor.
`Real FSize [B]` - File size of the image created using predicted width and height.
`FSize Accurateness [%]` - Accurateness of the predictor based on requested image file size, and
the file size of the image created using predicted width and height.


