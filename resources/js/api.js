import axios from 'axios'
import router from './router'
import store from './store'
import SecureLS from 'secure-ls'

const api = axios.create({
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    baseURL: '/api/'
})

// api.interceptors.response.use(null, error => {
//     // Init
//     let path = "/signin"

//     // Handle each response status
//     switch(error.response.status){
//         case 401:
//             store.dispatch("signOut")
//         break
//         case 404:
//             path = "/404"
//         break
//         case 500:
//             path = "/error"
//         break
//     }

//     router.push(path).catch(() => {})
//     return Promise.reject(error)
// })

// Re set token
let ls = new SecureLS()
let token = ls.get('token')
if(token && token !== ''){
    api.defaults.headers.common.Authorization = `Bearer ${token}`
}

export { api }