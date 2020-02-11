import React from 'react'
import { Breadcrumb } from 'element-react'
import { Input, Button, Table, Icon, Tag, Pagination } from 'element-react'
import { API } from '../utils'
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
// 搜索框
class SearchInput extends React.Component {
  render() {
    return (
      <div className="searchInput">
        <Input placeholder="请输入内容" />
        <Button icon="search"></Button>
      </div>
    )
  }
}
// 表格
class ElTable extends React.Component {
  componentDidMount() {
    this.getTableData()
  }
  constructor(props) {
    super(props)
    this.state = {
      pagesize: 2,
      pagenum: 1,
      total: 0,
      columns: [
        {
          label: '姓名',
          render: function(data) {
            return (
              <span>
                <span style={{ marginLeft: '10px' }}>{data.username}</span>
              </span>
            )
          }
        },
        {
          label: '邮箱',
          render: function(data) {
            return <span>{data.email}</span>
          }
        },
        {
          label: '电话',
          render: function(data) {
            return <span>{data.mobile}</span>
          }
        },
        {
          label: '操作',
          render: function() {
            return (
              <span>
                <Button type="success" size="small">
                  编辑
                </Button>
                <Button type="danger" size="small">
                  删除
                </Button>
                <Button type="info" plain={true} size="small">
                  分配
                </Button>
              </span>
            )
          }
        }
      ],
      data: []
    }
  }
  getTableData = async () => {
    let { data, meta } = await API.get('/users', {
      params: {
        pagesize: this.state.pagesize,
        pagenum: this.state.pagenum
      }
    })
    if (meta.status === 200) {
      this.setState({
        data: data.users,
        total: data.total
      })
      console.log(data, meta)
    }
  }
  render() {
    return (
      <div>
        <Table
          style={{ width: '100%' }}
          columns={this.state.columns}
          data={this.state.data}
          border={true}
          highlightCurrentRow={true}
          onCurrentChange={item => {
            console.log(item)
          }}
        />
        <TablePagination
          total={this.state.total}
          pagenum={this.state.pagenum}
        ></TablePagination>
      </div>
    )
  }
}
// 分页器
class TablePagination extends React.Component {
  render() {
    return (
      <div className="block">
        <Pagination
          layout="total, sizes, prev, pager, next, jumper"
          total={this.props.total}
          pageSizes={[2, 3, 4, 8]}
          currentPage={this.props.pagenum}
        />
      </div>
    )
  }
}
export default class User extends React.Component {
  render() {
    return (
      <div className="user">
        <BoardList></BoardList>
        <SearchInput></SearchInput>
        <ElTable></ElTable>
      </div>
    )
  }
}
