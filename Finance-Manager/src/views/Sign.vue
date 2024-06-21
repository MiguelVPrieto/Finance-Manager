<template>
  <v-app theme="dark">
    <v-card class="mx-auto" width="400" style="margin-left: 60%; margin-top: 17%;">
      <template v-slot:title>
        <span class="font-weight-black">Welcome to Finance Manager</span>
      </template>
      <v-card-text class="bg-surface-light pt-4">
        <v-form fast-fail @submit.prevent="submitForm">
          <v-text-field v-model="formData.email" :rules="emailRules" label="Email" prepend-icon="mdi-email"></v-text-field>
          <v-text-field v-model="formData.firstName" :rules="firstNameRules" label="First Name" prepend-icon="mdi-account"></v-text-field>
          <v-text-field
            :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
            :type="visible ? 'text' : 'password'"
            label="Password"
            :rules="passwordRules"
            prepend-icon="mdi-key"
            v-model="formData.password"
            @click:append-inner="visible = !visible"
          ></v-text-field>
          <v-btn class="mt-2" type="submit" block>Create</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <p style="text-align: center; margin-top: 18%;">&copy Blavblav Inc - June 2024</p>
  </v-app>
</template>

<script>
export default {
  name: 'Sign',
  data: () => ({
    visible: false,
    formData: {
      firstName: '',
      email: '',
      password: ''
    },
    emailRules: [
      value => !!value || 'Email is required',
      value => /.+@.+\..+/.test(value) || 'Email must be valid'
    ],
    firstNameRules: [
      value => !!value || 'First name is required',
      value => (value && value.length >= 3) || 'First name must be at least 3 characters'
    ],
    passwordRules: [
      value => !!value || 'Password is required',
      value => (value && value.length >= 5) || 'Password must be at least 5 characters'
    ]
  }),
  methods: {
    async submitForm() {
      try {
        const response = await fetch('/submitForm', {  // Ensure this matches your backend endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.formData)
        });

        const result = await response.json();
        console.log(result);

        // Optionally, reset the form fields after successful submission
        this.formData.firstName = '';
        this.formData.email = '';
        this.formData.password = '';
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
}
</script>
