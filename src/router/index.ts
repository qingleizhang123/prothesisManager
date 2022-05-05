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
  },
  {
    name: 'home',
    path: '/home',
    component: Home,
  },
  {
    name: 'register',
    path: '/register',
    component: Register,
  }
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
