import React, { ReactNode, Component } from 'react';
import { Icon } from 'antd';

// 异步按需加载component
const asyncComponent = (getComponent: any) => {
  return class AsyncComponent extends Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(({ default: Component }) => {
          AsyncComponent.Component = Component
          this.setState({ Component })
        })
      }
    }
    render() {
      const { Component } = this.state
      if (Component) {
        return <Component {...this.props} />
      }
      return null
    }
  }
}

interface MenuConfig {
  title: string
  code: string
  path: string
  icon?: ReactNode
  children?: any
}
const menuConfig: MenuConfig[] = [
  {
    title: '导航1',
    code: 'nav1',
    path: '/nav1',
    children: [{
      title: '导航1-1',
      code: 'nav1-1',
      path: '/nav1-1',
      icon: <Icon type="user" />,
      children: [{
        title: '导航1-1-1',
        code: 'nav1-1-1',
        path: '/nav1-1-1',
      }]
    }, {
      title: '导航1-2',
      code: 'nav1-2',
      path: '/nav1-2',
    }, {
      title: '导航1-3',
      code: 'nav1-3',
      path: '/nav1-3',
      children: [{
        title: '导航1-3-1',
        code: 'nav1-3-1',
        path: '/nav1-3-1',
        componentPath: asyncComponent(() => import('./demoPage')),
      }]
    }]
  },
  {
    title: '导航2',
    code: 'nav2',
    path: '/nav2',
    children: [{
      title: '导航2-1',
      code: 'nav2-1',
      path: '/nav2-1',
    }, {
      title: '导航2-2',
      code: 'nav2-2',
      path: '/nav2-2'
    }, {
      title: '导航2-3',
      code: 'nav2-3',
      path: '/nav2-3'
    }]
  }
]
export default menuConfig;
