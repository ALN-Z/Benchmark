import { Result } from "./result";
import { delay } from "./utils";
import { Itest } from "../interface/interfaces";

export function runWarmingUp(test: Itest, iterations: number) {
  console.log('Начало прогрева...')
  for (let i = 0; i <= iterations; i++) {
    test.runTest();
  }
  console.log("Прогрев завершен. Выполнение тестов...");
}

export async function runBench(
  tests: Itest[],
  iterations: number,
  repeats: number
) {
  const result = new Result(repeats);
  for (const test of tests) {
    await runTestsWithRepeats(test, iterations, repeats);
  }
  result.printResultTable();
}

async function runTestsWithRepeats(
  test: Itest,
  iterations: number,
  repeats: number
) {
  const result = new Result(repeats);
  result.setTitle(test.name);
  for (let i = 0; i < repeats; i++) {
    runTest(test, iterations, result);
    result.setMetrics();
    await delay(500);
  }
  result.setArrayWithResults();
}

function runTest(test, iterations, result) {
  result.startMeasurement();
  for (let i = 0; i <= iterations; i++) {
    test.runTest();
  }
  result.endMeasurement();
}
