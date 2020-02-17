import React from 'react'
import { Layout, Menu } from 'element-react'
import { Route, NavLink } from 'react-router-dom'
import User from '../user'
import Roles from '../roles'
import Categories from '../categories'
import Goods from '../goods'
import styles from './index.module.scss'
import './index.css'
// 顶部
class TopHeader extends React.Component {
  render() {
    return <div className={styles.topheader}>电商后台管理系统</div>
  }
}
// 左侧
class LeftNav extends React.Component {
  render() {
    return (
      <Layout.Row className={styles.leftnav}>
        <Layout.Col className={styles.leftnavcol}>
          <Menu
            defaultActive="2"
            className="el-menu-vertical-demo"
            onOpen={this.onOpen.bind(this)}
            onClose={this.onClose.bind(this)}
            theme="dark"
          >
            <Menu.SubMenu
              index="1"
              title={
                <span>
                  <i className="el-icon-message"></i>用户管理
                </span>
              }
            >
              <NavLink to="/home/user">
                <Menu.Item index="1-1">用户列表</Menu.Item>
              </NavLink>
            </Menu.SubMenu>
          </Menu>
          <Menu
            defaultActive="2"
            className="el-menu-vertical-demo"
            onOpen={this.onOpen.bind(this)}
            onClose={this.onClose.bind(this)}
            theme="dark"
          >
            <Menu.SubMenu
              index="1"
              title={
                <span>
                  <i className="el-icon-message"></i>权限管理
                </span>
              }
            >
              <NavLink to="/home/roles">
                <Menu.Item index="2-1">角色列表</Menu.Item>
              </NavLink>
              <Menu.Item index="2-2">权限列表</Menu.Item>
            </Menu.SubMenu>
          </Menu>
          <Menu
            index="2"
            className="el-menu-vertical-demo"
            onOpen={this.onOpen.bind(this)}
            onClose={this.onClose.bind(this)}
            theme="dark"
          >
            <Menu.SubMenu
              index="3"
              title={
                <span>
                  <i className="el-icon-message"></i>商品管理
                </span>
              }
            >
              <NavLink to="/home/goods">
                <Menu.Item index="3-1">商品列表</Menu.Item>
              </NavLink>
              <Menu.Item index="3-2">分类参数</Menu.Item>
              <NavLink to="/home/categories">
                <Menu.Item index="3-3">商品分类</Menu.Item>
              </NavLink>
            </Menu.SubMenu>
          </Menu>
          <Menu
            className="el-menu-vertical-demo"
            onOpen={this.onOpen.bind(this)}
            onClose={this.onClose.bind(this)}
            theme="dark"
          >
            <Menu.SubMenu
              index="4"
              title={
                <span>
                  <i className="el-icon-message"></i>数据统计
                </span>
              }
            >
              <Menu.Item index="4-1">数据列表</Menu.Item>
            </Menu.SubMenu>
          </Menu>
          <Menu
            defaultActive="2"
            className="el-menu-vertical-demo"
            onOpen={this.onOpen.bind(this)}
            onClose={this.onClose.bind(this)}
            theme="dark"
          >
            <Menu.SubMenu
              index="5"
              title={
                <span>
                  <i className="el-icon-message"></i>用户管理
                </span>
              }
            >
              <Menu.Item index="5-1">用户列表</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Layout.Col>
      </Layout.Row>
    )
  }

  onOpen() {}

  onClose() {}
}
export default class Home extends React.Component {
  render() {
    return (
      <div className={styles.home}>
        <TopHeader></TopHeader>
        <LeftNav></LeftNav>
        <Route path="/home/user" component={User} class="content" />
        <Route path="/home/roles" component={Roles} class="content" />
        <Route path="/home/goods" component={Goods} class="content" />
        <Route path="/home/categories" component={Categories} class="content" />
      </div>
    )
  }
}
