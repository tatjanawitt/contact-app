<template>
  <v-container>
    <div class="display-4 ma-4 d-flex justify-center">
      Alle Kontakte
    </div>
    <p>Alphabetisch sortieren Nachname Sortiermenge</p>
    <ContactList :contacts="contacts" />
  </v-container>
</template>

<script>
'use strict'
import { mapState } from 'vuex'
import ContactList from '@/components/contact-list'

export default {
  components: {
    ContactList
  },
  computed: {
    ...mapState({
      contacts: state => state.contacts.contacts
    })
  }
}
</script>
