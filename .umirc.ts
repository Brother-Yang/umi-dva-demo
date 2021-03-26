import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index', redirect: '/login' },
  //   { path: '/register', component: '@/routes/register/index' },
  //   { path: '/login', component: '@/routes/login/index' },
  //   { path: '/main', component: '@/routes/main/index' },
  //   { path: '/demo', component: '@/components/demo' },
  // ],
  fastRefresh: {},
});
