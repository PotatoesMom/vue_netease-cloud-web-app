import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/reset.css' /*清除默认样式*/

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
