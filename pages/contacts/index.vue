<template>
  <div>
    <HeaderLayout :header-text="$t('contacts.title') + contacts.length"
                  :btn-action="openDialog"
                  btn-icon="mdi-account-plus"
                  :fab="true" :large="true"
    />
    <v-dialog v-model="dialog.show" max-width="900">
      <v-card class="pa-4">
        <ContactForm :contact="contact"
                     :save-contact="create"
                     :cancel-action="cancel"
                     :header="$t('cForm.newLabel')"
        />
      </v-card>
    </v-dialog>
    <ContactList :contacts="contacts" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ContactList from '@/components/contacts/contact-list'
import ContactForm from '@/components/forms/contact-form'
import HeaderLayout from '@/components/shared/header-layout'
export default {
  components: { ContactList, ContactForm, HeaderLayout },
  data () {
    return { contact: {}, dialog: { show: false } }
  },
  computed: {
    ...mapState({ contacts: state => state.contacts.contacts }),
    ...mapGetters({ fullName: 'contacts/getFullName' })
  },
  methods: {
    openDialog () {
      this.dialog.show = true
    },
    async create (newContact) {
      const contact = await this.$store.dispatch('contacts/create', newContact)
      this.dialog.show = false
      this.$store.dispatch('snackbar/create', {
        text: this.$t('cForm.newSuccess') + this.fullName(contact.id) + '.'
      })
      this.$router.push(`/contacts/detail/${contact.id}`)
    },
    cancel () { this.dialog.show = false }
  }
}
</script>
