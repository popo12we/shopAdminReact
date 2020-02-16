import React from 'react'
import { Form, Input, Button } from 'element-react'
import Axios from 'axios'
import styles from './index.module.scss'
class Elform extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        username: '',
        password: ''
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
  handleSubmit(e) {
    e.preventDefault()
    this.refs.form.validate(async valid => {
      if (valid) {
        let res = await Axios.post(
          'http://localhost:8888/api/private/v1/login',
          {
            username: this.state.form.username,
            password: this.state.form.password
          }
        )
        if (res.data.meta.status === 200) {
          localStorage.setItem('token', res.data.data.token)
          console.log(this.props)
          this.props.history.push('/home')
        }
      } else {
        return false
      }
    })
  }
  onChange(key, value) {
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    })
  }

  render() {
    return (
      <Form
        ref="form"
        model={this.state.form}
        rules={this.state.rules}
        labelWidth="80"
        className="demo-ruleForm"
      >
        <Form.Item label="用户名" prop="username">
          <Input
            value={this.state.form.username}
            onChange={this.onChange.bind(this, 'username')}
          ></Input>
        </Form.Item>
        <Form.Item label="密码" prop="password">
          <Input
            type="password"
            value={this.state.form.password}
            onChange={this.onChange.bind(this, 'password')}
          ></Input>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={this.handleSubmit.bind(this)}>
            登录
          </Button>
          <Button className="reset">重置</Button>
        </Form.Item>
      </Form>
    )
  }
}
export default class Login extends React.Component {
  render() {
    return (
      <div className={styles.login}>
        {/* 表单 */}
        <div className={styles.form}>
          <Elform history={this.props.history}></Elform>
        </div>
      </div>
    )
  }
}
