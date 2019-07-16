主入口：index.tsx

路由的使用：

- 添加路由：

1. 调用方：history.push({ pathname: '/nav1-3-1', search: '?the=query', state: { some: 'state' } })
2. 组件方：this.props.location 获取 search、state
