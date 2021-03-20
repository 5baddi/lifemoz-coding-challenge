require('./bootstrap')

// Import dependencies
import Vue from 'vue'
import { BootstrapVue, BContainer, BRow, BCol, BLink } from 'bootstrap-vue'
import router from './router'
import store from './store'
import { api } from './api'

// Import CSS files
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

// Pages components
import App from './app.vue'

// Register dependencies
Vue.use(BootstrapVue)

// Register global components
Vue.component('BContainer', BContainer)
Vue.component('BRow', BRow)
Vue.component('BCol', BCol)
Vue.component('BLink', BLink)

// Set HTTP handler
Vue.prototype.$http = api

// Set production mode
Vue.config.productionTip = false

// Init app
const app = new Vue({
    el: '#app',
    components: { App },
    router,
    store
})