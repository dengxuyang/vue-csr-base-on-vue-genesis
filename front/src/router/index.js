import Vue from 'vue'
import VueRouter from 'vue-router'
import play from '@views/play.vue';
import video from '@views/video.vue';

Vue.use(VueRouter)

const routes = [
        {
            path: '/',
             redirect: { name: 'play' },
        },
        {
            path: '/play',
            name: 'play',
            component: play,
        },
        {
            path: '/video',
            name: 'video',
            component: video,
        },
       
        
    ]
    //解决vuecli路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    // mode: 'history',
    // base: process.env.BASE_URL,
    // routes
})
// router.beforeEach((to, from, next) => {
//     if (to.name !== 'loginpage' && !store.state.login_status) next({ name: 'loginpage' })
//     else next()
// })

export default router