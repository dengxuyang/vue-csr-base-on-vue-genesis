/*
 * @Descripttion: 控制器
 * @version: 
 * @Author: 邓旭阳
 * @Date: 2022-01-19 17:34:50
 * @LastEditors: 邓旭阳
 * @LastEditTime: 2022-01-20 09:13:23
 */
import {initUser} from './userController';
export const initControllers=(app)=>{
    initUser(app)
}