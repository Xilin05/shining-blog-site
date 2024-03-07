---
date: 2023-10-30
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

# **9. 路由机制（二）**

React学习第九篇，继续学习React 路由机制，本篇涉及嵌套路由、集中式路由以及将进行路由的综合练习。
<!-- more -->

## 1. 了解路由-React Router

React是一个单页面应用(SPA)。 “单页面应用”顾名思义：只有一个页面，它是没有路由导航机制的。因此，为了在不刷新整个网页的情况下在不同的视图之间进行切换，我们需要一种路由机制，以便在不同的视图之间切换而不用刷新整个网页.而 React-Router就是目前最好的React路由解决方案

React Router 是一个基于 React之上的强大路由库，它可以让你向应用中快速地添加视图和数据流，同时保持页面与 URL 间的同步。

- **React-Router有什么优点？**

1. **完美适配React：** React Router是专为React应用程序设计的，与React完美集成。它与React的生命周期和状态管理等特性无缝衔接。

2. **完美的实现单页应用程序的路由跳转：** React Router能够帮我们构建单页应用程序，其中所有的页面内容在初始加载时一次性加载，并通过客户端路由来控制显示不同的组件，而无需重新加载整个页面。让我们的用户拥有更流畅的体验，因为只有相应的组件会被更新，而不会刷新整个页面

3. **路由配置灵活：** React Router提供了灵活的路由配置选项，能够根据应用程序的需求定义和管理路由规则。使用Route组件定义不同的路径和相应的组件，还可以通过参数传递、嵌套路由和重定向等功能来处理更复杂的路由场景。

4. **支持嵌套路由：** React Router允许您在应用程序中创建层次结构的路由。它可以帮助我们构建复杂的页面布局和组件组。我们可以在一个父级路由中定义子级路由，并在相应的组件中嵌套使用。


## 2. 重要内置组件

学习使用React Router之前先了解React Router提供的实现导航和路由功能的四个主要组件。

### 2.1 BrowserRouter

它的主要作用是为React应用程序提供客户端路由功能。它使用 HTML5 的 history API 来处理URL的变化，并根据URL的路径匹配渲染相应的组件。它通常是应用的根组件，用于包裹整个应用。
代码示例：

```jsx
function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}
```

### 2.2 Routes && Route

Routes：提供一个路由出口，组件内部会存在多个内置的Route组件，满足条件的路由会被渲染到组件内部，类似于Vue中的router-viewer
Route：用于定义路由的规则。作用是声明指定URL路径和要渲染的组件之间的关联，它接受两个主要的属性：path 和 component。path 属性指定了 URL 的路径，component 属性指定了匹配该路径时要渲染的组件。

```jsx
function MenuBar() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />}></Route>
      <Route path='/product' element={<Product />}></Route>
      <Route path='/user-center' element={<UserCenter />}></Route>
      <Route path='*' element={<CatchAll />}></Route>
    </Routes>
  )
}
```

### 2.3 Link

这个组件用于创建导航链接。它会生成一个 `<a>` 标签，并处理点击事件以避免浏览器重新加载页面。你可以使用 to 属性来指定链接的目标路径。
代码示例：

```jsx
function Nav() {
  return (
    <ul>
      <li>
        <Link to=''>首页</Link>
      </li>
      <li>
        <Link to='/product'>产品</Link>
      </li>
      <li>
        <Link to='/user-center'>用户</Link>
      </li>
    </ul>
  )
}
```

### 2.4 完整示例

```jsx
import React from 'react'
import {
  Route,
  Routes,
  useLocation,
  Link,
  BrowserRouter
} from 'react-router-dom'

function Dashboard() {
  return <div>首页</div>
}

function Product() {
  return <div>产品页面</div>
}

function UserCenter() {
  return <div>用户中心</div>
}

function CatchAll() {
  return <div>Not Found</div>
}

function Nav() {
  return (
    <ul>
      <li>
        <Link to=''>首页</Link>
      </li>
      <li>
        <Link to='/product'>产品</Link>
      </li>
      <li>
        <Link to='/user-center'>用户</Link>
      </li>
    </ul>
  )
}

function MenuBar() {
  return (
    <>
      <h1>Welcome To React Shop!!!</h1>
      <Nav />
      <Routes>
        <Route path='/' element={<Dashboard />}></Route>
        <Route path='/product' element={<Product />}></Route>
        <Route path='/user-center' element={<UserCenter />}></Route>
        <Route path='*' element={<CatchAll />}></Route>
      </Routes>
    </>
  )
}

function Index() {
  return (
    <BrowserRouter>
      <MenuBar />
    </BrowserRouter>
  )
}

export default Index
```

## 3 编程式导航

路由导航有两种方式，一种是声明式导航，一种是编程式导航。

### 3.1 声明式导航

声明式导航是指通过在模板中通过 `<Link />` 组件描述出要跳转到哪里去,比如后台管理系统的左侧菜单通过使用这种方式进行，前面的完整示例中使用的就是声明式导航：

```jsx
<Link to="/home"></Link>
```

**语法说明:**

通过给组件的to属性指定要跳转到路由path, 组件会被渲染为浏览器支持的a链接,如果需要传参直接 通过字符串拼接的方式拼接参数即可。

### 3.2 编程式导航

编程式导航是通过 `useNavigate` 钩子得到导航方法, 然后通过调用方法以命令式的形式进行路由跳转，这种方式更加灵活，使用场景如:

- 想在登录请求完毕之后,跳转到首页面,就可以选择这种方式,更加灵活

