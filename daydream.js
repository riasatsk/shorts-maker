// import genText from "./util/ai.js";
// import generateAudio from "./util/speech.js";
import downloadImageFromBrave from "./brave.js";
import getAudioDuration from "./util/music.js";
import deleteFiles from "./util/delete-file.js";
import runPowerShellScript from "./util/powershell.js";

/**
 *
 * @param {string} textInput - Prompt for generating video script
 * @param {string} image_search - simalr thing that can help to download image
 */

export default async function Daydream(textInput, image_search) {
  await deleteFiles("./image");
  await deleteFiles("./video");

  // const text = await genText(textInput);

  // await generateAudio(text);

  const duration = await getAudioDuration("./output.wav");
  const num = Math.ceil(duration / 4);
  console.log(num);
  await downloadImageFromBrave(image_search, num);

  await runPowerShellScript("./automate.ps1");
  console.log("Daydream Completed");
}
