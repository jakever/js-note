import mod1 from './exports1.js'
import mod2 from './exports2.js'
import { sayHi } from './exports1.js'
let { sayHello } = require('./exports2.js')
console.log(mod1,'mod1');
console.log(mod2, 'mod2');
console.log('from exports1: ' + sayHi);
console.log('from exports2: ' + sayHello);
console.log('from exports1: ' + mod1.sayHi);
console.log('from exports2: ' + mod2.sayHello);