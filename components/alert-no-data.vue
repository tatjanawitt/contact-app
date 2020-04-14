<template>
  <v-alert
    class="secondary"
    dark border="top"
    icon="mdi-database-search"
    transition="scale-transition"
  >
    {{ hintText }}
  </v-alert>
</template>

<script>
export default {
  props: {
    hintText: { type: String, default: 'no Data' }
  }
}
</script>
