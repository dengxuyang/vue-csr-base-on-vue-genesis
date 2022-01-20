/*
 * @Descripttion: 封装一层axios 
 * @version: 
 * @Author: 邓旭阳
 * @Date: 2022-01-14 15:04:36
 * @LastEditors: 邓旭阳
 * @LastEditTime: 2022-01-19 16:34:06
 */

import axios from 'axios'
export default function request(config) {
    const instance = axios.create({
            //baseURL: process.env.VUE_APP_BASE_URL,
            timeout: 5000
        })
        //请求拦截
    instance.interceptors.request.use(config => {
            // if (config.url !== '/token') {
            //     const token = store.state.token
            //     config.params.access_token = token
            //     config.params.datajson = { destination_id: 531 }
            // }
            return config
        }, error => {})
        //响应拦截
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {})
    return instance(config)

    // .then(res => {
    //     resolve(res)
    // }).catch(err => {
    //     reject(err)
    // })
}