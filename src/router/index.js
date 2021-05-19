import Vue from 'vue'
import VueRouter from 'vue-router'
//1.安装插件
Vue.use(VueRouter)
const Home=()=>import('../views/home/Home')
const Menu=()=>import('../views/menu/Menu')
const ShopCart=()=>import('../views/cart/ShopCart')
const Profile=()=>import('../views/profile/Profile')
const Detail=()=>import('../views/detail/Detail')
//2.创建路由对象
const router = new VueRouter({
  routes: [
    //选择首页作为默认显示 利用redirect设置
    {
      path:'',
      redirect:'/home'
    },
    {
      path:'/home',
      component:Home
    },
    {
      path:'/menu',
      component:Menu
    },
    {
      path:'/cart',
      component:ShopCart
    },
    {
      path:'/profile',
      component: Profile
    },
    {
      //设置动态路由
      path:'/detail/:iid',
      component: Detail
    },
  ],
  mode: 'history'
})
export default router
