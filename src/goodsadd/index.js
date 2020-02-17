import React from 'react'
import styles from './index.module.scss'
import './index.css'
import { Steps, Tabs, Form, Cascader, Button, Input } from 'element-react'
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
      weight: ''
    },
    //级联数据
    options: [
      {
        value: 'zhinan',
        label: '指南',
        children: [
          {
            value: 'shejiyuanze',
            label: '设计原则',
            children: [
              {
                value: 'yizhi',
                label: '一致'
              },
              {
                value: 'fankui',
                label: '反馈'
              },
              {
                value: 'xiaolv',
                label: '效率'
              },
              {
                value: 'kekong',
                label: '可控'
              }
            ]
          },
          {
            value: 'daohang',
            label: '导航',
            children: [
              {
                value: 'cexiangdaohang',
                label: '侧向导航'
              },
              {
                value: 'dingbudaohang',
                label: '顶部导航'
              }
            ]
          }
        ]
      },
      {
        value: 'zujian',
        label: '组件',
        children: [
          {
            value: 'basic',
            label: 'Basic',
            children: [
              {
                value: 'layout',
                label: 'Layout 布局'
              },
              {
                value: 'color',
                label: 'Color 色彩'
              },
              {
                value: 'typography',
                label: 'Typography 字体'
              },
              {
                value: 'icon',
                label: 'Icon 图标'
              },
              {
                value: 'button',
                label: 'Button 按钮'
              }
            ]
          },
          {
            value: 'form',
            label: 'Form',
            children: [
              {
                value: 'radio',
                label: 'Radio 单选框'
              },
              {
                value: 'checkbox',
                label: 'Checkbox 多选框'
              },
              {
                value: 'input',
                label: 'Input 输入框'
              },
              {
                value: 'input-number',
                label: 'InputNumber 计数器'
              },
              {
                value: 'select',
                label: 'Select 选择器'
              },
              {
                value: 'cascader',
                label: 'Cascader 级联选择器'
              },
              {
                value: 'switch',
                label: 'Switch 开关'
              },
              {
                value: 'slider',
                label: 'Slider 滑块'
              },
              {
                value: 'time-picker',
                label: 'TimePicker 时间选择器'
              },
              {
                value: 'date-picker',
                label: 'DatePicker 日期选择器'
              },
              {
                value: 'datetime-picker',
                label: 'DateTimePicker 日期时间选择器'
              },
              {
                value: 'upload',
                label: 'Upload 上传'
              },
              {
                value: 'rate',
                label: 'Rate 评分'
              },
              {
                value: 'form',
                label: 'Form 表单'
              }
            ]
          },
          {
            value: 'data',
            label: 'Data',
            children: [
              {
                value: 'table',
                label: 'Table 表格'
              },
              {
                value: 'tag',
                label: 'Tag 标签'
              },
              {
                value: 'progress',
                label: 'Progress 进度条'
              },
              {
                value: 'tree',
                label: 'Tree 树形控件'
              },
              {
                value: 'pagination',
                label: 'Pagination 分页'
              },
              {
                value: 'badge',
                label: 'Badge 标记'
              }
            ]
          },
          {
            value: 'notice',
            label: 'Notice',
            children: [
              {
                value: 'alert',
                label: 'Alert 警告'
              },
              {
                value: 'loading',
                label: 'Loading 加载'
              },
              {
                value: 'message',
                label: 'Message 消息提示'
              },
              {
                value: 'message-box',
                label: 'MessageBox 弹框'
              },
              {
                value: 'notification',
                label: 'Notification 通知'
              }
            ]
          },
          {
            value: 'navigation',
            label: 'Navigation',
            children: [
              {
                value: 'menu',
                label: 'NavMenu 导航菜单'
              },
              {
                value: 'tabs',
                label: 'Tabs 标签页'
              },
              {
                value: 'breadcrumb',
                label: 'Breadcrumb 面包屑'
              },
              {
                value: 'dropdown',
                label: 'Dropdown 下拉菜单'
              },
              {
                value: 'steps',
                label: 'Steps 步骤条'
              }
            ]
          },
          {
            value: 'others',
            label: 'Others',
            children: [
              {
                value: 'dialog',
                label: 'Dialog 对话框'
              },
              {
                value: 'tooltip',
                label: 'Tooltip 文字提示'
              },
              {
                value: 'popover',
                label: 'Popover 弹出框'
              },
              {
                value: 'card',
                label: 'Card 卡片'
              },
              {
                value: 'carousel',
                label: 'Carousel 走马灯'
              },
              {
                value: 'collapse',
                label: 'Collapse 折叠面板'
              }
            ]
          }
        ]
      },
      {
        value: 'ziyuan',
        label: '资源',
        children: [
          {
            value: 'axure',
            label: 'Axure Components'
          },
          {
            value: 'sketch',
            label: 'Sketch Templates'
          },
          {
            value: 'jiaohu',
            label: '组件交互文档'
          }
        ]
      }
    ],
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
              <Form.Item>
                <Button type="primary" nativeType="submit">
                  立即创建
                </Button>
                <Button>取消</Button>
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
