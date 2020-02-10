import React from 'react'
import { Layout, Menu } from 'element-react'
import { Route, Link } from 'react-router-dom'
import User from '../user'
import './index.css'
class TopHeader extends React.Component {
  render() {
    return <div className="topheader">电商后台管理系统</div>
  }
}
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
              <Menu.Item index="1-1">
                <Link to="/home/user">用户列表</Link>
              </Menu.Item>
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
        <Route path="/home/user" component={User} />
      </div>
    )
  }
}
