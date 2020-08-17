## nodejs模块中exports和module.exports的区别
> module.exports才是真正的接口，exports只不过是它的一个辅助工具。nodejs只会导出module.exports的指向，最终返回给调用者的是module.exports而不是exports。
所有的exports收集到的属性和方法，都赋值给了Module.exports。当然，这有个前提，就是module.exports本身不具备任何属性和方法。
如果，module.exports已经具备一些属性和方法，那么exports收集来的信息将被忽略。


挂载在exports上的方式和属性，都会传递给module.exports。二者没区别。
```js
exports.fun = function() {
    console.log('Hello world')
}
exports.messgae = 'Nice to meet you'

var isEq = (exports === module.exports);
console.log(exports);
console.log(module.exports);
console.log(isEq);
// output:
// { fun: [Function], message: 'Nice to meet you' }
// { fun: [Function], message: 'Nice to meet you' }
// true
```
支持用`import`和`require`的具名和匿名引入
```js
let mod = require('./mod.js') // mod: // { fun: [Function], message: 'Nice to meet you' }
import { fun, messgae } from './mod.js' // fun: [Function], message: Nice to meet you
```

直接把变量赋值给exports，那么exports指向变了，那就仅仅是exports不再指向module.exports
```js
exports.fun = function() {
    console.log('Hello world')
}
exports = 'Nice to meet you'

var isEq = (exports === module.exports);
console.log(exports);
console.log(module.exports);
console.log(isEq);
// output
// Nice to meet you
// { fun: [Function] }
// false

let mod = require('./mod.js') // mod: // { fun: [Function] }
```

直接把变量赋值给module.exports，那就说明module.exports和exports的引用关系断开了，二者不相等了。
```js
exports.fun = function() {
    console.log('Hello world')
}

module.exports = 'Nice to meet you'

var isEq = (exports === module.exports);
console.log(exports);
console.log(module.exports);
console.log(isEq);
// output:
// { fun: [Function] }
// Nice to meet you
// false

let mod = require('./exports.js') // mod: Nice to meet you
```

⚠️建议NodeJS开发者注意一下两点：
1. 最好别分别定义module.exports和exports
2. 导出对象用module.exports,导出多个方法和变量用exports

**导出多个属性或方法：**
```js
exports.fun = function() {
    console.log('Hello world')
}

exports.message = 'Nice to meet you'

// 匿名引入
let mod = require('./mod.js') // { fun: [Function], message: 'Nice to meet you' }
// or 具名引入
let { fun, message } = require('./mod.js') // [Function], Nice to meet you
```
**导出一个对象：**
```js
let fun = function() {
    console.log('Hello world')
}

let message = 'Nice to meet you'

module.exports = {
    fun,
    message
}

// 匿名引入
let mod = require('./mod.js') // { fun: [Function], message: 'Nice to meet you' }
// or 具名引入
let { fun, message } = require('./mod.js') // [Function], Nice to meet you
```
⚠️**这里必须用module.exports，而不能用exports，因为nodejs只会导出module.exports的指向**