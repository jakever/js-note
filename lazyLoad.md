1. getBoundingClientRect 实现懒加载
   > getBoundClientRect 的实现方式，监听 scroll 事件（建议给监听事件添加节流），图片加载完会从 img 标签组成的 DOM 列表中删除，最后所有的图片加载完毕后需要解绑监听事件。
   ```javascript
    let imgList1 = [...document.querySelectorAll(".get_bounding_rect")]
    let num = imgList1.length

    let lazyLoad1 = (function () {
        let count = 0
        return function () {
            let deleteIndexList = []
            imgList1.forEach((img,index) => {
                let rect = img.getBoundingClientRect()
                if (rect.top < window.innerHeight) {
                    img.src = img.dataset.src
                    // 加载成功后将图片添加到删除列表中
                    deleteIndexList.push(index)
                    count++
                    if (count === num) {
                        //当图片全部加载完毕解绑scroll事件
                        document.removeEventListener('scroll',lazyLoad1)
                    }
                }
            })
            // 删除已经加载完毕的图片
            imgList1 = imgList1.filter((_,index)=>!deleteIndexList.includes(index))

        }
    })()

    // 这里引用了 throttle.js 的节流函数
    lazyLoad1 = proxy(lazyLoad1, 100)

    document.addEventListener('scroll', lazyLoad1)
    // 手动加载一次，否则首屏的图片不触发滚动无法加载
    lazyLoad1()
   ```
2. intersectionObserver 实现懒加载
    > intersectionObserver 的实现方式，实例化一个 IntersectionObserver ，并使其观察所有 img 标签。  
    当 img 标签进入可视区域时会执行实例化时的回调，同时给回调传入一个 entries 参数，保存着实例观察的所有元素的一些状态，比如每个元素的边界信息，当前元素对应的 DOM 节点，当前元素进入可视区域的比率，每当一个元素进入可视区域，将真正的图片赋值给当前 img 标签，同时解除对其的观察
    ```javascript
    let imgList2 = [...document.querySelectorAll(".intersection_observer")]

    let lazyLoad2 = function () {
        // 实例化observer
        let observer = new IntersectionObserver(entries => {
            //entries存储着所有观察被元素的intersectionObserverEntry配置
            entries.forEach(entry => {
                // 大于0表示进入视口
                if (entry.intersectionRatio > 0) {
                    entry.target.src = entry.target.dataset.src
                    //取消观察
                    observer.unobserve(entry.target)
                }
            })
        })
        imgList2.forEach(img => {
            observer.observe(img)
        })
    }

    lazyLoad2()
    ```