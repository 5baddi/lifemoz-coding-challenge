import Vue from 'vue'
import Vuex from 'vuex'
import { getUser } from './auth'
import { api } from './api'

// Use Vuex
Vue.use(Vuex)

// State
const state = () => ({
    user: getUser()
})

// Getters
const getters = {

}

// Mutations
const mutations = {

}

// Actions
const actions = {
    resetPassword({ commit, state}, data){
        return new Promise((resolve, reject) => {
            api.post("v1/reset/password", { email: data })
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