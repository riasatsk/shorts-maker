import genText from "./util/ai.js";
import generateAudio from "./util/speech.js";
import deleteFiles from "./util/delete-file.js";

/**
 *
 * @param {string} textInput - Prompt for generating video script
 */

export default async function Daydream(textInput) {
  await deleteFiles("./image");
  await deleteFiles("./video");

  const text = await genText(textInput);
  generateAudio(text);
}
