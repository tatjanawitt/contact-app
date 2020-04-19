<template>
  <v-container>
    <UserAuthForm :button-text="$t('userInfo.login')"
                  icon-type="mdi-login-variant"
                  :submit-form="loginUser"
    />
  </v-container>
</template>

<script>
import UserAuthForm from '@/components/user-auth-form'
export default {
  components: { UserAuthForm },
  methods: {
    async loginUser (loginInfo) {
      try {
        await this.$auth.loginWith('local', {
          data: loginInfo
        })
        this.$store.commit('RELOAD')
        this.$store.dispatch('snackbar/create', {
          text: this.$t('userInfo.logSuccess') + this.$auth.user.name
        })
        this.$router.push('/contacts')
      } catch {
        this.$store.dispatch('snackbar/create', {
          color: 'error',
          text: this.$t('userInfo.logError')
        })
      }
    }
  }
}
</script>
