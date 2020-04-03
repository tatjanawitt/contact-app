<template>
  <v-container>
    <h1>Kontakt anlegen</h1>
    <ContactForm
      :contact="contact"
      :save-contact="create"
      :cancel-action="cancel"
    />
  </v-container>
</template>

<script>
import ContactForm from '@/components/contact-form'

export default {
  components: { ContactForm },
  data () {
    return { contact: {} }
  },
  methods: {
    async create (newContact) {
      const contact = await this.$store.dispatch('contacts/create', newContact)
      // this.$store.dispatch("snackbar/create", {
      //   text: `You have successfully created a new video, ${video.name}.`
      // });
      this.$router.push(`/admin/contacts/${contact.id}`)
    },
    cancel () { this.$router.push('/admin/contacts') }
  }
}
</script>
