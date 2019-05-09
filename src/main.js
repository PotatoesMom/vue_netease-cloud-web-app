import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyload from 'vue-lazyload'
import store from './store'
import '@/assets/css/reset.css' /*清除默认样式*/
import "@/assets/fonts/iconfonts.css"; /*引入图标字体样式*/
import '@/assets/css/global.css' /*引入全局样式*/

Vue.use(VueAxios, axios);

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/img/loading.jpg'),
  loading: require('./assets/img/loading.jpg')
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
