---
date: 2024-02-20
category:
  - 笔记
  - 前端
  - Javascript
tag:
  - 前端学习
  - 知识笔记
  - JS进阶
  - 设计模式

isOriginal: true
pageview: true
---

# JavaScript 常用设计模式

## 1. 设计模式简介

**什么是设计模式？**

> 设计模式是一种在软件开发中反复出现的解决问题的模板，它提供了一种结构化的方法来解决特定类型的问题。设计模式描述了问题的解决方案，以及在何种情况下以及如何实现这些解决方案。它们通常包含了类或对象之间的关系、结构和行为。

**设计模式有什么意义？**

- 提高代码质量和可维护性： 设计模式可以帮助开发人员编写更清晰、更模块化的代码，从而提高代码的质量和可维护性。

- 促进代码复用： 设计模式提供了一套经过验证的解决方案，可以在不同的项目和场景中重复使用，从而提高代码的复用性。

- 降低耦合度： 设计模式可以帮助降低代码之间的耦合度，使得代码更易于理解、扩展和修改。

- 加速开发过程： 使用设计模式可以减少开发人员编写重复代码的时间，从而加速开发过程。

**什么场景下需要使用设计模式？**

- 当我们需要解决一个常见的问题，并且我们希望使用一种通用的、经过验证的解决方案时，可以考虑使用设计模式。

- 当我们需要编写可重用、可扩展的代码时，设计模式可以帮助我们设计出一个灵活的架构。

- 当我们发现代码中存在重复的模式，并且希望将这些模式抽象出来以提高代码的复用性和可维护性时，设计模式可以提供一种解决方案。

- 当我们需要降低代码之间的耦合度，并使得代码更易于理解和修改时，设计模式可以帮助我们定义清晰的接口和分离关注点的结构。

## 2. 常用设计模式

本章节主要记录几种常用的设计模式的学习笔记，

### 2.1 单例模式

- 概念： 单例模式用于确保一个类只有一个实例，并提供全局访问点。

- 含义： 通过创建一个类的唯一实例来管理某些全局状态或资源，以确保在整个应用程序中只有一个实例。

- 使用场景：

  - 全局状态管理：例如全局配置对象、主题对象等。

  - 资源管理：例如管理页面中的唯一弹出框、模态框等。

- 代码示例：

```js
// 定义单例类
class Singleton {
  // 声明一个静态变量来存储单例实例
  static instance

  // 私有化构造函数，防止外部通过new关键字创建实例
  constructor() {
    if (!Singleton.instance) {
      // 如果单例实例不存在，则创建新实例并赋值给静态变量
      Singleton.instance = this
    }
    // 返回单例实例
    return Singleton.instance
  }

  // 示例方法
  sayHello() {
    console.log('Hello, I am a singleton instance!')
  }
}

// 创建单例实例
const instance1 = new Singleton()
const instance2 = new Singleton()

// 验证单例实例是否相同
console.log(instance1 === instance2) // 输出: true，表示两个实例是同一个对象

// 调用单例实例的方法
instance1.sayHello() // 输出: Hello, I am a singleton instance!
instance2.sayHello() // 输出: Hello, I am a singleton instance!
```

> 在这个示例中，我们使用了 ES6 类语法来定义单例类 Singleton，并使用静态变量 instance 来存储单例实例。在构造函数中，我们首先检查静态变量 instance 是否已经存在单例实例，如果不存在，则创建新实例并赋值给 instance，然后返回该实例。这样，无论调用多少次构造函数，都只会返回同一个单例实例。
>
> 通过创建两个实例并比较它们是否相同，我们可以验证单例模式的有效性。

### 2.2 工厂模式

- 概念： 工厂模式用于创建对象的接口，但让子类决定实例化哪个类。这样可以将类的实例化延迟到子类中。

- 含义： 将对象的创建与使用代码解耦，通过工厂方法来创建对象，以便在需要时灵活地更改实际实例的类。

- 使用场景：

  - 对象的创建过程较为复杂：例如组件的创建可能涉及到多个步骤，工厂方法可以将这些步骤封装起来。

  - 类的选择可能变化：例如根据不同条件创建不同类型的对象。

- 代码示例：

