<template>
  <v-app id="inspire">
    <Navbar />
    <v-content>
      <v-container pa-0 fluid>
        <nuxt />
      </v-container>
      <v-snackbar
        v-for="(snackbar, index) in snackbars.filter(s => s.showing)"
        :key="snackbar.text + Math.random()"
        :value="snackbar.showing"
        :timeout="snackbar.timeout"
        :color="snackbar.color"
        :style="`bottom: ${(index * 60) + 8}px`"
        @input="removeSnackbar(snackbar)"
      >
        <v-icon
          left dark
          v-text="snackbar.color === 'success' ? 'mdi-check-circle' : 'mdi-alert-circle'"
        />{{ snackbar.text }}
        <v-btn icon @click="removeSnackbar(snackbar)">
          <v-icon v-text="'mdi-close-circle'" />
        </v-btn>
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import Navbar from '@/layouts/navbar'
export default {
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

<style lang="scss">
body {
  background-image: url("/event.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #ffffff;
}
main {
  background-color: rgba(255, 255, 255, 0.5);
  height: 100%
}
#inspire {
  background: none;
}
.cardColor {
   background-color: transparent !important;
}
.center { text-align: center; }
</style>
