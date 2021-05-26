import {OperationMetrics} from './operationMetrics'


export class Result extends OperationMetrics{
    static resultArray = [];
    constructor(public repeats) {
      super(repeats);
    }
    
    public setResultArray(){
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

    private sortResultArray() {
      Result.resultArray.sort((a,b) => {
        return a["Avg time (ms)"] - b["Avg time (ms)"]
      })
      
    }

    private setAdditionalIndicators () {
      this.sortResultArray()
      Result.resultArray[0]["GAP (%)"] = 0;
      for(let i = 1; i < Result.resultArray.length; i ++){
        Result.resultArray[i]["GAP (%)"] = "+" + Math.round(Math.abs(100 - (Result.resultArray[0]["Avg time (ms)" ]/Result.resultArray[i]["Avg time (ms)" ])*100)*100)/100;
       
      }
      
    }

    private createTable(){
      const { Table } = require('console-table-printer');
      const table = new Table()
      table.addRow(Result.resultArray[0], { color: 'green' });
        for(let i = 1; i < Result.resultArray.length; i ++){      
        table.addRow(Result.resultArray[i], { color: 'red' });
        }
        table.printTable();
    }
    

    public showResultArray(){
      this.setAdditionalIndicators()
      this.createTable()
  }
}