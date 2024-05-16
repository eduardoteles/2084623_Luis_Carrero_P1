import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/Search',
    name: 'search',
    component: function () {
      return import('../views/SearchView.vue')
    }
  },
  {
    path: '/futebol',
    name: 'futebol',
    component: function () {
      return import('../views/FutebolView.vue')
      meta: { requiresAuth: true }
    }
  },
  {
    path: '/register',
    name: 'register',

    component: function () {
      return import('../views/RegisterView.vue')
    }
  },
  {
    path: '/Sign-in',
    name: 'sign-in',
    component: function () {
      return import( '../views/SingInView.vue')
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if(to.matched.some((record) => record.meta.requiresAuth)){
    if(genAuth().currentUser){
      next();
    }else{
      alert('You must be logged in to see this page');
      next("/sign-in")
    }
  }else{
    next();
  }
});

export default router;
