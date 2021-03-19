require('./bootstrap')

// Import dependencies
import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'

// Import CSS files
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Pages components
import Signin from './views/signin.vue'

// Register dependencies
Vue.use(BootstrapVue)

// Register global components
// Vue.component('BModal', BModal)
// Vue.directive('b-modal', VBModal)

// Init app
const app = new Vue({
    el: '#app',
    components: { Signin }
})