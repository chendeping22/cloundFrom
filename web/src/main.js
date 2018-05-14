// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//导包
import Vue from 'vue'
import ElementUI from 'element-ui'
import router from './router'
import axios from 'axios' 
import echarts from 'echarts'
import VueQriously from 'vue-qriously' 

//样式文件
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/main.css'
//引入组件
import App from './App'
//关闭生产模式下给出的提示
Vue.config.productionTip = false
//中间件的使用
Vue.use(ElementUI) 
Vue.use(VueQriously)  
Vue.prototype.$axios = axios; 
Vue.prototype.$echarts = echarts;

//axios的配置
axios.defaults.timeout = 10000;//请求超时
axios.defaults.baseURL = 'http://122.13.2.38:8005';//外网基础路径  
// axios.defaults.baseURL = 'http://192.168.121.150:8005';//内网基础路径
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//自定义指令--失去焦点（用在忘记密码--获取验证码的时候）
Vue.directive('blur', function (el, option) {
//      console.log(el);//元素
//      console.log(option);//集合
        var defClass = 'el-input', defTag = 'input';
        var value = option.value;
        value = { cls: defClass, tag: defTag, blu: value }; 
        if (el.classList.contains(value.cls) && value.blu){
           el.getElementsByTagName(value.tag)[0].focus();
           el.getElementsByTagName(value.tag)[0].blur();
        }
});

//判断是否登录
router.beforeEach((to,from,next)=>{    
  if (to.matched.some(record => record.meta.requiresId)) { 
    if (!loggedIn()) {  // 自己的判断条件  
      next({
        path: '/Login', // 重定向后的路由
        query: {redirect:to.fullPath} // 登录成功之后可以根据query中的内容跳转回原来的路由(页面)
      })
    } else { 
      next()
    }
  } else {  
    next() 
  }
}) 

let loggedIn=function() {
  var id = sessionStorage.getItem('userId')
  if (id === null) { 
    return false
  }
  return true  
}
new Vue({ 
  router, 
  render: h => h(App),
  components: { App },
  template: '<App/>'  
}).$mount('#app')
