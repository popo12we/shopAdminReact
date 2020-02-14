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
  state = {
    show: false
  }
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

  // 点击分配权限显示对话框
  showDialog = () => {
    this.setState({
      show: true
    })
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
                <Button type="success" size="mini" onClick={this.showDialog}>
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
      <div className="rolesTable">
        <Table
          style={{ width: '100%' }}
          columns={this.state.columns}
          data={this.state.data}
          border={false}
        />
        <RolesTree show={this.state.show}></RolesTree>
      </div>
    )
  }
}

// 树状图
class RolesTree extends React.Component {
  componentWillReceiveProps(nextProps) {
    this.setState({
      dialogVisible: nextProps.show
    })
  }
  componentDidMount() {
    this.getAssginJurisdictionData()
  }
  constructor(props) {
    super(props)

    this.state = {
      dialogVisible: this.props.show,
      data: [],
      options: {
        children: 'children',
        label: 'label'
      }
    }
  }

  // 拿到树形结构数据
  getAssginJurisdictionData = async () => {
    let { data, meta } = await API.get('rights/tree')
    if (meta.status === 200) {
      data.forEach(item1 => {
        item1.label = item1.authName
        item1.children.forEach(item2 => {
          item2.label = item2.authName
          item2.children.forEach(item3 => {
            item3.label = item3.authName
          })
        })
      })
      this.setState({
        data: data
      })
    }
  }
  render() {
    const { data, options } = this.state

    return (
      <div className="rolestree">
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
