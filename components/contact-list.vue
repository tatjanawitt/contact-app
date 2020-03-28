<template>
  <v-sheet class="mx-auto" elevation="8" max-width="1100">
    <v-slide-group
      v-model="model"
      class="pa-4"
      active-class="success"
      show-arrows
    >
      <v-slide-item v-for="c in contacts" :key="c.id">
        <ContactListItem :contact="c" />
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
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
  data: () => ({ model: null })
}
</script>
