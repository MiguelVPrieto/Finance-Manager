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

          <v-text-field label="Email" prepend-icon="mdi-email"></v-text-field>
          <v-text-field
            v-model="firstName"
            :rules="firstNameRules"
            label="First name"
          ></v-text-field>

          <v-text-field
            v-model="lastName"
            :rules="lastNameRules"
            label="Last name"
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
  data: () => ({
    firstName: '',
    firstNameRules: [
      value => {
        if (value?.length > 3) return true

        return 'First name must be at least 3 characters.'
      },
    ],
    lastName: '123',
    lastNameRules: [
      value => {
        if (/[^0-9]/.test(value)) return true

        return 'Last name can not contain digits.'
      },
    ],
  }),
}
</script>
