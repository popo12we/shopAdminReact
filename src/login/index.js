import React from 'react'
import { Form, Input, Button } from 'element-react'
import './index.css'
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
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      }
    }
  }
  handleSubmit(e) {
    e.preventDefault()

    this.refs.form.validate(valid => {
      if (valid) {
        alert('submit!')
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }

  handleReset(e) {
    e.preventDefault()

    this.refs.form.resetFields()
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
            value={this.state.form.password}
            onChange={this.onChange.bind(this, 'password')}
          ></Input>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={this.handleSubmit.bind(this)}>
            登录
          </Button>
          <Button onClick={this.handleReset.bind(this)} className="reset">
            重置
          </Button>
        </Form.Item>
      </Form>
    )
  }
}
export default class Login extends React.Component {
  render() {
    return (
      <div className="login">
        {/* 表单 */}
        <div className="form">
          <Elform></Elform>
        </div>
      </div>
    )
  }
}
