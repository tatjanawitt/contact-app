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
        <v-btn large tile text :to="start.route">
          <v-icon left v-text="start.icon" />{{ start.text }}
        </v-btn>
        <span v-for="item in items" :key="item.icon + Math.random()">
          <v-btn v-if="$auth.user" large text tile :to="item.route">
            <v-icon left v-text="item.icon" />{{ item.text }}
          </v-btn>
        </span>
        <v-btn v-if="$auth.user && $auth.user.admin" large tile text :to="admin.route">
          <v-icon left v-text="admin.icon" />{{ admin.text }}
        </v-btn>
      </span>

      <v-spacer />
      <div v-if="$auth.loggedIn">
        <v-btn class="hidden-sm-and-down" large text tile>
          <v-icon left v-text="'mdi-account'" />{{ $auth.user.name }}
        </v-btn>
        <v-btn large text @click="$auth.logout()">
          {{ $t('userInfo.logout') }}<v-icon right v-text="'mdi-logout-variant'" />
        </v-btn>
      </div>
      <div v-else class="hidden-sm-and-down">
        <span v-for="item in users" :key="item.icon + Math.random()">
          <v-btn large text tile :to="item.route">
            <v-icon left v-text="item.icon" />{{ item.text }}
          </v-btn>
        </span>
      </div>
      <v-avatar class="language ml-2" size="26px" @click="changeLang(language === 'de' ? 'en': 'de')">
        <v-img :src="language === 'de' ? '/en.svg' : '/de.svg'" />
      </v-avatar>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary class="secondary" dark>
      <v-list class="d-flex flex-column">
        <div v-if="$auth.loggedIn" class="d-flex flex-column">
          <v-chip class="justify-start primary" x-large label tile>
            <v-icon left v-text="'mdi-account'" />{{ $auth.user.name }}
          </v-chip>
          <v-divider class="mx-4" />
        </div>
        <div v-else class="d-flex flex-column">
          <span v-for="item in users" :key="item.icon + Math.random()">
            <v-btn class="justify-start" x-large text tile :to="item.route">
              <v-icon left v-text="item.icon" />{{ item.text }}
            </v-btn>
          </span>
        </div>
        <v-btn class="justify-start" x-large text :to="start.route">
          <v-icon left v-text="start.icon" />{{ start.text }}
        </v-btn>
        <v-divider class="mx-4" />
        <div v-for="item in items" :key="item.icon + Math.random()" class="d-flex flex-column">
          <v-btn v-if="$auth.user" class="justify-start" x-large text :to="item.route">
            <v-icon left v-text="item.icon" />{{ item.text }}
          </v-btn>
          <v-divider v-if="$auth.user" class="mx-4" />
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
    return { drawer: false }
  },
  computed: {
    start () {
      return { text: this.$t('links.home'), icon: 'mdi-home', route: '/' }
    },
    items () {
      return [
        { text: this.$t('links.birthdays'), icon: 'mdi-cake-variant', route: '/birthdays' },
        { text: this.$t('links.contacts'), icon: 'mdi-account-group', route: '/contacts' }
      ]
    },
    admin () { return { text: this.$t('links.admin'), icon: 'mdi-database-edit', route: '/admin/contacts' } },
    users () {
      return [
        { text: this.$t('links.login'), icon: 'mdi-login-variant', route: '/login' },
        { text: this.$t('links.register'), icon: 'mdi-account-box-outline', route: '/register' }
      ]
    },
    language () { return this.$i18n.locale }
  },
  methods: {
    changeLang (lang) { this.$i18n.locale = lang }
  }
}
</script>

<style>
.language {
  cursor: pointer;
}
</style>
