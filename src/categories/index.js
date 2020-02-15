import React from 'react'
import styles from './index.module.scss'
import { API } from '../utils'
class CategoriesTable extends React.Component {
  state = {
    tableData: [],
    pagesize: 10,
    pagenum: 1,
    total: 0
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
        total: data.total
      })
    }
  }
  render() {
    return <div className="categoriesTable">CategoriesTable</div>
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
