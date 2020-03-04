import { exec, ExecException } from "child_process";
import { readFileSync } from "fs";

export default class AudioConverter {
  public Ready: Promise<any>;
  private audioPath: string;
  private outputPath: string;

  constructor(audioPath: string) {
    this.audioPath = audioPath;
    this.outputPath = "/Users/gbarker/GitHub/SoundToImage/test.json";
    this.Ready = new Promise((resolve, reject) => {
      const saveWaveform = (error: ExecException | null, stdout: string, stderr: string): void => {
        if (error) {
          reject(error);
        } else {
          const waveform = JSON.parse(readFileSync(this.outputPath).toString()).data;
          resolve(waveform);
        }
      };
      exec(this.constructCommand(), saveWaveform);
    });
  }

  private constructCommand(): string {
    const zoom: string = "16384";
    const bits: "8" | "16" = "8";

    let command = "audiowaveform ";
    command += `-i ${this.audioPath} `;
    command += `-o ${this.outputPath} `;
    command += `-z ${zoom} `;
    command += `-b ${bits} `;
    return command;
  }

  public async createBoxSVGPath(): Promise<string> {
    const waveform = await this.Ready;
    const points = this.getPathPoints(waveform);
    let path = "";
    for (let i = 1; i < points.length; i++) {
      path += `M${points[i - 1][0]} ${points[i - 1][1]} L${points[i][0]} ${points[i][1]} `;
    }
    path += "Z";
    return path;
  }

  public async createCircleSVGPath(): Promise<string> {
    const waveform = await this.Ready;
    let path = "";
    for (let i = 1; i < waveform.length; i++) {
      const innerPoint = this.pointOnCircle(150, i, waveform.length);
      const outerPoint = this.pointOnCircle(15 * Math.abs(waveform[i]) + 150, i, waveform.length);
      path += `M${innerPoint[0]} ${innerPoint[1]} L${outerPoint[0]} ${outerPoint[1]} `;
    }
    path += "Z";
    return path;
  }

  private pointOnCircle(radius: number, index: number, total: number): [number, number] {
    const origin: [number, number] = [2000, 2000];
    const theta = (2 * Math.PI * index) / total;
    const x = Math.cos(theta) * radius;
    const y = Math.sin(theta) * radius;
    return [x + origin[0], y + origin[1]];
  }

  private getPathPoints(waveform: number[]): [number, number][] {
    const points: [number, number][] = [];
    let previous: [number, number] = [0, 0];
    let current: [number, number] = [0, 0];

    for (let i = 0; i < waveform.length; i++) {
      current = [previous[0], previous[1]];
      let currentX = i % 2 ? 5 * waveform[i] : previous[0];
      let currentY = (i - 1) % 2 ? 5 * waveform[i] + 1000 : previous[1];

      current = [currentX, currentY];
      previous = [currentX, currentY];
      points.push(current);
    }
    return points;
  }
}
