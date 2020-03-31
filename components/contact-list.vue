<template>
  <div>
    <v-text-field
      v-model="search"
      append-icon="mdi-account-search"
      label="Name oder Ort suchen"
      clearable
      class="mb-3"
      hide-details
    />
    <v-sheet
      v-if="contactList && contactList.length"
      class="mx-auto"
      elevation="8"
    >
      <v-slide-group
        v-model="model"
        class="pa-4"
        active-class="success"
        show-arrows
      >
        <v-slide-item v-for="c in contactList" :key="c.id">
          <ContactListItem :contact="c" />
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
    <v-alert
      v-else
      color="indigo lighten-2"
      dark
      border="top"
      icon="mdi-database-search"
      transition="scale-transition"
    >
      Keine Kontakte gefunden!
    </v-alert>
  </div>
</template>

<script>
'use strict'
import ContactListItem from '@/components/contact-list-item'

export default {
  name: 'ContactList',
  components: {
    ContactListItem
  },
  props: {
    contacts: { type: Array, required: true }
  },
  data: () => ({
    model: null,
    search: null
  }),
  computed: {
    contactList () {
      if (this.search && this.search.length > 2) {
        return this.contacts.filter(c =>
          c.lName.toLowerCase().includes(this.search.toLowerCase()) ||
          c.fName.toLowerCase().includes(this.search.toLowerCase()) ||
          c.place.toLowerCase().includes(this.search.toLowerCase())
        )
      } else {
        return this.contacts
      }
    }
  }
}
</script>
