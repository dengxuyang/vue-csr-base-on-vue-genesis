/*
 * @Descripttion: 
 * @version: 
 * @Author: 邓旭阳
 * @Date: 2022-01-10 10:19:40
 * @LastEditors: 邓旭阳
 * @LastEditTime: 2022-01-20 16:03:15
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
                    import(/* webpackChunkName: "user" */ '../views/user.vue').then((m) => m.default)
            },
            {
                path: '/department',
                component: () =>
                    import(
                        /* webpackChunkName: "department" */ '../views/department.vue'
                    ).then((m) => m.default)
            }
        ]
    });
};

