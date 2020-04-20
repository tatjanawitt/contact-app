<template>
  <div>
    <NavbarMobile
      :start="start"
      :items="items"
      :admin="admin"
      :users="users"
      :nav="nav"
    />
    <v-app-bar app text dense class="secondary" dark>
      <v-avatar size="36px" class="mr-2">
        <v-img src="https://cdn.pixabay.com/photo/2015/11/03/08/58/meeting-1019875__340.jpg" />
      </v-avatar>

      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="nav.drawer = !nav.drawer" />
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
        <v-btn large text @click="logout()">
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

      <v-avatar
        class="language mx-2" size="26px"
        @click="changeLang(language === 'de' ? 'en': 'de')"
      >
        <v-img :src="language === 'de' ? '/en.svg' : '/de.svg'" />
      </v-avatar>
    </v-app-bar>
  </div>
</template>

<script>
import NavbarMobile from '@/layouts/navbar-mobile'
export default {
  components: { NavbarMobile },
  data () {
    return { nav: { drawer: false } }
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
    changeLang (lang) { this.$i18n.locale = lang },
    logout () {
      this.$router.push('/')
      this.$store.dispatch('users/logout')
      this.$auth.logout()
      this.$store.commit('RELOAD')
    }
  }
}
</script>

<style>
.language { cursor: pointer; }
</style>
