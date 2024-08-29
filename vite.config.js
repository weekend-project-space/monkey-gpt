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
        icon: '/assets/logo.png',
        namespace: 'monkeygpt',
        match: ['*://*/*'],
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
        },
      },
    }),
  ],
});