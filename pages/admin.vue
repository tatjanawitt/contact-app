<template>
  <v-container>
    <v-toolbar color="rgba(255, 255, 255, 0.6)" tabs flat>
      <v-tabs>
        <v-tab to="/admin/contacts">
          <v-icon left v-text="'mdi-account-multiple'" />{{ $t('links.contacts') }}
        </v-tab>
        <v-tab to="/admin/tags">
          <v-icon left v-text="'mdi-tag-multiple'" />{{ $t('links.tags') }}
        </v-tab>
        <v-tab to="/admin/users">
          <v-icon left v-text="'mdi-account-multiple'" />{{ $t('links.users') }}
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <router-view />
  </v-container>
</template>

<script>
export default {
  middleware: ['auth-admin']
}
</script>
