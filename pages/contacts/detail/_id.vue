<template>
  <v-row v-show="contact.id" justify="center">
    <v-col cols="12" sm="8">
      <div class="subtitle-1 white--text" v-html="$t('contacts.notice')" />
      <v-card class="cardColor">
        <v-card-title class="secondary">
          <v-btn fab dark large color="primary" @click="dialog = true">
            <v-icon dark v-text="'mdi-account-edit'" />
          </v-btn>
          <v-dialog v-model="dialog" max-width="900">
            <v-card class="pa-4">
              <ContactForm :contact="contact"
                           :save-contact="update"
                           :cancel-action="cancel"
                           :header="$t('cForm.editLabel')"
              />
            </v-card>
          </v-dialog>
          <v-badge :value="birthday" color="error" :content="age">
            <span class="headline white--text ml-3">{{ fullName }}</span>
          </v-badge>
          <v-spacer />
          <ContactRating :rating="contact.rating" :readonly="false" :large="true" />
        </v-card-title>
        <ContactDetail :contact="contact" :show-footer="true" />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import ContactDetail from '@/components/contacts/contact-detail'
import ContactRating from '@/components/shared/contact-rating'
import ContactForm from '@/components/forms/contact-form'
export default {
  components: {
    ContactDetail,
    ContactRating,
    ContactForm
  },
  data () {
    return { dialog: false }
  },
  computed: {
    ...mapGetters({
      getContact: 'contacts/get',
      getFullName: 'contacts/getFullName',
      getAge: 'contacts/getAge',
      getBirthdayToday: 'contacts/getBirthdayToday'
    }),
    contact () {
      return this.getContact(this.$route.params.id)
    },
    fullName () {
      return this.getFullName(this.contact.id)
    },
    birthday () {
      return this.getBirthdayToday(this.contact.id)
    },
    age () {
      return this.getAge(this.contact.id)
    }
  },
  methods: {
    async update (newContact) {
      await this.$store.dispatch('contacts/edit', newContact)
      this.dialog = false
      this.$store.dispatch('snackbar/create', {
        text: this.$t('cForm.editSuccess') + this.fullName + '.'
      })
    },
    cancel () { this.dialog = false }
  }
}
</script>
