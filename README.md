# 学习 & 总结

## Vue 项目多层级页面的动态面包屑的实现

- 动态面包屑 vs 固定面包屑
  - 固定面包屑直接通过`this.$route.name`和`this.$route.path`获取
  - 动态面包屑指需要动态获取的，比如名称，而route信息里是传不了变量的
    - 考虑在全局route的`beforeEach`钩子函数里提前向后端获取动态面包屑需要的数据。请求的参数从哪儿来？通过path里的query或者params里获取。
    - 避免多次重复的请求，使用`sessionStorage`保存下来。为何不用`localStorage`和`cookie`？`localStorage`保存在本地，需要手动清除。`cookie`需要发送到服务器，且保存大小只有4kb。
- 多层级嵌套页面
  - 往往面包屑的嵌套层级和实际页面路由的嵌套关系不一致
  - 例如列表页 -> 详情页，面包屑是嵌套的，但两个组件没有嵌套关系。
- 解决：引入空的组件EmptyLayout,作为详情页的父路由组件，进入详情页的路由前，会先进入EmptyLayout路由，EmptyLayout路由里保存应用列表相关的面包屑信息。
- 使用
  - 在全局面包屑组件里监听路由变化
  - 生成动态面包屑
    - this.$route.matched获取嵌套的路由信息，对于路由信息里标识了suffix的，表示面包屑信息是变量，从localStorage里取出该变量并赋值。
  - 生成面包屑的动态url
    - 匹配path里包含`:key`的动态值，替换成`params`或者`query`里对应的`key`值。
- 完成：一处代码供全局。

## 浏览器同源策略和跨域方法

### 同源策略

- 同源： 协议 + 端口 + 端口三者均相同
- 同源策略限制的行为
  - ajax请求
  - cookie、LocalStorage、IndexDB 无法获取
  - DOM 和 JS 对象无法获得
- 跨域方法
  - JSONP
    - script标签src属性传url，url的callback函数
  - CORS跨域
    - 跨域资源共享，通过客户端发送请求时请求头加origin，服务器返回的响应头加Access-control-allow-origin,浏览器以此判断是否允许跨域。
    - 是否要预检请求
      - http请求方式：get post put delete header options trace connection 
      - 其中get post header请求，且请求头不超过 Accept Accept-language Content-Language Last-Event-ID Content-Type 的为简单请求。
      - 简单请求情况下，浏览器直接发送CORS请求，请求加orgin字段，响应包含Access-Control-Allow-Origin，浏览器以此判断是否允许。
      - 非简单请求，在正式通信前，先发一次预检请求，预检请求通过后，在进行CORS请求。
  - nginx反向代理
    - 反向代理：代理的是服务器，客户端不知道最终请求转发到哪个服务器上，服务器知道来自哪个客户端。
    - 正向代理：代理的是客户端，客户端知道请求哪个服务器，但服务器指知道从来自哪个代理。
  - html5
    - window.postMessage() 方法
  - document.domain + iframe
