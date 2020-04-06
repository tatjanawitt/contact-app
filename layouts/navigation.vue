<template>
  <div>
    <v-app-bar flat text dense app>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer" />
      <v-layout class="hidden-sm-and-down">
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
      </v-layout>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      left
      temporary
    >
      <v-list nav dense>
        <v-divider />
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item
            v-for="item in links"
            :key="item.icon"
            :to="item.route"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
  <!--v-row>
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
  </v-row-->
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      links: [
        { text: 'Geburtstage', icon: 'mdi-cake-variant', route: '/' },
        { text: 'Kontakte', icon: 'mdi-account-group', route: '/contacts' },
        { text: 'Admin', icon: 'mdi-database-edit', route: '/admin/contacts' },
        { text: 'Login', icon: 'mdi-login-variant', route: '/login' },
        { text: 'Register', icon: ' mdi-account-box-outline', route: '/register' },
        { text: 'Logout', icon: 'mdi-logout-variant', route: '/' }
      ],
      mini: true,
      group: null
    }
  },
  computed: {
  },
  watch: {
    group () {
      this.drawer = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
