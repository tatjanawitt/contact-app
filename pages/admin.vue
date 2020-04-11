<template>
  <v-container>
    <v-tabs>
      <v-tab to="/admin/contacts">
        <v-icon left v-text="'mdi-account-multiple'" />{{ $t('links.contacts') }}
      </v-tab>
      <v-tab to="/admin/tags">
        <v-icon left v-text="'mdi-tag-multiple'" />{{ $t('links.tags') }}
      </v-tab>
    </v-tabs>
    <router-view />
  </v-container>
</template>

<script>
export default {
  middleware: ['auth-admin']
}
</script>
