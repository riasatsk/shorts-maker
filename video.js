import downloadImageFromBrave from "./brave.js";
import getAudioDuration from "./util/music.js";
import runPowerShellScript from "./util/powershell.js";

const image_search = "mahatma gandhi";

const duration = await getAudioDuration("./output.wav");

const num = Math.ceil(duration / 4);
console.log(num);

await downloadImageFromBrave(image_search, num);

await runPowerShellScript("./automate.ps1");
