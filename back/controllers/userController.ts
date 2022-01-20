/*
 * @Descripttion: 
 * @version: 
 * @Author: 邓旭阳
 * @Date: 2022-01-19 17:16:42
 * @LastEditors: 邓旭阳
 * @LastEditTime: 2022-01-20 13:42:56
 */
import express from 'express';
// import bodyParser from 'body-parser';
import DataApi from '../_common/DataApi';


export const initUser = (app: express.Application) => {
    app.get('/user/query', (req, res, next) => {
        let { directory_code,param,pageNo,pageNum} = req.query
        DataApi.getResource(directory_code,param,pageNo,pageNum).then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err)
        });
    })
    app.get('/department/query', (req, res, next) => {
        let { directory_code,param,pageNo,pageNum} = req.query
        DataApi.getResource(directory_code,param,pageNo,pageNum).then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err)
        });
    })
}