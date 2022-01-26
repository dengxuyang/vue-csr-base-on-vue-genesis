/*
 * @Descripttion: 
 * @version: 
 * @Author: 邓旭阳
 * @Date: 2022-01-10 10:19:40
 * @LastEditors: 邓旭阳
 * @LastEditTime: 2022-01-25 14:39:52
 */
import { Router } from '@fmfe/genesis-app';

/**
 * 提供一个工厂函数，创建一个路由对象
 */



export const createRouter = () => {

    return new Router({

        mode: 'abstract',
        routes: [
            {
                path: '/user',
                component: () =>
                    import(/* webpackChunkName: "user" */ '../views/user/user.vue').then((m) => m.default)
            },
            {
                path: '/department',
                component: () =>
                    import(
                        /* webpackChunkName: "department" */ '../views/user/department.vue'
                    ).then((m) => m.default)
            },
            {
                path: '/event',
                component: () =>
                    import(
                        /* webpackChunkName: "event" */ '../views/centerevents/event.vue'
                    ).then((m) => m.default)
            },
            {
                path: '/message',
                component: () =>
                    import(
                        /* webpackChunkName: "message" */ '../views/centerevents/message.vue'
                    ).then((m) => m.default)
            }
        ]
    });
};

