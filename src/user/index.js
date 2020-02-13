import React from 'react'
import { Breadcrumb } from 'element-react'
import {
  Input,
  Button,
  Table,
  Pagination,
  Dialog,
  Form,
  Select
} from 'element-react'
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
// 分配用户的对话框组件
class AssignDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      assigndialogVisible: this.props.show,
      assignForm: {},
      // 下拉框假数据
      roles: [],
      value: ''
    }
  }
  componentDidMount() {
    this.getSelectData()
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      assigndialogVisible: nextProps.show
    })
  }
  getSelectData = async () => {
    let { data, meta } = await API.get('roles')
    if (meta.status === 200) {
      this.setState({
        roles: data
      })
    }
  }
  handleSubmit(e) {
    e.preventDefault()
  }
  render() {
    return (
      <div className="assignDialog">
        <Dialog
          title="分配角色"
          visible={this.state.assigndialogVisible}
          onCancel={() => this.setState({ assigndialogVisible: false })}
        >
          <Dialog.Body>
            <Form model={this.state.assignForm} labelWidth="80">
              <Form.Item label="用户名">
                <Input
                  value={this.props.username}
                  disabled
                  style={{ width: '60px' }}
                ></Input>
              </Form.Item>
              <Form.Item label="角色列表">
                <Select value={this.state.value} placeholder="请选择">
                  {this.state.roles.map(el => {
                    return (
                      <Select.Option
                        key={el.id}
                        label={el.roleName}
                        value={el.id}
                      />
                    )
                  })}
                </Select>
              </Form.Item>
            </Form>
          </Dialog.Body>
          <Dialog.Footer className="dialog-footer">
            <Button
              onClick={() => this.setState({ assigndialogVisible: false })}
            >
              取 消
            </Button>
            <Button type="primary" onClick={this.handleSubmit.bind(this)}>
              分 配
            </Button>
          </Dialog.Footer>
        </Dialog>
      </div>
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
    e.preventDefault()
    this.refs.addForm.validate(async valid => {
      if (valid) {
        let { meta } = await API.post('users', {
          username: this.state.addForm.username,
          password: this.state.addForm.password,
          email: this.state.addForm.email,
          mobile: this.state.addForm.mobile
        })
        if (meta.status === 201) {
          this.setState({
            dialogVisible: false
          })
          this.props.changeShowFalse(false)
          this.props.table.getTableData()
        }
      } else {
        return false
      }
    })
  }
  onChange(key, value) {
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
  // 模态框点击确定得到子组件传递过来的数据关掉模态框
  changeShowFalse = flag => {
    this.setState({
      show: false
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
        <AddDialog
          show={this.state.show}
          table={this.props.table}
          changeShowFalse={this.changeShowFalse}
        ></AddDialog>
      </div>
    )
  }
}
// 表格
class ElTable extends React.Component {
  componentDidMount() {
    this.getTableData()
    this.props.onRef(this)
  }
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      pagesize: 2,
      pagenum: 1,
      total: 0,
      username: '',
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
                <Button
                  size="small"
                  onClick={this.showAssignDialog.bind(this, data)}
                >
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
  // 点击打开分配角色对话框
  showAssignDialog(data) {
    console.log(data)
    this.setState({
      show: true,
      username: data.username
    })
  }
  // 取消分配模态框的显示
  closeShow = () => {
    this.setState({
      show: false
    })
  }
  render() {
    return (
      <div className="elTable">
        <Table
          style={{ width: '100%' }}
          columns={this.state.columns}
          data={this.state.data}
          border={true}
          highlightCurrentRow={true}
        />
        <AssignDialog
          show={this.state.show}
          username={this.state.username}
        ></AssignDialog>
        <TablePagination
          total={this.state.total}
          pagenum={this.state.pagenum}
          pagesize={this.state.pagesize}
          getSizeChange={this.getSizeChange}
          changeCurrent={this.changeCurrent}
          closeShow={this.closeShow}
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
    this.props.closeShow()
  }
  // 改变当前页
  changeCurrent = val => {
    this.props.changeCurrent(val)
    this.props.closeShow()
  }
}
// user组件
export default class User extends React.Component {
  state = {
    table: ''
  }
  onRef = data => {
    this.setState({
      table: data
    })
  }
  render() {
    return (
      <div className={styles.user}>
        <BoardList></BoardList>
        <SearchInput table={this.state.table}></SearchInput>
        <ElTable onRef={this.onRef}></ElTable>
      </div>
    )
  }
}
