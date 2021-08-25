import Vue from 'vue';
import firebase from 'firebase/app';

import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: 'Home',
    },
  },
  {
    path: '/all-plans',
    name: 'AllPlans',
    component: () => import('../views/AllPlans.vue'),
    meta: {
      title: 'All plans',
    },
  },
  {
    path: '/create-new-plan',
    name: 'CreateNewPlan',
    props: true,
    component: () => import('../views/CreateNewPlan.vue'),
    meta: {
      title: 'Create New Plan',
    },
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import('../views/Calendar.vue'),
    meta: {
      title: 'Calendar',
    },
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: () => import('../views/SignIn.vue'),
    meta: {
      title: 'Sign In',
    },
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue'),
    meta: {
      title: 'Sign Up',
    },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/AccountSettings.vue'),
    meta: {
      title: 'Settings',
    },
  },
];

const router = new VueRouter({
  mode: 'history',

  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  document.title = `${to.meta.title} | WPC`;
  if (to.name === 'SignIn' || to.name === 'SignUp') {
    currentUser ? next({ name: 'Home' }) : next();
    return;
  }
  if (to.name === 'Settings') {
    currentUser ? next() : next({ name: 'Home' });
    return;
  }
  next();
});

export default router;
