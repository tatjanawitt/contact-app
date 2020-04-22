<template>
  <div>
    <SearchField :label="$t('contacts.search')"
                 icon="mdi-account-search"
                 :search="search"
    />
    <v-sheet v-if="contactList && contactList.length" class="mx-auto" elevation="8">
      <v-slide-group v-model="model" center-active show-arrows
                     prev-icon="mdi-account-arrow-left"
                     next-icon="mdi-account-arrow-right"
      >
        <v-slide-item v-for="c in contactList" :key="c.id" #default="{ active, toggle }">
          <v-card max-width="17.5rem" hover class="ma-1" @click="toggle">
            <ContactListItem :contact="c" />
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
    <AlertNoData v-else :hint-text="$t('contacts.noData')" />
  </div>
</template>

<script>
import ContactListItem from '@/components/contact-list-item'
import AlertNoData from '@/components/alert-no-data'
import SearchField from '@/components/search-field'
export default {
  components: { ContactListItem, AlertNoData, SearchField },
  props: {
    contacts: { type: Array, required: true }
  },
  data: () => ({
    model: null,
    search: { item: null }
  }),
  computed: {
    contactList () {
      if (this.search.item) {
        return this.contacts.filter(c =>
          c.lName.toLowerCase().includes(this.search.item.toLowerCase()) ||
          c.fName.toLowerCase().includes(this.search.item.toLowerCase()) ||
          c.place.toLowerCase().includes(this.search.item.toLowerCase())
        )
      } else {
        return this.contacts
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep div.v-item-group.theme--light.v-slide-group {
  background-color: rgba(255, 255, 255, 0.7) !important;
}
.theme--light.v-sheet {
  background-color: transparent;
}
</style>
