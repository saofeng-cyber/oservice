import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
const routes = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'Index',
    component: Home
  }
];

let router = createRouter({
  history: createWebHistory('/main/govcharts'),
  routes
})
/**
 * 兼容代码生成器输出，动态加载路由
 */
 const routerContext = require.context('../modules/', true, /router\/index\.js$/);
//  console.log(routerContext.keys()); // [./govcharts/router/index.js]
 routerContext.keys().forEach(route => {
  require('../modules'+route.substring(1).replace('.js','')).default(router)
 })
export default router
