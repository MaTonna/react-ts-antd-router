# 说明

## 主要架构

- 登录页：dist/login.html、主页面：dist/index.html、404 页面：dist/404.html。

- 以 react 框架为主，使用 TypeScript 进行开发，并用 babel 编译为 JavaScript，ant design 作为 UI 组件库按需加载到页面，less 预编译样式、index.tsx 为主入口，用 react-router 做路由异步加载每个模块。

- vendor 打包了 react、react-dom、prop-types、moment，antd 按需 import 组件到页面

- 顶部导航和侧边导航在 src/pages/menuConfig.tsx 中配置，children 最多可配置两层，若有两层则会由 SubMenu 包裹。

- dev/build 构建后会生成 dist/js/index.js 为入口，按需引入的模块为 x.js，点击侧边栏会异步加载对应的 js 和 css；登录页入口为 dist/js/login.js，在 webpack.dev.config.js 的 entry 中配置了多入口。

## 启动和构建

```cmd
  npm i (安装依赖)
  npm run dev (开发环境实时编译文件)
  npm run start (本地启动server在9000端口，并实时编译文件)
  npm run build (上线前构建)

  npm run dll-dev (打包开发环境的vendor)
  npm run dll (打包压缩生产环境的vendor)
```

## 路由的使用：

在 menuConfig.tsx 中配置了菜单，在 index.tsx 中会循环遍历出应该增加的 Router

- 添加路由：

1. 调用方：history.push({ pathname: '/nav1-3-1', search: '?the=query', state: { some: 'state' } })
2. 组件方：this.props.location 获取 search、state
