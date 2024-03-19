---
date: 2024-02-03
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

# **JS实现千位符号格式化**

本篇文章主要介绍经典手写面试题“千位符号格式化”的实现。
<!-- more -->

## 1. 需求描述

在实际业务开发中，数字处理与展示是十分常见的需求，并且由于常涉及国际数字，经常需要在千位分割、万位分割或不分割之间做相互转换。

如：

> 100000.00 转换为： 100,000.00
>
> 23,461,345.00 转换为： 2346,1345.00
>
> 23,461,345.00 转换为： 23461345.00

本文主要讲述千位符转换。

## 2. 思路分析与代码实现

### 2.1 方案一：原生JS实现

```js
function loopDeal (list = []) {
  for (let index = list.length - 3; index > 0; index -= 3) {
    list[index] = ',' + list[index]
  }
}

function thousandFormat(number) {
  let numStr = number.toString()
  let [ integer, decimal ] = numStr.split('.')
  let integerPart = integer.split('')
  let decimalPart = decimal?.split('') || []

  loopDeal(integerPart)
  loopDeal(decimalPart)

  integerPart = integerPart.join('')
  decimalPart = decimalPart.length ? '.' + decimalPart.join('') : ''

  return integerPart + decimalPart
}

thousandFormat('254524536.45567')
```

### 2.2 方案二： 正则表达式实现

```js
function thousandFormat(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
```

### 2.3 方案三：toLocaleString

- `object`、`array`、`date`、`number` 等多种数据类型都能使用 `toLocaleString` 方法来进行特定的格式化，这里主要展示在 `number` 时的用法

> number.toLocaleString([locales [, options]])

```js
let num = 12345678.123
num.toLocaleString() // "12,345,678.12,345"
```

更详细的用法可以参考MDN上关于 [Number.prototype.toLocaleString](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString) 的介绍

### 2.4 方案四：Intl.NumberFormat

Intl.NumberFormat 是 JavaScript 的一个内置对象，用于格式化数字。

它提供了一种简单、灵活的方式来将数字格式化为各种本地化的表示形式，包括货币、百分比和小数位数等。

基本示例：

```js
let number = 1234567.8901;
let transfer = new Intl.NumberFormat('en-US');
let transferRes = transfer.format(number); // 输出 "1,234,567.89"
```