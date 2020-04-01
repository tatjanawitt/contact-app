<template>
  <v-row justify="center">
    <v-col cols="12" sm="8">
      <v-card>
        <v-card-title class="indigo lighten-2">
          <span class="headline white--text">
            {{ contact.fName }} {{ contact.lName }}
          </span>
          <v-spacer />
          <ContactRating
            :rating="contact.rating"
            :readonly="false"
            :large="true"
          />
        </v-card-title>
        <ContactDetail :contact="contact" :show-footer="true" />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
'use strict'
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
      getContact: 'contacts/get'
    }),
    contact () {
      return this.getContact(this.$route.params.id)
    }
  }
}
</script>
