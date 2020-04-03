<template>
  <v-row justify="center">
    <v-expansion-panels v-model="panel" focusable>
      <v-expansion-panel v-for="(b,i) in birthdayPerMonth" :key="i">
        <v-expansion-panel-header class="title">
          {{ b.month }}:&nbsp;
          <span class="subtitle-1 grey--text">
            {{ b.contacts.length }}
            {{ b.contacts.length > 1 ? ' Geburtstage' : ' Geburtstag' }}
          </span>
        </v-expansion-panel-header>
        <v-expansion-panel-content
          v-for="contact in b.contacts"
          :key="contact.id + contact.zip"
        >
          <ContactBirthdayItem :contact="contact" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>

<script>
'use strict'
import { mapState } from 'vuex'
import ContactBirthdayItem from '@/components/contact-birthday-item'

export default {
  name: 'ContactBirthday',
  components: { ContactBirthdayItem },
  data () {
    return { panel: 0 }
  },
  computed: {
    ...mapState({
      contacts: state => state.contacts.contacts
    }),
    birthdayPerMonth () {
      const contacts = this.addContactsToBirthMonth
      const removed = contacts.splice(new Date().getMonth())
      return removed.concat(contacts).filter(b => b.contacts.length > 0)
    },
    addContactsToBirthMonth () {
      const yearNow = new Date().getFullYear()
      return this.monthList.map(item => ({
        month: item,
        contacts: this.contacts.filter(c =>
          item === new Date(c.born).toLocaleString('default', { month: 'long' })
        ).sort((a, b) => {
          const aBorn = new Date(yearNow, a.born.getMonth(), a.born.getDate())
          const bBorn = new Date(yearNow, b.born.getMonth(), b.born.getDate())
          return aBorn - bBorn
        })
      }))
    },
    monthList () {
      return Array.from(Array(12), (e, i) =>
        new Date(25e8 * ++i).toLocaleString('default', { month: 'long' })
      )
    }
  }
}
</script>
