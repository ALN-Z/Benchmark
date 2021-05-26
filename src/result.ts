import {
  IperiodMeasurement,
} from "../interface/interfaces";
import { cpuAverage } from "./utils";
import {OperationMetrics} from './operationMetrics'


export class Result extends OperationMetrics{
    testTitle:string;
    counterTime: number = 0;
    counterMemoryUsage: number = 0;
    counterCpu: number = 0;
    startTime: IperiodMeasurement;
    endTime: IperiodMeasurement;
    periodTime: number = 0;
    static resultArray = [];
    arrayOfTimes = [];
    avgMemory: number = 0;
    avgCPU: number = 0;
    avgTime: number = 0;
    errTime: number = 0;
    constructor(public repeats) {
      super(repeats);
    }
    // getUsedMemory(): number {
    //   return process.memoryUsage().heapUsed / 1024 / 1024;
    // }
    
    // getUsedTime(): number {
    //   return this.periodTime = this.endTime.time - this.startTime.time;
      
    // }
    
    // startMeasurement(): void {
    //   this.startTime = {
    //     time: Date.now(),
    //     cpu: cpuAverage(),
    //   };
    // }
  
    // endMeasurement():   void {
    //   this.endTime = {
    //     time: Date.now(),
    //     cpu: cpuAverage(),
    //   };
    // }
    // setTitle(name:string) {
    //   this.testTitle = name
    // }
  
    // setTime() {
      
    //   this.counterTime += this.getUsedTime()
    //   this.arrayOfTimes.push(this.periodTime)
    // }
    // setMemory(){
    //   this.counterMemoryUsage += this.getUsedMemory()
    // }
    // setCpu(){
    //   this.counterCpu += this.getCPUPercentage()
    // }
  
    // getCPUPercentage() {
    //   let idleDifference: number = this.endTime.cpu.idle - this.startTime.cpu.idle;
    //   let totalDifference: number = this.endTime.cpu.total - this.startTime.cpu.total;
    //   let percentageCPU: number =
    //     100 - ~~((100 * idleDifference) / totalDifference);
    //   return percentageCPU;
    // }

    // calculateAvgResults() {
    //   this.avgMemory = Math.round((this.counterMemoryUsage / this.repeats) * 100) / 100;
    //   this.avgCPU = Math.round((this.counterCpu / this.repeats) * 100) / 100;
    //   this.avgTime = Math.round((this.counterTime / this.repeats) * 100) / 100;
    //   for(let i = 0; i<this.repeats; i++){
    //     this.errTime += Math.abs(this.avgTime - this.arrayOfTimes[i])
    //   }
    // }

    setResultArray(){
      this.calculateAvgResults()
        Result.resultArray.push({
        "Test name" : this.testTitle,
        "Avg memory (mb)" : this.avgMemory,
        "Avg CPU (%)" : this.avgCPU,
        "Avg time (ms)" : this.avgTime,
        "GAP (%)" : '',
        "ErrTime (%)" : Math.round((100 - Math.abs(((this.errTime / this.repeats) - this.avgTime )/ this.avgTime) * 100) * 100) / 100
        })
    }

    sortResultArray() {
      Result.resultArray.sort((a,b) => {
        return a["Avg time (ms)"] - b["Avg time (ms)"]
      })
      
    }

    setAdditionalIndicators () {
      this.sortResultArray()
      Result.resultArray[0]["GAP (%)"] = 0;
      for(let i = 1; i < Result.resultArray.length; i ++){
        Result.resultArray[i]["GAP (%)"] = "+" + Math.round(Math.abs(100 - (Result.resultArray[0]["Avg time (ms)" ]/Result.resultArray[i]["Avg time (ms)" ])*100)*100)/100;
       
      }
      
    }


    showResultArray(){
      this.setAdditionalIndicators()
      const { Table } = require('console-table-printer');
      const table = new Table()
      table.addRow(Result.resultArray[0], { color: 'green' });
        for(let i = 1; i < Result.resultArray.length; i ++){      
        table.addRow(Result.resultArray[i], { color: 'red' });
        }
        table.printTable();
    }
  }