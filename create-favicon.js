const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createFavicon() {
  const inputPath = path.join(__dirname, 'public/images/logo/pixelia-favicon.png');
  const outputPath = path.join(__dirname, 'app/icon.png');

  try {
    // Read the image and remove white background
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    await image
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })
      .then(({ data, info }) => {
        // Process pixels to make white/near-white transparent
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // If pixel is white or very light (close to white), make it transparent
          if (r > 240 && g > 240 && b > 240) {
            data[i + 3] = 0; // Set alpha to 0 (transparent)
          }
        }

        return sharp(data, {
          raw: {
            width: info.width,
            height: info.height,
            channels: 4
          }
        })
        .resize(256, 256, {
          fit: 'inside',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toFile(outputPath);
      });

    console.log('✓ Favicon created successfully at app/icon.png (256x256, transparent background)');

    const stats = fs.statSync(outputPath);
    console.log(`✓ File size: ${Math.round(stats.size / 1024)}KB`);
  } catch (error) {
    console.error('Error creating favicon:', error);
  }
}

createFavicon();
