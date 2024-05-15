import axios from "axios";
import { writeFileSync } from "fs";

export default async function downloadImage(imageUrl, destinationPath) {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });

    if (response.status !== 200) {
      throw new Error("Failed to download image");
    }

    writeFileSync(destinationPath, Buffer.from(response.data));
    console.log("Image downloaded successfully");
  } catch (error) {
    console.error("Error:", error);
  }
}
