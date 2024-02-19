---
date: 2024-02-18
category:
  - 笔记
  - 前端
  - Javascript
tag:
  - 前端学习
  - 知识笔记
  - JS基础
  - 数据类型

isOriginal: true
pageview: true
---
# JavaScript 数据基础

## **1. 数据类型**

在JavaScript中，共有八种数据类型，其又分为三大类：`基本类型`，`引用类型`和`原始类型`。

* **基本类型：** 字符串(String)、数值(Number)、布尔(Boolean)、空(Null)、未定义(Undefined)、BigInt(ES10新增)
* **引用类型：** 对象(Object)(数组【Array】和函数【Function】实际上也是对象类型)
* **原始类型：** 符号(Symbol， ES6新增)

基本类型中，`null`和`undefined`通常被认为是特殊值，这种类型都只有一个值，即其本身。

引用类型中，数组（Array）和函数（Function）实际上也是对象类型。例如：let obj = {name: "Alice", age: 30};。
> * 数组：一种特殊的对象，用于表示有序的元素集合。例如：let arr = [1, 2, 3, 4, 5];。
> * 函数：可调用的对象，用于执行代码块并返回结果。例如：function add(a, b) { return a + b; }。

原始类型Symbol，该类型的对象永远不相等，即便创建的时候传入相同的值。因此，可以用解决属性名冲突的问题（适用于多少编码），做为标记。

注意：JavaScript是一种动态类型语言，这意味着你不需要在声明变量时指定其数据类型。变量的类型会在运行时根据赋给它的值自动确定。例如，你可以将一个变量从数字类型更改为字符串类型，只需简单地为其分配一个新的字符串值即可。

### **1.1 字符串(String)**

String类型用于表示文本数据，可以通过单引号或双引号来定义字符串。

```js
let singleQuoted = 'This is a string'; // 单引号字符串
let doubleQuoted = "This is also a string"; // 双引号字符串
let multiLine = `This is a
multiline
string`; // 模板字符串，可以跨多行

console.log(singleQuoted); // 输出: This is a string
console.log(doubleQuoted); // 输出: This is also a string
console.log(multiLine); // 输出多行文本
```

### **1.2 数值(Number)**

Number类型用于表示整数和浮点数，包括正数、负数以及特殊值（如Infinity、-Infinity和NaN）。

```js
let integer = 42; // 整数
let float = 3.14159; // 浮点数
let negative = -10; // 负数
let infinity = Infinity; // 正无穷
let negInfinity = -Infinity; // 负无穷
let notANumber = NaN; // 非数字

console.log(integer); // 输出: 42
console.log(float); // 输出: 3.14159
console.log(isNaN(notANumber)); // 输出: true
```

### **1.3 布尔(Boolean)**

Boolean类型有两个值：true和false，用于进行逻辑判断。

```js
let isTrue = true; // 布尔值 true
let isFalse = false; // 布尔值 false

console.log(isTrue); // 输出: true
console.log(isFalse); // 输出: false
```

### **1.4 空(Null)**

null类型表示一个空值或不存在的对象引用，其只有一个值，就是它本身。
同时，还可以通过将一个值设置为`null`来回收该变量的内存。

```js
let emptyValue = null; // null 值

console.log(emptyValue); // 输出: null
```

### **1.5 未定义(Undefined)**

undefined类型表示变量已被声明，但未被赋值。

```js
let unassigned; // 声明但未赋值，默认为 undefined

console.log(unassigned); // 输出: undefined
```

### **1.6 BigInt(ES10新增)**

BigInt类型用于表示大于Number.MAX_SAFE_INTEGER的整数。

```js
let bigNumber = BigInt("9007199254740993"); // 创建大整数

console.log(bigNumber); // 输出: 9007199254740993n
console.log(typeof bigNumber); // 输出: bigint
```

### **1.7 对象(Object)**

Object类型用于表示复杂的数据结构，由键值对组成，并且拥有属性和方法。

一个普通对象的示例：

```js
let person = { // 创建一个对象
  name: "Alice", // 键为 "name"，值为 "Alice"
  age: 30, // 键为 "age"，值为 30
  greet: function() { // 键为 "greet"，值为一个函数
    console.log("Hello, my name is " + this.name);
  }
};

console.log(person.name); // 输出: Alice
console.log(person.age); // 输出: 30
person.greet(); // 输出: Hello, my name is Alice
```

数组和函数也是对象，但它们有特殊的语法和行为。

