import fs from "fs";
import os from "os";
import { IcpuAverage, ItestObject, InormalizePath} from "../interface/interfaces";
import { testObject } from "./bench";

export function normalizePath(pathToObject: string): InormalizePath {
  const parsedValueToNumber = parseInt(pathToObject);
  return {parsedValueToNumber, pathToObject}
  
}
export function validatePath(pathAfterNormalize: InormalizePath): ItestObject {
  if (!isNaN(pathAfterNormalize.parsedValueToNumber)) {
    throw new Error("Incorrect path");
  }
  
  if (!fs.existsSync(pathAfterNormalize.pathToObject)) {
    
    throw new Error("Its not a file");
  }
  if (pathAfterNormalize.pathToObject.split(".").pop() !== "js") {
    throw new Error("Incorrect file format! Need a file in '.js' format");
  }
  return testObject;
}

export function validateObject(objectWithTests: ItestObject) {
  if (!objectWithTests.title && !objectWithTests.tests) {
    throw new Error("Its not an object with tests");
  }
  return objectWithTests;
}

export function parseAsInt(value: string): number {
  const parsedValueToNumber = parseInt(value);
  return parsedValueToNumber
}

export function validateIterationsAndRepeats(parsedValueToNumber: number): number {
  if (isNaN(parsedValueToNumber)) {
    throw `${parsedValueToNumber} is not a number`;
  } else if (parsedValueToNumber <= 0) {
    throw `There can be no negative number`;
  }
  return parsedValueToNumber;
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