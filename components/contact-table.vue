<template>
  <div>
    <v-text-field
      v-model="search"
      class="mb-3"
      label="Kontakte suchen"
      clearable
      append-icon="mdi-magnify"
      single-line
      hide-details
    />
    <v-data-table
      :items="mungedContacts"
      :headers="headers"
      sort-by="sortable"
      :search="search"
      @click:row="goToContact"
    >
      <template #item.tags="{item}">
        <td class="non-clickable" @click.stop>
          <TagsBar :contact="item" />
        </td>
      </template>
      <template #item.actions="{item}">
        <td class="non-clickable" @click.stop>
          <v-btn small class="primary" :to="`/admin/contacts/${item.id}`">
            <v-icon>mdi-tag-plus</v-icon>
          </v-btn>
          <v-btn small class="primary" :to="`/admin/contacts/${item.id}/edit`">
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn>
          <v-btn small class="primary" @click="deleteContact(item)">
            <v-icon>
              mdi-delete-alert
            </v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TagsBar from '@/components/tags-bar'
// import DurationDisplay from '@/components/duration-display'
// import DateDisplay from '@/components/date-display'
// import VideoWatch from '@/components/video-watch'

export default {
  name: 'ContactTable',
  components: {
    TagsBar
  },
  props: {
    contacts: { type: Array, required: true },
    headers: { type: Array, required: true }
  },
  data () {
    return { search: '' }
  },
  computed: {
    ...mapGetters({
      getTag: 'tags/get'
    }),
    mungedContacts () {
      return this.contacts.map(c => ({ ...c, sortable: c.lName }))
    }
  },
  methods: {
    goToContact (contact) {
      this.$router.push(`/contacts/detail/${contact.id}`)
    },
    deleteContact (contact) {
      if (confirm(
        `Are you sure you want to delete ${contact.lName}`
      )) {
        this.$store.dispatch('contacts/delete', contact)
        // this.$store.dispatch('snackbar/create', {
        //   text: `You have successfully deleted your video, ${contact.lName}.`
        // })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep tbody tr {
  cursor: pointer;
}
::v-deep tbody tr td.non-clickable {
  cursor: auto;
  border-bottom: none !important;
}
</style>
