<template>
  <v-app theme="dark">
    <v-card
      class="mx-auto"
      width="400"
      style="margin-left: 60%; margin-top: 17%;"
    >
      <template v-slot:title>
        <span class="font-weight-black">Welcome to Finance Manager</span>
      </template>

      <v-card-text class="bg-surface-light pt-4">
        <v-text-field v-model="email" label="Email" prepend-icon="mdi-email"></v-text-field>
        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
          :type="visible ? 'text' : 'password'"
          v-model="password"
          label="Password"
          prepend-icon="mdi-key"
          @click:append-inner="visible = !visible"
        ></v-text-field>
        <p v-if="!isValid" style="color: red; margin-top: 1%; margin-bottom: 5%; text-align: center; ">Account does not exist or invalid credentials</p>
        <v-btn @click="login" style="margin-left: 38%;">
          Login
        </v-btn>
        <v-btn to="/sign" style="margin-top: 3%; margin-left: 29%" variant="text" class="text-none">
          Create Account
        </v-btn>
      </v-card-text>
    </v-card>
    <p style="text-align: center; margin-top: 18%;">&copy Blavblav Inc - June 2024</p>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data: () => ({
    visible: false,
    email: '',
    password: '',
    isValid: true
  }),
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8080/login', {
          email: this.email,
          password: this.password
        });
        this.isValid = response.data.isValid;
        if (this.isValid) {
          console.log('Login successful');
          this.$router.push('/home');
        } else {
          console.log('Invalid credentials');
          this.isValid = false;
        }
      } catch (error) {
        console.error('Error logging in:', error);
        this.isValid = false;
      }
    }
  }
}
</script>
