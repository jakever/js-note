#### 防抖
> leading 为是否在进入时立即执行一次，原理是利用定时器，如果在规定时间内再次触发事件会将上次的定时器清除，即不会执行函数并重新设置一个新的定时器，直到超过规定时间自动触发定时器中的函数。  
同时通过闭包向外暴露了一个 cancel 函数，使得外部能直接清除内部的计数器
```javascript
/**
 * @description 函数防抖
 * @param {Function} func -需要函数防抖的函数
 * @param {Number} time -延迟时间
 * @param {Options} options -配置项
 * @return {Function} -经过防抖处理的函数
 **/

/**
 * @typedef {Object} Options -配置项
 * @property {Boolean} leading -开始是否需要额外触发一次
 * @property {Boolean} trailing -结束后是否需要额外触发一次
 * @property {this} context -上下文
 **/

const debounce = (func, time = 17, options = {
    leading: true,
    context: null
}) => {
    let timer;
    const _debounce = function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        if (options.leading && !timer) {
            timer = setTimeout(null, time)
            func.apply(options.context, args)
        }else{
            timer = setTimeout(() => {
                func.apply(options.context, args)
                timer = null
            }, time)
        }
    };
    /**
     * @description 取消函数
     **/
    _debounce.cancel = function () {
        clearTimeout(timer)
        timer = null
    };
    return _debounce
};
```