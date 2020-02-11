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
      columns: [
        {
          type: 'index'
        },
        {
          label: '日期',
          prop: 'date',
          width: 150,
          render: function(data) {
            return (
              <span>
                <Icon name="time" />
                <span style={{ marginLeft: '10px' }}>{data.date}</span>
              </span>
            )
          }
        },
        {
          label: '姓名',
          prop: 'name',
          width: 160,
          render: function(data) {
            return <Tag>{data.name}</Tag>
          }
        },
        {
          label: '操作',
          prop: 'address',
          render: function() {
            return (
              <span>
                <Button plain={true} type="info" size="small">
                  编辑
                </Button>
                <Button type="danger" size="small">
                  删除
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
        data: data.users
      })
      console.log(this.state.data)
    }
  }
  render() {
    return (
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
          total={400}
          pageSizes={[100, 200, 300, 400]}
          pageSize={100}
          currentPage={5}
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
        <TablePagination></TablePagination>
      </div>
    )
  }
}
