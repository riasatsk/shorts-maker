import genText from "./util/ai.js";
import generateAudio from "./util/speech.js";


const prompt = "tell me 3 interesting fact about our moon in hindi";

const text = await genText(prompt);
generateAudio(text);

