---
date: 2023-06-28
category:
  - 笔记
  - 前端
  - Javascript
tag:
  - 前端学习
  - 知识笔记
  - ES6

# isOriginal: true
pageview: true
---

# **5. 新增的数据结构Set、Map**

ES6学习第五篇，ES6中新增的数据结构Set、Map。
<!-- more -->

## 前言

在 JavaScript 里我们通常使用 Array 或 Object 来存储数据。但是在频繁操作数据的过程中，例如查找或者统计时需要手动来实现，并不能简单地直接使用。

常见业务场景如：如何保证 Array 是去重的，如何统计 Object 的数据总数等，必须自己去手动实现类似的需求，不是很方便。

而在 ES6 中为了解决上述痛点，新增了数据结构 Set 和 Map，它们分别对应传统数据结构的“集合”和“字典”，Set 和 Map 主要的应用场景在于“数据重组”

和“数据储存”。

Set 是一种叫做集合的数据结构，Map 是一种叫做字典的数据结构，集合 与 字典 的区别：

*   共同点：集合、字典 可以储存不重复的值

*   不同点：集合 是以 \[value, value\]的形式储存元素，字典 是以 \[key, value\] 的形式储存

如果要用一句话来描述，我们可以说：Set是一种叫做集合的数据结构，Map是一种叫做字典的数据结构。

那么，什么是集合？什么又是字典？

*   集合是由一堆无序的、相关联的，且不重复的内存结构【数学中称为元素】组成的组合。

*   字典是一些元素的集合。每个元素有一个称作key 的域，不同元素的key 各不相同。

## 1. Set

Set是es6新增的数据结构，类似于数组，但是成员的值都是唯一的，没有重复的值，我们一般称为集合，其本身是一个构造函数，用来生成 Set 数据结构：

```javascript
const s = new Set();
```

Set的实例关于增删改查的方法：add( )、delete( )、has( )、clear( )、add( )

### 1.1 增

添加某个值，返回 Set 结构本身，当添加实例中已经存在的元素，set不会进行处理添加

```javascript
s.add(1).add(2).add(2); // 2只被添加了一次
```

### 1.2 删

使用delete( )，删除某个值，返回一个布尔值，表示删除是否成功

```javascript
s.delete(1)
```

使用clear( )，清除所有成员，没有返回值

```javascript
s.clear()
```

### 1.3 查

使用has( )，返回一个布尔值，判断该值是否为Set的成员

```javascript
s.has(2)
```

### 1.4 遍历

Set实例遍历的方法有如下：

*   keys()：返回键名的遍历器
*   values()：返回键值的遍历器
*   entries()：返回键值对的遍历器
*   forEach()：使用回调函数遍历每个成员

Set的遍历顺序就是插入顺序，keys方法、values方法、entries方法返回的都是遍历器对象

```javascript
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```

forEach( )用于对每个成员执行某种操作，没有返回值，键值、键名都相等，同样的forEach方法有第二个参数，用于绑定处理函数的this

```javascript
let set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(key + ' : ' + value))
// 1 : 1
// 4 : 4
// 9 : 9
```

扩展运算符和Set 结构相结合实现数组或字符串去重

```javascript
// 数组
let arr = [3, 5, 2, 2, 5, 5];
let unique = [...new Set(arr)]; // [3, 5, 2]

// 字符串
let str = "352255";
let unique = [...new Set(str)].join(""); // "352"
```


实现并集、交集、和差集

```javascript
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// （a 相对于 b 的）差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```


## 2. Map

Map类型是键值对的有序列表，而键和值都可以是任意类型，其本身是一个构造函数，用来生成 Map 数据结构

```javascript
const m = new Map()
```

Map 结构的实例针对增删改查有以下属性和操作方法：size 属性、set( )、get( )、has( )、delete( )、clear( )

### 2.1 size

size属性返回 Map 结构的成员总数。

```javascript
const map = new Map();
map.set('foo', true);
map.set('bar', false);

map.size // 2
```

### 2.2 set()

设置键名key对应的键值为value，然后返回整个 Map 结构，如果key已经有值，则键值会被更新，否则就新生成该键，同时返回的是当前Map对象，可采用链式写法

