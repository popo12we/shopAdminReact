import React from 'react'
import styles from './index.module.scss'
import { Table, Button } from 'element-react'
import { API } from '../utils'
class CategoriesTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      columns: [
        {
          type: 'expand',
          expandPannel: function(data) {
            return <div>111</div>
          }
        },
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          render: data => {
            return <span>{!data.cat_deleted ? '是' : '否'}</span>
          }
        },
        {
          label: '排序',
          render: data => {
            return <span>{data.cat_level}</span>
          }
        },
        {
          label: '操作',
          render: data => {
            return (
              <span>
                <Button size="small">修改</Button>
                <Button type="danger" size="small">
                  删除
                </Button>
              </span>
            )
          }
        }
      ],
      tabledata: [],
      pagesize: 10,
      pagenum: 1,
      total: 0
    }
  }
  componentDidMount() {
    this.getTableData()
  }
  // 拿到表格数据
  async getTableData() {
    let { data, meta } = await API.get('categories', {
      params: {
        type: 3,
        pagenum: this.state.pagenum,
        pagesize: this.state.pagesize
      }
    })
    if (meta.status === 200) {
      console.log(data)
      this.setState({
        total: data.total,
        tabledata: data.result
      })
    }
  }
  render() {
    return (
      <Table
        style={{ width: '100%' }}
        columns={this.state.columns}
        data={this.state.tabledata}
        border={false}
      />
    )
  }
}
export default class Categories extends React.Component {
  render() {
    return (
      <div className={styles.categories}>
        <CategoriesTable></CategoriesTable>
      </div>
    )
  }
}
