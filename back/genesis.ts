import express from 'express';
import { SSR, Renderer } from '@fmfe/genesis-core';
import axios from "axios";
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
    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1')
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
    });
    const renderModes = ['ssr-html', 'ssr-json', 'csr-html', 'csr-json'];
    /**
     * 使用默认渲染中间件进行渲染，你也可以调用更加底层的 renderer.renderJson 和 renderer.renderHtml 来实现渲染
     */
    app.use('/api/getData',(req, res, next)=>{
        let url =
        "http://localhost/gthmmc_v4.0/gthmmc/index.php?m=svtgs&c=export&a=queryYuyueData&data=%7B%22startTime%22:%222021-12-28%22,%22endTime%22:%222022-01-17%22%7D";
        axios.get(url).then((result) => {
            res.send(result.data.data)
            next()
        }).catch(next);
     
    })
     app.use('/api/renderJson', (req, res, next) => {
     
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
                : 'ssr-json';

        renderer
            .render({
                url,
                mode,
                automount:false,
                state: {
                    routerMode,
                }
            })
            .then((r) => {
                res.send(r.data);
            })
            .catch(next);
    });
    app.use('/api/play', (req, res, next) => {
     
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
                : 'ssr-json';

        renderer
            .render({
                url:'/play',
                mode,
                automount:false,
                state: {
                    routerMode,
                }
            })
            .then((r) => {
                res.send(r.data);
            })
            .catch(next);
    });
    app.use('/api/video', (req, res, next) => {
     
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
                : 'ssr-json';

        renderer
            .render({
                url:'/video',
                mode,
                automount:false,
                state: {
                    routerMode,
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
