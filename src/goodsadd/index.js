import React from 'react'
import styles from './index.module.scss'
import './index.css'
import { Steps, Tabs } from 'element-react'
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
    activeName: '0'
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
            用户管理
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
