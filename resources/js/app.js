require('./bootstrap')

// Import dependencies
import Vue from 'vue'
import { BootstrapVue, BContainer, BRow, BCol, BLink } from 'bootstrap-vue'

// Import CSS files
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Pages components
import Signin from './views/signin.vue'

// Register dependencies
Vue.use(BootstrapVue)

// Register global components
Vue.component('BContainer', BContainer)
Vue.component('BRow', BRow)
Vue.component('BCol', BCol)
Vue.component('BLink', BLink)

// Init app
const app = new Vue({
    el: '#app',
    components: { Signin }
})