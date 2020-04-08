<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-text-field
        v-model="search"
        label="Vor- oder Nachname suchen"
        clearable
        append-icon="mdi-account-search"
        hide-details
      />
    </v-col>
    <v-col cols="12">
      <v-expansion-panels v-if="list && list.length" v-model="panel" focusable>
        <v-expansion-panel v-for="(item,i) in list" :key="i">
          <v-expansion-panel-header class="title">
            {{ item.month }}:&nbsp;
            <span class="subtitle-1 grey--text">
              {{ item.contacts.length }}
              {{ item.contacts.length > 1 ? ' Geburtstage' : ' Geburtstag' }}
            </span>
          </v-expansion-panel-header>
          <v-expansion-panel-content
            v-for="contact in item.contacts"
            :key="contact.id + contact.zip"
          >
            <ContactBirthdayItem :contact="contact" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-alert v-else class="secondary" dark border="top"
               icon="mdi-database-search" transition="scale-transition"
      >
        Keine Kontakte gefunden!
      </v-alert>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import ContactBirthdayItem from '@/components/contact-birthday-item'
export default {
  components: { ContactBirthdayItem },
  data () {
    return { panel: 0, search: null }
  },
  computed: {
    ...mapState({
      contacts: state => state.contacts.contacts
    }),
    list () {
      if (this.search) {
        const searchlist = [...this.currentMonthFirst]
        const result = searchlist.map((item) => {
          const contacts = item.contacts.filter(c =>
            c.lName.toLowerCase().includes(this.search.toLowerCase()) ||
            c.fName.toLowerCase().includes(this.search.toLowerCase())
          )
          return { ...item, contacts }
        })
        return result.filter(el => el.contacts.length > 0)
      } else {
        return this.currentMonthFirst
      }
    },
    currentMonthFirst () {
      const contacts = this.addContactsToBirthMonth
      const removed = contacts.splice(new Date().getMonth())
      return removed.concat(contacts).filter(el => el.contacts.length > 0)
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
