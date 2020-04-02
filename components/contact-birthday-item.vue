<template>
  <v-list-item @click="goToContact(contact)">
    <v-list-item-avatar size="50px">
      <v-img :src="contact.img" />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-row>
        <v-col cols="12" sm="5" md="4">
          <v-list-item-title class="text-wrap" v-html="textContent" />
          <ContactRating :rating="contact.rating" :readonly="true" :large="false" />
        </v-col>
        <v-col cols="12" sm="7" md="8" class="non-clickable" @click.stop>
          <TagsBar :contact="contact" />
        </v-col>
      </v-row>
    </v-list-item-content>
    <v-list-item-icon>
      <v-icon :color="birthdayToday ? 'red darken-2':'grey lighten-1'">
        mdi-cake-variant
      </v-icon>
    </v-list-item-icon>
  </v-list-item>
</template>

<script>
'use strict'
import { mapGetters } from 'vuex'
import ContactRating from '@/components/contact-rating'
import TagsBar from '@/components/tags-bar'

export default {
  name: 'ContactBirthdayItem',
  components: {
    ContactRating,
    TagsBar
  },
  props: {
    contact: { type: Object, required: true }
  },
  computed: {
    ...mapGetters({
      getAge: 'contacts/getAge',
      getBirthdayToday: 'contacts/getBirthdayToday'
    }),
    age () {
      return this.getAge(this.contact.id)
    },
    birthdayToday () {
      return this.getBirthdayToday(this.contact.id)
    },
    textContent () {
      return `Am ${this.contact.born.toLocaleDateString('default', {
          month: 'long',
          day: 'numeric'
        })} wird <b>${this.contact.fName} ${this.contact.lName
        }</b> ${this.age + 1}`
    }
  },
  methods: {
    goToContact (contact) {
      this.$router.push(`/contacts/detail/${contact.id}`)
    }
  }
}
</script>
