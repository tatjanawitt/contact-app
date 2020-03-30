<template>
  <v-container>
    <v-row class="ma-2">
      <h1>Kontakte</h1>
      <v-spacer />
      <v-btn color="indigo lighten-4" to="/admin/contacts/new">
        Add Contact
      </v-btn>
    </v-row>
    <ContactTable
      :contacts="contacts"
      :headers="headers"
      :custom-click-action="goToVideoShow"
    />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import ContactTable from '@/components/contact-table'

export default {
  components: {
    ContactTable
  },
  computed: {
    ...mapState({
      contacts: state => state.contacts.contacts
    }),
    headers () {
      return [
        { text: 'Vorname', value: 'fName' },
        { text: 'Nachname', value: 'lName' },
        { text: 'Ort', value: 'place' },
        { text: 'Tags', value: 'tags', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false, width: '300px' }
      ]
    }
  },
  methods: {
    goToVideoShow (contact) {
      this.$router.push(`/admin/contacts/${contact.id}`)
    }
  }
}
</script>
