import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

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
      title: '登陆'
    }
  },
  {
    name: 'home',
    path: '/home',
    component: Home,
    meta: {
      title: '假体管理系统'
    }
  },
  {
    name: 'register',
    path: '/register',
    component: Register,
    meta: {
      title: '注册'
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

// 全局导航钩子路由拦截
/* router.beforeEach(async (to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  const token = localStorage.getItem('token') || '';
  if (token) { // 已登录
    if (!to.matched.length) {
      next('/home');
    }
    next();
  } else {
    if (to.path === '/login') {
      next();
    } else {
      next('/login');
    }
  }
}); */

export default router;
