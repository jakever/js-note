1. 实现 ES6 的 class 语法
   > ES6 的 class 内部是基于寄生组合式继承，它是目前最理想的继承方式，通过 Object.create 方法创造一个空对象，并将这个空对象继承 Object.create 方法的参数，再让子类（subType）的原型对象等于这个空对象，就可以实现子类实例的原型等于这个空对象，而这个空对象的原型又等于父类原型对象（superType.prototype）的继承关系。  
    而 Object.create 支持第二个参数，即给生成的空对象定义属性和属性描述符/访问器描述符，我们可以给这个空对象定义一个 constructor 属性更加符合默认的继承行为，同时它是不可枚举的内部属性（enumerable:false）。  
    而 ES6 的 class 允许子类继承父类的静态方法和静态属性，而普通的寄生组合式继承只能做到实例与实例之间的继承，对于类与类之间的继承需要额外定义方法，这里使用 Object.setPrototypeOf 将 superType 设置为 subType 的原型，从而能够从父类中继承静态方法和静态属性
   ```javascript
    //简单模拟ES6的class实现
    // class Animal {
    //     constructor(name) {
    //         this.name = name
    //     }
    //
    //     sleep() {
    //         console.log('animal is sleeping')
    //     }
    //
    //     static staticFunc() {
    //         console.log('staticFunc')
    //     }
    // }
    //
    // class Dog extends Animal {
    //     constructor(name, color) {
    //         super(name)
    //         this.color = color
    //     }
    //
    //     barking() {
    //         console.log('wang!')
    //     }
    // }
    //
    // let brownTeddy = new Dog('teddy', 'brown')
    // Dog.staticFunc()
    // console.log(brownTeddy)
    // brownTeddy.sleep()
    // brownTeddy.barking()


    function Animal(name) {
        this.name = name
    }

    Animal.staticFunc = function () {
        console.log('staticFunc')
    }
    Animal.prototype.sleep = function () {
        console.log('animal is sleeping')
    }

    function Dog(name, color) {
        Animal.call(this, name)
        this.color = color
    }

    //寄生组合式继承 + 构造函数之间的继承
    function inherit(subType, superType) {
        //由于JavaScript引用类型和函数按值传递的特性，不能改变subType的引用地址
        subType.prototype = Object.create(superType.prototype, {
            constructor: {
                enumerable: false,
                configurable: true,
                writable: true,
                // 指向子类，和默认的继承行为保持一致
                value: subType
            }
        })
        //子构造函数继承父构造函数(子类继承父类的静态方法和静态属性)
        Object.setPrototypeOf(subType, superType)
    }

    inherit(Dog, Animal)

    //需要在继承之后再往Dog中添加原型方法，否则会被覆盖掉
    Dog.prototype.barking = function () {
        console.log('wang!')
    }


    let brownTeddy = new Dog('teddy', 'brown')
    Dog.staticFunc()
    console.log(brownTeddy)
    brownTeddy.sleep()
    brownTeddy.barking()
   ```