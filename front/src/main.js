import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/element-variables.scss'
import Fragment from 'vue-fragment'
import router from './router'
Vue.use(ElementUI);
Vue.use(Fragment.Plugin);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
