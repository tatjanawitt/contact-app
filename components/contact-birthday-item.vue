<template>
  <v-list-item @click="goToContact(contact)">
    <v-list-item-avatar size="50px">
      <v-img :src="contact.img" />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title v-html="textContent" />
    </v-list-item-content>
    <v-list-item-icon>
      <v-icon :color="birthdayToday ? 'red darken-2':'grey'">
        mdi-cake-variant
      </v-icon>
    </v-list-item-icon>
  </v-list-item>
</template>

<script>
'use strict'
import { mapGetters } from 'vuex'

export default {
  name: 'ContactBirthdayItem',
  props: {
    contact: { type: Object, required: true }
  },
  computed: {
    ...mapGetters({
      getAge: 'contacts/getAge',
      getBirthdate: 'contacts/getBirthdate'
    }),
    age () {
      return this.getAge(this.contact.born)
    },
    birthdayToday () {
      return this.getBirthdate(this.contact.born)
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
