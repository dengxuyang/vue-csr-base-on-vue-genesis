import { RenderContext } from '@fmfe/genesis-core';
import { createServerApp } from '@fmfe/genesis-app';
import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './app.vue';
import {store} from './store';
import { createRouter } from './router';
import {request} from '../src/request';
// import 'element-ui/lib/theme-chalk/index.css';
Vue.prototype.$request = request;
const router = createRouter();
Vue.use(ElementUI);
export default async (renderContext: RenderContext): Promise<Vue> => {

    return createServerApp({
        App,
        renderContext,
        vueOptions: {
            store,
            router,
            // 传递给 new Vue({}) 的选项
            // 默认将 renderContext 传递给 new Vue({ renderContext })
        }
    });
};
