import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index', redirect: '/login' },
    { path: '/index', component: '@/pages/index' },
    { path: '/register', component: '@/pages/register/index' },
    { path: '/login', component: '@/pages/login/index' },
    { path: '/main', component: '@/pages/main/index' },
    { path: '/demo', component: '@/components/demo' },
  ],
  fastRefresh: {},
});
