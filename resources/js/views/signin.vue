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

                                        <b-link href="#" class="text-sm">Mot de passe oublié?</b-link>
                                    </b-form-group>

                                    <b-row align-h="end">
                                        <b-col cols="auto">
                                            <b-button type="submit" variant="primary" :disabled="!validForm">Se connecter</b-button>
                                        </b-col>
                                    </b-row>
                                </b-form>

                                <b-row align-h="center">
                                    <b-col cols="auto">
                                        <b-text>Nouveau sur notre plateforme? <b-link href="#">Créer un compte</b-link></b-text>
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
            return this.email !== '' && this.password !== '';
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
};
</script>