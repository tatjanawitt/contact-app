<template>
  <v-container>
    <h1>Geburtstage {{ nowYear }}</h1>
    <v-row justify="center">
      <v-expansion-panels>
        <v-expansion-panel v-for="(birthday,i) in birthdays" :key="i">
          <v-expansion-panel-header>
            {{ birthday.month }} ( {{ birthday.contacts.length }} )
          </v-expansion-panel-header>
          <v-expansion-panel-content
            v-for="contact in birthday.contacts"
            :key="contact.id + contact.zip"
          >
            <ContactBirthdayItem :contact="contact" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>

<script>
'use strict'
import { mapState } from 'vuex'
import ContactBirthdayItem from '@/components/contact-birthday-item'

export default {
  components: { ContactBirthdayItem },
  computed: {
    ...mapState({
      contacts: state => state.contacts.contacts
    }),
    birthdays () {
      const contacts = this.addContactsToBirthMonth
      const removed = contacts.splice(new Date().getMonth())
      return removed.concat(contacts).filter(b => b.contacts.length > 0)
    },
    addContactsToBirthMonth () {
      return this.monthList.map(item => ({
        month: item,
        contacts: this.contacts.filter(c =>
          item === new Date(c.born).toLocaleString('default', { month: 'long' })
        ).sort((a, b) =>
          a.born.toLocaleDateString('default') > b.born.toLocaleDateString('default')
        )
      }))
    },
    monthList () {
      return Array.from(Array(12), (e, i) =>
        new Date(25e8 * ++i).toLocaleString('default', { month: 'long' })
      )
    },
    nowYear () { return new Date().getFullYear() }
  }
}
</script>
