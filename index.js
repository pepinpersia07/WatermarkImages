const path = require('path');
const sharp = require('sharp');

// Input image path (replace with your actual input image path)
const inputImagePath = path.join(__dirname, 'my-img.jpg');

// Construct the output image path in the same directory
const outputImageFilename = 'output.png'; // Change the filename as needed
const outputImagePath = path.join(__dirname, outputImageFilename);

// Watermark text and options
const watermarkText = 'Your Watermark Text';
const watermarkOptions = {
  top: 10, // Adjust the top margin as needed
  left: 10, // Adjust the left margin as needed
  rotate: 0, // Rotation angle in degrees (e.g., 45 for a diagonal watermark)
  font: 'Arial', // Font family
  fontSize: 36, // Font size
  fontColor: 'rgba(255, 255, 255, 0.5)', // Font color with opacity (white with 50% opacity)
};

// Create a buffer for the watermark text image
const watermarkBuffer = Buffer.from(watermarkText);

// Apply the watermark
sharp(inputImagePath)
  .clone()
  .toFormat('png') // Specify the input format as PNG
  .toBuffer((err, buffer) => {
    if (err) {
      console.error('Error:', err);
    } else {
      sharp(buffer)
        .resize({ width: 800, height: 600 })
        .composite([
          {
            input: watermarkBuffer,
            top: watermarkOptions.top,
            left: watermarkOptions.left,
            rotate: watermarkOptions.rotate,
          },
        ])
        .toFormat('png') // Specify the output format as PNG
        .toFile(outputImagePath, (error, info) => {
          if (error) {
            console.error('Error:', error);
          } else {
            console.log('Watermarked image saved to', outputImagePath);
          }
        });
    }
  });