```js
// 定义汽车类
class Car {
  constructor(type, doors, price) {
    this.type = type
    this.doors = doors
    this.price = price
  }
}

// 定义汽车制造工厂
class CarFactory {
  // 工厂方法，根据传入的类型创建对应的汽车对象
  static createCar(type) {
    switch (type) {
      case 'sedan':
        return new Car('sedan', 4, 20000)
      case 'suv':
        return new Car('suv', 5, 30000)
      case 'sports':
        return new Car('sports', 2, 50000)
      default:
        console.error('Unknown car type:', type)
        return null
    }
  }
}

// 使用汽车制造工厂创建不同类型的汽车对象
const sedan = CarFactory.createCar('sedan')
const suv = CarFactory.createCar('suv')
const sports = CarFactory.createCar('sports')

// 打印不同类型汽车的信息
console.log(sedan) // 输出: Car { type: 'sedan', doors: 4, price: 20000 }
console.log(suv) // 输出: Car { type: 'suv', doors: 5, price: 30000 }
console.log(sports) // 输出: Car { type: 'sports', doors: 2, price: 50000 }
```

> 在这个示例中，我们使用了 ES6 中的类语法来定义汽车类 Car，并使用静态方法的方式定义了汽车制造工厂 CarFactory。通过调用工厂方法 createCar，我们可以直接创建出不同类型的汽车对象。

### 2.3 策略模式

- 概念： 策略模式定义了一系列算法，并将每个算法封装起来，使它们可以相互替换，使算法的变化独立于使用它的客户。

- 含义： 将不同的算法封装成独立的对象，使得它们可以相互替换，从而使得客户端可以根据需要动态地选择算法。

- 使用场景：

  - 对象的行为随着状态的改变而改变：例如表单验证、排序算法等。

- 代码示例：

```js
// 定义促销策略对象
const discountStrategies = {
  // 默认策略：无折扣
  default: function (price) {
    return price
  },
  // 优惠策略1：满100减20
  discount20: function (price) {
    if (price >= 100) {
      return price - 20
    } else {
      return price
    }
  },
  // 优惠策略2：满200减50
  discount50: function (price) {
    if (price >= 200) {
      return price - 50
    } else {
      return price
    }
  },
  // 优惠策略3：打八折
  discount80: function (price) {
    return price * 0.8
  }
}

// 定义购物车类
class ShoppingCart {
  constructor(discountStrategy = 'default') {
    // 设置默认促销策略
    this.discountStrategy = discountStrategy
  }

  // 设置促销策略
  setDiscountStrategy(strategy) {
    this.discountStrategy = strategy
  }

  // 计算最终价格
  calculateFinalPrice(price) {
    // 根据设置的促销策略计算最终价格
    return discountStrategies[this.discountStrategy](price)
  }
}

// 创建购物车实例
const cart = new ShoppingCart()

// 设置不同的促销策略
cart.setDiscountStrategy('discount20')
console.log(cart.calculateFinalPrice(150)) // 输出: 130，满100减20

cart.setDiscountStrategy('discount50')
console.log(cart.calculateFinalPrice(250)) // 输出: 200，满200减50

cart.setDiscountStrategy('discount80')
console.log(cart.calculateFinalPrice(300)) // 输出: 240，打八折

cart.setDiscountStrategy('default')
console.log(cart.calculateFinalPrice(80)) // 输出: 80，无折扣
```

> 在这个示例中，我们定义了一个 discountStrategies 对象，其中包含了不同的促销策略函数。然后，我们创建了一个 ShoppingCart 类，其中包含了一个属性 discountStrategy 用于存储当前的促销策略，并且定义了 setDiscountStrategy 和 calculateFinalPrice 方法用于设置和计算最终价格。
>
> 通过调用不同的 setDiscountStrategy 方法来设置不同的促销策略，然后调用 calculateFinalPrice 方法计算最终价格，从而实现了策略模式的应用。

### 2.4 观察者模式

- 概念： 观察者模式定义了一对多的依赖关系，当一个对象的状态发生变化时，所有依赖它的对象都会收到通知。

- 含义： 主题对象维护了一组观察者对象，当主题对象的状态发生变化时，通知所有的观察者对象进行更新。

- 使用场景：

  - 事件处理：例如 UI 组件的事件监听、数据模型的变更通知等。

  - 状态管理：例如使用 Flux 或 Redux 进行状态管理时，组件通过订阅状态变更来更新自身。

- 代码示例：

```js
// 定义观察者类
class Observer {
  constructor() {
    this.subscribers = [] // 存储订阅者
  }

  // 添加订阅者
  subscribe(callback) {
    this.subscribers.push(callback)
  }

  // 通知所有订阅者
  notify(data) {
    this.subscribers.forEach(subscriber => subscriber(data))
  }
}

// 创建一个新闻发布者
const newsPublisher = new Observer()

// 创建两个订阅者
const subscriber1 = function (data) {
  console.log('订阅者1接受到新消息：', data)
}
const subscriber2 = function (data) {
  console.log('订阅者2接受到新消息：', data)
}

// 订阅新闻发布者
newsPublisher.subscribe(subscriber1)
newsPublisher.subscribe(subscriber2)

// 发布新闻
newsPublisher.notify(
  '爆炸新闻：新的博客《JavaScript 设计模式学习笔记》发布上线啦！'
)
```

