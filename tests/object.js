let arr = new Array(100000);
arr.fill(1,0,100000);

const forCycleTest = {
  name: 'Test For cycle',
  getTest: () => {
    let res = 0;
    for ( let i =0 ; i<arr.length; i++){
      res = i;
    }
    return res;
  }
}
const forEachCycleTest = {
  name: 'Test ForEach cycle',
  getTest: () => {
    let res = 0;
    arr.forEach((elem) => {
      res = elem;
    });
    return res;
  }
}
const forOfCycleTest = {
  name: 'Test ForOf cycle',
  getTest: () => {
    let res = 0;
    for (let value of arr){
      res = value;
    }
  return res;
  }
}

module.exports = testObject = {
    title: 'Test object',
    tests: [forEachCycleTest, forOfCycleTest, forCycleTest]
}

