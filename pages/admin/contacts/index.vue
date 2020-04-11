<template>
  <v-container>
    <v-row class="ma-2">
      <div class="display-1" v-text="$t('contacts.header')" />
      <v-spacer />
      <v-btn class="primary" to="/admin/contacts/new">
        <v-icon left v-text="'mdi-account-plus'" />{{ $t('new') }}
      </v-btn>
    </v-row>
    <ContactTable :contacts="contacts" :headers="headers" />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import ContactTable from '@/components/contact-table'
export default {
  components: { ContactTable },
  computed: {
    ...mapState({ contacts: state => state.contacts.contacts }),
    headers () {
      return [
        { text: 'Id', value: 'id' },
        { text: this.$t('cForm.fName').slice(0, -1), value: 'fName' },
        { text: this.$t('cForm.lName').slice(0, -1), value: 'lName' },
        { text: this.$t('cForm.place'), value: 'place' },
        { text: this.$t('links.tags'), value: 'tags', sortable: false },
        { text: this.$t('action'), value: 'actions', sortable: false, width: '225px' }
      ]
    }
  }
}
</script>
