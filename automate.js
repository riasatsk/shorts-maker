import downloadImageFromBrave from "./brave.js";
import getAudioDuration from "./util/music.js";
import runPowerShellScript from "./util/powershell.js";

/**
 *
 * @param {string} image_search - keyword that can help to download image
 */
export async function Automate(image_search) {
  const duration = await getAudioDuration("./output.wav");
  const num = Math.ceil(duration / 4);
  console.log(num);
  await downloadImageFromBrave(image_search, num);

  await runPowerShellScript("./automate.ps1");
}