```javascript
const m = new Map();

m.set('edition', 6)        // 键是字符串
m.set(262, 'standard')     // 键是数值
m.set(undefined, 'nah')    // 键是 undefined
m.set(1, 'a').set(2, 'b').set(3, 'c') // 链式操作
```

### 2.3 get()

get方法读取key对应的键值，如果找不到key，返回undefined

```javascript
const m = new Map();

const hello = function() {console.log('hello');};
m.set(hello, 'Hello ES6!') // 键是函数

m.get(hello)  // Hello ES6!
```

### 2.4 has()

has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中

```javascript
const m = new Map();

m.set('edition', 6);
m.set(262, 'standard');
m.set(undefined, 'nah');

m.has('edition')     // true
m.has('years')       // false
m.has(262)           // true
m.has(undefined)     // true
```

### 2.5 delete()

delete方法删除某个键，返回true。如果删除失败，返回false

```javascript
const m = new Map();
m.set(undefined, 'nah');
m.has(undefined) // true

m.delete(undefined)
m.has(undefined) // false
```

### 2.6 clear()

clear方法清除所有成员，没有返回值

```javascript
let map = new Map();
map.set('foo', true);
map.set('bar', false);

map.size // 2
map.clear()
map.size // 0
```

### 2.7 遍历

Map结构原生提供三个遍历器生成函数和一个遍历方法：

*   keys()：返回键名的遍历器

*   values()：返回键值的遍历器

*   entries()：返回所有成员的遍历器

*   forEach()：遍历 Map 的所有成员

遍历顺序就是插入顺序

```javascript
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

map.forEach(function(value, key, map) {
  console.log("Key: %s, Value: %s", key, value);
});
```


## 3. WeakSet 和 WeakMap

### 3.1 WeakSet

创建WeakSet实例

```javascript
const ws = new WeakSet();
```

WeakSet可以接受一个具有 Iterable接口的对象作为参数

```javascript
const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}
```

在API中WeakSet与Set有两个区别：

*   没有遍历操作的API

*   没有size属性

WeakSet只能成员只能是引用类型，而不能是其他类型的值

```javascript
let ws=new WeakSet();

// 成员不是引用类型
let weakSet=new WeakSet([2,3]);
console.log(weakSet) // 报错

// 成员为引用类型
let obj1={name:1}
let obj2={name:1}
let ws=new WeakSet([obj1,obj2]);
console.log(ws) //WeakSet {{…}, {…}}
```

WeakSet里面的引用只要在外部消失，它在 WeakSet里面的引用就会自动消失

### 3.2 WeakMap

WeakMap结构与Map结构类似，也是用于生成键值对的集合

在API中WeakMap与Map有两个区别：

* 没有遍历操作的API

* 没有clear清空方法

```javascript
// WeakMap 可以使用 set 方法添加成员
const wm1 = new WeakMap();
const key = {foo: 1};
wm1.set(key, 2);
wm1.get(key) // 2

// WeakMap 也可以接受一个数组，
// 作为构造函数的参数
const k1 = [1, 2, 3];
const k2 = [4, 5, 6];
const wm2 = new WeakMap([[k1, 'foo'], [k2, 'bar']]);
wm2.get(k2) // "bar"
```

WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名

```javascript
const map = new WeakMap();
map.set(1, 2)
// TypeError: 1 is not an object!
map.set(Symbol(), 2)
// TypeError: Invalid value used as weak map key
map.set(null, 2)
// TypeError: Invalid value used as weak map key
```

WeakMap的键名所指向的对象，一旦不再需要，里面的键名对象和所对应的键值都会自动消失，不用手动删除引用。举个场景例子：

在网页的 DOM 元素上添加数据，就可以使用WeakMap结构，当该 DOM 元素被清除，其所对应的WeakMap记录就会自动被移除

```javascript
const wm = new WeakMap();

const element = document.getElementById('example');

wm.set(element, 'some information');
wm.get(element) // "some information"
```

注意：WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用

下面代码中，键值obj会在WeakMap产生新的引用，当你修改obj不会影响到内部

```javascript
const wm = new WeakMap();
let key = {};
let obj = {foo: 1};

wm.set(key, obj);
obj = null;
wm.get(key)
// Object {foo: 1}
```