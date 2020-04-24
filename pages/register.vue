<template>
  <v-container>
    <UserAuthForm :button-text="$t('userInfo.register')"
                  icon-type="mdi-account-box-outline"
                  :submit-form="registerUser"
                  :has-name="true"
    />
  </v-container>
</template>

<script>
import UserAuthForm from '@/components/user-auth-form'
export default {
  components: { UserAuthForm },
  methods: {
    async registerUser (regInfo) {
      try {
        this.$nuxt.$loading.start()
        await this.$store.dispatch('users/create', regInfo)
        await this.$store.dispatch('users/login', regInfo)
        this.$store.commit('RELOAD')
        this.$store.dispatch('snackbar/create', {
          text: this.$t('userInfo.regSuccess') + this.$auth.user.name
        })
        this.$router.push('/')
        this.$nuxt.$loading.finish()
      } catch {
        this.$nuxt.$loading.finish()
        this.$store.dispatch('snackbar/create', {
          color: 'error',
          text: this.$t('userInfo.regError')
        })
      }
    }
  }
}
</script>
