import React from 'react'
import { Breadcrumb, Table, Button, Tag } from 'element-react'
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
          type: 'index'
        },
        {
          type: 'expand',
          expandPannel: function(data) {
            console.log(data)
            return (
              <div className="expandpannel">
                <div className={styles.expandpannerFirst}>
                  {data.children.map(item => {
                    return (
                      <Tag
                        type="primary"
                        key={item.id}
                        style={{ marginBottom: '5px' }}
                      >
                        {item.authName}
                      </Tag>
                    )
                  })}
                </div>
                <div className={styles.expandpannerSecond}>
                  {data.children.map(item1 => {
                    return item1.children.map(item2 => {
                      return (
                        <Tag
                          type="success"
                          key={item2.id}
                          style={{ marginBottom: '5px' }}
                        >
                          {item2.authName}
                        </Tag>
                      )
                    })
                  })}
                </div>
                <div className={styles.expandpannerThird}>
                  {data.children.map(item1 => {
                    return item1.children.map(item2 => {
                      return item2.children.map(item3 => {
                        return (
                          <Tag
                            type="warning"
                            key={item3.id}
                            style={{ margin: '5px' }}
                          >
                            {item3.authName}
                          </Tag>
                        )
                      })
                    })
                  })}
                </div>
              </div>
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
