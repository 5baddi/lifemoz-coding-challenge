<template>
    <b-container fluid>
        <b-row class="main-card" align-v="center" align-h="center">
            <b-col md="6">
                <b-card no-body class="overflow-hidden">
                    <b-row no-gutters>
                        <b-col md="4">
                            <b-card-img src="./img/one.jpg" alt="Image" class="rounded-0"></b-card-img>
                        </b-col>
                        <b-col md="8">
                            <b-card-body title="S'inscrire">
                                <b-form class="mt-3 mb-3">
                                    <b-form-group
                                        id="fullname-group"
                                        label="Nom complet :"
                                        label-for="fullname">

                                        <b-form-input
                                        id="fullname"
                                        v-model="fullname"
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
                                </b-form>

                                <b-row align-h="center">
                                    <b-col cols="auto">
                                        <b-text>Vous avez déjà un compte? <b-link href="#">Connectez-vous</b-link></b-text>
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
import { BCard, BForm, BFormGroup, BFormInput } from 'bootstrap-vue'

export default{
    components: {
        BCard,
        BForm,
        BFormGroup,
        BFormInput
    },
    computed: {
        confirmedPassword(){
            return this.password === this.confirmedPassword
        }
    },
    data(){
        return {
            fullname: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }
};
</script>