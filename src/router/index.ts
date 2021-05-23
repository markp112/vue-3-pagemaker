import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Sites from '@/views/sites/sites.vue';
import NewSite from '@/views/sites/new-site.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: '/login',
    name: 'login',
    component:() =>
      import ('../views/auth/login.vue'),
    // meta: {
    //   breadcrumb: [{ name: 'home', link: 'home' }, { name: 'login' }]
    // }
  },
  {
    path: '/sites',
    name: '/sites',
    component: Sites,
  },
  {
    path: '/newSite',
    name: 'newSite',
    component: NewSite,
    // meta: {
    //   breadcrumb: [
    //     { name: 'home', link: 'home' },
    //     { name: 'sites', link: 'sites' },
    //     { name: 'new site' }
    //   ]
    // }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
