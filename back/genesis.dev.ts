import { Watch } from '@fmfe/genesis-compiler';
import { ssr, app, startApp } from './genesis';
import {FontPlugin55} from './src/plugins/font';
const start = async () => {
    ssr.plugin.use(new FontPlugin55(ssr));
    /**
    /**
     * 创建一个观察实例
     */
    const watch = new Watch(ssr);

    /**
     * 启动观察
     */
    await watch.start();
    /**
     * 拿到观察实例上对应的渲染器
     */
 
    const renderer = watch.renderer;
    /**
     * 开发的中间件
     */
    app.use(watch.devMiddleware);
    /**
     * 热更新的中间件
     */
    app.use(watch.hotMiddleware);
    /**
     * 拿到渲染器后，启动应用程序
     */
   
    startApp(renderer);
   
};
start();
