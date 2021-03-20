<template>
    <b-container fluid>
        <b-row class="main-card" align-v="center" align-h="center">
            <b-col md="10">
                <b-card no-body class="overflow-hidden" style="min-height:50vh;">
                    <b-card-body>
                        <b-nav tabs fill>
                            <b-nav-item @click="active = 'dashboard'" :active="active === 'dashboard'">Dashboard</b-nav-item>
                            <b-nav-item @click="active = 'rooms'" :active="active === 'rooms'">Add new room</b-nav-item>
                            <b-nav-item @click="active = 'rservations'" :active="active === 'rservations'">Set reservation</b-nav-item>
                            <b-nav-item @click="active = 'profile'" :active="active === 'profile'">Update profile</b-nav-item>
                            <b-nav-item @click="logout">Logout</b-nav-item>
                        </b-nav>
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
import { BNav } from 'bootstrap-vue'
import SecureLS from 'secure-ls'

export default{
    name: 'Dashbaord',
    components: {
        Footer,
        Sidebar,
        BNav,
    },
    methods: {
        logout(){
            this.$store.dispatch('signOut')
                .then(response => {
                    let ls = new SecureLS()
                    ls.remove('user')
                    ls.remove('token')
                    
                    this.$router.replace('/')
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
    data(){
        return {
            active: 'dashboard'
        }
    }
}
</script>