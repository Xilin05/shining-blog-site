---
date: 2023-06-02
category:
  - 笔记
  - 前端
  - Typescript
tag:
  - 前端学习
  - 知识笔记
  - Typescript

# isOriginal: true
pageview: true
---

# **2. 语法篇**

Ts学习第二篇，语法篇。
<!-- more -->

## 前言

TS是JS的超集，故其支持与 JS 几乎相同的数据类型，此外还提供了实用的枚举类型方便我们使用。

数据类型如下：字符串类型 string、数字类型 number、布尔类型 boolean、undefined、null、任意类型 any、未知类型 unknown、空值类型 void、没有值类型 never、字面量类型、对象类型 object、数组类型 array、元组类型 tuple、函数类型 Function、枚举类型 enum、内置对象。

**学习文档：**[**TypeScript入门教程**](https://ts.xcatliu.com/introduction/hello-typescript.html)

## 1. 基础类型

```typescript
let num: number = 1234
let str: string = '1234'
let bool: boolean = false

// “ | ” 竖杆表示联合类型，即可以赋值两种类型：
let num_str: number | string = 123
num_str = '123'

// null && undefined 可以赋值给任何类型，
// 但是需要把tsconfig.json配置非严格模式，如：
let undef: undefined = undefined
let nul: null = null
num = null
num = undefined

// 举例：for循环
for (let index: number = 0; index < 10; index++) {
  if (index == 6) continue

  console.log('index', index)
}
```

## 2. 数组，元组

数组概念： 数组即一组数据，它把一系列具有相同类型的数据组织在一起，成为一个可操作的对象。

举例：菜单 即可看作一个数组，里面的菜品就是数组里面的数据

*   菜单：
*   宫保鸡丁
*   西湖醋鱼
*   佛跳墙

元组：是ts新增的类型之一，元组最重要的特性是可以限制数组元素的个数和类型，它特别适合用来实现多值返回。可以说元组就是固定长度的数组，固定的下标对应固定的数据类型。

```typescript
// 数组
let name_str_arr: string[] = ['张菲', '费玉清']
let age_num_arr: number[] = [20, 21, 22]
let age_num_arr2: Array<number> = [20, 21, 22]
// any表任意类型
let any_arr: any[] = [1, 2, 3, 'a', 'b', 'c']
// 元组，规定类型、长度的数组
let tuple_arr: [string, number] = ['xiling', 98]
// 代码解释： 元组中规定的元素类型顺序必须是完全对照的，而且不能多、不能少，
// list1 中定义的第一个元素为 string类型，不能赋值为 number类型的数据。
let tuple2_arr: [number, string] = ['xiling', 98]

// 当赋值或访问一个已知索引的元素时，会得到正确的类型：
console.log(tuple_arr[1].substr(1))
// 当赋值火访问一个已知索引但是类型对不上时，会有警告或者报错
console.log(tuple2_arr[1].substr(1))
```

## 3. 枚举

枚举，类似于JavaScript中的json对象。在ts中声明枚举对象的关键字时使用enum，枚举成员一旦定义就不可改变了。下面来介绍一下ts中的枚举对象。

枚举分有多种类型，如：数字枚举，字符串枚举，异构枚举，const枚举，外部枚举等。

下面以代码来简单示例：

```typescript
// 数字枚举： Number enum，数字枚举的成员都是Number类型
enum furnitureCount {
  bed,
  desk,
  chair,
  airCondition,
  television
}
// 定义了枚举对象，默认不赋值，则枚举的对象里面的值默认从0开始递增
// 定义后，上面的值分别是：bed: 1, desk: 2, chair: 3, airCondition: 4, television: 5
console.log(furnitureCount)
console.log('chair', furnitureCount.chair)

enum studentOrder {
  nick = 4,
  kangkang,
  mary,
  jack
}
// 枚举对象成员递增值为1，如果第一个元素有值，则后面的元素依次递增
console.log(studentOrder)
console.log('kangkang', studentOrder.kangkang)

// 访问enum对象中value为6的key
let firstStu: string = studentOrder[6]
console.log(firstStu) // mary
// 访问enum对象中key为jack的value
let firstNum: studentOrder = studentOrder.jack
console.log(firstNum) // 7
```

## 4. 函数(void,剩余参数,可选参数,默认值)

首先简单看一下TypeScript和JavaScript中的函数的区别：

| **TypeScript** | **JavaScript**     |
| -------------- | ------------------ |
| 含类型         | 无类型             |
| 箭头函数       | 箭头函数（ES2015） |
| 函数类型       | 无函数类型         |
| 必填和可选参数 | 所有参数都是可选的 |
| 默认参数       | 默认参数           |
| 剩余参数       | 剩余参数           |
| 函数重载       | 无函数重载         |

1.  直接定义函数，定义函数名、参数、参数类型、逻辑和返回值类型的定义；

2.  接口定义函数，使用接口可以清晰地定义函数类型；

3.  类型定义函数，可以使用类型别名来定义函数类型，这种形式更加直观易读；

```typescript
// 直接定义函数
function warnUser(): void {
  //将函数的返回类型指定为 void，表示该函数不返回任何值
  console.log("This is my warning message");
}
function add(x: number, y: number): number {
  return x + y;
}
console.log(add(1, 2))
function demo3(info: object): object {
  return {
    name: '小红'
  }
}

demo3({ info: 'kkk' })
// --------------------------------------------------
//剩余参数
//...args: string[]表示剩余的参数，放在了一个字符串数组中
function greet(x: number, ...args: string[]): string { // 返回一个字符串
  return "Hello World"
}
// --------------------------------------------------
//将 lastName 设置为可选参数：
function buildName(firstName: string, lastName?: string) {
  if (lastName)
    return firstName + " " + lastName;
  else
    return firstName;
}
let result1 = buildName("Bob");  // 正确
// let result2 = buildName("Bob", "Adams", "Sr.");  // 错误，参数太多了
let result3 = buildName("Bob", "Adams");  // 正确
// ---------------------------------
// 设置参数的默认值
function calculate_discoun(price: number, rate: number = 0.50) {
  var discount = price * rate;
  console.log("计算结果: ", discount);
}
calculate_discoun(1000)
calculate_discoun(1000, 0.30)
// ------------------------
// 正常函数表达式完整写法
// 这里的=>与 ES6 中箭头函数的=>不同。
// TypeScript 函数类型中的=>用来表示函数的定义，其左侧是函数的参数类型，右侧是函数的返回值类型；
// 而 ES6 中的=>是函数的实现。
const add3: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y
}
```

## 5. 对象

```typescript
//对象

let person: {//对象的类型注解
  name: string;
  age: number;
  sayHi: (name: string) => void; //将函数的返回类型指定为 void，表示该函数不返回任何值
  sayHi2: (name: number) => number;
} = {//表示ts中的对象
  name: '啦啦啦',
  age: 18,
  sayHi: function (name: string) {
    console.log('lll')
  },
  sayHi2: function (name: number) {
    return name
  },
}
```

## 6. 接口(是一个能力，一种约束)

解决对象类型注解的复用性

```typescript
interface Users {
  readonly name: string;//只读
  // name:string;
  // age:number;
  age?: number;//?可有可无
}
let p1: Users = {
  name: '啦啦啦',
  age: 18,
}
function Demo(per: Users) {
  return per.name + per.age
}
```

## 7. class，接口小结

访问修饰符： public/private/protected。

用来修饰描述 类的成员变量 和 成员方法 – 默认是 public(公共的，任何位置都能访问)

private此方法 只允许 在类中访问，不允许在类外面访问，子类也不行。比如说私有方法不能在实例对象中调用

protected此方法 只允许在类中及子类中访问，不允许在类外面访问。比如说私有方法不能在实例对象中调用。

```typescript
class City {
  //定义公共字段(属性)
  readonly a: string = '33';
  b: number;
  constructor(name: string, level: number) {
    this.a = name;
    this.b = level
    // 构造函数中可以修改readonly
  }
  about() {
    console.log('我是父调用的方法', this.a)
  }
}
class Childer extends City {
  constructor(name: string, level: number) {
    super(name, level)
  }
  about() {
    console.log('我是子调用的方法')
    super.about()
  }
}
let cl = new City('哈哈', 5)
cl.about()//我是父调用的方法
```


```typescript
// 小结：接口与接口之间叫继承，类与接口之间叫实现
interface Ifly {
  fly()
}
interface ISwim {
  swim: () => void
}

interface IMy extends Ifly, ISwim { }//1.一个接口可以继承其他接口

class Per implements Ifly {
  //实现接口中的方法
  fly() {
    console.log('class使用接口')
  }
}
//2.一个类可以实现多个接口
class Per2 implements Ifly, ISwim {
  //实现接口中的方法
  fly() { }
  swim() { }
}
```


## 8. 类型推论、类型断言

类型推论：

声明变量初始化赋值，函数返回值,可忽略类型注解,ts会自动添加

```typescript
 //querySelector获取id时获取到的是element类型，不能访问到src属性等
 //有点像强制转换
let img = document.querySelector('#image') as HTMLImageElement
console.dir(img)
```


类型断言有两种写法:

1.<类型>变量名

2.变量 as 类型

```typescript
function lei(num6: number | string): number {
  if ((<string>num6).length) {
    return (num6 as string).length
  } else {
    return num6.toString().length
  }
}
```

## 9. 泛型

泛型指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定具体类型的一种特性。

```typescript
function createArray<T>(value: T, count: number): any[] {
  const arr: Array<T> = []
  for (let index = 0; index < count; index++) {
      arr.push(value)
  }
  return arr
}
const arr33 = createArray<number>(11, 3)
// <T>（字母可以随便命名）里面就是createArray<number>(11, 3)传的number
----------------------------
//可以传入多个泛型参数
function aa2<P, K>(a: P,b:K): [P,K] {
  return [a,b]
}
aa2<number,string>(1,'a')
-------------------------------
//泛型接口
interface IBase<T>{
  data:Array<T>,//数组的两种写法
  name:T[],
}

class UserB implements IBase<number>{
  data:[1,2];
  name:[1,3]
}
let UserC:IBase<number>={
  data:[1,2],
  name:[1,3]
}
// function UserC:IBase<string>{

// }
-------------------------------
//泛型约束
interface Ilength{
  //接口中有一个length属性
  length:number
}
function getLength<T extends Ilength>(x: T): number { // T 为 Ilength的子类型
  return  x.length//此时不知道x有没有length这个属性,所以用泛型约束
}
console.log(getLength<string>('kkk'))
// console.log(getLength<number>(123))报错，因为number没有length
```