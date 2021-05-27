import { delay } from "./utils"
import { runBench, runWarmingUp} from "./testCases";
import {setParsedValues} from "./parsedValues"

export const params = setParsedValues();

(async () => {runWarmingUp(params.testObject.tests[0], params.iterations);
delay(500);
runBench(params.testObject.tests, params.iterations, params.repeats);})()
