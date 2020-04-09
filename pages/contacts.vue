<template>
  <v-container>
    <router-view />
  </v-container>
</template>

<script>
export default {
  middleware: ['auth-user']
}
</script>
