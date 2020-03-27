<template>
  <v-container>
    <div class="display-4 ma-4 d-flex justify-center">
      Alle Kontakte
    </div>
    <v-sheet class="mx-auto" elevation="8" max-width="1100">
      <v-slide-group
        v-model="model"
        class="pa-4"
        active-class="success"
        show-arrows
      >
        <v-slide-item v-for="c in contacts" :key="c.id">
          <ContactItem :contact="c" :tags="tags" />
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </v-container>
</template>

<script>
'use strict'
import { mapState } from 'vuex'
import ContactItem from '@/components/contact-item'

export default {
  components: {
    ContactItem
  },
  data: () => ({
    model: null
  }),
  computed: {
    ...mapState({
      contacts: state => state.contacts.contacts,
      tags: state => state.tags.tags
    })
  }
}
</script>
