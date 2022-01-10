import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Fragment from 'vue-fragment'
Vue.use(ElementUI);
Vue.use(Fragment.Plugin);
new Vue({
  render: h => h(App),
}).$mount('#app')
