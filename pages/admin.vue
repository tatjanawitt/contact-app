<template>
  <v-container>
    <v-tabs>
      <v-tab to="/admin/contacts">
        <v-icon left>
          mdi-account-multiple
        </v-icon>
        Kontakte
      </v-tab>
      <v-tab to="/admin/tags">
        <v-icon left>
          mdi-tag-multiple
        </v-icon>
        Stichworte
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
