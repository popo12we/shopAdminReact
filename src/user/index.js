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
      addForm: {
        username: '',
        password: '',
        mobile: '',
        email: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入用户名'))
                return
              }
              if (value.length < 3 || value.length.length > 12) {
                callback(new Error('用户名长度为3-12位'))
                return
              }
              callback()
            }
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入密码'))
                return
              }
              if (value.length < 6 || value.length.length > 12) {
                callback(new Error('密码长度为6-12位'))
                return
              }
              callback()
            }
          }
        ]
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      dialogVisible: nextProps.show
    })
  }
  handleSubmit(e) {
    // console.log(this)
    e.preventDefault()
    console.log(this.refs.addForm)
    this.refs.addForm.validate(async valid => {
      if (valid) {
        // let res = await Axios.post(
        //   'http://localhost:8888/api/private/v1/login',
        //   {
        //     username: this.state.form.username,
        //     password: this.state.form.password
        //   }
        // )
        // if (res.data.meta.status === 200) {
        //   this.props.history.push('/home')
        //   localStorage.setItem('token', res.data.data.token)
        // }
      } else {
        return false
      }
    })
  }
  onChange(key, value) {
    console.log(key, value)
    this.setState({
      addForm: Object.assign({}, this.state.addForm, { [key]: value })
    })
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
            <Form
              model={this.state.addForm}
              ref="addForm"
              rules={this.state.rules}
              labelWidth="80"
            >
              <Form.Item label="用户名" prop="username">
                <Input
                  value={this.state.addForm.username}
                  onChange={this.onChange.bind(this, 'username')}
                ></Input>
              </Form.Item>
              <Form.Item label="密码" prop="password">
                <Input
                  value={this.state.addForm.password}
                  onChange={this.onChange.bind(this, 'password')}
                ></Input>
              </Form.Item>
              <Form.Item label="邮箱" prop="email">
                <Input
                  value={this.state.addForm.email}
                  onChange={this.onChange.bind(this, 'email')}
                ></Input>
              </Form.Item>
              <Form.Item label="手机" prop="mobile">
                <Input
                  value={this.state.addForm.mobile}
                  onChange={this.onChange.bind(this, 'mobile')}
                ></Input>
              </Form.Item>
            </Form>
          </Dialog.Body>
          <Dialog.Footer className="dialog-footer">
            <Button onClick={() => this.setState({ dialogVisible: false })}>
              取 消
            </Button>
            <Button type="primary" onClick={this.handleSubmit.bind(this)}>
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
      <div className={styles.searchInput}>
        <Input placeholder="请输入内容" style={{ width: '240px' }} />
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