数组示例：

```js
let arr = [1, 2, 3, 4, 5]; // 创建一个数组

console.log(arr[0]); // 输出: 1
console.log(arr.length); // 输出: 5
```

函数示例：

```js
function add(a, b) { // 声明一个函数
  return a + b; // 返回两个参数的和
}

console.log(add(2, 3)); // 输出: 5
```

### **1.8 符号(Symbol)**

Symbol类型表示独一无二的值，通常用于对象属性的键。

```js
let sym = Symbol('unique symbol'); // 创建唯一符号

console.log(sym); // 输出: Symbol(unique symbol)
console.log(typeof sym); // 输出: symbol
```

## **2. 数据类型转换**

JavaScript是一种弱类型语言，因此在开发过程中，经常需要进行数据类型检测和数据类型转换。在本部分中主要介绍数据类型的转换，并提供相关的代码实例。

JavaScript中的数据类型转换主要有两种方式：隐式转换和显式转换。

### **2.1 隐式类型转换**

#### **2.1.1 字符串拼接**

隐式转换是自动进行的，我们无需手动进行任何特殊的操作。

JavaScript会在需要的时候自动将数据从一种类型转换为另一种类型。

例如，当我们尝试将一个数字与一个字符串相加时，JavaScript会自动将数字转换为字符串，然后进行拼接。

```js
var num = 10;
var str = "20";
console.log(num + str);  // 输出 "1020"，而不是 30
```

在这个例子中，+ 操作符被用于字符串连接，所以JavaScript自动将数字 10 转换为字符串 "10"，然后与 "20" 进行连接，得到 "1020"。

#### **2.1.2 数字运算**

JavaScript会尝试将值转换为数字，以执行数学运算。当值无法转换为有效的数字时，它将变为NaN（Not a number. 非数字）。

代码示例：

```js
let str = "42";
let num = str - 10; // 隐式转换，将str转换为数字
console.log(num); // 输出 32
```

#### **2.1.3 强制布尔转换**

在代码的逻辑上下文中，JavaScript将值自动转换为Bool值。

这种转换通常出现在条件语句中，如if语句，假值（如：0、false、空字符串、null、undefined和NaN）都会被自动转换为false，而其他值则会被转换为true。

代码示例：

```js
let num = 0;
if (num) {
  console.log("数字为0");
} else {
  console.log("数字非0");
}
```

#### **2.1.4 比较操作**

JS中的比较操作符（例如==、===、!=、!===、>、<等）在比较不同数据类型时，也会触发执行隐式类型转换。

当遇到这种情况的时候，JS会尝试将两个值转换为相同的数据类型再进行彼此之间的比较。

代码示例：

```js
let num = 42;
let str = "42";
console.log(num == str); // 隐式转换，将str转换为数字，然后进行比较
// 输出 true
```

#### **2.1.5 逻辑运算**

逻辑运算符（例如&&、&、||、|）也会执行隐式类型转换。

在逻辑运算中，JavaScript返回原始值，而不是布尔值。

代码示例：

```js
let a = "Hello";
let b = "";
let result = a && b; // 隐式转换，返回b的值，因为a是真值
console.log(result); // 输出 ""

let num_1 = 0;
let num_2 = 1;
let numRes = num_1 || num_2;
console.log(numRes); // 输出 1
```

#### **2.1.6 使用双重非操作符**

双重非操作符（!!）可以用于显式将值转换为布尔值。这通常用于将值转换为其相应的布尔表示。

代码示例：

```js
let value = 42;
let boolValue = !!value; // 显式将value转换为布尔值
console.log(boolValue); // 输出 true
```

### **2.2 显式类型转换**

显式转换，需要我们明确地进行某种操作来将数据从一种类型转换为另一种类型。

JavaScript提供了一些内置的函数和方法来进行显式的数据类型转换。

#### **2.2.1 Number()**

将数据转换为数字。如果无法转换，结果将为 `NaN`。**

