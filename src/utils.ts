import fs from "fs";
import os from "os";
import { IcpuAverage, ItestObject, Inormalize, IobjectWithNormalizedNumbers} from "../interface/interfaces";
import { params } from "./bench";

export function normalize(enteredValue: string): Inormalize {
  const parsedValueToNumber = parseInt(enteredValue);
  return {parsedValueToNumber, enteredValue}
  
}
export function validatePath(pathAfterNormalize: Inormalize):  string {
  if (!isNaN(pathAfterNormalize.parsedValueToNumber)) {
    throw new Error("Incorrect path");
  }
  
  if (!fs.existsSync(pathAfterNormalize.enteredValue)) {
    
    throw new Error("Its not a file");
  }
  if (pathAfterNormalize.enteredValue.split(".").pop() !== "js") {
    throw new Error("Incorrect file format! Need a file in '.js' format");
  }
  return pathAfterNormalize.enteredValue;
}

export function validateObject(objectWithTests: ItestObject) {
  if (!objectWithTests.title && !objectWithTests.tests) {
    throw new Error("Its not an object with tests");
  }
  return objectWithTests;
}

// export function parseAsInt(numberOfIterationsAndRepeats: string): IobjectWithNormalizedNumbers {
//   const parsedValueToNumber = parseInt(numberOfIterationsAndRepeats);
//   return {parsedValueToNumber, numberOfIterationsAndRepeats}
// }

export function validateIterationsAndRepeats(parsedNumber: Inormalize): number {
  if (isNaN(parsedNumber.parsedValueToNumber)) {
    throw `${parsedNumber.enteredValue} is not a number`;
  } else if (parsedNumber.parsedValueToNumber <= 0) {
    throw `There can be no negative number`;
  }
  return parsedNumber.parsedValueToNumber;
}

export function cpuAverage(): IcpuAverage {
  let totalIdle = 0,
    totalTick = 0;
  let cpus = os.cpus();
  for (let i = 0, len = cpus.length; i < len; i++) {
    let cpu = cpus[i];
    for (let type in cpu.times) {
      totalTick += cpu.times[type];
    }
    totalIdle += cpu.times.idle;
  }
  return { idle: totalIdle / cpus.length, total: totalTick / cpus.length };
}

export async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}