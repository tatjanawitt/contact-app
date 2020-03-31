<template>
  <v-container>
    <h1>Geburtstage {{ nowYear }}</h1>
    <v-row justify="center">
      <v-expansion-panels>
        <v-expansion-panel
          v-for="(birthday,i) in birthdays"
          :key="i"
        >
          <v-expansion-panel-header>
            {{ birthday.month }} ( {{ birthday.contacts.length }} )
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-list>
              <v-list-item
                v-for="contact in birthday.contacts"
                :key="contact.id+contact.zip"
                @click="goToContact(contact)"
              >
                <v-list-item-avatar size="70px">
                  <v-img :src="contact.img" />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="`${contact.fName} ${contact.lName}`" />
                </v-list-item-content>

                <v-list-item-icon>
                  <v-icon color="grey">
                    mdi-cake-variant
                  </v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      contacts: state => state.contacts.contacts
    }),
    birthdays () {
      return this.birthdayList.filter(b => b.contacts.length > 0)
    },
    birthdayList () {
      return this.monthList.map(item => ({
        month: item,
        contacts: this.contacts.filter(c =>
          item === new Date(c.born).toLocaleString('default', { month: 'long' })
        ) // nach tagen sortieren
      }))
    },
    monthList () {
      return Array.from(Array(12), (e, i) =>
        new Date(25e8 * ++i).toLocaleString('default', { month: 'long' })
      )
    },
    nowYear () { return new Date().getFullYear() }
  },
  methods: {
    goToContact (contact) {
      this.$router.push(`/contacts/detail/${contact.id}`)
    }
  }
}
</script>
