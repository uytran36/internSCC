import { defineConfig } from 'umi';

export default defineConfig({
  dva: {},
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      exact: true,
      path: '/',
      component: '@/pages/common/index',
      wrappers: ['@/wrappers/Auth0'],
    },
    {
      exact: true,
      path: '/login',
      component: '@/pages/session/FormLogin',
      wrappers: ['@/wrappers/Auth0'],
    },
    {
      exact: true,
      path: '/register',
      component: '@/pages/session/FormRegister',
      wrappers: ['@/wrappers/Auth0'],
    },
  ],
  fastRefresh: {},
});
