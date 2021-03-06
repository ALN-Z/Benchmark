import { IperiodMeasurement } from "../interface/interfaces";
import { cpuAverage } from "./utils";

export class OperationMetrics {
  testTitle: string;
  private counterTime: number = 0;
  private counterMemoryUsage: number = 0;
  private counterCpu: number = 0;
  private startTime: IperiodMeasurement;
  private endTime: IperiodMeasurement;
  private periodTime: number = 0;
  private arrayOfTimes = [];
  avgMemory: number = 0;
  avgCPU: number = 0;
  avgTime: number = 0;
  errTime: number = 0;
  constructor(public repeats: number) {}
  private getUsedMemory(): number {
    return process.memoryUsage().heapUsed / 1024 / 1024;
  }

  private getUsedTime(): number {
    return (this.periodTime = this.endTime.time - this.startTime.time);
  }

  startMeasurement(): void {
    this.startTime = {
      time: Date.now(),
      cpu: cpuAverage(),
    };
  }

  endMeasurement(): void {
    this.endTime = {
      time: Date.now(),
      cpu: cpuAverage(),
    };
  }
  setTitle(name: string) {
    this.testTitle = name;
  }

  setTime() {
    this.counterTime += this.getUsedTime();
    this.arrayOfTimes.push(this.periodTime);
  }
  setMemory() {
    this.counterMemoryUsage += this.getUsedMemory();
  }
  setCpu() {
    this.counterCpu += this.getCPUPercentage();
  }

  setMetrics(){
    this.setTime();
    this.setMemory();
    this.setCpu();
  }

  private getCPUPercentage() {
    let idleDifference: number =
      this.endTime.cpu.idle - this.startTime.cpu.idle;
    let totalDifference: number =
      this.endTime.cpu.total - this.startTime.cpu.total;
    let percentageCPU: number =
      100 - ~~((100 * idleDifference) / totalDifference);
    return percentageCPU;
  }

  calculateAvgResults() {
    this.avgMemory =
      Math.round((this.counterMemoryUsage / this.repeats) * 100) / 100;
    this.avgCPU = Math.round((this.counterCpu / this.repeats) * 100) / 100;
    this.avgTime = Math.round((this.counterTime / this.repeats) * 100) / 100;
    for (let i = 0; i < this.repeats; i++) {
      this.errTime += Math.abs(this.avgTime - this.arrayOfTimes[i]);
    }
  }
}
