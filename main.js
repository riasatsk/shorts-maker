import genText from "./util/ai.js";
import generateAudio from "./util/speech.js";


const prompt = "tell me a interesting fact about a historical figure in hindi";

const text = await genText(prompt);
generateAudio(text);

