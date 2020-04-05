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
      <v-btn v-if="$auth.user && $auth.user.admin" text to="/admin/contacts">
        <v-icon left>
          mdi-database-edit
        </v-icon>
        Admin
      </v-btn>
      <v-spacer />
      <div v-if="$auth.loggedIn">
        {{ $auth.user.email }}
        <v-btn text @click="$auth.logout()">
          Logout
          <v-icon right>
            mdi-logout-variant
          </v-icon>
        </v-btn>
      </div>
      <div v-else>
        <v-btn text to="/login">
          <v-icon left>
            mdi-login-variant
          </v-icon>
          Login
        </v-btn>
        <v-btn text to="/register">
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
    <v-snackbar
      v-for="(snackbar, index) in snackbars.filter(s => s.showing)"
      :key="snackbar.text + Math.random()"
      :value="snackbar.showing"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      :style="`bottom: ${(index * 60) + 8}px`"
      @input="removeSnackbar(snackbar)"
    >
      {{ snackbar.text }}
      <v-btn text @click="removeSnackbar(snackbar)">
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware: 'load-contacts',
  computed: {
    ...mapState({
      snackbars: state => state.snackbar.snackbars
    })
  },
  methods: {
    removeSnackbar (snackbar) {
      this.$store.dispatch('snackbar/remove', snackbar)
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  background-image: url("../static/event.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
