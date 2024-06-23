<template>
  <v-app theme="dark">
    <v-card height="100%">
      <v-layout>
        <v-navigation-drawer
          expand-on-hover
          rail
          height="100%"
        >
          <v-list>
            <v-list-item
              prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
              subtitle="sandra_a88@gmailcom"
              title="Sandra Adams"
            ></v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-home" title="Home" value="home"></v-list-item>
            <v-list-item prepend-icon="mdi-finance" title="Graphs" value="graphs"></v-list-item>
            <v-list-item prepend-icon="mdi-cog" title="Settings" value="settings"></v-list-item>
          </v-list>
        </v-navigation-drawer>

        <v-main style="height: 250px"></v-main>
      </v-layout>
      <p style="text-align: center; margin-top: 18%;">&copy Blavblav Inc - June 2024</p>
    </v-card>
  </v-app>
</template>
<script>
export default {
  name: 'Home',
  mounted() {
    document.title = 'Finance Manager';
  }
}
</script>
