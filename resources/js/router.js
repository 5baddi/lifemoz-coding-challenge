import Vue from 'vue'
import VueRouter from 'vue-router'
import { isUserLoggedIn } from './auth'

// Use router
Vue.use(VueRouter)

// Init router
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'auth-signin',
            component: () => import('./views/signin.vue'),
            meta: {
                redirectIfLoggedIn: true,
            },
        },
        {
            path: '/signup',
            name: 'auth-signup',
            component: () => import('./views/signup.vue'),
            meta: {
                redirectIfLoggedIn: true,
            },
        },
        {
            path: '/forgot-password',
            name: 'auth-forgot-password',
            component: () => import('./views/forgotPassword.vue'),
            meta: {
                redirectIfLoggedIn: true,
            },
        },
        {
            path: '/reset-password/:token',
            name: 'auth-reset-password',
            component: () => import('./views/resetPassword.vue'),
            meta: {
                redirectIfLoggedIn: true,
            },
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('./views/dashboard.vue'),
            children: [
                
            ]
        },
        {
            path: '*',
            name: 'notfound',
            component: () => import('./views/notfound.vue'),
        },
    ],
})

// Routes authentication middleware
router.beforeEach((to, from, next) => {
    if(to.matched.some(route => route.meta.redirectIfLoggedIn)){
        const isLoggedIn = isUserLoggedIn()
        if(isLoggedIn){
            next({ name: 'dashboard' })
        }
    }

    next()
})

export default router