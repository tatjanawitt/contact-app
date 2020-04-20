<template>
  <div>
    <div class="d-flex justify-end">
      <div class="display-2 my-6 center" v-text="$t('contacts.title')" />
      <v-spacer />
      <v-btn fab dark large class="mt-4" color="primary">
        <v-icon dark v-text="'mdi-account-plus'" />
      </v-btn>
    </div>
    <ContactList :contacts="contacts" />
  </div>
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
