---
date: 2024-02-02
category:
  - 学习
  - 前端
  - 手写
  - 面试题
tag:
  - 手写代码
  - 面试题
  - 原生
  - 经典

isOriginal: true
pageview: true
---

# **JS实现“红绿灯”交替跳转**

本篇文章主要介绍经典手写面试题“手写红绿灯转换”的实现。
<!-- more -->

## 1. 需求描述

用JS实现“交通红绿灯”的亮灯逻辑，其需求具体如下：

- 共有三种颜色的灯：红，黄，绿，不断轮流交替亮灯；

- 每种灯分别亮灯时长：红灯（3秒），黄灯（1秒），绿灯（2秒）；

- 亮灯顺序为：红，黄，绿，要求打印剩余秒数；

## 2. 思路分析

### 2.1 方案一：setInterval && setTimeout

思路大致如下：

- 使用 `setInterval` 作为计时器，每秒打印剩余秒数

- 使用 `setTimeout` 创建异步任务，等待当前所亮灯的秒数达到后再亮下一个灯

- 使用递归，在红绿灯交替亮完一轮后再重新执行当前函数

### 2.2 方案二：使用Promise异步任务实现

思路大致如下:

- 编写一个方法，该方法接受两个参数，一个是亮灯时间，一个是灯的颜色，并返回一个Promise对象；

- 使用 `setTimeout` 来控制亮灯总时长，使用 `setInterval` 来打印亮灯秒数；

- 使用递归，在亮灯一轮后再次执行主方法来实现不断轮流交替亮灯；

## 3. 代码实现

- **公共方法：**

```js
function red () {
  console.log('红灯')
}

function yellow () {
  console.log('黄灯')
}

function green () {
  console.log('绿灯')
}
```

### 3.1 方案一代码

```js
let timer = null

function trafficLight() {
  clearInterval(timer)

  timer = setInterval(() => {
    red()
  }, 1000)

  setTimeout(() => {
    clearInterval(timer)

    timer = setInterval(() => {
      yellow()
    }, 1000)

    setTimeout(() => {
      clearInterval(timer)

      timer = setInterval(() => {
        green()
      }, 1000)

      setTimeout(() => {
        clearInterval(timer)
        trafficLight()
      }, 2000)
    }, 1000)
  }, 3000)
}

trafficLight()
```

### 3.2 方案二代码

```js
function delayFunc(delay, cb) {
  return new Promise((resolve, reject) => {
    clearInterval(timer)
    timer = setInterval(() => {
      cb()
    }, 1000)
    setTimeout(resolve, delay)
  })
}

function trafficLight() {
  delayFunc(3000, red)
    .then(() => {
      return delayFunc(1000, yellow)
    })
    .then(() => {
      return delayFunc(2000, green)
    })
    .then(() => {
      trafficLight()
    })
    .catch(err => console.log(err))
}

trafficLight()
```

- 方案二存在优化空间，结合 async/await 语法糖来简化写法：

```js
function delayFunc(delay, cb) {
  return new Promise((resolve, reject) => {
    clearInterval(timer)
    timer = setInterval(() => {
      cb()
    }, 1000)
    setTimeout(resolve, delay)
  })
}

function trafficLight() {
  await delayFunc(3000, red)
  await delayFunc(1000, yellow)
  await delayFunc(2000, green)
  clearInterval(timer)
  trafficLight()
}

trafficLight()
```

## 4. 总结

需要熟悉浏览器事件循环原理，了解递归以及在适当的时机使用递归，ES6中Promise的使用及其语法糖，懂得优化代码。