<template>
  <v-app>
    <v-app-bar app color="orange lighten-4">
      <v-btn text to="/contacts">
        Kontakte
      </v-btn>
      <v-spacer />
      <div>
        <v-btn text>
          Login
        </v-btn>
        <v-btn text>
          Register
        </v-btn>
      </div>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
export default {
  middleware: 'load-contacts'
}
</script>
