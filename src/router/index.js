import Vue from "vue";
import VueRouter from "vue-router";

// 懒加载
const LoginPage = () => import("views/loginPage/LoginPage");
const AppHome = () => import('views/AppHome')
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')

//1. 安装插件
Vue.use(VueRouter)


// 配置路由
const routes = [
  {
    path: "",
    redirect: "/loginPage"
  },
  {
    path: "/",
    redirect: "/loginPage"
  },
  {
    path: "/loginPage",
    component: LoginPage
  },
  {
    path: "/app",
    component: AppHome,
    children: [
      {
        path: "/app",
        redirect: "/app/home"
      },
      {
        path: '/app/home',
        // 指定的组件
        component: Home
      },
      {
        path: '/app/category',
        component: Category
      },
      {
        path: '/app/cart',
        component: Cart
      },
      {
        path: '/app/profile',
        component: Profile
      },
      {
        path: '/app/detail/:iid',
        component: Detail
      }
    ]
  }
]
// 2.创建router
const router = new VueRouter({
  routes,
  mode: "history"

})

export default router