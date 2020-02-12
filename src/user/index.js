import React from 'react'
import { Breadcrumb } from 'element-react'
import { Input, Button, Table, Pagination, Dialog, Form } from 'element-react'
import { API } from '../utils'
import styles from './index.module.scss'
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
// 添加用户的对话框组件
class AddDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dialogVisible: this.props.show,
      form: {
        username: '',
        password: '',
        mobile: '',
        email: ''
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      dialogVisible: nextProps.show
    })
  }
  addUserTure() {
    // alert(12)
  }
  render() {
    return (
      <div className="addDialog">
        <Dialog
          title="添加用户"
          visible={this.state.dialogVisible}
          onCancel={() => this.setState({ dialogVisible: false })}
        >
          <Dialog.Body>
            <Form model={this.state.form}>
              <Form.Item label="用户名">
                <Input value={this.state.form.username}></Input>
              </Form.Item>
              <Form.Item label="密码">
                <Input value={this.state.form.password}></Input>
              </Form.Item>
              <Form.Item label="邮箱">
                <Input value={this.state.form.email}></Input>
              </Form.Item>
              <Form.Item label="手机">
                <Input value={this.state.form.mobile}></Input>
              </Form.Item>
            </Form>
          </Dialog.Body>

          <Dialog.Footer className="dialog-footer">
            <Button onClick={() => this.setState({ dialogVisible: false })}>
              取 消
            </Button>
            <Button type="primary" onClick={this.addUserTure}>
              确 定
            </Button>
          </Dialog.Footer>
        </Dialog>
      </div>
    )
  }
}
// 搜索框
class SearchInput extends React.Component {
  state = {
    // 传递给子组件的数据 通知子组件是展示还是隐藏
    show: false
  }
  addUser = () => {
    this.setState({
      show: true
    })
  }
  render() {
    return (
      <div className="searchInput">
        <Input placeholder="请输入内容" />
        <Button icon="search"></Button>
        <Button type="success" onClick={this.addUser}>
          添加用户
        </Button>
        <AddDialog show={this.state.show}></AddDialog>
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
      <div className={styles.tablepagination}>
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
// user组件
export default class User extends React.Component {
  render() {
    return (
      <div className={styles.user}>
        <BoardList></BoardList>
        <SearchInput></SearchInput>
        <ElTable></ElTable>
      </div>
    )
  }
}
