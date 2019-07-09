#### 优雅的处理 async/await
> 无需每次使用 async/await 都包裹一层 try/catch ，更加的优雅，这里提供另外一个思路，如果使用了 webpack 可以编写一个 loader，分析 AST 语法树，遇到 await 语法，自动注入 try/catch，这样连辅助函数都不需要使用。
```javascript
async function errorCaptured(asyncFunc) {
    try {
        let res = await asyncFunc()
        return [null,res]
    } catch (e) {
        return [e,null]
    }
}
```
怎么使用
```javascript
let asyncFunc = ()=>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.5 ? resolve('success') : reject('error')
        }, 1000)
    })
}


async function func() {
    let [err, res] = await errorCaptured(asyncFunc)
    console.log('res', res)
    console.log('err', err)
}

func()
```