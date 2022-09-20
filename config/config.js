// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  history: {
    type: 'hash',
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,

  proxy: {
    '/api/': {
      // target: 'http://gzknowledge.cn:2222/',
      target: 'http://gzknowledge.cn:2222/',
      changeOrigin: false,
      pathRewrite: { '^/api': '' },
    },
    '/api2/': {
      // target: 'http://gzknowledge.cn:5000/',
      target: 'http://localhost:2525/',
      changeOrigin: true,
      pathRewrite: { '^/api2': '' },
    },
  },

  manifest: {
    basePath: '/',
  },
  esbuild: {},
  publicPath: './',
});
