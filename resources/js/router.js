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
        },
        {
            path: '/signup',
            name: 'auth-signup',
            component: () => import('./views/signup.vue'),
        },
        {
            path: '/forgot-password',
            name: 'auth-forgot-password',
            component: () => import('./views/forgotPassword.vue'),
        },
        {
            path: '/reset-password/:token',
            name: 'auth-reset-password',
            component: () => import('./views/resetPassword.vue'),
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('./views/dashboard.vue'),
            meta: {
                authentication: true,
            },
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
router.beforeEach((to, _, next) => {
    if(to.matched.some(route => route.meta.authentication)){
        const isLoggedIn = isUserLoggedIn()

        if(!isLoggedIn){
            next({ name: 'auth-signin' })
        }
    }

    return next()
})

export default router