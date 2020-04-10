<template>
  <v-container>
    <div class="display-2 ma-4 d-flex justify-center" v-text="$t('userInfo.login')" />
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
        this.$store.dispatch('snackbar/create', {
          text: this.$t('userInfo.logSuccess') + this.$auth.user.name
        })
        this.$router.push('/')
      } catch {
        this.$store.dispatch('snackbar/create', {
          color: 'red',
          text: this.$t('userInfo.logError')
        })
      }
    }
  }
}
</script>
