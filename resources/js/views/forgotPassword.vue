<template>
    <b-container fluid>
        <b-row class="main-card" align-v="center" align-h="center">
            <b-col md="6">
                <b-card no-body class="overflow-hidden">
                    <b-row no-gutters>
                        <b-col md="4">
                            <b-card-img src="./img/one.jpg" alt="Image" class="rounded-0 card-img"></b-card-img>
                        </b-col>
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

                                <b-row align-h="center">
                                    <b-col cols="auto">
                                        <b-link href="#">< Retour à la page de connexion</b-link>
                                    </b-col>
                                </b-row>
                            </b-card-body>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import { BCard, BForm, BFormGroup, BFormInput, BLink } from 'bootstrap-vue'

export default{
    components: {
        BCard,
        BForm,
        BFormGroup,
        BFormInput,
        BLink
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
};
</script>