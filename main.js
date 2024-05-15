import genText from "./util/ai.js";
import generateAudio from "./util/speech.js";
import deleteFiles from "./util/delete-file.js";

await deleteFiles("./image");
await deleteFiles("./video");

const prompt = "tell me 3 interesting fact about mahatma gandhi in bangla";

const text = await genText(prompt);
generateAudio(text);

