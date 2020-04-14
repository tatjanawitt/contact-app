<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-text-field
        v-model="search"
        :label="$t('birthdays.search')"
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
            <span class="subtitle-1 grey--text-darken-1">
              {{ item.contacts.length }}
              {{ item.contacts.length > 1 ? $t('birthdays.title') : $t('birthdays.label') }}
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
      <NoDataAlert v-else :hint-text="$t('contacts.noData')" />
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import ContactBirthdayItem from '@/components/contact-birthday-item'
import NoDataAlert from '@/components/no-data-alert'
export default {
  components: { ContactBirthdayItem, NoDataAlert },
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
          item === new Date(c.born).toLocaleString(this.lang, { month: 'long' })
        ).sort((a, b) => {
          const aBorn = new Date(yearNow, a.born.getMonth(), a.born.getDate())
          const bBorn = new Date(yearNow, b.born.getMonth(), b.born.getDate())
          return aBorn - bBorn
        })
      }))
    },
    monthList () {
      return Array.from(Array(12), (e, i) =>
        new Date(25e8 * ++i).toLocaleString(this.lang, { month: 'long' })
      )
    },
    lang () { return this.$i18n.locale === 'de' ? 'de-DE' : 'en-EN' }
  }
}
</script>

<style lang="scss" scoped>
.v-expansion-panel {
  background-color: rgba(255, 255, 255, 0.7) !important;
}
button.v-expansion-panel-header.title.v-expansion-panel-header--active {
   background-color: #7986CB;
   color: white;
}
</style>
