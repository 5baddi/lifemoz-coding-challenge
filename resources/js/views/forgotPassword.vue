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
                                            <b-button type="submit" variant="primary" :disabled="!validForm">Envoyer le lien de réinitialisation</b-button>
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
            return this.email !== '';
        }
    },
    methods: {
        sendLink(){

        }
    },
    data(){
        return {
            email: '',
        }
    },
}
</script>