<template>
  <v-container>
    <div class="display-2 ma-4 d-flex justify-center">
      {{ tag.name }}
    </div>
    <ContactList :contacts="contactsOnTag" />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import ContactList from '@/components/contact-list'
export default {
  components: { ContactList },
  computed: {
    ...mapState({
      contacts: state => state.contacts.contacts,
      tags: state => state.tags.tags
    }),
    contactsOnTag () {
      return this.contacts.filter((c) => {
        return this.tag.contact_ids.includes(c.id.toString())
      })
    },
    tag () {
      return this.tags.find(t => t.id === this.$route.params.id)
    }
  }
}
</script>
