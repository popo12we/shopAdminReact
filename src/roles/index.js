import React from 'react'
import { Breadcrumb, Table, Button, Tag, Tree, Dialog } from 'element-react'
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
          render: () => {
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
      data: []
    }
  }

  render() {
    return (
      <div class="rolesTable">
        <Table
          style={{ width: '100%' }}
          columns={this.state.columns}
          data={this.state.data}
          border={false}
          onCurrentChange={item => {
            console.log(item)
          }}
        />
        <RolesTree></RolesTree>
      </div>
    )
  }
}

// 树状图
class RolesTree extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dialogVisible: true,
      data: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ],
      options: {
        children: 'children',
        label: 'label'
      }
    }
  }

  render() {
    const { data, options } = this.state

    return (
      <div class="rolestree">
        <Dialog
          title="分配权限"
          size="tiny"
          visible={this.state.dialogVisible}
          onCancel={() => this.setState({ dialogVisible: false })}
          lockScroll={false}
        >
          <Dialog.Body>
            <Tree
              ref={e => (this.tree = e)}
              data={data}
              options={options}
              isShowCheckbox={true}
              highlightCurrent={true}
              nodeKey="id"
              defaultExpandedKeys={[2, 3]}
              defaultCheckedKeys={[5]}
            />
          </Dialog.Body>
          <Dialog.Footer className="dialog-footer">
            <Button onClick={() => this.setState({ dialogVisible: false })}>
              取消
            </Button>
            <Button
              type="primary"
              onClick={() => this.setState({ dialogVisible: false })}
            >
              确定
            </Button>
          </Dialog.Footer>
        </Dialog>
      </div>
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
