/* bind */
// 1. 指定 this,this指向函数的调用对象; 2. 传入参数；3. 返回一个函数
Function.prototype.myBind = function(asThis, ...args) {
    const fn = this
    return function(...args2) {
        fn.apply(asThis, ...args, ...args2) //...操作符不兼容IE
    }
}

Function.prototype.myBind = function (asThis) {
    var fn = this
    var args = Array.prototype.slice.call(arguments, 1) // Array.prototype.slice 代替 ...
    return function() {
        let args2 = Array.prototype.slice.call(arguments, 0)
        return fn.apply(asThis, args2.concat(args))
    }
}

/* 深拷贝 */

const B  = JSON.parse(JSON.stringify(A)) // JSON value不支持的数据类型，都拷贝不了
// 1. 递归； 2. 对象分类型讨论； 3. 解决循环引用（环）

function deepClone(target) {
    if (typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {}
        for(let key in target) {
            cloneTarget = deepClone(target[key])
        }
        return cloneTarget
    } else {
        return target
    }
}
// 避免循环引用，即对象的属性直接或者间接得引用了对象本身的情况

function deepClone(target, map= new Map()) {
    if (typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {}
        if (Map.get(target)) {
            return Map.set(target)
        }
        Map.set(target, cloneTarget)
        for(let key in target) {
            cloneTarget = deepClone(target[key], map)
        }
        return cloneTarget
    } else {
        return target
    }
}

/* Flat Array, 多维数组变一维数组 */
console.log([1, [1, 2], [1, [2]]].flat(3))

function flat (arr) {
    let result = []
    for(let i=0;i<arr.length;i++) {
        if(Array.isArray(arr[i])) {
            result = result.concat(flat(arr[i]))
        } else {
            result.push(arr[i])
        }
    }
    return result
}

/* 判断数据类型 */
function myTypeof (obj) {
    return Object.prototype.toString.call(obj).slice(8, -1)
}

/* 继承 */
function Animal() {
    this.name = name
    this.getName = function () {
        return this.name
    }
}

function Dog(name) {
    Animal.call(this, name)
}
Dog.prototype = new Animal()

// 另一种方法
function Animal () {
    this.name = name
}
Animal.prototype.getName = function () {
    return this.name
}

function Dog () {}
Dog.prototype = new Animal()

let dog1 = new Dog()
Dog.name = 'dog1'

/* class 实现继承 */
class Animal {
    constructor(name) {
        this.name = name
    }
    getName() {
        return this.name
    }
}

class Dog extends Animal {
    constructor(name, age) {
        super(name)
        this.age = age
    }
}

/* 数组去重 */
// ES5
function uniqueArray(arr) {
    let res = arr.filter((item, index, array) => {
        return array.indexOf(item) === index
    })
    return res
}
// Es6
function uniqueArray(arr) {
    let res = [...new Set(arr)]
    return res
}

/* 解析 URL 参数 */
function parseURL(url) {
    let paramObj = {}
    let reg = new RegExp(/.+\?(.+)$/) //将？后面的值取出来
    let search = url.split('?')[1]
    let paramArray = search.split('&')
    paramArray.map(param => {
        let [key, val] = param.split('=')
        val = decodeURIComponent(val)
        paramObj[key] = val
    })
    return paramObj
}

/* 函数防抖 和 函数节流*/
// 防抖：一段时间内只执行一次，如果期间又触发则重新计时
// 节流：一段时间内只执行一次，如果期间又触发忽略不执行。

function debounce (e, func, delay) {
    clearTimeout(e.id)
    e.id = setTimeout(() => {
        func()
    }, delay)
}

function throttle (e, func, delay) {
    if (!e.id) {
        e.id = setTimeout(() => {
            func()
        }, delay)
    }
}

/* reduce */
// arr.reduce((acc, currentValue, index, array, initialValue ) => {})
Array.prototype.myReduce = function(fn, initialValue) {
    let arr = Array.prototype.slice.call(this)
    if(!arr.length) {
        return
    }
    let res;
    if (initialValue) {
        res = initialValue
    } else {
        res = arr[0]
    }
    for(let i =0;i<arr.length;i++) {
        res = fn.call(null, res, arr[i], i, this)
    }
    return res
}

/* Promise.all */
//规则：传入promise数组，只有全部resolve时返回一个resolve状态的新promise;如果有一个reject,返回这个rejected状态的promise；pending一样
myPromiseAll = function (promiseArr) {
    return new promiseArr((resolve, reject) => {
        let result = []
        for(let i=0;i<promiseArr.length;i++) {
            promiseArr[i].then(data => {
                result.push(data)
                if(result.length === promiseArr.length) {
                    resolve(result)
                }
            }).catch((err) => {
                reject(err)
            })
        }
    })
}

let asyncPromise = async function (promises, resolve, reject) {
    for(let i=0;i<promiseArr.length;i++) {
        let x = await promiseArr[i].then(data => {
            result.push(data)
        }).catch((err) => {
            reject(err)
        })
        if(result.length === promiseArr.length) {
            resolve(result)
        }
    }


}
