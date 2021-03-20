<template>
    <b-container fluid>
        <b-row class="main-card" align-v="center" align-h="center">
            <b-col md="6">
                <b-card no-body class="overflow-hidden">
                    <b-row no-gutters>
                        <Sidebar></Sidebar>
                        <b-col md="8">
                            <b-card-body title="S'identifier">
                                <b-form @submit="signIn" class="mt-3 mb-3">
                                    <b-form-group
                                        id="email-group"
                                        label="Adresse e-mail:"
                                        label-for="email">
                                        <b-form-input
                                        id="email"
                                        v-model="email"
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
                                        v-model="password"
                                        type="password"
                                        placeholder="Entrer vote mot de passe"
                                        required>
                                        </b-form-input>

                                        <b-link :to="{ name: 'auth-forgot-password' }" class="text-sm">Mot de passe oublié?</b-link>
                                    </b-form-group>

                                    <b-row align-h="end">
                                        <b-col cols="auto">
                                            <b-button type="submit" variant="primary" :disabled="!validForm">Se connecter</b-button>
                                        </b-col>
                                    </b-row>
                                </b-form>

                                <b-row align-h="center">
                                    <b-col cols="auto">
                                        Nouveau sur notre plateforme? <b-link :to="{ name: 'auth-signup' }">Créer un compte</b-link>
                                    </b-col>
                                </b-row>
                            </b-card-body>
                        </b-col>
                    </b-row>
                </b-card>
                <Footer></Footer>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import SecureLS from 'secure-ls'
import { BCard, BForm, BFormGroup, BFormInput, BLink } from 'bootstrap-vue'
import Footer from './footer.vue'
import Sidebar from './sidebar.vue'

export default{
    components: {
        BCard,
        BForm,
        BFormGroup,
        BFormInput,
        BLink,
        Footer,
        Sidebar,
    },
    computed: {
        validForm(){
            return this.email !== '' && this.password !== ''
        }
    },
    methods: {
        signIn(){

        }
    },
    data(){
        return {
            email: '',
            password: ''
        }
    },
    created(){
        // Remove old local storage
        let ls = new SecureLS()
        ls.remove('user')
        ls.remove('token')
    }
}
</script>