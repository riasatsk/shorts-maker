import fs from "node:fs";

// Function to count files in a directory
export default async function countFiles(directoryPath) {
  try {
    // Read the contents of the directory
    const files = await fs.promises.readdir(directoryPath);

    // Count the number of files
    const fileCount = files.length;
    return fileCount;
  } catch (err) {
    console.error("Error reading directory:", err);
    throw err;
  }
}
