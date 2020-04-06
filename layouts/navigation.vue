<template>
  <div>
    <v-app-bar text app>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer" />
      <v-layout class="hidden-sm-and-down">
        <v-btn large text to="/">
          <v-icon left v-text="'mdi-cake-variant'" />Geburtstage
        </v-btn>
        <v-btn large text to="/contacts">
          <v-icon left v-text="'mdi-account-group'" />Kontakte
        </v-btn>
        <v-btn v-if="$auth.user && $auth.user.admin" large text to="/admin/contacts">
          <v-icon left v-text="'mdi-database-edit'" />Admin
        </v-btn>
      </v-layout>
      <v-spacer />

      <div v-if="$auth.loggedIn">
        <v-btn large text>
          <v-icon left v-text="'mdi-account'" />{{ $auth.user.name }}
        </v-btn>
        <v-btn large text @click="$auth.logout()">
          Logout<v-icon right v-text="'mdi-logout-variant'" />
        </v-btn>
      </div>

      <div v-else>
        <v-btn large text to="/login">
          <v-icon left v-text="'mdi-login-variant'" />Login
        </v-btn>
        <v-btn large text to="/register">
          <v-icon left v-text="'mdi-account-box-outline'" />Register
        </v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list class="d-flex flex-column">
        <v-btn class="justify-start" large text to="/">
          <v-icon left v-text="'mdi-cake-variant'" />Geburtstage
        </v-btn>
        <v-btn class="justify-start" large text to="/contacts">
          <v-icon left v-text="'mdi-account-group'" />Kontakte
        </v-btn>
        <v-btn v-if="$auth.user && $auth.user.admin" class="justify-start" large text to="/admin/contacts">
          <v-icon left v-text="'mdi-database-edit'" />Admin
        </v-btn>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drawer: false
    }
  }
}
</script>
