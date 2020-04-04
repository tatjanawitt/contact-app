<template>
  <v-container>
    <h1>Kontakt ändern</h1>
    <ContactForm
      :contact="contact"
      :save-contact="update"
      :cancel-action="cancel"
    />
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ContactForm from '@/components/contact-form'

export default {
  components: {
    ContactForm
  },
  computed: {
    ...mapState({
      contacts: state => state.contacts.contacts
    }),
    ...mapGetters({
      getContact: 'contacts/get'
    }),
    contact () {
      return this.getContact(this.$route.params.id)
    }
  },
  methods: {
    async update (newContact) {
      const contact = await this.$store.dispatch('contacts/edit', newContact)
      // this.$store.dispatch('snackbar/create', {
      //   text: `You have successfully edited your video, ${contact.name}.`
      // })
      this.$router.push(`/admin/contacts/${contact.id}`)
    },
    cancel () {
      this.$router.push(`/admin/contacts/${this.contact.id}`)
    }
  }
}
</script>
