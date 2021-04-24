const path = require('path')
// console.log(__dirname, '__dirname~~~');
console.log(path.join(__dirname, 'test', '../folder'))
console.log(path.resolve(__dirname, 'test', '../folder'))

var customMap = function (arr, callback) {
    var ret = [];
    for (var i = 0; i < arr.length; i++) {
        ret.push(callback(arr[i], i, arr));
    }
    return ret;
};

var run = function (name, times, fn, arr, callback) {
    // var start = (new Date()).getTime();
    console.time('遍历时长');
    // for (let k = 0; k < 50; k++) {
        let newArr;
        for (var i = 0; i < times; i++) {
            newArr = fn(arr, callback);
        }
    // }
    
    console.log(name);
    console.timeEnd('遍历时长');
};

var callback = function (item) {
    return item+'qwe';
};
// let testArr = Array.from({length: 1000})
// let length = testArr.length;

// run('for循环', length, customMap, testArr, callback);

function testArr() {
    console.time('遍历时长');
    // for (let k = 0; k < 500; k++) {
        for (var i = 0; i < 50000; i++) {
            // console.log(k + '_' + i);
            console.log(i);
        }
    // }
    console.timeEnd('遍历时长');
}

testArr()