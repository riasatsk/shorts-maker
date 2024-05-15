import * as sdk from "microsoft-cognitiveservices-speech-sdk";

let audioFile = "output.wav";
const speechConfig = sdk.SpeechConfig.fromSubscription(
  process.env.SPEECH_KEY,
  process.env.SPEECH_REGION
);

const audioConfig = sdk.AudioConfig.fromAudioFileOutput(audioFile);

speechConfig.speechSynthesisVoiceName = "hi-IN-SwaraNeural";

export default async function generateAudio(text) {
  let synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

  synthesizer.speakTextAsync(
    text,
    (result) => {
      if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
        console.log("synthesis finished.");
      } else {
        console.error(
          "Speech synthesis canceled, " +
            result.errorDetails +
            "\nDid you set the speech resource key and region values?"
        );
      }
      synthesizer.close();
      synthesizer = null;
    },
    (err) => {
      console.trace("err - " + err);
      synthesizer.close();
      synthesizer = null;
    }
  );
}
