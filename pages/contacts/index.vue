<template>
  <div>
    <div class="d-flex justify-end">
      <div class="display-2 my-6 center" v-text="$t('contacts.title')" />
      <v-spacer />
      <v-btn fab dark large class="mt-4" color="primary">
        <v-icon dark @click="dialog = true" v-text="'mdi-account-plus'" />
      </v-btn>
      <v-dialog v-model="dialog" max-width="900">
        <v-card class="pa-4">
          <ContactForm :contact="contact"
                       :save-contact="create"
                       :cancel-action="cancel"
                       :header="$t('cForm.newLabel')"
          />
        </v-card>
      </v-dialog>
    </div>
    <ContactList :contacts="contacts" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ContactList from '@/components/contact-list'
import ContactForm from '@/components/contact-form'
export default {
  components: { ContactList, ContactForm },
  data () {
    return { contact: {}, dialog: false }
  },
  computed: {
    ...mapState({ contacts: state => state.contacts.contacts }),
    ...mapGetters({ fullName: 'contacts/getFullName' })
  },
  methods: {
    cancel () { this.dialog = false },
    async create (newContact) {
      const contact = await this.$store.dispatch('contacts/create', newContact)
      console.log(newContact)
      console.log(contact)
      await this.$store.dispatch('users/addContactToUser', {
        contactId: contact.id,
        userId: contact.user_id
      })
      this.dialog = false
      this.$store.dispatch('snackbar/create', {
        text: this.$t('cForm.newSuccess') + this.fullName(contact.id) + '.'
      })
    }
  }
}
</script>
