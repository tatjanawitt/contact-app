<template>
  <div>
    <v-text-field
      v-model="search"
      append-icon="mdi-account-search"
      :label="$t('contacts.search')"
      clearable
      class="mb-6"
      hide-details
    />
    <v-sheet v-if="contactList && contactList.length"
             class="mx-auto" elevation="8"
    >
      <v-slide-group v-model="model" center-active>
        <v-slide-item v-for="c in contactList" :key="c.id" #default="{ active, toggle }">
          <v-card width="300px" hover class="ma-2" @click="toggle">
            <ContactListItem :contact="c" />
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
    <v-alert v-else class="secondary" dark border="top"
             icon="mdi-database-search" transition="scale-transition"
    >
      {{ $t('contacts.noData') }}
    </v-alert>
  </div>
</template>

<script>
import ContactListItem from '@/components/contact-list-item'
export default {
  components: { ContactListItem },
  props: {
    contacts: { type: Array, required: true }
  },
  data: () => ({ model: null, search: null }),
  computed: {
    contactList () {
      if (this.search) {
        return this.contacts.filter(c =>
          c.lName.toLowerCase().includes(this.search.toLowerCase()) ||
          c.fName.toLowerCase().includes(this.search.toLowerCase()) ||
          c.place.toLowerCase().includes(this.search.toLowerCase())
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
