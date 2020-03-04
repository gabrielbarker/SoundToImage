import AudioConverter from "./src/AudioConverter";
import HTMLWriter from "./HTMLWriter";
import HTMLImageBuilder from "./HTMLImageBuilder";

const writer = new HTMLWriter("/Users/gbarker/GitHub/SoundToImage/image1.html");
const htmlBuilder = new HTMLImageBuilder();

const firstTest = new AudioConverter(
  "/Users/gbarker/GitHub/SoundToImage/FirstTest-ImageToSound.mp3"
);
const secondTest = new AudioConverter(
  "/Users/gbarker/GitHub/SoundToImage/SecondTest-ImageToSound.mp3"
);
const otherTest = new AudioConverter("/Users/gbarker/GitHub/SoundToImage/OtherTest.mp3");

const getSVGCirclePaths = async (audio: AudioConverter) => {
  const path = await audio.createCircleSVGPath();
  const html = htmlBuilder
    .withSVGPath(path)
    .withPathColor("white")
    .withSVGWidthAndHeight([4000, 4000])
    .build();
  writer.writeHTMLFile(html);
};

const getSVGBoxPaths = async (audio: AudioConverter) => {
  const path = await audio.createBoxSVGPath();
  const html = htmlBuilder
    .withSVGPath(path)
    .withPathColor("white")
    .withSVGWidthAndHeight([4000, 4000])
    .build();
  writer.writeHTMLFile(html);
};

getSVGBoxPaths(secondTest);
