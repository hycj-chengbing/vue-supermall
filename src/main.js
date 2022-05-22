import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import toast from 'components/common/toast'

Vue.use(ElementUI);
Vue.config.productionTip = false
//添加事件总线对象
Vue.prototype.$bus = new Vue()
//安装toast插件
Vue.use(toast)
//解决移动端300ms延迟问题
FastClick.attach(document.body)
// 使用懒加载图片的插件
Vue.use(VueLazyLoad, {
  loading: require("./assets/img/common/loading.png"),// 占位图
  error: require("./assets/img/common/err.png"),// 错误显示图片
});


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
