import { Result } from './result';
import { delay } from "./utils";
import {
  Itest,
} from "../interface/interfaces";

export function runWarmingUp(test: Itest, iterations: number) {
  for (let i = 0; i <= iterations; i++) {
    test.getTest();
  }
  console.log("Прогрев завершен. Выполнение тестов...");
}

export async function runBench(tests: Itest[], iterations: number, repeats: number) {
  const result = new Result(repeats)
  for (const test of tests) {
    await getTestsBench(test, iterations, repeats, result);
  }
  result.showResultArray()
}

async function getTestsBench(test: Itest, iterations: number, repeats: number, result) {
  result.setTitle(test.name);
  for (let i = 0; i < repeats; i++) {
    runTest(test,iterations,result)
    result.setTime();
    result.setMemory();
    result.setCpu();
    await delay(500);
  }
  result.setResultArray()
}

function runTest(test,iterations,result) {
  result.startMeasurement();
  for (let i = 0; i <= iterations; i++) {
    test.getTest();  
  }
  result.endMeasurement();
}