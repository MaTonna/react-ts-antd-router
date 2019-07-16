import React, { Component, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, Switch } from 'react-router-dom';
import { createHashHistory } from 'history';
import { LocaleProvider, Layout, Menu, Icon } from 'antd';
import menuConfig from './menuConfig';
import '@styles/common.less';

const history = createHashHistory();
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const initialState = {
  currentLoc: "", // 当前路由名
  topMenu: "",  // 顶部导航
  sideMenuList: [], // 侧边导航列表
  collapseMenu: [], // 打开submenu的列表
  collapseIconType: 'menu-fold'
};

type State = Readonly<typeof initialState>;

class Index extends Component<State>{
  readonly state: State = initialState;

  menuItemObj = {};

  componentWillMount() {
    this.initMenu();
  }

  initMenu(): void {
    const currentLoc = history.location.pathname;
    // 找到topmenu，渲染侧边导航，根目录渲染首页
    let topMenu = '';
    let collapseMenu = [];
    const findIsChild = (children: any) => {
      let isChild = false;
      for (let m = 0; m < children.length; m++) {
        const lmenu = children[m];
        if (currentLoc === lmenu.path) {
          isChild = true;
          break;
        }
      }
      return isChild;
    }
    if (currentLoc === '/') {
      topMenu = menuConfig[0].path;
    } else {
      for (let i = 0; i < menuConfig.length; i++) {
        const menus = menuConfig[i];
        if (currentLoc === menus.path) {
          topMenu = menus.path;
          break;
        } else {
          const isChild = findIsChild(menus.children);
          if (isChild) {
            topMenu = menus.path;
          } else if (menus.children) {
            for (let j = 0; j < menus.children.length; j++) {
              const menu = menus.children[j];
              if (menu.children && findIsChild(menu.children)) {
                topMenu = menus.path;
                collapseMenu.push(menu.path);
                break;
              }
            }
          }
        }
      }
    }
    if (topMenu === '') {
      window.location.href = "/404.html";
      return;
    }
    this.setState({
      topMenu,
      currentLoc,
      collapseMenu
    }, () => {
      this.getSideMenuList();
    })
  }

  changeTopMenu(item: { key: string }): void {
    this.setState({
      topMenu: item.key
    }, () => {
      this.getSideMenuList();
    })
  }

  openMenu(openKeys: { key: string }): void {
    const { collapseMenu } = this.state;
    const id = openKeys.key;
    const index = collapseMenu.indexOf(id);
    // 如果能在打开的ids里找到，就删除这个id，否则就添加进去
    if (index > -1) {
      collapseMenu.splice(index, 1);
    } else {
      collapseMenu.push(id);
    }
    this.setState({
      collapseMenu
    });
  }

  changeSideMenu(item: { key: string }): void {
    this.setState({
      currentLoc: item.key
    })
  }

  getMenuItemDom(menu: any, addItem?: boolean): ReactNode {
    if (addItem && menu.componentPath) {
      this.menuItemObj = { ...this.menuItemObj, ...{ [menu.path]: menu.componentPath } };
    }

    return <Menu.Item key={menu.path}>
      <Link to={menu.path}>{menu.title}</Link>
    </Menu.Item>;
  }

  getTopMenuList(): ReactNode[] {
    return menuConfig.map(menu => {
      return this.getMenuItemDom(menu)
    })
  }

  getSideMenuList(): void {
    const currentTopList = menuConfig.filter((menu: { path: string }) => {
      return menu.path === this.state.topMenu
    })
    const list = currentTopList[0];

    let sideMenuList = list.children.map((menu: any) => {
      if (menu.children) {
        return <SubMenu
          key={menu.path}
          title={
            <span>
              {menu.icon}
              <span>{menu.title}</span>
            </span>
          }
          onTitleClick={({ key }) => this.openMenu({ key })}
        >{
            menu.children.map((item: any) => {
              return this.getMenuItemDom(item, true)
            })
          }</SubMenu>
      } else {
        return this.getMenuItemDom(menu, true)
      }
    })
    this.setState({
      sideMenuList
    })
  }

  changeCollapseType(): void {
    let { collapseIconType } = this.state;
    const isFold = collapseIconType === 'menu-fold';
    collapseIconType = isFold ? 'menu-unfold' : 'menu-fold';
    this.setState({
      collapseIconType,
      collapseMenu: isFold ? [] : this.state.collapseMenu
    })
  }

  render(): ReactNode {
    const { sideMenuList, topMenu, currentLoc, collapseMenu, collapseIconType } = this.state;
    const { menuItemObj } = this;
    const isUnfold = collapseIconType !== 'menu-fold';
    const routers =
      Object.keys(menuItemObj).map(key => {
        return <Route exact path={key} key={key} component={menuItemObj[key]} />
      })

    return (
      <Router history={history}>
        <LocaleProvider>
          <Layout className="layout-wrap">
            <Header className="header">
              <div className="logo-wrap" style={{ width: isUnfold ? '80px' : '240px' }}>
                <i className="logo"></i>
                {
                  !isUnfold && '工作平台'
                }
                <Icon
                  className="fold-icon"
                  type={collapseIconType}
                  onClick={() => this.changeCollapseType()}
                />
              </div>
              <Menu
                className="menu"
                theme="light"
                mode="horizontal"
                selectedKeys={[topMenu]}
                onClick={(item) => this.changeTopMenu(item)}
              >
                {this.getTopMenuList()}
              </Menu>
            </Header>
            <Layout>
              <Sider
                width={240}
                collapsible
                collapsed={isUnfold}
                onCollapse={() => this.changeCollapseType()}
              >
                <Menu
                  mode="inline"
                  theme="dark"
                  selectedKeys={[currentLoc]}
                  openKeys={collapseMenu}
                  onClick={(item) => this.changeSideMenu(item)}
                >
                  {sideMenuList}
                </Menu>
              </Sider>
              <Layout>
                <Content>
                  <Switch>
                    {routers}
                  </Switch>
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </LocaleProvider>
      </Router >
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
