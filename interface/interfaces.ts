export interface Itest {
  name: string;
  runTest: () => number;
}

export interface IperiodMeasurement {
  time: number;
  cpu: IcpuAverage;
}

export interface IcpuAverage {
  idle: number;
  total: number;
}

export interface ItestObject {
  title: string;
  tests: Itest[];
}

export interface Inormalize {
  parsedValueToNumber: number;
  enteredValue: string;
}

export interface IresultArray {
  "Test name" : string;
  "Avg memory (mb)" : number;
  "Avg CPU (%)" : number;
  "Avg time (ms)" : number;
  "Diff (%)" ?: string;
  "ErrTime (%)" : number;
}
