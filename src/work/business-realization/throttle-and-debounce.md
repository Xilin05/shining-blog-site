---
date: 2023-08-02

category:
  - 笔记
  - 前端
  - javascript

tag:
  - 奇技淫巧
  - 知识笔记
  - 工具函数

# sticky: 1
isOriginal: true
---

# **防抖与节流的实现与应用**

在实现业务需求中某些场景使用到了防抖与节流，在此记录其实现与应用。
<!-- more -->

## 1. 初步了解

在代码里，也存在“防抖”与“节流”的说法，对于前端开发人员来说应该是不陌生的词条。

它们在本质上是降低性能消耗、优化高频率执行代码的一种方案或者说技术手段。

许多高频率执行事件如：浏览器的 scroll、mouseevent、resize、keypress 等在触发时，会高频率地调用绑定在事件上的callback回调函数，这就导致极大地浪费资源，降低前端性能，十分影响用户体验甚至导致页面崩溃。

为了解决这种问题，就需要对这类事件进行调用次数的限制，因此，“防抖”与“节流”就派上用场，我们采用throttle（节流）和debounce（防抖）的方式来降低调用频率，减少调用次数，起到降低性能开销的效果。

故，在此小结两者的定义：
+ 节流：n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效
+ 防抖：n 秒后再执行该事件，若在 n 秒内被重复触发，则重新计时

可能这样有点抽象，我们不妨用这样一个经典的生活例子来说明：

想象每天上班大厦底下的电梯，把电梯完成一次运送，类比为一次函数的执行和响应，假设电梯有两种运行策略 debounce 和 throttle，超时设定为15秒，不考虑容量限制；

电梯第一个人进来后，15秒钟后准时运送一次，这是节流；

电梯第一个人进来后，等待15秒；如果过程中又有人进来，15秒等待重新计时，直到15秒后开始运送，这是防抖。

## 2. 代码实现

### 2.1 节流

完成节流可以使用时间戳与定时器的写法，使用时间戳写法，事件会立即执行，停止触发后没有办法再次执行。

```javascript
function throttled1(fn, delay = 500) {
  let oldtime = Date.now()
  return function (...args) {
    let newtime = Date.now()
    if (newtime - oldtime >= delay) {
      fn.apply(null, args)
      oldtime = Date.now()
    }
  }
}
```

使用定时器写法，delay毫秒后第一次执行，第二次事件停止触发后依然会再一次执行。

```javascript
function throttled2(fn, delay = 500) {
  let timer = null
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
      }, delay);
    }
  }
}
```

可以将时间戳写法的特性与定时器写法的特性相结合，实现一个更加精确的节流。实现如下：

```javascript
function throttled(fn, delay) {
  let timer = null
  let startTime = Date.now()
  return function () {
    let curTime = Date.now() // 当前时间
    let remaining = delay - (curTime - startTime)  // 从上一次到现在，还剩下多少多余时间
    let context = this
    let args = arguments
    clearTimeout(timer)
    if (remaining <= 0) {
      fn.apply(context, args)
      startTime = Date.now()
    } else {
      timer = setTimeout(fn, remaining);
    }
  }
}
```

### 2.2 防抖

先来一个简单版本的实现：

```javascript
function debounce(func, wait) {
  let timeout;

  return function () {
    let context = this; // 保存this指向
    let args = arguments; // 拿到event对象

    clearTimeout(timeout)
    timeout = setTimeout(function(){
      func.apply(context, args)
    }, wait);
  }
}
```

如果需要防抖在第一次调用的时候立即执行，可加入第三个参数用于判断，实现如下：

```javascript
function debounce(func, wait, immediate) {

  let timeout;

  return function () {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout); // timeout 不为null
    if (immediate) {
      let callNow = !timeout; // 第一次会立即执行，以后只有事件执行后才会再次触发
      timeout = setTimeout(function () {
        timeout = null;
      }, wait)
      if (callNow) {
        func.apply(context, args)
      }
    }
    else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait);
    }
  }
}
```

如此，我们就实现了防抖与节流的方法，只要在适当的业务里使用，即可起到降低性能开销的效果，后面会通过在“万疆ERP后台管理系统”中的实际场景使用来阐释其效果。

## 3. 共性与差性

* 共性：

两者都可以通过使用 setTimeout 实现，

目的都是降低回调执行频率，节省计算资源。

* 差性：

函数防抖，在一段连续操作结束后，处理回调，利用clearTimeout 和 setTimeout实现。函数节流，在一段连续操作中，每一段时间只执行一次，在频率较高的事件中使用来提高性能。

函数防抖关注一定时间连续触发的事件，只在最后执行一次，而函数节流一段时间内只执行一次

例如，都设置时间频率为500ms，在2秒时间内，频繁触发函数，节流，每隔 500ms 就执行一次。防抖，则不管调动多少次方法，在2s后，只会执行一次。

其两者在一段时间内执行的方式或次数如下图所示：

![防抖与节流-区别和效果](./assets/throttle-and-debounce/防抖节流区别效果图.png)

从图中可以明显看到，防抖简单理解就是控制调用次数，节流就是控制调用频率，相信结合图示可以很好的理解他们的区别和效果。

## 4. 应用场景

### 4.1 常见场景

防抖在连续的事件，只需触发一次回调的场景有：

* 搜索框搜索输入

  * 例如：只需用户最后一次输入完，再发送请求；

  * 手机号、邮箱验证输入检测

* 窗口大小resize。只需窗口调整完成后，计算窗口大小。防止重复渲染。

* 节流在间隔一段时间执行一次回调的场景有：

  * 滚动加载，加载更多或滚到底部监听

  * 搜索框，搜索联想功能

### 4.2 实际应用

在ERP开发过程中，由于涉及文件下载，出现过如此现象：接口延迟返回结果，但是用户以为卡顿，多点几点按钮，就出现了不断触发下载的操作，等接口返回成功后连续下载了好几个同名文件。

因此，就需要对该按钮进行防抖处理：

设置时间2秒内点击，第一次点击的时候立马生效，此刻起2秒内点击都无效，需要两秒后才可再次点击。

具体实现如下：

```vue
<template>
  <!------ ....其他代码....  ----->
  <el-button type="primary" @click="handleExport">导出</el-button>
  <!------ ....其他代码....  ----->
</template>

<script setup lang="ts">
function debounce(payload: any) {
  const { func, delay = 1000, immediate = false } = payload
  let timer: any = null
  return function () {
    if (timer) clearTimeout(timer)
    if (immediate) {
      // 复杂的防抖函数
      // 判断定时器是否为空，如果为空，则会直接执行回调函数
      let firstRun = !timer
      // 不管定时器是否为空，都会重新开启一个新的定时器,不断输入，不断开启新的定时器，当不在输入的delay后，再次输入就会立即执行回调函数
      timer = setTimeout(() => {
        timer = null
      }, delay)
      if (firstRun) {
        func.apply(this, arguments)
      }
      // 简单的防抖函数
    } else {
      timer = setTimeout(() => {
        func.apply(this, arguments)
      }, delay)
    }
  }
}

const handleExport = debounce({ func: downloadShippedList, immediate: true })
</script>
```