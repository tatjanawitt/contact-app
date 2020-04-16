<template>
  <v-row justify="center">
    <v-col cols="12" sm="8">
      <div class="subtitle-1 white--text" v-html="$t('contacts.notice')" />
      <v-card class="cardColor">
        <v-card-title class="secondary">
          <v-badge :value="birthday" color="error" :content="age">
            <span class="headline white--text ml-3">
              {{ fullName }}
            </span>
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
import ContactDetail from '@/components/contact-detail'
import ContactRating from '@/components/contact-rating'
export default {
  components: {
    ContactDetail,
    ContactRating
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
  }
}
</script>
