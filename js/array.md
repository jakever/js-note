1. 创建特定大小的数组
   ```javascript
   [...Array(3).keys()]
   // [0, 1, 2]

   Array.apply(null, { length: 20}) //生成一个length为20的数组，每一项为undefined，可以遍历

   Array.from({length: 20}) //[undefined,...]
   ```
2. es5实现map
   ```javascript
   const selfMap = function (fn, context) {
        let arr = Array.prototype.slice.call(this)
        let mappedArr = Array(arr.length -1)
        for (let i = 0; i < arr.length; i++) {
            // 判断稀疏数组的情况
            if (!arr.hasOwnProperty(i)) continue;
            mappedArr[i] = fn.call(context, arr[i], i, this)
        }
        return mappedArr
    }
   ```
3. es5实现filter
    ```javascript
    const selfFilter = function (fn, context) {
        let arr = Array.prototype.slice.call(this)
        let filteredArr = []
        for (let i = 0; i < arr.length; i++) {
            if(!arr.hasOwnProperty(i)) continue;
            fn.call(context, arr[i], i, this) && filteredArr.push(arr[i])
        }
        return filteredArr
    }
    ```
4. es5实现some
    ```javascript
    const selfSome = function (fn, context) {
        let arr = Array.prototype.slice.call(this)
        // 空数组直接返回 false，数组的 every 方法则相反返回 true
        if(!arr.length) return false
        for (let i = 0; i < arr.length; i++) {
            if(!arr.hasOwnProperty(i)) continue;
            let res = fn.call(context,arr[i],i,this)
            if(res)return true
        }
        return false
    }
    ```
5. es5实现reduce
    ```javascript
    const selfReduce = function (fn, initialValue) {
        let arr = Array.prototype.slice.call(this)
        let res
        let startIndex
        if (initialValue === undefined) {
            // 找到第一个非空单元（真实）的元素和下标
            for (let i = 0; i < arr.length; i++) {
                if (!arr.hasOwnProperty(i)) continue
                startIndex = i
                res = arr[i]
                break
            }
        } else {
            res = initialValue
        }
        // 遍历的起点为上一步中找到的真实元素后面一个真实元素
        // 每次遍历会跳过空单元的元素
        for (let i = ++startIndex || 0; i < arr.length; i++) {
            if (!arr.hasOwnProperty(i)) continue
            res = fn.call(null, res, arr[i], i, this)
        }
        return res
    }
    ```
6. 不要对数组使用for-in
   ```javascript
   var sum = 0; 
    for (var i in arrayNumbers) { 
        sum += arrayNumbers[i]; 
    }
    // 而是：

    var sum = 0; 
    for (var i = 0, len = arrayNumbers.length; i < len; i++) { 
        sum += arrayNumbers[i]; 
    }
    // 另外一个好处是，i 和 len 两个变量是在for循环的第一个声明中，二者只会初始化一次，这要比下面这种写法快：

    for (var i = 0; i < arrayNumbers.length; i++){ }
   ```