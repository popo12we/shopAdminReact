import React from 'react'
import styles from './index.module.scss'
import { API } from '../utils'
import { Table, Button } from 'element-react'
import './index.css'
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
          type: 'index',
          width: 590
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
  // 拿到表格数据
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
        <Button type="primary" plain onClick={this.gotoGoodsAdd}>
          添加商品
        </Button>
        <GoodsTable></GoodsTable>
      </div>
    )
  }
  // 点击按钮跳转到goodsadd
  gotoGoodsAdd = () => {
    console.log(this)
    this.props.history.push('/home/goodsadd')
  }
}
