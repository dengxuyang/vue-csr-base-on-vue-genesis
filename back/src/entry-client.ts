import { ClientOptions } from '@fmfe/genesis-core';
import { createClientApp } from '@fmfe/genesis-app';
import Vue from 'vue';
import App from './app.vue';
import { store } from './store';
import { createRouter } from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
const router = createRouter();

Vue.use(ElementUI);
export default async (clientOptions: ClientOptions): Promise<Vue> => {
    return createClientApp({
        App,
        clientOptions,
        vueOptions: {
            // 传递给 new Vue({}) 的选项
            // 默认将 renderContext 传递给 new Vue({ clientOptions })
            store,
            router,
        }
    })
};
