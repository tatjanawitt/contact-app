<template>
  <div>
    <SearchField :label="$t('birthdays.search')"
                 icon="mdi-account-search"
                 :search="search"
    />
    <v-expansion-panels v-if="list && list.length" v-model="panel" focusable>
      <v-expansion-panel v-for="(item,i) in list" :key="i">
        <v-expansion-panel-header class="title">
          {{ item.month }}:&nbsp;
          <span class="subtitle-1 grey--text-darken-1">
            {{ item.contacts.length }}
            {{ item.contacts.length > 1 ? $t('birthdays.title') : $t('birthdays.label') }}
          </span>
        </v-expansion-panel-header>
        <v-expansion-panel-content v-for="c in item.contacts" :key="c.id + c.zip">
          <ContactBirthdayItem :contact="c" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <AlertNoData v-else :hint-text="$t('contacts.noData')" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ContactBirthdayItem from '@/components/contact-birthday-item'
import AlertNoData from '@/components/alert-no-data'
import SearchField from '@/components/search-field'
import birthdayList from '@/utils/birthday-list'
export default {
  components: {
    ContactBirthdayItem,
    AlertNoData,
    SearchField
  },
  data () {
    return { panel: 0, search: { item: null } }
  },
  computed: {
    ...mapState({
      contacts: state => state.contacts.contacts
    }),
    list () {
      const allContacts = birthdayList.get(this.contacts, this.lang)
      if (this.search.item) {
        const searchlist = [...allContacts]
        const result = searchlist.map((item) => {
          const contacts = item.contacts.filter(c =>
            c.lName.toLowerCase().includes(this.search.item.toLowerCase()) ||
            c.fName.toLowerCase().includes(this.search.item.toLowerCase())
          )
          return { ...item, contacts }
        })
        return result.filter(el => el.contacts.length > 0)
      } else {
        return allContacts
      }
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
