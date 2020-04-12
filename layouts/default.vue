<template>
  <v-app>
    <Navbar />
    <v-content>
      <v-sheet :height="height()" color="rgba(255, 255, 255, 0.5)">
        <v-row justify="center">
          <v-col cols="12" md="8">
            <nuxt />
          </v-col>
        </v-row>
      </v-sheet>
    </v-content>
    <v-snackbar
      v-for="(snackbar, index) in snackbars.filter(s => s.showing)"
      :key="snackbar.text + Math.random()"
      :value="snackbar.showing"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      :style="`bottom: ${(index * 60) + 8}px`"
      @input="removeSnackbar(snackbar)"
    >
      {{ snackbar.text }}
      <v-btn icon @click="removeSnackbar(snackbar)">
        <v-icon v-text="'mdi-close-circle'" />
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import Navbar from '@/layouts/navbar'
export default {
  middleware: 'load-contacts',
  components: { Navbar },
  computed: {
    ...mapState({
      snackbars: state => state.snackbar.snackbars
    })
  },
  methods: {
    removeSnackbar (snackbar) {
      this.$store.dispatch('snackbar/remove', snackbar)
    },
    height () {
      return window.innerHeight + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  background-image: url("../static/event.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
