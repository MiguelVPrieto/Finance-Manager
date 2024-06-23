<template>
  <v-app theme="dark">
    <v-card class="mx-auto" width="400" style="margin-left: 60%; margin-top: 17%;">
      <template v-slot:title>
        <span class="font-weight-black">Welcome to Finance Manager</span>
      </template>
      <v-card-text class="bg-surface-light pt-4">
        <v-form ref="form" fast-fail @submit.prevent="createAccount">
          <v-text-field v-model="formData.email" :rules="emailRules" label="Email" prepend-icon="mdi-email"></v-text-field>
          <v-text-field v-model="formData.firstName" :rules="firstNameRules" label="First Name" prepend-icon="mdi-account"></v-text-field>
          <v-text-field
            :append-inner-icon="visible? 'mdi-eye' : 'mdi-eye-off'"
            :type="visible? 'text' : 'password'"
            label="Password"
            :rules="passwordRules"
            prepend-icon="mdi-key"
            v-model="formData.password"
            @click:append-inner="visible =!visible"
          ></v-text-field>
        </v-form>
        <v-alert v-if="isUsed" type="error" style="margin-top: 1%; margin-bottom: 5%; text-align: center;">Account with this email already exists</v-alert>
        <v-btn class="mt-2" type="submit" block>Create</v-btn>
      </v-card-text>
    </v-card>
    <p style="text-align: center; margin-top: 18%;">&copy Blavblav Inc - June 2024</p>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Sign',
  data: () => ({
    visible: false,
    isUsed: false,
    formData: {
      firstName: '',
      email: '',
      password: ''
    },
    emailRules: [
      value =>!!value || 'Email is required',
      value => /.+@.+\..+/.test(value) || 'Email must be valid'
    ],
    firstNameRules: [
      value =>!!value || 'First name is required',
      value => (value && value.length >= 3) || 'First name must be at least 3 characters'
    ],
    passwordRules: [
      value =>!!value || 'Password is required',
      value => (value && value.length >= 5) || 'Password must be at least 5 characters'
    ]
  }),
  methods: {
    async createAccount() {
      if (this.$refs.form.validate()) {
        if (this.formData.email && this.formData.firstName && this.formData.password) {
          try {
            const response = await axios.post('http://localhost:8080/create-account', this.formData);
            this.isUsed = response.data.isUsed === true;
            if (this.isUsed) {
              console.log('Email already used');
            } else {
              console.log(response.data);
              this.$router.push('/');
            }
          } catch (error) {
            console.error('There was an error!', error);
            this.$emit('error', 'Error creating user');
          }
        } else {
          console.error('Please fill in all fields');
        }
      }
    }
  }
}
</script>
