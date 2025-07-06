const fs = require('fs');
const path = require('path');

const shapesDir = path.join(__dirname, 'src/assets/shapes'); // change this if needed
const outputPath = path.join(__dirname, 'src/assets/shapes.json');

fs.readdir(shapesDir, (err, files) => {
  if (err) {
    console.error("Failed to read shapes directory:", err);
    return;
  }

  const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];
  const shapeMap = {};

  files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    if (imageExtensions.includes(ext)) {
      const nameWithoutExt = path.basename(file, ext);
      shapeMap[nameWithoutExt.toUpperCase()] = `/assets/shapes/${file}`;
    }
  });

  fs.writeFile(outputPath, JSON.stringify(shapeMap, null, 2), (err) => {
    if (err) {
      console.error("Error writing shapes.json:", err);
    } else {
      console.log("✅ shapes.json generated successfully at", outputPath);
    }
  });
});
