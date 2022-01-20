/*
 * @Descripttion: 
 * @version: 
 * @Author: 邓旭阳
 * @Date: 2022-01-10 10:19:40
 * @LastEditors: 邓旭阳
 * @LastEditTime: 2022-01-19 17:11:02
 */
import { RenderContext } from '@fmfe/genesis-core';
import { createServerApp } from '@fmfe/genesis-app';
import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './app.vue';
import {store} from './store';
import { createRouter } from './router';
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
