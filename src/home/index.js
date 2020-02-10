import React from 'react'
import { Layout, Menu } from 'element-react'
import { Route, Link } from 'react-router-dom'
import User from '../user'
import './index.css'
// 顶部
class TopHeader extends React.Component {
  render() {
    return <div className="topheader">电商后台管理系统</div>
  }
}
// 左侧
class LeftNav extends React.Component {
  render() {
    return (
      <Layout.Row className="leftnav">
        <Layout.Col className="leftnavcol">
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
              <Link to="/home/user">
                <Menu.Item index="1-1">用户列表</Menu.Item>
              </Link>
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
              <Menu.Item index="2-1">角色列表</Menu.Item>
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
              <Menu.Item index="3-1">商品列表</Menu.Item>
              <Menu.Item index="3-2">分类参数</Menu.Item>
              <Menu.Item index="3-3">用户列表</Menu.Item>
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
              index="1"
              title={
                <span>
                  <i className="el-icon-message"></i>用户管理
                </span>
              }
            >
              <Menu.Item index="1-1">用户列表</Menu.Item>
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
      <div className="home">
        <TopHeader></TopHeader>
        <LeftNav></LeftNav>
        <Route path="/home/user" component={User} class="content" />
      </div>
    )
  }
}
