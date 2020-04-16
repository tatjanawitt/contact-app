<template>
  <div>
    <div class="display-1 my-2 center" v-text="$t('users.header')" />
    <!--SearchField
      :label="$t('contacts.tabSearch')"
      icon="mdi-magnify"
      :search="search"
    /-->
    <v-data-table
      :items="users"
      :headers="headers"
      :items-per-page="5"
      sort-by="id"
      :sort-desc="true"
      :no-results-text="$t('noData')"
      @click:row="alert()"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({ users: state => state.users.users }),
    headers () {
      return [
        { text: 'Id', value: 'id' },
        { text: this.$t('users.name'), value: 'name' },
        { text: this.$t('users.email'), value: 'email' },
        { text: this.$t('users.admin'), value: 'admin' },
        { text: this.$t('action'), value: 'actions', sortable: false, width: '150px' }
      ]
    }
  }
}
</script>
