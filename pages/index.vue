<template>
  <v-container>
    <div class="display-2 ma-4 d-flex justify-center">
      Willkommen
      <div v-if="$auth.loggedIn" to="/birthdays" />
      <div v-else to="/login">
        <v-btn to="/login">
          login
        </v-btn>
        <v-btn to="/register">
          register
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  methods: {
    goToLogin () {
      this.this.$router.push('/login')
    }
  }
}
</script>
