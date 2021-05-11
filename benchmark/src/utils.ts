export function validatePath(value: string) : string {
    if(typeof value == 'string') {
        return value;
    } 
    throw 'Wrong path! Please try again'
}

export function validateObject(value: object) : object {
    if (value.hasOwnProperty('title')){
        return value;
    }
    throw 'Wrong object! This object has no tests'
}

export function parseAsInt(value: string): number {
    const parsedValue = parseInt(value);
    if (isNaN(parsedValue)) {
        throw `${value} is not a number`;
    }
    return parsedValue;
}


export function delay(ms: number) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms);
    });
  }




  var os = require("os");

export function cpuAverage() {
  var totalIdle = 0, totalTick = 0;
  var cpus = os.cpus();


  for(var i = 0, len = cpus.length; i < len; i++) {


    var cpu = cpus[i];


    for(let type in cpu.times) {
      totalTick += cpu.times[type];
   }     

    totalIdle += cpu.times.idle;
  }

  return {idle: totalIdle / cpus.length,  total: totalTick / cpus.length};
}
