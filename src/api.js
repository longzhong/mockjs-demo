import axios from 'axios'

const qs = require('qs')
const api = {
  async get(url, data) {
    try {
      let res = await axios.get(url, { params: data })
      res = res.data
      return new Promise((resolve) => {
        resolve(res)
      })
    } catch (err) {
      alert('服务器出错')
    }
  },
  async post(url, data) {
    try {
      let res = await axios.post(url, qs.stringify(data))
      res = res.data
      return new Promise((resolve, reject) => {
        if (res.status === 200) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    } catch (err) {
      alert('服务器出错')
    }
  },
}
export { api }