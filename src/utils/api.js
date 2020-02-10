import axios from 'axios'
const API = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})

// 配置请求拦截器
API.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem('token')
  return config
})

// 配置响应的拦截器
API.interceptors.response.use(
  function(response) {
    return response.data
  },
  function(error) {
    return Promise.reject(error)
  }
)

export { API }
