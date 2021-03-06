import { Build } from '@fmfe/genesis-compiler';
import { ssr } from './genesis';
import {FontPlugin55} from './src/plugins/font';

const start = () => {
    ssr.plugin.use(new FontPlugin55(ssr));
    /**
     * 创建一个编译实例
     */
    const build = new Build(ssr);
    /**
     * 开始执行编译程序，构建生产环境应用包
     */
    return build.start();
};
start();
