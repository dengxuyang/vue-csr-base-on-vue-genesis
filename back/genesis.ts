/*
 * @Descripttion: 
 * @version: 
 * @Author: 邓旭阳
 * @Date: 2022-01-10 10:19:40
 * @LastEditors: 邓旭阳
 * @LastEditTime: 2022-01-20 16:31:29
 */
import express from 'express';
import { SSR, Renderer } from '@fmfe/genesis-core';
// import axios from "axios";
import { initControllers } from './controllers';
/*
 * 创建一个应用程序
 */
export const app = express();

/**
 * 创建一个 SSR 实例
 */
export const ssr = new SSR();

/**
 * 拿到渲染器后，启动应用程序
 */
export const startApp = (renderer: Renderer) => {
    /**
      *
      *解决跨域
      * 
      */
   
    app.all('*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", ' 3.2.1')
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
    });
    const renderModes = ['ssr-html', 'ssr-json', 'csr-html', 'csr-json'];
    /**
     * 初始化controller
     */
     initControllers(app);
    
    
    /**
     * 使用默认渲染中间件进行渲染，你也可以调用更加底层的 renderer.renderJson 和 renderer.renderHtml 来实现渲染
     */
    app.use('/view/load', (req, res, next) => {
        // 获取渲染的地址
        const url = decodeURIComponent(String(req.query.renderUrl));
        console.log(url);
        // 获取路由渲染的模式
        const routerMode =
            ['abstract', 'history'].indexOf(String(req.query.routerMode)) > -1
                ? req.query.routerMode
                : 'abstract';
        // 渲染默认
        const mode: any =
            renderModes.indexOf(String(req.query.renderMode)) > -1
                ? String(req.query.renderMode)
                : 'csr-json';

        renderer
            .render({
                url,
                mode,
                state: {
                    routerMode,
                    // syncHistory: true
                }
            })
            .then((r) => {
                res.send(r.data);
            })
            .catch(next);
    });

    app.use(renderer.renderMiddleware);
    /**
     * 监听端口
     */
    app.listen(3000, () => console.log(`http://localhost:3000`));
};
