import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
//import NProgress from 'nprogress';
//import 'nprogress/nprogress.css';

const Login = () => import('../views/Login.vue');
const Home = () => import('../views/Home.vue');
const Register = () => import('../views/Register.vue');
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
    meta: {
      title: '登陆',
      btnPermissions: ['admin', 'supper', 'normal']
    }
  },
  {
    name: 'home',
    path: '/home',
    component: Home,
    meta: {
      title: '假体管理系统',
      btnPermissions: ['admin', 'supper']
    }
  },
  {
    name: 'register',
    path: '/register',
    component: Register,
    meta: {
      title: '注册',
      btnPermissions: ['admin', 'supper', 'normal']
    }
  }
];

//NProgress.configure({ showSpinner: false });

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

// 全局导航钩子路由拦截
// router.beforeEach(async (to, from, next) => {
//   //NProgress.start();
//   if (to.meta.title) {
//     document.title = to.meta.title as string;
//   }
//   const token = localStorage.getItem('token') || '';
//   if (token) { // 已登录
//     if (!to.matched.length) {
//       next('/home');
//       //NProgress.done();
//     }
//     next();
//   } else {
//     if (to.path === '/login') {
//       next();
//     } else {
//       next('/login');
//       //NProgress.done();
//     }
//   }
// });

router.afterEach(() => {
  //NProgress.done();
});

export default router;
