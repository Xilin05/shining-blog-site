---
date: 2024-02-20
category:
  - 笔记
  - 前端
  - Javascript
tag:
  - 前端学习
  - 知识笔记
  - JS基础
  - Promise

isOriginal: true
pageview: true
---

# Promise 入门

## 前言

由于 JavaScript 是一门单线程语言，这就导致我们的许多操作（如：如网络请求、文件读写、定时器等）是异步执行的代码，当执行这些操作时，JavaScript 不会等待其完成，而是继续执行后续的代码，这就可能导致异步操作的结果无法立即获取，从而引发异步问题。

在没有 Promise 之前，我们解决异步问题的方法是用回调函数，但是可能导致回调地狱，导致代码结构紊乱、可读性差以及难以维护。

因此，通过 Promise 我们可以解决回调地狱的问题，且使得代码结构更清晰、可读性更好、更容易维护，可以说是一个十分有意义的工具。

接下来就开始学习这个工具，通过本文，期望可以达到：了解 Promise 并能够基础使用的效果。

## 1. 了解 Promise

### 1.1 回调地狱

先来看这样的一个场景：

- 请求接口获取用户信息
- 用户信息中的身份编码来请求用户的下级组织列表
- 获取下级组织列表中的第一个组织的详细信息
- ....

写一份模拟的业务代码结构，大致如下：

```js
getUserinfo(function (roleId) {
  getOrganizationStructure(roleId, function (organizationId) {
    getOrganizationDetail(organizationId, function (data) {
      console.log(data)
      // ....
    })
  })
})

function getUserinfo(callback) {
  setTimeout(function () {
    callback('100001')
  }, 1000)
}

function getOrganizationStructure(roleId, callback) {
  setTimeout(function () {
    callback('1000011')
  }, 1000)
}

function getOrganizationDetail(organizationId, callback) {
  setTimeout(function () {
    callback({})
  }, 1000)
}
```

如上，类似这样：后一个行为依赖于前一个行为的结构，超过 3 层之后往往会使得代码难以阅读与维护，像这样层层嵌套的回调函数我们称之为“回调地狱”。

这种“回调”式异步编程解决方案是比较传统的，整体代码对心智负担较大，可读性较差，维护难度也较高。

为了使得异步编程更加合理与更加强大，因此有了Promise来代替回调函数作为解决异步编程的一种方案。

### 1.2 认识Promise

Promise是ES6的内置构造函数，代表一个在创建 promise 时不一定已知的值。它允许你将处理程序与异步操作的最终成功值或失败原因关联起来。这使得异步方法可以像同步方法一样返回值：异步方法不会立即返回最终值，而是返回一个 promise，以便在将来的某个时间点提供该值。

一个 Promise 必然处于以下几种状态之一：

- 待定（pending）：初始状态，既没有被兑现，也没有被拒绝。

- 已兑现（fulfilled）：意味着操作成功完成。

- 已拒绝（rejected）：意味着操作失败。

一个待定的 Promise 最终状态可以是已兑现并返回一个值，或者是已拒绝并返回一个原因（错误）。当其中任意一种情况发生时，通过 Promise 的 then 方法串联的处理程序将被调用。如果绑定相应处理程序时 Promise 已经兑现或拒绝，这处理程序将被立即调用，因此在异步操作完成和绑定处理程序之间不存在竞态条件。

如果一个 Promise 已经被兑现或拒绝，即不再处于待定状态，那么则称之为已敲定（settled）。

Promise 构造出来的实例存在三个主要方法：`then`，`catch`和`finally`。

- then：实例状态发生改变时的回调函数。它包含两个参数，一个用于成功执行，另一个则在发生错误时使用。返回的是一个新的Promise实例，也就是promise能链式书写的原因。

```js
promise.then(resolved, rejected);
```

- catch：捕获处理错误，将函数作为参数处理错误。如果没有出错，则永远不会调用catch方法。

```js
promise.then(resolved).catch(rejected);
```

- finally：只在 Promise 状态是 settled 时才会调用。


![Promise 流程图](./assets/promise-process.png)

Promise 实例还存在以下方法：

- all()
- race()
- allSettled()
- resolve()
- reject()
- try()

这部分额外的方法会在进阶的知识笔记里面再进行阐述。

## 2. 使用 Promise

## 3. 实战

## 4. 总结