> 在本代码示例中，我们创建了一个新闻发布者，并创建了两个订阅者，然后发布了一条新闻。
>
> 首先，我们定义了一个 Observer 类作为观察者，其中包含了添加订阅者和通知所有订阅者的方法。
> 然后，订阅者通过调用 subscribe 方法来订阅发布者，并通过调用 notify 方法来接收通知。

### 2.5 发布订阅模式

- 概念：发布-订阅模式是一种消息传递机制，其中发布者不会直接通知特定的订阅者，而是将消息发送到一个中介（通常称为主题或事件通道），订阅了该主题的所有订阅者都会收到该消息。这种机制允许对象在不需要直接了解彼此的情况下进行通信。

- 含义：发布-订阅模式的核心思想在于解耦。发布者和订阅者之间不存在直接的依赖关系，而是通过共享一个主题或事件通道来进行通信。这样一来，发布者和订阅者之间就可以相互独立地演化，而不会影响彼此的实现细节。

- 使用场景：

  - 事件处理和通知： 在应用程序中处理各种事件，例如用户界面的用户操作、页面加载完成、数据更新等。

  - 组件通信： 用于组件间的松耦合通信，例如父子组件之间的数据传递、子组件之间的状态同步等。

  - 模块间通信： 在模块化的应用程序中，用于模块之间的消息传递和通知，例如模块加载完成、数据加载完成等。

  - 状态管理： 在状态管理库中使用发布-订阅模式来实现状态的变更和通知，例如 Redux、Vuex 等。

  - 异步编程： 在异步编程中，用于处理异步操作的完成通知和数据返回。

- 代码示例：

```js
// 创建一个事件中心（发布者）
const eventEmitter = {
  topics: {},
  // 添加订阅者
  subscribe: function (topic, callback) {
    if (!this.topics[topic]) {
      this.topics[topic] = []
    }
    this.topics[topic].push(callback)
  },
  // 通知所有订阅者
  publish: function (topic, data) {
    if (!this.topics[topic]) return
    this.topics[topic].forEach(callback => callback(data))
  }
}

// 创建两个订阅者
const subscriber1 = function (data) {
  console.log('订阅者1接受到新消息：', data)
}
const subscriber2 = function (data) {
  console.log('订阅者2接受到新消息：', data)
}

// 订阅新闻主题
eventEmitter.subscribe('news', subscriber1)
eventEmitter.subscribe('news', subscriber2)

// 发布新闻
eventEmitter.publish(
  'news',
  '爆炸新闻：新的博客《JavaScript 设计模式学习笔记》发布上线啦！'
)
```

> 在本代码示例中，我们创建了一个新闻发布者，并创建了两个订阅者，然后发布了一条新闻。
>
> 首先，我们创建了一个简单的事件中心 eventEmitter，其中包含了添加订阅者和通知所有订阅者的方法。
> 然后，订阅者通过调用 subscribe 方法来订阅特定主题，并通过调用 publish 方法来发布消息到特定主题。

### 2.6 状态模式

- 概念： 状态模式允许一个对象在其内部状态发生改变时改变它的行为，使其看起来似乎修改了它的类。

- 含义： 将一个对象的状态封装成独立的对象，使得在不同状态下可以有不同的行为，并且可以动态地改变状态。

- 使用场景：

  - 复杂状态管理：例如游戏中角色的状态切换、电梯的状态转换等。

  - 表单的不同状态管理：例如未填写、正在编辑、已提交等状态的管理。

- 代码示例：

```js
// 定义电梯状态类
class ElevatorState {
  // 电梯状态的通用行为方法
  open() {
    console.log('The door is opening.')
  }
  close() {
    console.log('The door is closing.')
  }
  move() {
    console.log('The elevator is moving.')
  }
  stop() {
    console.log('The elevator has stopped.')
  }
}

// 定义停止状态的具体子类
class StoppedState extends ElevatorState {
  // 停止状态的特定行为
  stop() {
    super.stop() // 调用父类方法
    console.log('The elevator is already stopped.')
  }
  // 从停止状态切换到运行状态
  changeToRunning(context) {
    context.setState(new RunningState())
  }
}

// 定义运行状态的具体子类
class RunningState extends ElevatorState {
  // 运行状态的特定行为
  move() {
    super.move() // 调用父类方法
    console.log('The elevator is running.')
  }
  // 从运行状态切换到停止状态
  changeToStopped(context) {
    context.setState(new StoppedState())
  }
}

// 定义电梯类
class Elevator {
  constructor() {
    this.state = new StoppedState() // 初始状态为停止状态
  }
  // 设置电梯状态
  setState(state) {
    this.state = state
  }
  // 执行状态对应的行为
  open() {
    this.state.open()
  }
  close() {
    this.state.close()
  }
  move() {
    this.state.move()
  }
  stop() {
    this.state.stop()
  }
}

// 创建电梯实例
const elevator = new Elevator()

// 电梯初始状态为停止状态
elevator.open() // 输出: The door is opening.
elevator.close() // 输出: The door is closing.
elevator.move() // 输出: The elevator is moving.
elevator.stop() // 输出: The elevator has stopped.

// 从停止状态切换到运行状态
elevator.state.changeToRunning(elevator)
elevator.move() // 输出: The elevator is moving.

// 从运行状态切换到停止状态
elevator.state.changeToStopped(elevator)
elevator.stop() // 输出: The elevator is already stopped.
```

