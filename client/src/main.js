import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {VLazyImagePlugin} from 'v-lazy-image'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false

Vue.use(VLazyImagePlugin)
Vue.use(Vuelidate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
