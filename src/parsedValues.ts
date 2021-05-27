import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { validatePath, validateObject, normalize, validateIterationsAndRepeats } from "./utils";
import path from "path";
import {ItestObject} from "../interface/interfaces"


export function setParsedValues() : any {
    const argv: any = yargs(hideBin(process.argv)).argv;
    let PATH: string = path.join(process.cwd(), argv.p || argv.path);
    PATH = validatePath(normalize(PATH));
    const [iterations, repeats] : number[] = [validateIterationsAndRepeats(normalize(argv.i || argv.iterations)), validateIterationsAndRepeats(normalize(argv.r || argv.repeats))]
    let testObject : ItestObject = require(PATH);
    testObject = validateObject(testObject);
    return {iterations, repeats , testObject}
}

