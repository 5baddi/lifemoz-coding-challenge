require('./bootstrap');

import Vue from 'vue'

// Pages
import App from './views/app.vue'


const app = new Vue({
    el: '#app',
    components: { App }
});