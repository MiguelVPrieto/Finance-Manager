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
        <v-text-field label="Email" prepend-icon="mdi-email"></v-text-field>
        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
          :type="visible ? 'text' : 'password'"
          label="Password"
          prepend-icon="mdi-key"
          @click:append-inner="visible = !visible"
        ></v-text-field>
        <v-btn style="margin-left: 38%">
          Login
        </v-btn>
      </v-card-text>
    </v-card>
    <p style="text-align: center; margin-top: 18%;">&copy Blavblav Inc - June 2024</p>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    visible: false,
  }),
}
</script>
