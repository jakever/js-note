/**
 * 仅支持匿名引入/具名引入（如果暴露的是一个对象就支持），import引入的就是整个module.exports这个值
 */
var notice = '哇哈哈哈哈'
var sayHello = function() {
    console.log('Hello module.exports')
}
module.exports = {
    notice,
    sayHello
}

// var isEq = (exports === module.exports);
// console.log(exports);
// console.log(module.exports);
// console.log(isEq);