```jsx
function UserCenter() {
  const currentStatus = '未登陆'
  const [newStatus, changeStatus] = useState(currentStatus)
  const navigate = useNavigate()

  const loginHandler = async () => {
    const { status, msg } = await imitateLogin()
    if (status === 200) {
      changeStatus('登陆成功，即将回到首页')
      setTimeout(() => {
        // ------ 在这里使用编程式导航 ---------
        navigate('/')
      }, 3000)
    }
  }

  return (
    <div>
      用户中心，当前状态：{newStatus}
      <div>
        <button className='custom-btn btn-primary' onClick={loginHandler}>
          登陆
        </button>
      </div>
    </div>
  )
}
```

## 4. 路由传参

在实际的业务需求开发中，路由传参是无法避免的场景和需求，这里展示三种不同的传参方式，可根据不同的需求选择不同的方式。

### 4.1 searchParams

**传参：** 这个方式传参的方式主要是在跳转的时候用问号进行拼接，拼接之后在url路径中可以看到参数；

**接参：** 接受参数是使用useSearchParams的钩子函数来进行取参;

示例如下：

```jsx
import {
  useLocation,
  useNavigate,
  useSearchParams
} from 'react-router-dom'

function Dashboard() {
  // 使用 useSearchParams 接受参数
  let [searchParams, setSearchParams] = useSearchParams()

  const routeParams = {
    username: searchParams.get('username'),
    address: searchParams.get('address')
  }

  return (
    <div>
      首页
      {routeParams.username && <div>当前用户：{routeParams.username}</div>}
    </div>
  )
}

function UserCenter() {
  const currentStatus = '未登陆'
  const [newStatus, changeStatus] = useState(currentStatus)
  const navigate = useNavigate()

  const loginHandler = async () => {
    const { status, data } = await imitateLogin()
    if (status === 200) {
      changeStatus('登陆成功，即将回到首页')
      setTimeout(() => {
        // 路由跳转并拼接传参
        navigate(`/?username=${data.username}&address=${data.address}`)
      }, 3000)
    }
  }

  return (
    <div>
      用户中心，当前状态：{newStatus}
      <div>
        <button className='custom-btn btn-primary' onClick={loginHandler}>
          登陆
        </button>
      </div>
    </div>
  )
}
```

### 4.2 params

使用params传参的方式，有比较多的要求，还需要路由配置路径支持接受参数，使用 `/:[key]` 的方式来定义路由的路径，只有定义了路由才支持使用params进行传参。

代码示例如下：

```jsx
import {
  useLocation,
  useNavigate,
  useSearchParams,
  useParams
} from 'react-router-dom'

function MenuBar() {
  return (
    <>
      <h1>Welcome To React Shop!!!</h1>
      <Nav />
      <Routes>
        <Route path='/' element={<Dashboard />}></Route>
        {* 这里的path需要支持一下传参 *}
        <Route path='/product/:id' element={<Product />}></Route>
        <Route path='/user-center' element={<UserCenter />}></Route>
        <Route path='*' element={<CatchAll />}></Route>
      </Routes>
    </>
  )
}

function ProductCard(props) {
  const { product } = props
  const navigate = useNavigate()

  // 在这里跳转的时候，进行一下传参
  const navigateHandler = payload => navigate(`/product/${product.id}`)

  return (
    <div className='product-card' onClick={navigateHandler}>
      <div className='product-img'>
        {product?.img_url && (
          <img src={product?.img_url} alt='' className='img-class' />
        )}
      </div>
      <div className='product-info'>
        <div className='product-name'>{product?.name || '-'}</div>
        <div className='product-sku'>{product?.sku || '-'}</div>
      </div>
    </div>
  )
}

function Product() {
  // 在这里使用 useParams 获取参数
  const params = useParams()
  console.log('useParams params', params)
  return (
    <div>
      产品页面
      <Link to='/product/detail'></Link>
    </div>
  )
}

function Dashboard() {
  let [searchParams, setSearchParams] = useSearchParams()

  const routeParams = {
    username: searchParams.get('username'),
    address: searchParams.get('address')
  }

  const productList = [
    {
      id: Math.random().toString(36).substr(2),
      name: '产品名称1',
      sku: 'product-sku-1'
    },
    {
      id: Math.random().toString(36).substr(2),
      name: '产品名称2',
      sku: 'product-sku-2'
    },
    {
      id: Math.random().toString(36).substr(2),
      name: '产品名称3',
      sku: 'product-sku-3'
    }
  ]

  return (
    <div className='component-dashboard'>
      首页
      {routeParams.username && <div>当前用户：{routeParams.username}</div>}
      <div className='box-list'>
        {productList.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
```

### 4.3 state

还有一种是使用 `state` 传参，该方式是在进行编程式导航跳转路由时，参数放到后置对象参数的 `state` 对象里面。
注意：此时路由上不能有 `params` 传参时的参数占位，否则无法跳转；
取参则用： `useLocation` 来进行取参

```jsx
function Dashboard() {
  const sortList = [
    { name: '第一类', id: Math.random().toString(36).substr(2) },
    { name: '第二类', id: Math.random().toString(36).substr(2) },
    { name: '第三类', id: Math.random().toString(36).substr(2) }
  ]

  const navigate = useNavigate()
  const navigatorHandler = sort => navigate(`/type/detail`, { state: { sort } })

  return (
    <div className='component-dashboard'>
      首页
      <div className=''>
        {sortList.map(sort => (
          <span
            key={sort.id}
            to=''
            style={{ marginRight: '8px' }}
            onClick={() => navigatorHandler(sort)}
          >
            {sort.name}
          </span>
        ))}
      </div>
    </div>
  )
}

function TypeDetail() {
  const { sort } = useLocation()?.state
  console.log('sort', sort)

  return <div>分类详情，来自：{sort.name}</div>
}
```

本篇幅暂且记录至路由传参，下一篇继续学习路由相关知识，如路由嵌套、集中式路由等。