import React from 'react'
import { Form, Input, Button } from 'element-react'
import './index.css'
export default class Login extends React.Component {
  state = {
    form: {
      username: '',
      password: ''
    }
  }
  render() {
    return (
      <div className="login">
        {/* 表单 */}
        <div className="form">
          <Form model={this.state.form} labelWidth="80">
            <Form.Item label="用户名">
              <Input value={this.state.form.username}></Input>
            </Form.Item>
            <Form.Item label="密码">
              <Input value={this.state.form.password}></Input>
            </Form.Item>
            <Form.Item>
              <Button type="primary" nativeType="submit">
                登录
              </Button>
              <Button className="reset">重置</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
