---
date: 2023-10-28
category:
  - 笔记
  - 前端
  - Javascript
tag:
  - 前端学习
  - 知识笔记
  - React

# isOriginal: true
pageview: true
---

# **7. Hooks**

React学习第七篇，学习几个常用的React Hooks，了解其使用方法、使用场景等。
<!-- more -->

## 前言

**先简单了解一下什么是hook：**

Hook 是 React 团队在 React 16.8 版本中提出的新特性，在遵循函数式组件的前提下，为已知的 React 概念提供了更直接的 API：props，state，context，refs 以及声明周期，目的在于解决常年以来在 class 组件中存在的各种问题，实现更高效的编写 react 组件。

现有hook类型、作用、使用方法可以查看官网：[React 内置 Hook – React 中文文档](https://zh-hans.react.dev/reference/react/hooks)

在“阮一峰的网络日志”中有关于React Hooks的教程， 其对hooks的出现以及作用作了比较容易理解的说明，详情可以查看博客：[React Hooks 入门教程 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2019/09/react-hooks.html)

## 1. 基础

这部分主要学习四个常用的hooks。

### 1.1 useState

`useState()`用于为函数组件引入状态（state）。纯函数不能有状态，所以把状态放在钩子里面。

- **使用步骤**
1. 导入 useState 函数
2. 调用 useState 函数，并传入状态的初始值
3. 从useState函数的返回值中，拿到状态和修改状态的方法
4. 在JSX中展示状态
5. 调用修改状态的方法更新状态

- **代码案例**

```jsx
import { useState } from 'react'

function UseState() {
  let usingValue = 100

  const [newValue, changeValue] = useState(usingValue)

  const reduceHandler = () => {
    changeValue(newValue - 1)
  }
  const addHandler = () => {
    changeValue(newValue + 1)
  }

  return (
    <div>
      使用useState来改变数据，当前：{newValue}
      <div>
        <button className='custom-btn btn-primary' onClick={addHandler}>
          增加
        </button>
        <button className='custom-btn btn-danger' onClick={reduceHandler}>
          减少
        </button>
      </div>
    </div>
  )
}
```

### 1.2 useReducer

另一个也可以用来管理状态的hook，`useReducer`可作为`useState`的代替方案，在某些场景下使用更加适合，例如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等。

使用 `useReducer`还能给那些会触发深更新的组件做性能优化，因为父组件可以向自组件传递 dispatch 而不是回调函数。

它的作用是将组件的状态分解为多个值，并提供一种可预测、可控的状态更新方式，从而使得代码更加清晰易懂。`useReducer`的定义如下：

```js
const [state, dispatch] = useReducer(reducer, initialState);
```

- **`useReducer`接受两个参数：**

1. reducer：一个接受当前状态和动作（action）的 函数 ，返回 新的状态 。在 reducer 中，可以根据 action 的类型来修改状态。

2. initialState：状态的初始值。

- **`useReducer`的返回值是一个数组，数组中包含两个元素：**

1. state：当前的状态值。

2. dispatch：一个用于触发状态更新的函数。当 dispatch 被调用时，会触发 reducer 函数，并传递当前状态和 action 作为参数。

我们通过一个计数器的简单例子来了解一下它的使用方式以及使用场景：

```jsx
function reducerAction(state, action) {
  console.log('state', state)
  console.log('action', action)
  const { type } = action

  switch (type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

function UseReducer() {
  const [count, dispath] = useReducer(reducerAction, 0)

  return (
    <>
      <div>
        <p>当前值：{count}</p>

        <button
          className='custom-btn btn-primary'
          onClick={() => dispath({ type: 'INCREMENT' })}
        >
          增加
        </button>
        <button
          className='custom-btn btn-danger'
          onClick={() => dispath({ type: 'DECREMENT' })}
        >
          减少
        </button>
      </div>
    </>
  )
}
```

在上面这个例子中，我们定义了一个 Counter 组件，用于管理一个计数器的状态。

通过`useReducer`函数，我们将组件的状态分解为 count 值，并提供了一个 reducer 函数来控制它的变化。当用户点击加号或减号按钮时，我们通过 dispatch 函数来触发状态的更新。

当我们使用`useReducer`进行状态管理时，必须要立即其中的两个概念：状态（state）和操作（action）。

1. 状态（state）：状态是组件中需要被管理的数据。状态可以是数字、字符串、对象等任何类型的数据。

2. 操作（action）：操作是触发状态更新的行为。它是一个普通的 JavaScript 对象，包含一个 type 属性和可选的 payload 属性。type 属性是必须的，用于指定所触发的操作类型。payload 属性可以包含任何需要传递给 reducer 函数的数据。通常，payload 属性用于指定更新状态所需的数据。

后续会学习状态管理，React本身不提供状态管理功能，通常需要使用外部库。这方面最常用的库是 Redux或Recoil。

Redux 的核心概念是，组件发出 action 与状态管理器通信。状态管理器收到 action 以后，使用 Reducer 函数算出新的状态，Reducer 函数的形式是`(state, action) => newState`。

这个钩子的方式与状态管理的方式很类似，后面进行状态管理库的学习时就会觉得熟悉。

### 1.3 useEffect

useEffect()用来引入具有副作用的操作，最常见的就是向服务器请求数据。以前，放在componentDidMount里面的代码，现在可以放在useEffect()。

该 Hook 有两个参数，第一个参数是一个包含命令式、且可能有副作用代码的函数，第二个参数是一个数组，此参数来控制该Effect包裹的函数执不执行，如果第二个参数不传递，则该Effect每次组件刷新都会执行，相当于class组件中的componentDidMount和componentDidupdate生命周期的融合。

基础语法如下：

```js
useEffect(()  =>  {
// Async Action
}, [dependencies])
```
接受两个参数：

> 第一个参数是一个函数，异步操作的代码放在里面。
> 第二个参数是一个数组，用于给出 Effect 的依赖项，只要这个数组发生变化，useEffect()就会执行。

第二个参数可以省略，这时每次组件渲染时，就会执行useEffect()。

1. 使用步骤
    1. 导入 useEffect 函数
    2. 调用 useEffect 函数，并传入回调函数
    3. 在回调函数中编写副作用处理（dom操作）
    4. 修改数据状态
    5. 检测副作用是否生效
2. 代码案例

```jsx
// 模仿接口返回数据
function imitateHttpPerson(param) {
  return new Promise((resolve, rejcet) => {
    setTimeout(() => {
      const data = {
        status: 200,
        msg: '请求成功',
        data: {
          username: 'laisheng',
          nickname: '赖生',
          phone_number: '1787000000',
          address: '深圳市龙华区龙华街道环智中心C座'
        }
      }

      resolve(data)
    }, 3000)
  })
}

function UseEffect(props) {
  const { payload } = props
  const { user_id } = payload

  const [loading, setLoading] = useState(true)
  const [userInfo, setUserInfo] = useState({})

  const fetchData = async () => {
    setLoading(true)
    // 请求接口数据
    const { status, msg, data } = await imitateHttpPerson({ user_id })
    setUserInfo(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [user_id])

  if (loading === true) {
    return <p>Loading ...</p>
  }

  return (
    <div>
      <p>You're viewing: {userInfo?.nickname}</p>
      <p>phone_number: {userInfo?.phone_number}</p>
      <p>address: {userInfo?.address}</p>
    </div>
  )
}
```

注意useEffect()方法有第二个参数，类型为数组，分多种情况：

1. 不传参数时，则该Effect每次组件刷新都会执行，相当于class组件中的componentDidMount和componentDidupdate生命周期的融合。
2. 传入空数组，只有组件挂载的时候，Effect才会执行清除操作。
3. 传入数组包裹某个参数或多个参数，则这些参数发生变化时就会触发。
    1. 当依赖项是引用类型时，React 会对比当前渲染下的依赖项和上次渲染下的依赖项的内存地址是否一致，如果一致，effect 不会执行，只有当对比结果不一致时，effect 才会执行。为了解决这个问题，我们可以使用对象中的属性作为依赖，而不是整个对象。

还需要注意：如果使用本方法时返回的是一个回调函数，那么useEffect()认为这是一个副作用清理函数，清理的工作流程如下:

1. 在初始渲染完成之后，useEffect()调用包含副作用的回调，此时清理函数未被调用。
2. 在之后的渲染中，在下一次副作用回调之前，useEffect()会首先调用上次副作用执行过程中的清理函数(清理前一次副作用执行的产物)，然后运行本次副作用。
3. 最后，在组件卸载之后，useEffect()调用最近一次副作用的清理函数。

语法格式：

```js
useEffect(() => {
  // Side-effect...
  return function cleanup() {
    // Side-effect cleanup...
  };
}, dependencies);
```

代码案例：

```jsx
function RepeatMessage({ message }) {
  useEffect(() => {
    const id = setInterval(() => {
      console.log(message);
    }, 2000);
    return () => {
      clearInterval(id);
    };
  }, [message]);
  return <div>I'm logging to console "{message}"</div>;
}
```

小结论：

`useEffect(callback, dependencies)`是用于在函数式组件中处理副作用的钩子，callback参数是一个函数，副作用的逻辑放到这个函数内部，dependencies是副作用的依赖列表: 依赖项为props或state状态值。

`useEffect(callback, dependencies)`在初始加载完成，或者之后的渲染过程中依赖参数变化之后执行回调。

### 1.4 useContext

平时我们进行组件通信的时候，可能都会使用props或者context来进行通信，但是如果组件嵌套比较深层的时候，就需要使用props透传，虽然还是可以实现数据共享，但是比较麻烦。

为了解决这个问题，React推出了useContext来实现全局状态共享。

- **使用步骤**

1. 使用createContext 创建Context对象
2. 在顶层组件通过Provider 提供数据
3. 在底层组件通过useContext函数获取数据


- **代码案例**

```jsx
import { createContext, useContext } from 'react'

const Context = createContext()

function Logo() {
  const name = useContext(Context)

  return <div>底部logo {name}</div>
}

function Footer() {
  return (
    <div>
      Footer <Logo />
    </div>
  )
}

function Layout() {
  return (
    <Context.Provider value={'this is context name'}>
      <Footer></Footer>
    </Context.Provider>
  )
}
```

- **应用场景**

**全局状态管理：** 当应用程序有多个组件需要共享某些状态时，可以使用useContext来创建一个全局状态管理器。通过创建一个Context对象来存储共享状态，并通过useContext在子组件中获取和更新状态。

**主题切换：** 如果应用程序需要支持主题切换功能，可以使用useContext来访问当前的主题配置。通过创建一个主题Context对象，将当前主题值存储在该Context中，并使用useContext在各个组件中获取当前主题值，实现动态切换主题的效果。

**多语言支持：** 类似于主题切换，如果应用程序需要支持多语言功能，可以使用useContext来访问当前的语言配置。通过创建一个语言Context对象，将当前语言值存储在该Context中，并使用useContext在各个组件中获取当前语言值，实现多语言切换的效果。

**路由管理：** 在使用React Router或其他路由库时，可以使用useContext来访问路由信息，如当前路径、参数等。通过创建一个路由Context对象，存储当前路由信息，使用useContext在需要的组件中获取并操作路由信息。

**用户认证：** 当应用程序需要进行用户认证时，可以使用useContext来访问当前用户信息。通过创建一个用户认证Context对象，存储当前用户的认证状态和信息，使用useContext在各个组件中获取和更新用户信息。

### 1.5 尝试自定义hook

- 创建一个hookuseScrollY，它的作用是：实时获取滚动距离Y

```jsx
export function useWindowScroll () {
  const [y, setY] = useState(0)

  useEffect(() => {
    const scrollHandler = () => {
      const h = document.documentElement.scrollTop
      setY(h)
    }

    window.addEventListener('scroll', scrollHandler)

    return () => window.removeEventListener('scroll', scrollHandler)
  })

  return [y]
}
```

- 创建一个hook，用于自动同步数据到本地LocalStorage

```jsx
export function useLocalStorage (key, defaultValue) {
  const [message, setMessage] = useState(defaultValue)

  useEffect(() => {
    window.localStorage.setItem(key, message)
  }, [message, key])

  return [message, setMessage]
}
```

## 2. 进阶

### 2.1 useState的高阶用法

- **使用场景**

参数只会在组件的初始渲染中起作用，后续渲染时会被忽略。如果初始 state 需要通过计算才能获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用
语法：

```jsx
const [name, setName] = useState(()=>{
  // 编写计算逻辑
  //return '计算之后的初始值'
})

setName((preState) => {
  // 编写处理逻辑，每执行一次name的改变，都会执行一次
  // return '计算之后的初始值'
})
```

- **语法规则**

1. 回调函数return出去的值将作为 name 的初始值
2. 回调函数中的逻辑只会在组件初始化的时候执行一次
3. 执行操作函数则在相关依赖每次改变时都会执行一次

- **语法选择**

1. 如果就是初始化一个普通的数据 直接使用 useState(普通数据) 即可
2. 如果要初始化的数据无法直接得到需要通过计算才能获取到，使用useState(()=>{})

- **模拟需求**

编写一个计价组件，根据不同角色进行判断折扣，具体需求如下：

- 角色分为：普通客户，普通会员，超级会员
- 折扣分为：9折，8折，6.5折
- 消费总额达到某个标准时，优惠力度加大，分别为：
    - 普通用户消费达到200元时，折扣调整为：8.2折
    - 普通用户消费达到300元时，折扣调整为：7折
    - 普通用户消费达到400元时，折扣调整为：5.8折
- 输入：会员，130元，期望输出：原价：130元，折后：104元

代码实现：

```jsx
// 待完成
```

### 2.2 useEffect的注意事项

- **执行时机**

默认情况下，`effect` 在第一次渲染之后和每次更新之后都会执行，也可以是只有某些值发生变化之后执行，重点在于是每轮渲染结束后延迟调用（ 异步执行 ），这是 `useEffect` 的好处，保证执行 `effect` 的时候，DOM 都已经更新完毕，不会阻碍 DOM 渲染，造成视觉阻塞。

- **使用场景与注意事项**

常用`useEffect`来进行网络请求，并将请求封装起来，不能直接在`useEffect`使用异步操作，一个错误的案例：

```jsx
function getMock () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ status: 200 })
    }, 3000);
  })
}

function UseEffect () {

  useEffect(async () => {
    const res = await getMock()
    console.log('res', res);
  }, [])
}
```

如上代码执行后会发生报错：

```bash
Warning: useEffect must not return anything besides a function, which is used for clean-up.

It looks like you wrote useEffect(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

useEffect(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state
```

因为这样写会返回一个promise的异步函数，因为**异步会导致清理函数无法立即返回**，正确的写法是在内部单独定义一个函数，然后把这个函数包装成同步：

```jsx
function UseEffect() {
  async function getMockRes() {
    const res = await getMock()
    return res
  }

  useEffect(() => {
    getMockRes()
  }, [])
}
```

### 2.3 useRef获取真实Dom或组件实例

- **使用场景**

在函数组件中获取真实的dom元素对象或者是组件对象

- **使用步骤**

1. 导入 useRef 函数

2. 执行 useRef 函数并传入null，返回值为一个对象 内部有一个current属性存放拿到的dom对象（组件实例）

3. 通过ref 绑定 要获取的元素或者组件

- **获取DOM**

```jsx
import { useEffect, useRef } from 'react'
function App() {
    const h1Ref = useRef(null)
    useEffect(() => {
        console.log(h1Ref)
    },[])
    return (
        <div>
            <h1 ref={ h1Ref }>this is h1</h1>
        </div>
    )
}
export default App
```

- **获取组件实例**

函数组件由于没有实例，不能使用ref获取，如果想获取组件实例，必须是类组件

```jsx
class Foo extends React.Component {
    sayHi = () => {
        console.log('say hi')
    }
    render(){
        return <div>Foo</div>
    }
}

function App() {
    const h1Foo = useRef(null)
    useEffect(() => {
        console.log(h1Foo)
    }, [])
    return (
        <div> <Foo ref={ h1Foo } /></div>
    )
}
```

### 2.4 其他

待补充。