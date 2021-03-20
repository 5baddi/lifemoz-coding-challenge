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

}

export default new Vuex.Store({
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
})