import React from 'react'
import { Breadcrumb, Form, Table, Button } from 'element-react'
import styles from './index.module.scss'
import { API } from '../utils'
// 面包屑
class BoardList extends React.Component {
  render() {
    return (
      <Breadcrumb separator="/">
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>角色管理</Breadcrumb.Item>
      </Breadcrumb>
    )
  }
}
// 表格
class RolesTable extends React.Component {
  componentDidMount() {
    this.getRolesTableData()
  }
  // 拿到表格数据
  getRolesTableData = async () => {
    let { data, meta } = await API.get('roles')
    if (meta.status === 200) {
      this.setState({
        data: data
      })
    }
  }
  constructor(props) {
    super(props)
    this.state = {
      columns: [
        {
          type: 'expand',
          expandPannel: function(data) {
            return (
              <Form
                labelPosition="left"
                inline={true}
                className="demo-table-expand"
              >
                <Form.Item label="商品名称">
                  <span>好滋好味鸡蛋仔</span>
                </Form.Item>
                <Form.Item label="所属店铺">
                  <span>王小虎夫妻店</span>
                </Form.Item>
                <Form.Item label="商品 ID">
                  <span>12987122</span>
                </Form.Item>
                <Form.Item label="店铺 ID">
                  <span>10333</span>
                </Form.Item>
                <Form.Item label="商品分类">
                  <span>江浙小吃、小吃零食</span>
                </Form.Item>
                <Form.Item label="店铺地址">
                  <span>上海市普陀区真北路</span>
                </Form.Item>
                <Form.Item label="商品描述">
                  <span>荷兰优质淡奶，奶香浓而不腻</span>
                </Form.Item>
              </Form>
            )
          }
        },
        {
          label: '角色名称',
          prop: 'roleName'
        },
        {
          label: '描述',
          prop: 'roleDesc'
        },
        {
          label: '操作',
          render: data => {
            return (
              <span>
                <Button plain icon="delete" type="warning" size="mini"></Button>
                <Button type="success" size="mini">
                  分配权限
                </Button>
              </span>
            )
          }
        }
      ],
      data: [
        {
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        },
        {
          id: '12987123',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        },
        {
          id: '12987125',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        },
        {
          id: '12987126',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }
      ]
    }
  }

  render() {
    return (
      <Table
        style={{ width: '100%' }}
        columns={this.state.columns}
        data={this.state.data}
        border={false}
        onCurrentChange={item => {
          console.log(item)
        }}
      />
    )
  }
}
export default class Roles extends React.Component {
  render() {
    return (
      <div className={styles.roles}>
        <BoardList></BoardList>
        <RolesTable></RolesTable>
      </div>
    )
  }
}
