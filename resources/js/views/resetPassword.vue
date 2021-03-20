<template>
    <b-container fluid>
        <b-row class="main-card" align-v="center" align-h="center">
            <b-col md="6">
                <b-card no-body class="overflow-hidden">
                    <b-row no-gutters>
                        <Sidebar></Sidebar>
                        <b-col md="8">
                            <b-card-body title="Réinitialiser le mot de passe">
                                <b-form @submit="resetPassword" class="mt-3 mb-3">
                                    <b-form-group
                                        id="password-group"
                                        label="Mot de passe :"
                                        label-for="password">

                                        <b-form-input
                                        id="password"
                                        v-model="password"
                                        type="password"
                                        placeholder="Entrer un mot de passe"
                                        description="Votre mot de passe doit comporter entre 8 et 20 caractères, contenir des lettres et des chiffres."
                                        :state="confirmedPassword"
                                        required>
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
                                        :state="confirmedPassword"
                                        required>
                                        </b-form-input>

                                        <b-form-invalid-feedback :state="confirmedPassword">
                                            Le mot de passe de confirmation ne correspond pas au mot de passe.
                                        </b-form-invalid-feedback>
                                    </b-form-group>

                                    <b-row align-h="end">
                                        <b-col cols="auto">
                                            <b-button type="submit" ref="submitBtn" variant="primary" :disabled="!confirmedPassword">Réinitialiser</b-button>
                                        </b-col>
                                    </b-row>
                                </b-form>

                                <b-row align-h="center" class="mt-5">
                                    <b-col cols="auto">
                                        <b-link :to="{ name: 'auth-signin' }"><i class="fas fa-chevron-left"></i> Retour à la page de connexion</b-link>
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
import { BCard, BForm, BFormGroup, BFormInput, BLink } from 'bootstrap-vue'
import Footer from './partials/footer.vue'
import Sidebar from './partials/sidebar.vue'

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
        confirmedPassword(){
            return this.password === this.confirmPassword && this.password !== ''
        }
    },
    methods: {
        resetPassword(event){
            event.preventDefault()

            // Disable button
            this.$refs.submitBtn.setAttribute('disabled', true)

            // Dispatch API action
            this.$store.dispatch('verifyToken', {
                    email: this.$route.query.email,
                    token: this.$route.params.token,
                    password: this.password
                })
                .then(response => {
                    this.$router.replace('/')
                        .then(() => {
                            this.$bvToast.toast(response.message, {
                                title: 'C\'est fait!',
                                variant: 'success',
                                solid: true,
                                autoHideDelay: 5000
                            })
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
                    this.$refs.submitBtn.removeAttribute('disabled')
                })
        }
    },
    data(){
        return {
            password: '',
            confirmPassword: '',
        }
    }
}
</script>