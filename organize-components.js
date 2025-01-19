import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the path of the current module's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the components directory
const componentsDir = path.join(__dirname, "src/components");
console.log(componentsDir);

// Ensure the components directory exists
if (!fs.existsSync(componentsDir)) {
  console.error("Components directory does not exist");
  process.exit(1);
}

// Read all the files in the components directory
fs.readdir(componentsDir, (err, files) => {
  if (err) {
    console.error("Error reading components directory:", err);
    return;
  }

  // Filter for .tsx and .css files
  const componentFiles = files.filter(
    (file) => file.endsWith(".tsx") || file.endsWith(".css")
  );

  componentFiles.forEach((file) => {
    const componentName = path.basename(file, path.extname(file)); // Get the component name without extension
    const componentPath = path.join(componentsDir, file);
    const newFolderPath = path.join(componentsDir, componentName);

    // Check if folder already exists
    if (!fs.existsSync(newFolderPath)) {
      // Create a new folder with the component name
      fs.mkdirSync(newFolderPath);
      console.log(`Created folder: ${newFolderPath}`);
    }

    // Move the .tsx or .css file into the new folder
    const newFilePath = path.join(newFolderPath, file);
    fs.rename(componentPath, newFilePath, (err) => {
      if (err) {
        console.error("Error moving file:", err);
        return;
      }
      console.log(`Moved ${file} to ${newFilePath}`);
    });
  });
});
