<template>
  <v-container>
    <v-row class="ma-2">
      <div class="display-1">
        Kontakt Übersicht
      </div>
      <v-spacer />
      <v-btn class="primary" to="/admin/contacts/new">
        <v-icon left v-text="'mdi-account-plus'" />Neu
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
        { text: 'Vorname', value: 'fName' },
        { text: 'Nachname', value: 'lName' },
        { text: 'Ort', value: 'place' },
        { text: 'Stichworte', value: 'tags', sortable: false },
        { text: 'Aktion', value: 'actions', sortable: false, width: '225px' }
      ]
    }
  }
}
</script>
