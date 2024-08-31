import {
  defineConfig
} from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey, {
  cdn
} from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    monkey({
      entry: 'src/main.js',
      userscript: {
        icon: 'https://jisuai.cn/logo.png',
        namespace: 'monkeygpt',
        match: ['*://*/*'],
        version: '0.0.3'
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
        },
      },
    }),
  ],
});