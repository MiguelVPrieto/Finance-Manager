import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
});

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.mount('#app');