```js
var str = "123";
var num = Number(str);  // num 现在是数字 123`
```

#### **2.2.2 String()**

将数据转换为字符串。

```js
var num = 123;
var str = String(num);  // str 现在是字符串 "123"`
```

#### **2.2.3 Boolean()**

将数据转换为布尔值。

只有以下情况会被转换为 `false`：`0`、`NaN`、`null`、`undefined`、`""`（空字符串）以及 `false` 本身。

其他所有值都会被转换为 `true`。

```js
var truthy = Boolean(1);  // truthy 现在是布尔值 true
var falsy = Boolean(0);  // falsy 现在是布尔值 false`
```

#### **2.2.4 parseInt()、parseFloat()**

分别将字符串转换为整数和浮点数。如果字符串开头的字符无法转换为数字，结果将为 `NaN`。

```js
var int = parseInt("123abc");  // int 现在是数字 123
var float = parseFloat("123.45abc");  // float 现在是数字 123.45`
```

#### **2.2.5 自定义转换函数**

在某些情况下，我们可能需要编写自定义的类型转换函数，以满足特定需求。

这通常涉及编写一个函数，该函数接受一个值作为参数，并返回另一种数据类型的表示。

```js
function customToString(value) {
  return "Custom: " + value.toString();
}
let num = 42;
let customStr = customToString(num);
console.log(customStr); // 输出 "Custom: 42"
```

### **2.3 类型转换陷阱**

尽管JavaScript的数据类型转换是一个强大的特性，但它也可能导致一些陷阱和错误。以下是一些常见的问题和如何避免它们：

#### **2.3.1 使用全等运算符（===）**

全等运算符（===）执行严格的相等比较，不执行隐式类型转换。

因此，建议在比较值时使用===而不是==，以避免不必要的类型转换。

```js
let num = 42;
let str = "42";
console.log(num === str); // 不会执行类型转换，输出 false
```

#### **2.3.2 注意NaN**

NaN是一种特殊的非数字值，它不等于自身，这可能导致意外的结果。在执行数学运算之前，始终检查值是否有效。

```js
let result = 0 / 0;
if (isNaN(result)) {
  console.log("结果不是一个有效的数字");
}
```

#### **2.3.3 避免字符串和数字混合使用**

在将字符串和数字混合使用时，隐式类型转换可能导致不明确的结果。最好将它们分开，然后明确进行转换。

```js
let str = "42";
let num = 10;
let result = Number(str) + num; // 显式转换，避免混淆
console.log(result); // 输出 52
```

#### **2.3.4 谨慎使用自动类型转换**

虽然JavaScript的隐式类型转换通常很方便，但在某些情况下，它可能导致不明确的行为。

因此，使用隐式类型转换时必需谨慎，最好了解它们的工作原理，防止由于类型转换导致不必要的bug。

## **3. 数据类型判断**

在实际业务开发中，经常需要碰到对数据类型进行判断的业务场景，在本小节中针对数据类型判断进行方法讲解并给出代码案例。

### **3.1 typeof**

typeof是个操作符，可以判断基本数据类型（返回的结果只能是number，string，boolean，null，symbol，function，object）
对于引用值来说，除了function返回function类型，其他都返回object类型

```js
let num = 123;
let str = "hello";
let obj = {};
let arr = [];
let func = function() {};
let undef;

console.log(typeof num); // "number"
console.log(typeof str); // "string"
console.log(typeof obj); // "object"
console.log(typeof arr); // "object"
console.log(typeof func); // "function"
console.log(typeof undef); // "undefined"
```

对于基本数据类型的判断，typeof 是非常有效的。但对于数组、null 和对象，typeof 都会返回 "object"，因此不够精确。

### **3.2 instanceof**

一般用来检测引用数据类型，表达式为：A instanceof B，判断A是否是B的实例，如果 A 是 B 的实例，则返回 true,否则返回 false，由构造类型判断出数据类型

```js
let arr = [];
let date = new Date();
let obj = {};

console.log(arr instanceof Array); // true
console.log(date instanceof Date); // true
console.log(obj instanceof Object); // true
```
instanceof 适用于判断对象是否属于某个构造函数的实例，但对于基本数据类型和 null 则无法判断。

### **3.3 constructor**

这里是引用constructor是prototype对象上的属性，指向构造函数

```js
var num  = 123;
var str  = 'abcdef';
var bool = true;
var arr  = [1, 2, 3, 4];
var json = {name:'wenzi', age:25};
var func = function(){ console.log('this is function'); }
var und  = undefined;
var nul  = null;
var date = new Date();
var reg  = /^[a-zA-Z]{5,20}$/;
var error= new Error();

function Person(){

}
var tom = new Person();

