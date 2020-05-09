import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: { isPrivate: true },
    component: () => import('../views/Profile.vue'),
  },
];

const router = new VueRouter({
  routes,
});

let loaded = false;

router.beforeEach(async (to, from, next) => {
  if (!loaded) {
    await store.dispatch('loadSession');
    loaded = true;
  }
  if (to.meta.isPrivate && !store.state.isLoggedIn) {
    next({ name: 'Login' });
  } else next();
});

export default router;
