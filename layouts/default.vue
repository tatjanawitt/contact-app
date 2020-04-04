<template>
  <v-app>
    <v-app-bar app>
      <v-btn text to="/">
        <v-icon left>
          mdi-cake-variant
        </v-icon> Geburtstage
      </v-btn>
      <v-btn text to="/contacts">
        <v-icon left>
          mdi-account-group
        </v-icon>
        Kontakte
      </v-btn>
      <v-btn text to="/admin/contacts">
        <v-icon left>
          mdi-database-edit
        </v-icon>
        Admin
      </v-btn>
      <v-spacer />
      <div>
        <v-btn text>
          <v-icon left>
            mdi-login-variant
          </v-icon>
          Login
        </v-btn>
        <v-btn text>
          <v-icon left>
            mdi-account-box-outline
          </v-icon>
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
