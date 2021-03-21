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
                                                    <b-button block type="submit" ref="submitRoomBtn" variant="primary" :disabled="!validRoomForm">Ajouter</b-button>
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
                                <b-row align-h="center">
                                    <b-col cols="6">
                                        <b-form @submit="updateProfile" class="mt-3 mb-3">
                                            <b-form-group
                                                id="fullname-group"
                                                label="Nom complet :"
                                                label-for="fullname">

                                                <b-form-input
                                                id="fullname"
                                                v-model="user.name"
                                                type="text"
                                                placeholder="Entrez votre nom et prénom"
                                                required>
                                                </b-form-input>
                                            </b-form-group>
                                            <b-form-group
                                                id="email-group"
                                                label="Adresse e-mail :"
                                                label-for="email">

                                                <b-form-input
                                                id="email"
                                                v-model="user.email"
                                                type="email"
                                                placeholder="Entrer votre e-mail"
                                                required>
                                                </b-form-input>
                                            </b-form-group>

                                            <b-form-group
                                                id="password-group"
                                                label="Mot de passe :"
                                                label-for="password">

                                                <b-form-input
                                                id="password"
                                                v-model="user.password"
                                                type="password"
                                                placeholder="Entrer un mot de passe"
                                                description="Votre mot de passe doit comporter entre 8 et 20 caractères, contenir des lettres et des chiffres."
                                                :state="confirmedPassword">
                                                </b-form-input>
                                            </b-form-group>

                                            <b-form-group
                                                id="confirm-password-group"
                                                label="Mot de passe de confirmation :"
                                                label-for="confirm-password">

                                                <b-form-input
                                                id="confirm-password"
                                                v-model="confirmPassword"
                                                type="password"
                                                placeholder="Confirmer le mot de passe"
                                                :state="confirmedPassword">
                                                </b-form-input>

                                                <b-form-invalid-feedback :state="confirmedPassword">
                                                    Le mot de passe de confirmation ne correspond pas au mot de passe.
                                                </b-form-invalid-feedback>
                                            </b-form-group>

                                            <b-row align-h="end">
                                                <b-col cols="auto">
                                                    <b-button type="submit" ref="updateProfileBtn" variant="primary" :disabled="!validProfileForm">Mettre à jour</b-button>
                                                </b-col>
                                            </b-row>
                                        </b-form>
                                    </b-col>
                                </b-row>
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
        user(){
            return this.$store.state.user
        },
        validRoomForm(){
            return this.room !== '';
        },
        confirmedPassword(){
            if(!this.user.password || this.user.password == '')
                return true;

            return this.user.password === this.confirmPassword
        },
        validProfileForm(){
            return this.user.email !== '' && this.user.name !== '' && this.user.password == this.confirmPassword
        },
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
        },
        updateProfile(event){
            event.preventDefault()

            // Disable button
            this.$refs.updateProfileBtn.setAttribute('disabled', true)

            // Dispatch API action
            this.$store.dispatch('updateProfile', {
                    uuid: this.user.uuid, 
                    email: this.user.email, 
                    password: this.user.password,
                    fullname: this.user.name
                })
                .then(response => {
                    // Update local storage
                    let ls = new SecureLS()
                    ls.set('user', response.content)

                    this.$bvToast.toast(response.message, {
                        title: 'C\'est fait!',
                        variant: 'success',
                        solid: true,
                        autoHideDelay: 5000
                    })
                })
                .catch(error => {
                    this.$bvToast.toast(error.message, {
                        title: 'Quelque chose ne va pas!',
                        variant: 'warning',
                        solid: true,
                        autoHideDelay: 5000
                    })
                })
                .finally(() => {
                    this.$refs.updateProfileBtn.removeAttribute('disabled')
                })
        }
    },
    beforeRouteEnter (to, from, next) {
        const isLoggedIn = isUserLoggedIn()
        if(!isLoggedIn){
            next({ name: 'auth-signin' })
        }

        next()
    },
    mounted(){
        // Load user
        //if(typeof this.user === "undefined" || this.user === null || Object.values(this.user).length === 0)
        //this.loadStatistics();
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
            ],
            confirmPassword: null,
        }
    }
}
</script>