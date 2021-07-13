import { createApp } from 'vue';
import App from './App.vue';

//路由
import router from './router';

// 样式
import './styles/index.scss';

// 权限
import './permission';

const app = createApp(App);


app.use(router).mount('#app');
