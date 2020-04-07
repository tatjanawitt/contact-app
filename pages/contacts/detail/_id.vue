<template>
  <v-row justify="center">
    <v-col cols="12" sm="8">
      <v-card>
        <v-card-title class="secondary">
          <v-badge :value="birthday" color="red darken-2" :content="age">
            <span class="headline white--text">
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
