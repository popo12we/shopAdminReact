import React from 'react'
import styles from './index.module.scss'
import { API } from '../utils'
import { Table, Button } from 'element-react'
class GoodsTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      goodsTableData: [],
      pagesize: 10,
      pagenum: 1,
      total: 0,
      columns: [
        {
          type: 'index'
        },
        {
          label: '商品名称',
          prop: 'goods_name'
        },
        {
          label: '商品价格',
          prop: 'goods_price',
          width: 90
        },
        {
          label: '商品重量',
          prop: 'goods_weight',
          width: 90
        }
      ],
      data: []
    }
  }
  componentDidMount() {
    this.getTableData()
  }
  async getTableData() {
    let { data, meta } = await API.get('goods', {
      params: {
        pagesize: this.state.pagesize,
        pagenum: this.state.pagenum
      }
    })
    if (meta.status === 200) {
      console.log(data)
      this.setState({
        total: data.total,
        data: data.goods
      })
    }
  }
  render() {
    return (
      <div className="goodstable">
        <Button type="primary" plain>
          添加商品
        </Button>
        <Table
          style={{ width: '100%' }}
          columns={this.state.columns}
          data={this.state.data}
        />
      </div>
    )
  }
}

export default class Goods extends React.Component {
  render() {
    return (
      <div className={styles.goods}>
        <GoodsTable></GoodsTable>
      </div>
    )
  }
}
