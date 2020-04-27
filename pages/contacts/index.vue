<template>
  <div>
    <v-row class="mt-2">
      <v-col cols="12" sm="2" class="hidden-xs-only" />
      <v-col cols="12" sm="8">
        <div class="display-2 center" v-text="$t('contacts.title') + contacts.length" />
      </v-col>
      <v-col cols="12" sm="2">
        <div class="d-flex justify-end">
          <v-btn fab dark large color="primary" @click="dialog = true">
            <v-icon dark v-text="'mdi-account-plus'" />
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
      </v-col>
    </v-row>
    <ContactList :contacts="contacts" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ContactList from '@/components/contacts/contact-list'
import ContactForm from '@/components/forms/contact-form'
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
    async create (newContact) {
      const contact = await this.$store.dispatch('contacts/create', newContact)
      this.dialog = false
      this.$store.dispatch('snackbar/create', {
        text: this.$t('cForm.newSuccess') + this.fullName(contact.id) + '.'
      })
    },
    cancel () { this.dialog = false }
  }
}
</script>
