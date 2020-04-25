<template>
  <div>
    <div class="display-2 my-6 center" v-text="tagName" />
    <ContactList :contacts="contactsOnTag" />
  </div>
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
    },
    tagName () {
      return this.tag ? `${this.contactsOnTag.length} ${this.tag.name}` : ''
    }
  }
}
</script>
