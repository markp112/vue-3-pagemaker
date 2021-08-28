import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Sites from '@/views/sites/sites.vue';
import NewSite from '@/views/sites/new-site.vue';
import PageList from '@/views/page-list/page-list.vue';
import PageEditor from '@/views/maintain-page/page.vue';
import PageBuilder from '@/views/page-builder/page-builder.vue';
import SidebarIconEditor from '@/views/settings/icon-editor/icon-editor.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      breadcrumb: [{ name: 'home' }]
    },
  },
  {
    path: '/login',
    name: 'login',
    component:() =>
      import ('../views/auth/login.vue'),
      meta: {
        breadcrumb: [{ name: 'home', link: 'home' }, { name: 'login' },]
    }
  },
  {
    path: '/sites',
    name: '/sites',
    component: Sites,
    meta: {
      breadcrumb: [{ name: 'home', link: 'home' }, { name: 'sites' },]
    }
  },
  {
    path: '/newSite',
    name: 'newSite',
    component: NewSite,
    meta: {
      breadcrumb: [
        { name: 'home', link: 'home' },
        { name: 'sites', link: 'sites' },
        { name: 'new site' },
      ]
    },
  },
  {
    path: '/pageList',
    name: 'pageList',
    component: PageList,
    meta: {
      breadcrumb: [
        { name: 'home', link: 'home' },
        { name: 'sites', link: 'sites' },
        { name: 'page list' }
      ]
    },
  },
  {
    path: '/pageEditor/:title',
    name: 'page-editor',
    component: PageEditor,
    meta: {
      breadcrumb: [
        { name: 'home', link: 'home' },
        { name: 'sites', link: 'sites' },
        { name: 'page list', link: 'pageList' },
        { name: 'page-editor' }
      ]
    },
  },
  {
    path: '/pageBuilder',
    name: 'page-builder',
    component: PageBuilder,
    meta: {
      breadcrumb: [
        { name: 'home', link: 'home' },
        { name: 'sites', link: 'sites' },
        { name: 'page list', link: 'pageList' },
        { name: 'page-builder' }
      ]
    },
  },
  {
    path: '/iconEditor',
    name: 'icon-editor',
    component: SidebarIconEditor,
    meta: {
      breadcrumb: [
        { name: 'home', link: 'home' },
        { name: 'sites', link: 'sites' },
        { name: 'settings', link: 'icon-editor' },
      ]
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
