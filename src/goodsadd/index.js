import React from 'react'
import styles from './index.module.scss'
import './index.css'
import {
  Steps,
  Tabs,
  Form,
  Cascader,
  Button,
  Input,
  Radio
} from 'element-react'
import { API } from '../utils'
// 进度条
class AddStep extends React.Component {
  state = {
    active: 1
  }
  getActiveName = num => {
    this.setState({
      active: num
    })
  }
  render() {
    return (
      <div className="step">
        <Steps active={this.state.active}>
          <Steps.Step title="步骤 1" description="基本信息"></Steps.Step>
          <Steps.Step title="步骤 2" description="商品图片"></Steps.Step>
          <Steps.Step title="步骤 3" description="商品内容"></Steps.Step>
        </Steps>
        <TabCard getActiveName={this.getActiveName}></TabCard>
      </div>
    )
  }
}
class TabCard extends React.Component {
  state = {
    activeName: '0',
    form: {
      name: '',
      price: '',
      number: '',
      weight: '',
      is_promote: 1
    },
    //级联数据
    options: [],
    //级联选中数据
    selectedOptions2: []
  }
  render() {
    return (
      <div className={styles.tabs}>
        <Tabs
          type="card"
          activeName={this.state.activeName}
          value={this.state.activeName}
          onTabClick={this.handleTab}
        >
          <Tabs.Pane label="基本信息" name="0">
            <Form
              model={this.state.form}
              labelWidth="80"
              onSubmit={this.onSubmit.bind(this)}
            >
              <Form.Item label="商品名称">
                <Input
                  value={this.state.form.name}
                  onChange={this.onChange.bind(this, 'name')}
                ></Input>
              </Form.Item>
              <Form.Item label="商品价格">
                <Input
                  value={this.state.form.price}
                  onChange={this.onChange.bind(this, 'price')}
                ></Input>
              </Form.Item>
              <Form.Item label="商品重量">
                <Input
                  value={this.state.form.weight}
                  onChange={this.onChange.bind(this, 'weight')}
                ></Input>
              </Form.Item>
              <Form.Item label="商品数量">
                <Input
                  value={this.state.form.number}
                  onChange={this.onChange.bind(this, 'number')}
                ></Input>
              </Form.Item>
              <Form.Item label="商品分类">
                <Cascader
                  options={this.state.options}
                  expandTrigger="hover"
                  value={this.state.selectedOptions2}
                  onChange={this.handleChange.bind(this, 'selectedOptions2')}
                />
              </Form.Item>
              <Form.Item label="是否促销">
                <div>
                  <Radio
                    value="1"
                    checked={this.state.is_promote === 1}
                    onChange={this.onChange.bind(this)}
                  >
                    是
                  </Radio>
                  <Radio
                    value="2"
                    checked={this.state.is_promote === 2}
                    onChange={this.onChange.bind(this)}
                  >
                    否
                  </Radio>
                </div>
              </Form.Item>
              <Form.Item>
                <Button type="primary" nativeType="submit">
                  下一步
                </Button>
              </Form.Item>
            </Form>
          </Tabs.Pane>
          <Tabs.Pane label="商品图片" name="1">
            配置管理
          </Tabs.Pane>
          <Tabs.Pane label="商品内容" name="2">
            角色管理
          </Tabs.Pane>
        </Tabs>
      </div>
    )
  }
  componentDidMount() {
    this.getCategoriesData()
  }
  // 拿到级联数据
  async getCategoriesData() {
    let { data, meta } = await API.get('categories', {
      params: {
        type: 3
      }
    })
    if (meta.status === 200) {
      data.forEach(item1 => {
        item1.label = item1.cat_name
        item1.value = item1.cat_id.toString()
        if (item1.children) {
          item1.children.forEach(item2 => {
            item2.label = item2.cat_name
            item2.value = item2.cat_id.toString()
            if (item2.children) {
              item2.children.forEach(item3 => {
                item3.label = item3.cat_name
                item3.value = item3.cat_id.toString()
              })
            }
          })
        }
      })
      console.log(data)
      this.setState({
        options: data
      })
    }
  }
  //点击tab 触发
  handleTab = e => {
    this.props.getActiveName(e.key[1] * 1 + 1)
  }
  onSubmit(e) {
    e.preventDefault()
  }
  //表单input
  onChange(key, value) {
    this.state.form[key] = value
    this.forceUpdate()
    this.setState({
      is_promote: key
    })
  }
  //级联
  handleChange(key, value) {
    this.setState({ [key]: value })
    console.log(value)
  }
}
export default class GoodsAdd extends React.Component {
  render() {
    return (
      <div className={styles.goodsadd}>
        <AddStep></AddStep>
      </div>
    )
  }
}
