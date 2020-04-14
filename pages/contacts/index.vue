<template>
  <v-container class="px-0">
    <div class="display-2 ma-4 d-flex justify-center" v-text="$t('contacts.title')" />
    <ContactList :contacts="contacts" />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import ContactList from '@/components/contact-list'

export default {
  components: { ContactList },
  computed: {
    ...mapState({ contacts: state => state.contacts.contacts })
  }
}
</script>
