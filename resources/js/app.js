require('./bootstrap');

// Import dependencies
import Vue from 'vue'

// Pages components
import App from './views/app.vue'

// Init app
const app = new Vue({
    el: '#app',
    components: { App }
});