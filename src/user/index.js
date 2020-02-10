import React from 'react'
import { Breadcrumb } from 'element-react'
import './index.css'
// 面包屑
class BoardList extends React.Component {
  render() {
    return (
      <Breadcrumb separator="/">
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>用户管理</Breadcrumb.Item>
      </Breadcrumb>
    )
  }
}
export default class User extends React.Component {
  render() {
    return (
      <div className="user">
        <BoardList></BoardList>
      </div>
    )
  }
}
