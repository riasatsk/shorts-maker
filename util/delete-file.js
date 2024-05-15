import { promises as fs } from "fs";
import { join } from "path";

async function deleteFiles(directory) {
  try {
    const files = await fs.readdir(directory);

    // Iterate through each file asynchronously using for...of
    for (const file of files) {
      const filePath = join(directory, file);
      const stats = await fs.stat(filePath);

      // Check if it's a file before deletion to avoid unintended consequences
      if (stats.isFile()) {
        await fs.unlink(filePath);
      }
    }

    console.log(`Successfully deleted all files in ${directory}`);
  } catch (error) {
    console.error(`Error deleting files in ${directory}:`, error);
  }
}

export default deleteFiles;
