import React from 'react'
import { Breadcrumb } from 'element-react'
import { Input, Button, Table, Pagination } from 'element-react'
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
          render: data => {
            return (
              <span>
                <Button type="success" size="small">
                  编辑
                </Button>
                <Button
                  type="danger"
                  size="small"
                  onClick={this.delUser.bind(this, data)}
                >
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
  // 拿到表格数据
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
    }
  }
  // 拿到子组件传递过来的 每页显示多少条
  getSizeChange = val => {
    this.setState(
      {
        pagesize: val
      },
      () => {
        this.getTableData()
      }
    )
  }
  // 拿到子组件传递过来的,显示当前页是哪一页
  changeCurrent = val => {
    this.setState(
      {
        pagenum: val
      },
      () => {
        this.getTableData()
      }
    )
  }
  // 删除一个用户
  async delUser(data) {
    console.log(data.id)
    let { meta } = await API.delete(`users/${data.id}`)
    if (meta.status === 200) {
      this.getTableData()
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
        />
        <TablePagination
          total={this.state.total}
          pagenum={this.state.pagenum}
          pagesize={this.state.pagesize}
          getSizeChange={this.getSizeChange}
          changeCurrent={this.changeCurrent}
        ></TablePagination>
      </div>
    )
  }
}
// 分页器
class TablePagination extends React.Component {
  render() {
    return (
      <div className="tablepagination">
        <Pagination
          layout="total, sizes, prev, pager, next, jumper"
          total={this.props.total}
          pageSizes={[2, 4, 6, 8]}
          onCurrentChange={this.changeCurrent}
          currentPage={this.props.pagenum}
          onSizeChange={this.changeSize}
          pageSize={this.props.pagesize}
        />
      </div>
    )
  }
  // 改变每页显示条数
  changeSize = val => {
    this.props.getSizeChange(val)
  }
  // 改变当前页
  changeCurrent = val => {
    this.props.changeCurrent(val)
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
