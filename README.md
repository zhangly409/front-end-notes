# 学习 & 总结

## Vue 相关

[Vue 项目多层级页面的动态面包屑的实现](https://github.com/zhangly409/front-end-notes/issues/1)

## Http 网络相关

[浏览器同源策略和跨域方法](https://github.com/zhangly409/front-end-notes/issues/2)

[http 和 https](https://github.com/zhangly409/front-end-notes/issues/3)

[浏览器缓存机制](https://github.com/zhangly409/front-end-notes/issues/4)

## JS 相关

[JS 的 Event Loop 事件循环机制](https://github.com/zhangly409/front-end-notes/issues/5)

[原型、原型链、原型继承](https://github.com/zhangly409/front-end-notes/issues/6)

[常用数组方法](https://github.com/zhangly409/front-end-notes/issues/8)

[JS 数据类型以及垃圾回收机制和内存泄漏](https://github.com/zhangly409/front-end-notes/issues/9)

## 工具相关

[Webpack 工作原理](https://github.com/zhangly409/front-end-notes/issues/7)

## 树与二叉树

- 什么是树
一种非线性结构。仅有一个根节点；除根节点以外每个节点仅有一个父节点；节点间不能形成闭环。
- 树的几个概念
  - 节点的深度：从根节点到该节点经历的边的个数
  - 节点的高度：节点到叶子节点的最长路径
  - 树的高度：根节点的高度
- 二叉树
最多仅有两个子节点的树。
- 平衡二叉树
二叉树中，每个节点的左右子树的高度相差不大于1.
  - 满二叉树：除叶子节点以外每个节点都有左右叶子节点，且叶子节点都处于最低层的二叉树。
  - 完全二叉树：深度为h,则除了第h层以外，其他各层节点数都达到最大个数，且第h层节点都连续几种在最左边。
- 如何用代码表示二叉树

  ```js
  // 定义节点，一个几点拥有当前节点的val，左子节点，右子节点
  function Node () {
      this.val = val
      this.left = null
      this.right = null
  }
  // 一颗二叉树可以由更节点通过左右指针链接起来形成一棵树
  function BinaryTree () {
      var node = function (val) {
        this.val = val
        this.left = null
        this.right = null
      }
      var root = null
      // 新增节点
      var insertNode = function(node, newNode) {
          // 约定右孩子节点大于左孩子节点
          if(newNode.key < node.key>) {
              if (node.left == null) {
                  node.left = newNode
              } else {
                  insertNode(node.left, newNode)
              }
          } else {
              if (node.right === null) {
                  node.right = newNode
              } else {
                  insertNode(node.right, newNode)
              }
          }
      }
      // 插入新节点
      this.insert = function(val) {
          var node = new Node(val)
          if(root === null) {
              root = node
          } else {
              insertNode(root, node)
          }
      }
  }

  // 构建一颗二叉树
  var nodes = [6, 2,3,4,9,8,12,1,22]
  var binaryTree = new BinaryTree()
  nodes.map(node => {
      binaryTree.insert(node)
  })

  ```
  
- 二叉树遍历
  - 前序遍历
    - 先打印该节点，然后左子树，最后右子树
    - 代码实现

      ```js
      preOrderTraverseNode = function (node) {
          let node = []
          var preOrder = (node) => {
              if (node) {
              result.push(node.val)
              preOrder(node.left)
              preOrder(node.right)
            }
          }
          preOrder(root)
          return result
      }
      ```

  - 中序遍历
    - 先做子树，然后该节点，然后右子树
    - 代码实现

    ```js
    middleOrderTraverseNode = function (node) {
        let node = []
        var middleOrder = (node) => {
            if (node) {
            middleOrder(node.left)
            result.push(node.val)
            middleOrder(node.right)
        }
        }
        preOrder(root)
        return result
    }
    ```

  - 后序遍历
    - 先做子树再右子树，再该节点。
    - 代码实现

    ```js
    nextOrderTraverseNode = function (node) {
        let node = []
        var nextOrder = (node) => {
            if (node) {
            nextOrder(node.left)
            nextOrder(node.right)
            result.push(node.val)
        }
        }
        preOrder(root)
        return result
    }
    ```
