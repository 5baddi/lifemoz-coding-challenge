<template>
    <b-container fluid>
        <b-row class="main-card" align-v="center" align-h="center">
            <b-col md="10">
                <b-card no-body class="overflow-hidden" style="min-height:50vh;">
                    <b-card-body>
                        <b-tabs fill>
                            <b-tab @click="active = 'dashboard'" :active="active === 'dashboard'" title="Dashboard">
                                
                            </b-tab>
                            <b-tab @click="active = 'rooms'" :active="active === 'rooms'" title="Rooms">
                                <b-row>
                                    <b-col md="4">
                                        <b-form @submit="addRoom" class="mt-3 mb-3">
                                            <b-form-group
                                                id="room-group"
                                                label="Nom:"
                                                label-for="room">
                                                <b-form-input
                                                id="room"
                                                v-model="room"
                                                type="text"
                                                placeholder="Entrer le nom"
                                                required>
                                                </b-form-input>
                                            </b-form-group>

                                            <b-row align-h="end">
                                                <b-col cols="12">
                                                    <b-button block type="submit" ref="submitBtn" variant="primary" :disabled="!validRoomForm">Ajouter</b-button>
                                                </b-col>
                                            </b-row>
                                        </b-form>
                                    </b-col>
                                    <b-col md="8">
                                        <b-table class="mt-3" striped hover :items="rooms" :fields="roomFields"></b-table>
                                    </b-col>
                                </b-row>
                            </b-tab>
                            <b-tab @click="active = 'rservations'" :active="active === 'rservations'" title="Reservations">
                            
                            </b-tab>
                            <b-tab @click="active = 'profile'" :active="active === 'profile'" title="Update profile">
                            
                            </b-tab>
                            <b-tab @click="logout" title="Logout"></b-tab>
                        </b-tabs>
                    </b-card-body>
                </b-card>
                <Footer></Footer>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import Footer from './partials/footer.vue'
import Sidebar from './partials/sidebar.vue'
import { isUserLoggedIn } from '../auth'
import { BTab, BTable } from 'bootstrap-vue'
import SecureLS from 'secure-ls'

export default{
    name: 'Dashbaord',
    components: {
        Footer,
        Sidebar,
        BTab,
        BTable,
    },
    computed: {
        validRoomForm(){
            return this.room !== '';
        }
    },
    methods: {
        logout(){
            this.$store.dispatch('signOut')
                .then(response => {
                    let ls = new SecureLS()
                    ls.remove('user')
                    ls.remove('token')
                    
                    this.$router.replace('/')
                        .then(() => {
                            this.$bvToast.toast('👋', {
                                title: 'Goodbay..',
                                variant: 'success',
                                solid: true,
                                autoHideDelay: 5000
                            })
                        })
                })
        },
        addRoom(event){
            event.preventDefault()
        }
    },
    beforeRouteEnter (to, from, next) {
        const isLoggedIn = isUserLoggedIn()
        if(!isLoggedIn){
            next({ name: 'auth-signin' })
        }

        next()
    },
    data(){
        return {
            active: 'dashboard',
            room: '',
            rooms: [],
            roomFields: [
                {
                    key: 'name',
                    label: 'Nom',
                    sortable: true
                },
            ]
        }
    }
}
</script>