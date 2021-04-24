/**
 * 支持匿名引入和具名引入，通过exports把值挂载到module.exoprts上，import引入的就是整个module.exports这个值
 */

exports.sayHi = function() {
    console.log('Hello exports')
}
// exports.messgae = 'Nice to meet you'