// undefined和null没有constructor属性
console.log(
    tom.constructor==Person,
    num.constructor==Number,
    str.constructor==String,
    bool.constructor==Boolean,
    arr.constructor==Array,
    json.constructor==Object,
    func.constructor==Function,
    date.constructor==Date,
    reg.constructor==RegExp,
    error.constructor==Error
);
//所有结果均为true
```

constructor属性可以返回对象所属类型的构造函数，但属性易变，不可信赖，这个主要体现在自定义对象上，当开发者重写prototype后，原有的constructor会丢失。

### **3.4 Object.prototype.toString.call()**

Object.prototype.toString.call() 方法可以获取一个对象的精确类型，它不会将数组和对象都笼统地识别为 "object"。

toString是Object原型对象上的一个方法，该方法默认返回其调用者的具体类型更严格的讲，是toString运行时this指向的对象类型, 返回的类型格式为[object,xxx]。

xxx是具体的数据类型，其中包括：String，Number，Boolean，Undefined，Null，Function，Date，Array，RegExp，Error，HTMLDocument等等都可以通过这个方法获取到

```js
let num = 123;
let str = "hello";
let obj = {};
let arr = [];
let func = function() {};
let nullVar = null;
let undef;

console.log(Object.prototype.toString.call(num)); // "[object Number]"
console.log(Object.prototype.toString.call(str)); // "[object String]"
console.log(Object.prototype.toString.call(obj)); // "[object Object]"
console.log(Object.prototype.toString.call(arr)); // "[object Array]"
console.log(Object.prototype.toString.call(func)); // "[object Function]"
console.log(Object.prototype.toString.call(nullVar)); // "[object Null]"
console.log(Object.prototype.toString.call(undef)); // "[object Undefined]"
```

Object.prototype.toString.call() 是最推荐的方法，因为它能够精确地返回任意值的类型，包括基本数据类型、null 和引用类型。

### **3.5 Array.isArray()**

Array.isArray() 是一个专门用来判断一个值是否为数组的方法。

```js
let arr = [];
let notArr = {};

console.log(Array.isArray(arr)); // true
console.log(Array.isArray(notArr)); // false
```

当你需要判断一个值是否为数组时，Array.isArray() 是最佳的选择。

### **3.6 null 和 undefined**

对于 null 和 undefined，我们可以直接使用严格相等运算符 === 进行判断。

```js
let var1 = null;
let var2 = undefined;

console.log(var1 === null); // true
console.log(var2 === undefined); // true
```

对于 null 和 undefined 的判断，直接使用 === 是最直接和推荐的方法。

### **3.7 数据类型判断方法封装**

综上所述，最推荐的方法是使用 Object.prototype.toString.call()，因为它能够精确地返回任意值的类型。然而，在实际开发中，根据具体的需求和场景，可能会结合使用多种判断方法。例如，对于数组的判断，可以直接使用 Array.isArray()；对于 null 和 undefined，则直接使用 === 进行判断。

我们可以封装一个工具方法，用于判断数据类型。

```js
function getType(value) {
  // 首先尝试使用 typeof，因为它对于基本数据类型（除了 null）足够有效
  const type = typeof value;

  // 如果 typeof 返回 'object'，则进一步使用 Object.prototype.toString.call() 来获取精确的类型
  if (type === 'object') {
    // Object.prototype.toString.call() 返回的格式是 [object Type]，我们需要截取字符串来获取类型
    return Object.prototype.toString.call(value).slice(8, -1);
  }

  // 对于其他情况，直接返回 typeof 的结果
  return type;
}

// 使用示例
console.log(getType(123));       // "number"
console.log(getType("hello"));   // "string"
console.log(getType(true));      // "boolean"
console.log(getType(undefined)); // "undefined"
console.log(getType(null));      // "null"
console.log(getType({}));        // "object"
console.log(getType([]));        // "array"
console.log(getType(new Date()));// "date"
console.log(getType(new Function()));// "function"
```

这个函数getType接受一个参数value，然后使用typeof来获取其类型。如果typeof返回'object'，则进一步使用Object.prototype.toString.call()来获取更精确的类型，并截取返回的字符串以去掉前后的"[object "和"]"部分。

请注意，Object.prototype.toString.call()返回的类型是字符串形式的大写形式（如"Array", "Date", "Function"等），而typeof返回的类型是字符串形式的小写形式（如"array", "date", "function"等）。在上面的函数中，我保持了Object.prototype.toString.call()返回的类型格式，因为它通常更易于阅读和理解。

这个函数应该能够满足大多数情况下对数据类型判断的需求，并且对于所有JavaScript数据类型都是准确和可靠的。