> 在这个示例中，我们通过电梯状态来演示状态模式。首先定义了电梯状态类 ElevatorState，其中包含了电梯可能的通用行为方法。然后定义了具体的停止状态 StoppedState 和运行状态 RunningState 的子类，分别实现了各自状态下的特定行为和状态切换方法。最后定义了电梯类 Elevator，其中包含了设置状态和执行状态对应行为的方法。
>
> 通过创建电梯实例并调用不同的方法，我们可以模拟电梯在不同状态下的行为，从而演示了状态模式的使用。

### 2.7 命令模式

- 概念： 命令模式将一个请求封装成一个对象，从而使得可以用参数化的方式来操作请求。

- 含义： 将命令请求封装成对象，使得可以将请求发送者和接收者解耦，支持撤销、重做等操作。

- 使用场景：

  - 操作的撤销和重做：例如浏览器中的后退和前进功能。

  - 队列请求的管理：例如浏览器中的请求队列，用于管理异步请求的执行顺序。

- 代码示例：

```js
// 定义电视类
class TV {
  turnOn() {
    console.log('TV is turned on.')
  }
  turnOff() {
    console.log('TV is turned off.')
  }
}

// 定义命令接口
class Command {
  execute() {}
}

// 定义开启电视命令
class TurnOnCommand extends Command {
  constructor(tv) {
    super()
    this.tv = tv
  }
  execute() {
    this.tv.turnOn()
  }
}

// 定义关闭电视命令
class TurnOffCommand extends Command {
  constructor(tv) {
    super()
    this.tv = tv
  }
  execute() {
    this.tv.turnOff()
  }
}

// 定义遥控器类
class RemoteControl {
  constructor() {
    this.commands = {} // 存储命令
  }
  // 添加命令
  addCommand(name, command) {
    this.commands[name] = command
  }
  // 执行命令
  pressButton(name) {
    if (this.commands[name]) {
      this.commands[name].execute()
    } else {
      console.log('Invalid command.')
    }
  }
}

// 创建电视实例
const tv = new TV()

// 创建开启电视命令和关闭电视命令
const turnOnCommand = new TurnOnCommand(tv)
const turnOffCommand = new TurnOffCommand(tv)

// 创建遥控器实例
const remoteControl = new RemoteControl()

// 将命令添加到遥控器
remoteControl.addCommand('turnOn', turnOnCommand)
remoteControl.addCommand('turnOff', turnOffCommand)

// 使用遥控器控制电视
remoteControl.pressButton('turnOn') // 输出: TV is turned on.
remoteControl.pressButton('turnOff') // 输出: TV is turned off.
remoteControl.pressButton('changeChannel') // 输出: Invalid command.
```

> 在这个示例中，我们通过控制遥控器来操作电视，使用了命令模式。首先定义了电视类 TV，其中包含了开启和关闭电视的方法。然后定义了命令接口 Command，其中包含了一个抽象的 execute 方法。接着定义了具体的开启电视命令 TurnOnCommand 和关闭电视命令 TurnOffCommand，分别实现了对应的 execute 方法。最后定义了遥控器类 RemoteControl，其中包含了添加命令和执行命令的方法。
>
> 通过创建电视实例、命令实例和遥控器实例，并将命令添加到遥控器中，我们可以使用遥控器来控制电视的开启和关闭，从而演示了命令模式的使用。

## 3. 总结

学习设计模式尤为重要，在我自己本身现在的工作中主要使用的 js 框架是 vue，不管是 vue2 还是 vue3，其设计实现中都使用到了设计模式，有：响应式设计模式、命令模式、工厂模式、观察者模式、发布/订阅模式、模块化设计模式等。

vue 的响应式系统使用的是观察者模式，实现数据驱动试图的自动更新；

vue 组件的创建过程实际上是通过工厂模式；

......
