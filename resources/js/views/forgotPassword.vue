<template>
    <b-container fluid>
        <b-row class="main-card" align-v="center" align-h="center">
            <b-col md="6">
                <b-card no-body class="overflow-hidden">
                    <b-row no-gutters align-v="center">
                        <Sidebar></Sidebar>
                        <b-col md="8">
                            <b-card-body title="Mot de passe oublié?">
                                <b-form @submit="sendLink" class="mt-3 mb-3">
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

                                    <b-row align-h="end">
                                        <b-col cols="auto">
                                            <b-button type="submit" ref="submitBtn" variant="primary" :disabled="!validForm">Envoyer le lien de réinitialisation</b-button>
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
import { BCard, BForm, BFormGroup, BFormInput } from 'bootstrap-vue'
import Footer from './partials/footer.vue'
import Sidebar from './partials/sidebar.vue'

export default{
    components: {
        BCard,
        BForm,
        BFormGroup,
        BFormInput,
        Footer,
        Sidebar,
    },
    computed: {
        validForm(){
            return this.email !== '';
        }
    },
    methods: {
        sendLink(event){
            event.preventDefault()

            // Disable button
            this.$refs.submitBtn.setAttribute('disabled', true)

            // Dispatch API action
            this.$store.dispatch('resetPassword', this.email)
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
            email: '',
        }
    },
}
</script>