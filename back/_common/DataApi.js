/*
 * @Descripttion: 封装DataApi
 * @version: 0.0.1
 * @Author: 邓旭阳
 * @Date: 2022-01-18 13:51:23
 * @LastEditors: 邓旭阳
 * @LastEditTime: 2022-01-21 10:19:08
 */

import request from '../_request';
import Qs from 'qs'
class DataApi {
    constructor() {
        //"http://test.dataapi.com/datacenterservice" // 主地址
        // this.mainUrl = "http://dataapi.xyabcd.com/datacenterservice" 
        this.mainUrl = "https://mock.mengxuegu.com/mock/61e0ed8b17249f68847fc031"
        this.tokenUrl = this.mainUrl + "/cgi-bin/token?appid=appid&secret=appsecret&grant_type=client_credentials"; // 获取token地址
        this.token='';
        this.getToken();
        this.getResourceUrl = this.mainUrl + "/cgi-bin/basic/resource/get"; // 获取数据地址
        this.addResourceUrl = this.mainUrl + "/cgi-bin/basic/resource/add?access_token={0}"; // 新增数据地址
        this.modifyResourceUrl = this.mainUrl + "/cgi-bin/basic/resource/modify?access_token={0}"; // 修改数据地址
        this.deleteResourceUrl = this.mainUrl + "/cgi-bin/basic/resource/delete?access_token={0}"; // 删除数据地址
       
    }
    /**
     * @Author: 邓旭阳
     * @Date: 2022-01-19 16:03:49
     * @msg: 获取token
     * @param {*} 
     * @return {*} token promise
     */
    getToken() {
       let data= {
            method: "post",
            url: this.tokenUrl,
          }
         request(data).then((result) => {
            this.token=result.access_token
         }).catch((err) => {
             
         });
    }
  
    /**
     * @Author: 邓旭阳
     * @Date: 2022-01-19 16:03:07
     * @msg: 获取资源
     * @param {*} directory_code
     * @param {*} param
     * @param {*} pageNo
     * @param {*} pageNum
     * @return {*} getResource promise 
     */      
    async getResource(directory_code, param = {}, pageNo = 1, pageNum = 10) {
        let data = {
            access_token: this.token,
            directory_code,
            datajson: param,
            pageNo,
            pageNum
        };
        let resbody = {
            method: "post",
            url: this.getResourceUrl,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            // headers: {'Content-Type': 'application/json'},
            data: Qs.stringify(data)
        }
        return request(resbody)
    }

}

export default new DataApi()