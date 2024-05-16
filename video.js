import downloadImageFromBrave from "./brave.js";
import downloadImageFromYandex from "./yandex.js";
import deleteFiles from "./util/delete-file.js";
import getAudioDuration from "./util/music.js";
import runPowerShellScript from "./util/powershell.js";

const image_search = "mahatma gandhi";

await deleteFiles("./image");
await deleteFiles("./video");

const duration = await getAudioDuration("./output.wav");
const num = Math.ceil(duration / 4);
console.log(num);

await downloadImageFromBrave(image_search, num);

await runPowerShellScript("./automate.ps1");
