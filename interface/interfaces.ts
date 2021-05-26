export interface Itest {
  name: string;
  getTest: () => number;
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

export interface InormalizePath {
  parsedValueToNumber: number;
  pathToObject: string;
}
