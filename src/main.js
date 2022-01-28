import { createApp } from 'vue'
import App from './App.vue'
import inspurFun from '@/plugins/inspurutil'//導入全局函數
import router from './router'
import installElementPlus from './plugins/element'
import 'element-plus/dist/index.css'
import * as echarts from 'echarts'
// 配置请求数据
let instance = null
function render (props = {}) {
  const { container, qiankun, topapi, topinstance } = props
  instance = createApp(App).use(router)
  installElementPlus(instance)
  if (qiankun && topapi && topinstance) {
    // 引入方式一
    // VUE3.0 提供全局功能新方式，使用时请使用inject
    instance.provide('loadMicroApp', qiankun.loadMicroApp)
    instance.provide('$axios', topapi.$axios)
    instance.provide('$config', topapi.$config)
    instance.provide('$toprouter', topapi.$router) // 这里防止跟项目自己的router冲突，所以换了个名字
    instance.provide('$topstore', topapi.$store) // 这里防止跟项目自己的store冲突，所以换了个名字
    instance.provide('topVue', topinstance) // topinstance是父框架vue组件的实例，如果上述提供的不满足，可以自行在父组件实例中获取
    instance.provide('$echarts', echarts)
    // ↑上述方式引入的，在vue组件中通过inject方法引用，例如：const $axios = inject('$axios');
    // // 引入方式二
    // // 兼容VUE2.0开发习惯的全局定义方式，在vue组件中可以通过this直接访问
    // instance.config.globalProperties.loadMicroApp = qiankun.loadMicroApp
    // instance.config.globalProperties.$axios = topapi.$axios
    // instance.config.globalProperties.$config = topapi.$config
    // instance.config.globalProperties.$toprouter = topapi.$router // 这里防止跟项目自己的router冲突，所以换了个名字
    // instance.config.globalProperties.$topstore = topapi.$store // 这里防止跟项目自己的store冲突，所以换了个名字
    // instance.config.globalProperties.topVue = topinstance // topinstance是父框架vue组件的实例，如果上述提供的不满足，可以自行在父组件实例中获取
    // instance.config.globalProperties.$echarts = echarts
    // // ↑上述方式引入的，在vue组件中通过this直接使用，例如：this.$axios.post....
    // // 上述两种引入方式可以同时存在
  }else{
    instance.provide('$echarts', echarts)
    instance.use(inspurFun);//安装独立运行插件
    instance.config.globalProperties.$standAlone();//独立运行处理
  }

  // mount一定要写在最后
  instance.mount(container ? container.querySelector('#govcharts') : '#govcharts')
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap () {
  console.log('%c ', 'color: green;', 'vue3.0 app bootstraped')
}

function storeTest (props) {
  props.onGlobalStateChange &&
    props.onGlobalStateChange(
      (value, prev) =>
        console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
      true
    )
  props.setGlobalState &&
    props.setGlobalState({
      ignore: props.name,
      user: {
        name: props.name
      }
    })
}

export async function mount (props) {
  storeTest(props)
  render(props)
  instance.config.globalProperties.$onGlobalStateChange =
    props.onGlobalStateChange
  instance.config.globalProperties.$setGlobalState = props.setGlobalState
}

export async function unmount () {
  instance.unmount()
  instance._container.innerHTML = ''
  instance = null
  //history.destroy()
}
