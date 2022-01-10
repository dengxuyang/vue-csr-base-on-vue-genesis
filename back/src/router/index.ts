import { Router } from '@fmfe/genesis-app';

/**
 * 提供一个工厂函数，创建一个路由对象
 */



export const createRouter = () => {
   
    return new Router({

        mode: 'history',
        routes: [
            {
                path: '/play',
                component: () =>
                    import(/* webpackChunkName: "home" */ '../views/play.vue')
            },
            {
                path: '/video',
                component: () =>
                    import(
                        /* webpackChunkName: "signin" */ '../views/video.vue'
                    )
            }
        ]
    });
};

