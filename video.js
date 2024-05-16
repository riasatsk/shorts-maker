import downloadImageFromBrave from "./brave.js";
import downloadImageFromYandex from "./yandex.js";
import deleteFiles from "./util/delete-file.js";
import getAudioDuration from "./util/music.js";
import runPowerShellScript from "./util/powershell.js";

const image_search = [
  "akbar",
  "mughal king",
  "yamuna river",
];

await deleteFiles("./image");
await deleteFiles("./video");

const duration = await getAudioDuration("./output.wav");

await downloadImageFromBrave(image_search);

await runPowerShellScript("./automate.ps1");
