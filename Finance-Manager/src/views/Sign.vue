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
        <v-form fast-fail @submit.prevent>

          <v-text-field :rules="emailRules" label="Email" prepend-icon="mdi-email"></v-text-field>
          <v-text-field :rules="firstNameRules" label="First Name" prepend-icon="mdi-account"></v-text-field>
          <v-text-field
            :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
            :type="visible ? 'text' : 'password'"
            label="Password"
            :rules="passwordRules"
            prepend-icon="mdi-key"
            v-model="password"
            @click:append-inner="visible = !visible"
          ></v-text-field>
          <v-text-field
            :append-inner-icon="visible2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="visible2 ? 'text' : 'password'"
            label="Confirm Password"
            :rules="confirmPasswordRules()"
            prepend-icon="mdi-key"
            v-model="confirmPassword"
          ></v-text-field>

          <v-btn class="mt-2" type="submit" block>Submit</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <p style="text-align: center; margin-top: 18%;">&copy Blavblav Inc - June 2024</p>
  </v-app>
</template>
<script>
export default {
  name: 'Sign',
  data: () => {
    return ({
      visible: false,
      visible2: false,
      password: '',
      confirmPassword: '',
      firstNameRules: [
        value => {
          if (value?.length < 3) {
            return 'First name must be at least 3 characters.';
          } else if (!/[a-z]/i.test(value)) {
            return 'First name must contain only letters.';
          }
        },
      ],
      emailRules: [
        value => {
          if (value?.length < 3) {
            return 'Email must be at least 3 characters.';
          }
        }
      ],
      passwordRules: [
        value => {
          if (value?.length < 5) {
            return 'Password must be at least 5 characters.';
          }
        }
      ],
      confirmPasswordRules: function() {
        return [
          value => {
            if (value !== this.password) {
              return 'Password must be the same.';
            }
          }
        ];
      }
    });
  },
}
</script>
