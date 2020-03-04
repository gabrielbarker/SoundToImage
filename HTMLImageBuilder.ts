export default class HTMLImageBuilder {
  private static readonly defaultPath = "/Users/gbarker/GitHub/SoundToImage/image.html";
  private header: string;
  private footer: string;
  private svgWidth: number = 4000;
  private svgHeight: number = 2000;
  private path: string = "";
  private pathColour: string = "";
  private pathThickness: number = 1;

  constructor() {
    this.header = `
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SoundToImage</title>
      </head>
      <body style="background-color: black">`;

    this.footer = `
      </body>
    </html>`;
  }

  public withSVGWidthAndHeight(widthAndHeight: [number, number]): HTMLImageBuilder {
    this.svgWidth = widthAndHeight[0];
    this.svgHeight = widthAndHeight[1];
    return this;
  }

  public withSVGPath(path: string): HTMLImageBuilder {
    this.path = path;
    return this;
  }

  public withPathColor(colour: string): HTMLImageBuilder {
    this.pathColour = colour;
    return this;
  }

  public withPathThickness(thickness: number): HTMLImageBuilder {
    this.pathThickness = thickness;
    return this;
  }

  public build(): string {
    let html = "";
    html += this.header;
    html += `<svg width="${this.svgWidth}" height="${this.svgHeight}">`;
    html += `<path d="${this.path}"`;
    html += `stroke="${this.pathColour}" stroke-width="${this.pathThickness}" fill="none" />`;
    html += `</svg>`;
    html += this.footer;
    return html;
  }
}
