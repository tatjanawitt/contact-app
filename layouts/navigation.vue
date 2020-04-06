<template>
  <div>
    <v-app-bar text app>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer" />
      <v-layout class="hidden-sm-and-down">
        <div v-for="item in items" :key="item.icon + Math.random()">
          <v-btn large text :to="item.route">
            <v-icon left v-text="item.icon" />{{ item.text }}
          </v-btn>
        </div>
        <v-btn v-if="$auth.user && $auth.user.admin" large text :to="admin.route">
          <v-icon left v-text="admin.icon" />{{ admin.text }}
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
        <span v-for="item in users" :key="item.icon + Math.random()">
          <v-btn large text :to="item.route">
            <v-icon left v-text="item.icon" />{{ item.text }}
          </v-btn>
        </span>
        <!--v-btn large text to="/login">
          <v-icon left v-text="'mdi-login-variant'" />Login
        </v-btn>
        <v-btn large text to="/register">
          <v-icon left v-text="'mdi-account-box-outline'" />Register
        </v-btn-->
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list class="d-flex flex-column">
        <div v-for="item in items" :key="item.icon + Math.random()" class="d-flex flex-column">
          <v-btn class="justify-start" x-large text :to="item.route">
            <v-icon left v-text="item.icon" />{{ item.text }}
          </v-btn>
        </div>
        <v-btn v-if="$auth.user && $auth.user.admin" class="justify-start" x-large text :to="admin.route">
          <v-icon left v-text="admin.icon" />{{ admin.text }}
        </v-btn>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      items: [
        { text: 'Geburtstage', icon: 'mdi-cake-variant', route: '/' },
        { text: 'Kontakte', icon: 'mdi-account-group', route: '/contacts' }
      ],
      admin: { text: 'Admin', icon: 'mdi-database-edit', route: '/admin/contacts' },
      users: [
        { text: 'Login', icon: 'mdi-login-variant', route: '/login' },
        { text: 'Register', icon: ' mdi-account-box-outline', route: '/register' }
      ]
    }
  }
}
</script>
