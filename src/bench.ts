import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { validatePath, parseAsInt, validateObject, normalizePath, validateIterationsAndRepeats } from "./utils";
import { delay } from "./utils"
import { runBench, runWarmingUp} from "./testCases";
import path from "path";
import {ItestObject} from "../interface/interfaces"

const argv: any = yargs(hideBin(process.argv)).argv;
const PATH: string = path.join(process.cwd(), argv.p || argv.path);
validatePath(normalizePath(PATH));
const [iterations, repeats] : number[] = [validateIterationsAndRepeats(parseAsInt(argv.i || argv.iterations)), validateIterationsAndRepeats(parseAsInt(argv.r || argv.repeats))]
export const testObject : ItestObject = require(PATH);
validateObject(testObject);


(async () => {runWarmingUp(testObject.tests[0], iterations);
delay(500);
runBench(testObject.tests, iterations, repeats);})()
