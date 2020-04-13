<template>
  <v-container>
    <ContactForm :contact="contact"
                 :save-contact="create"
                 :cancel-action="cancel"
                 :header="$t('cForm.newLabel')"
    />
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
        text: this.$t('cForm.newSuccess') + this.fullName(contact.id) + '.'
      })
      this.$router.push(`/admin/contacts/${contact.id}`)
    },
    cancel () { this.$router.push('/admin/contacts') }
  }
}
</script>
