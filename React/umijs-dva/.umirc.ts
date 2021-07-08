import { defineConfig } from 'umi';

export default defineConfig({
  dva: {},
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { exact: true, path: '/', component: '@/pages/common/index' },
    { exact: true, path: '/login', component: '@/pages/session/FormLogin' },
    {
      exact: true,
      path: '/register',
      component: '@/pages/session/FormRegister',
    },
  ],
  fastRefresh: {},
});
