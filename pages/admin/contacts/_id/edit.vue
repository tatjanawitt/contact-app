<template>
  <v-container>
    <v-row>
      <v-sheet class="pa-4" color="rgba(255, 255, 255, 0.7)"
               width="100%" elevation="14"
      >
        <ContactForm :contact="contact"
                     :save-contact="update"
                     :cancel-action="cancel"
                     :header="$t('cForm.editLabel')"
        />
      </v-sheet>
    </v-row>
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
      const oldUser = this.contact.user_id
      const contact = await this.$store.dispatch('contacts/edit', newContact)

      if (this.$auth.user.admin && oldUser !== newContact.user_id) {
        await this.$store.dispatch('users/addContactToUser', {
          contactId: contact.id,
          userId: newContact.user_id
        })
        await this.$store.dispatch('users/delContactFromUser', {
          contactId: contact.id,
          userId: oldUser
        })
      }
      this.$store.dispatch('snackbar/create', {
        text: this.$t('cForm.editSuccess') + this.fullName(contact.id) + '.'
      })
      this.$router.push(`/admin/contacts/${contact.id}`)
    },
    cancel () { this.$router.push('/admin/contacts') }
  }
}
</script>
