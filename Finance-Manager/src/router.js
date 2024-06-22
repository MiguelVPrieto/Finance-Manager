import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Sign from '@/views/Sign.vue';
import Home from "@/views/Home.vue";

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/sign',
    name: 'Sign',
    component: Sign
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
