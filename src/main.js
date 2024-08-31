import {
  createApp
} from 'vue';
import './style.less';
import App from './App.vue';

createApp(App).mount(
  (() => {
    const app = document.createElement('div');
    app.id = 'monkeygpt'
    // document.body.append(app);
    const firstChild = document.body.firstChild;
    document.body.insertBefore(app, firstChild);
    return app;
  })(),
);