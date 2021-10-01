import Vue         from 'vue';
import VueResource from 'vue-resource';
import VueRouter   from 'vue-router';
import VeeValidate from 'vee-validate';

import messages from './vv_locale_pt-BR'; // 'vee-validate/dist/locale/pt_BR.js'

import { routes } from './routes';

import App from './App.vue';

// import 'bootstrap/dist/css/bootstrap.css';
import './styles/global.scss';

Vue.use(VueResource);
Vue.http.options.root = process.env.API_URL ? process.env.API_URL : 'http://localhost:3000/v1';

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  mode: 'history'
});

Vue.use(VeeValidate, {
  locale: 'pt_BR',
  dictionary: {
    pt_BR: {
      messages
    }
  }
});

new Vue({
  router,
  el:     '#app',
  render: h => h(App)
});
