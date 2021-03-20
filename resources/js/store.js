import Vue from 'vue'
import Vuex from 'vuex'
import { getUser } from './auth'
import { api } from './api'

// Use Vuex
Vue.use(Vuex)

// State
const state = () => ({
    user: getUser(),
    token: null
})

// Getters
const getters = {
    user: state => state.user,
    token: state => state.token,
}

// Mutations
const mutations = {
    setUser: (state, user) => {
        state.user = user
    },
    setToken: (state, token) => {
        state.token = token
    }
}

// Actions
const actions = {
    signIn({ commit, state}, data){
        return new Promise((resolve, reject) => {
            api.post("v1/signin", data)
            .then(response => {
                let content = response.data.content

                // Commit to state
                commit('setUser', content.user)
                commit('setToken', content.token)

                resolve(response.data)
            })
            .catch(error => reject(error))
        })
    },
    signUp({ commit, state}, data){
        return new Promise((resolve, reject) => {
            api.post("v1/signup", data)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => reject(error))
        })
    },
    resetPassword({ commit, state}, data){
        return new Promise((resolve, reject) => {
            api.post("v1/reset/password", { email: data })
            .then(response => {
                resolve(response.data)
            })
            .catch(error => reject(error))
        })
    },
    verifyToken({ commit, state}, data){
        return new Promise((resolve, reject) => {
            api.post("v1/verify/token", data)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => reject(error))
        })
    },
    signOut({ commit, state}){
        return new Promise((resolve, reject) => {
            api.post("v1/signout")
            .then(response => {
                resolve(response.data)
            })
            .catch(error => reject(error))
        })
    },
}

export default new Vuex.Store({
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
})