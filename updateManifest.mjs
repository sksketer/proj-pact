import fs from 'fs';
import path from 'path';

// Function to create assets list dynamically using ES6
const generateAssetsList = (basePath) => {
  const bundles = [];

  // Get all directories (bundles) from the basePath
  const directories = fs.readdirSync(basePath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  // Iterate over each directory (bundle)
  directories.forEach((dir) => {
    const assetsPath = path.join(basePath, dir);
    const assets = [];

    // Get all files (assets) in the directory
    const files = fs.readdirSync(assetsPath, { withFileTypes: true })
      .filter(dirent => dirent.isFile())
      .map(dirent => dirent.name);

    // Add each file as an asset to the current bundle
    files.forEach((file) => {
      const ext = path.extname(file).toLowerCase(); // Get the file extension

      // Add only image files (adjust filters as needed)
      if (['.jpg', '.jpeg', '.png', '.gif', '.svg'].includes(ext)) {
        assets.push({
          name: path.basename(file, ext), // File name without extension as the name
          src: file, // File name with extension as the source
          alias: ""  // Alias, can be customized
        });
      }
    });

    // Add bundle to the list if assets are found
    if (assets.length > 0) {
      bundles.push({
        name: dir, // Directory name is the bundle name
        assets: assets,
      });
    }
  });

  return { bundles };
};

// Example usage
const basePath = path.join(process.cwd(), 'src/assets'); // Adjust this path to your assets folder
const assetsList = generateAssetsList(basePath);

// console.log(JSON.stringify(assetsList, null, 2)); // To view the generated assets list

const objectString = `export const assetsList = ${JSON.stringify(assetsList, null, 2)};\n`;

const filePath = "./src/manifest/assetsList.ts";
// Write the object data to a file named 'data.js'
fs.writeFile(filePath, objectString, (err) => {
    if (err) {
        console.error('Error writing to file', err);
    } else {
        console.log('Object data written successfully to data.js');
    }
});
