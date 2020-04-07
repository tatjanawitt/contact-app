<template>
  <v-container>
    <div class="display-1 ma-4 d-flex justify-center">
      Kontakt ändern
    </div>
    <ContactForm :contact="contact" :save-contact="update" :cancel-action="cancel" />
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ContactForm from '@/components/contact-form'
export default {
  components: { ContactForm },
  computed: {
    ...mapState({ contacts: state => state.contacts.contacts }),
    ...mapGetters({
      getContact: 'contacts/get',
      fullName: 'contacts/getFullName'
    }),
    contact () {
      return this.getContact(this.$route.params.id)
    }
  },
  methods: {
    async update (newContact) {
      const contact = await this.$store.dispatch('contacts/edit', newContact)
      this.$store.dispatch('snackbar/create', {
        text: `Die Daten von ${this.fullName(contact.id)} wurden geändert.`
      })
      this.$router.push(`/admin/contacts/${contact.id}`)
    },
    cancel () { this.$router.push('/admin/contacts') }
  }
}
</script>
