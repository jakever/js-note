## export 和 export default区别
> 1. export与export default均可用于导出常量、函数、文件、模块等
> 2. 在一个文件或模块中，export、import可以有多个，export default仅有一个
> 3. export方式只能具名导入，在导入时要加{ }；export default则只能匿名导入
> 4. export能直接导出变量表达式，export default不行。

**export**
```js
const Programmer = {name: 'UncleFirefly',age:25}
export let message = 'hello'
export { Programmer }
console.log(module.exports) // { message: 'hello', Programmer: { name: 'UncleFirefly', age: 25 } }
```
`import`引入时必须具名导入，也就是需要声明式指定对象里的key来导入你需要的
```js
import { Programmer } from './mod.js' // Programmer: {name: 'UncleFirefly',age:25}
```
如果使用`require`引入的话，则可以直接匿名引入
```js
let mod = require('./mod.js') // mod: {  message: 'hello', Programmer: { name: 'UncleFirefly', age: 25 } }

// or require也支持具名导入
let { Programmer } = require('./export.js') // Programmer: {name: 'UncleFirefly',age:25}
```

**export default**
```js
const message = 'hello'
const Programmer = {name: 'UncleFirefly',age:25}
export default Programmer
// export default message // 报错：export default只能用一次
console.log(module.exports) // { default: { name: 'UncleFirefly', age: 25 } }
```
只能匿名导入
```js
import mod from './mod.js' // mod: { name: 'UncleFirefly', age: 25 }
```
如果使用`require`引入的话，必须通过`default`属性拿到实际导出的变量：
```js
let mod = require('./mod.js') // mod: { default: { name: 'UncleFirefly', age: 25 } }
```
**export与import混合使用**

具名接口改为默认接口的写法如下：
```js
export { es6 as default } from './someModule';

// 等同于
import { es6 } from './someModule';
export default es6;
```
同样地，默认接口也可以改名为具名接口:
```js
export { default as es6 } from './someModule';
```