<template>
  <div>
    <div class="display-2 my-6 center" v-text="$t('contacts.title')" />
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
