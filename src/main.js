import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import * as echarts from 'echarts';

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(ElementUI);

axios.defaults.baseURL='http://localhost:3000/'
new Vue({
  router,
  store,
  template:'<App/>',
  render: h => h(App)
}).$mount('#app')
