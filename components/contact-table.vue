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
      :search="search"
      show-expand
      sort-by="sortable"
      @click:row="goToContact"
    >
      <!--p> :custom-filter="filter"</p-->
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
      <template #expanded-item="{item}">
        <td :colspan="headers.length+1" class="non-clickable" @click.stop>
          <ContactTableExpandItem :contact="item" />
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import _ from 'lodash'
import TagsBar from '@/components/tags-bar'
import ContactTableExpandItem from '@/components/contact-table-expand-item'

export default {
  name: 'ContactTable',
  components: {
    ContactTableExpandItem,
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
      getTag: 'tags/get',
      getFullName: 'contacts/getFullName'
    }),
    mungedContacts () {
      return this.contacts.map(c => ({ ...c, sortable: c.lName }))
    }
  },
  methods: {
    goToContact (contact) {
      this.$router.push(`/contacts/detail/${contact.id}`)
    },
    // filter (value, search, item) {
    //   const inName = RegExp(search, 'i').test(item.fName)

    //   const tagMatches = item.tag_ids.map(id =>
    //     RegExp(search, 'i').test(this.getTag(id).name)
    //   )
    //   const inTags = _.some(tagMatches)

    //   return inName || inTags
    // },
    deleteContact (contact) {
      const fullName = this.getFullName(contact.id)
      if (confirm(
        `Willst Du den Kontakt von ${fullName} löschen?`
      )) {
        this.$store.dispatch('contacts/delete', contact)
        this.$store.dispatch('snackbar/create', {
          text: `Der Kontakt von ${fullName} wurde gelöscht.`
        })
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
  padding: 0 !important;
}
::v-deep thead.v-data-table-header {
    background-color:#F5F5F5;
    white-space: nowrap;
}
</style>
