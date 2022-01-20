/*
 * @Descripttion: 
 * @version: 
 * @Author: 邓旭阳
 * @Date: 2022-01-17 10:02:27
 * @LastEditors: 邓旭阳
 * @LastEditTime: 2022-01-20 14:14:16
 */
const isProd = process.env.NODE_ENV === 'production'
const istest = process.env.NODE_ENV === 'test'

let LOGIN_HEADER = ''
let API_HEADER = ''
let BigDataIframeSrc = ''
let PAY_HEADER = ''
// if (isProd) {
//     LOGIN_HEADER = 'http://sso.xyabcd.com/ssoauth';
//     API_HEADER = '/gthmmc/index.php?m=emercontrol&'
// } else if (istest) {
//     LOGIN_HEADER = 'http://test.ssoauth.com/ssoauth';
//     API_HEADER = '/gthmmc/index.php?m=emercontrol&'

// } else {
//     // LOGIN_HEADER = 'http://test.ssoauth.com/ssoauth';
//     LOGIN_HEADER = 'http://sso.xyabcd.com/ssoauth';
//     API_HEADER = "https://mock.mengxuegu.com/mock/61e0ed8b17249f68847fc031/api"

// }
API_HEADER ='http://localhost:3000'
export default {
    getTreeData:API_HEADER+'/department/query',
    getTableData:API_HEADER+'/user/query',

}