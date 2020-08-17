var sayHello = function() {
    console.log('Hello world')
}
module.exports = sayHello

var isEq = (exports === module.exports);
console.log(exports);
console.log(module.exports);
console.log(isEq);