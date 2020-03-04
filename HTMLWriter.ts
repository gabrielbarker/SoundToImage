import { writeFileSync } from "fs";

export default class HTMLWriter {
  private static readonly defaultPath = "/Users/gbarker/GitHub/SoundToImage/image.html";
  private filePath: string;

  constructor(filePath?: string) {
    this.filePath = filePath ? filePath : HTMLWriter.defaultPath;
  }

  public writeHTMLFile(htmlText: string) {
    writeFileSync(this.filePath, htmlText);
  }
}
