import Vue from 'vue'
import Vuex from 'vuex'
import { getUser } from './auth'
import { api } from './api'

// Use Vuex
Vue.use(Vuex)

// State
const state = () => ({
    user: getUser(),
    token: null,
    rooms: [],
    reservations: [],
    timeZones: [],
})

// Getters
const getters = {
    user: state => state.user,
    token: state => state.token,
    rooms: state => state.rooms,
    reservations: state => state.reservations,
    timeZones: state => state.timeZones,
}

// Mutations
const mutations = {
    setUser: (state, user) => {
        state.user = user
    },
    setToken: (state, token) => {
        state.token = token
    },
    setRooms: (state, rooms) => {
        state.rooms = rooms
    },
    setReservations: (state, reservations) => {
        state.reservations = reservations
    },
    setTimeZones: (state, timeZones) => {
        state.timeZones = timeZones
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
    updateProfile({ commit, state}, data){
        return new Promise((resolve, reject) => {
            api.put(`v1/${data.uuid}/profile`, data)
            .then(response => {
                // Commit to state
                commit('setUser', response.content)

                resolve(response.data)
            })
            .catch(error => reject(error))
        })
    },
    addRoom({ commit, state, dispatch}, data){
        return new Promise((resolve, reject) => {
            api.post("v1/rooms", data)
            .then(response => {
                // Dispatch action
                dispatch('fetchRooms')

                resolve(response.data)
            })
            .catch(error => reject(error))
        })
    },
    bookRoom({ commit, state, dispatch}, data){
        return new Promise((resolve, reject) => {
            api.post("v1/reservations", data)
            .then(response => {
                // Dispatch action
                dispatch('fetchReservations')

                resolve(response.data)
            })
            .catch(error => reject(error))
        })
    },
    fetchRooms({ commit, state}, data){
        return new Promise((resolve, reject) => {
            api.get("v1/rooms", data)
            .then(response => {
                // Commit state
                commit('setRooms', response.data.content)

                resolve(response.data)
            })
            .catch(error => reject(error))
        })
    },
    fetchReservations({ commit, state}, data){
        return new Promise((resolve, reject) => {
            api.get("v1/reservations", data)
            .then(response => {
                // Commit state
                commit('setReservations', response.data.content)

                resolve(response.data)
            })
            .catch(error => reject(error))
        })
    },
    fetchReservationsRate({ commit, state}, data){
        return new Promise((resolve, reject) => {
            api.get("v1/reservations/rate", data)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => reject(error))
        })
    },
    fetchTimeZones({ commit, state}, data){
        return new Promise((resolve, reject) => {
            api.get("v1/timezone", data)
            .then(response => {
                // Commit state
                commit('setTimeZones', response.data.content)

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