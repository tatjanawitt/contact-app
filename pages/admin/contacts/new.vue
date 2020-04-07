<template>
  <v-container>
    <div class="display-1 ma-4 d-flex justify-center">
      Kontakt anlegen
    </div>
    <ContactForm :contact="contact" :save-contact="create" :cancel-action="cancel" />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import ContactForm from '@/components/contact-form'
export default {
  components: { ContactForm },
  data () {
    return { contact: {} }
  },
  computed: {
    ...mapGetters({ fullName: 'contacts/getFullName' })
  },
  methods: {
    async create (newContact) {
      const contact = await this.$store.dispatch('contacts/create', newContact)
      this.$store.dispatch('snackbar/create', {
        text: `Der Kontakt für ${this.fullName(contact.id)} wurde angelegt.`
      })
      this.$router.push(`/admin/contacts/${contact.id}`)
    },
    cancel () { this.$router.push('/admin/contacts') }
  }
}
</script>
