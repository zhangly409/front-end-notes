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

