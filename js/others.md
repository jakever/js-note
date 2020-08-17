1. 函数只执行一次
   
   利用高阶函数，在闭包内操作标识的真假，来控制执行一次。
   
   ```javascript
   function once (fn) {
       let called = false
       return function () {
           if (!called) {
               called = true
               fn.apply(this, arguments)
           }
       }
   }
   ```
2. 自定义bind函数
   ```javascript
    function polyfillBind (fn, ctx) {
        function boundFn (a) {
            const l = arguments.length
            return l
            ? l > 1
            ? fn.apply(ctx, arguments)
            : fn.call(ctx, a)
            : fn.call(ctx)
        }
        boundFn._length = fn.length
        return boundFn
    }
    ```
3. 创建一个被冻结的空对象
   ```javascript
   export const emptyObject = Object.freeze({ })
   ```
4. 创建过去七天的数组，如果将代码中的减号换成加号，你将得到未来7天的数组集合
   ```javascript
   [...Array(7).keys()].map(days => new Date(Date.now() - 86400000 * days));
   ```
5. 生成11位随机ID
   ```javascript
   Math.random().toString(36).substring(2);
   ```
6. 生成随机十六进制代码（生成随机颜色）
   ```javascript
   '#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0');
   ```
7. 实现instanceof
   ```javascript
    const selfInstanceof = function (left, right) {
        let proto = Object.getPrototypeOf(left)
        while (true) {
            if (proto == null) return false
            if (proto === right.prototype) {
                return true
            }
            proto = Object.getPrototypeOf(proto)
        }
    }

    console.log(selfInstanceof({}, Array)) // false
   ```
8. 获取指定范围内的随机数
   ```javascript
   Math.floor(Math.random() * (max - min + 1)) + min;
   ```
9. 字符串去空格
   ```javascript
    const strTrim = function(){
       return this.replace(/^\s+|\s+$/g, "");
    };
   ```
10. 获取数组中的最大值和最小值
    ```javascript
    var numbers = [5, 458 , 120 , -215 , 228 , 400 , 122205, -85411]; 
    var maxInNumbers = Math.max.apply(Math, numbers); 
    var minInNumbers = Math.min.apply(Math, numbers);
    ```