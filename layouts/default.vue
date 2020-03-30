<template>
  <v-app>
    <v-app-bar app>
      <v-btn text to="/">
        Home
      </v-btn>
      <v-btn text to="/contacts">
        Kontakte
      </v-btn>
      <v-btn text to="/admin/contacts">
        Admin
      </v-btn>
      <v-spacer />
      <div>
        <v-btn text>
          Login
        </v-btn>
        <v-btn text>
          Register
        </v-btn>
      </div>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
export default {
  middleware: 'load-contacts'
}
</script>

<style lang="scss" scoped>
main {
  background-image: url("../static/event.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
