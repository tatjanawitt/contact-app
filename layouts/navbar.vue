<template>
  <div>
    <v-app-bar text dense class="secondary" dark app>
      <v-avatar size="36px" class="mr-2">
        <v-img src="https://cdn.pixabay.com/photo/2015/11/03/08/58/meeting-1019875__340.jpg" />
      </v-avatar>
      <v-app-bar-nav-icon class="hidden-md-and-up"
                          @click.stop="drawer = !drawer"
      />
      <span class="hidden-sm-and-down">
        <span v-for="item in items" :key="item.icon + Math.random()">
          <v-btn large text tile :to="item.route">
            <v-icon left v-text="item.icon" />{{ item.text }}
          </v-btn>
        </span>
        <v-btn v-if="$auth.user && $auth.user.admin" large tile text :to="admin.route">
          <v-icon left v-text="admin.icon" />{{ admin.text }}
        </v-btn>
      </span>

      <v-spacer />
      <div v-if="$auth.loggedIn">
        <v-btn large text tile>
          <v-icon left v-text="'mdi-account'" />{{ $auth.user.name }}
        </v-btn>
        <v-btn large text @click="$auth.logout()">
          Logout<v-icon right v-text="'mdi-logout-variant'" />
        </v-btn>
      </div>
      <div v-else>
        <span v-for="item in users" :key="item.icon + Math.random()">
          <v-btn large text tile :to="item.route">
            <v-icon left v-text="item.icon" />{{ item.text }}
          </v-btn>
        </span>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary class="secondary" dark>
      <v-list class="d-flex flex-column">
        <div v-for="item in items" :key="item.icon + Math.random()" class="d-flex flex-column">
          <v-btn class="justify-start" x-large text :to="item.route">
            <v-icon left v-text="item.icon" />{{ item.text }}
          </v-btn>
          <v-divider class="mx-4" />
        </div>
        <v-btn v-if="$auth.user && $auth.user.admin" class="justify-start" x-large text :to="admin.route">
          <v-icon left v-text="admin.icon" />{{ admin.text }}
        </v-btn>
        <v-divider v-if="$auth.user && $auth.user.admin" class="mx-4" />
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
        { text: 'Start', icon: 'mdi-home', route: '/' },
        { text: 'Geburtstage', icon: 'mdi-cake-variant', route: '/birthdays' },
        { text: 'Kontakte', icon: 'mdi-account-group', route: '/contacts' }
      ],
      admin: { text: 'Admin', icon: 'mdi-database-edit', route: '/admin/contacts' },
      users: [
        { text: 'Login', icon: 'mdi-login-variant', route: '/login' },
        { text: 'Register', icon: 'mdi-account-box-outline', route: '/register' }
      ]
    }
  }
}
</script>
