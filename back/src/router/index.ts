import { Router } from '@fmfe/genesis-app';

/**
 * 提供一个工厂函数，创建一个路由对象
 */



export const createRouter = () => {
   
    return new Router({

        mode: 'history',
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

