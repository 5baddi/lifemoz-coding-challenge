require('./bootstrap');

// Import dependencies
import Vue from 'vue'

// Pages components
import Signin from './views/signin.vue'

// Init app
const app = new Vue({
    el: '#app',
    components: { Signin }
});