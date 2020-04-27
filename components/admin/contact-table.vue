<template>
  <div>
    <SearchField :label="$t('contacts.tabSearch')"
                 icon="mdi-magnify"
                 :search="search"
    />
    <v-data-table :items="mungedContacts"
                  :headers="headers"
                  :search="search.item"
                  :custom-filter="filter"
                  :items-per-page="5"
                  :mobile-breakpoint="780"
                  show-expand
                  sort-by="id"
                  :sort-desc="true"
                  :no-results-text="$t('noData')"
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
            <v-icon v-text="'mdi-tag-plus'" />
          </v-btn>
          <v-btn small class="primary" :to="`/admin/contacts/${item.id}/edit`">
            <v-icon v-text="'mdi-pencil'" />
          </v-btn>
          <DialogConfirm :item="item"
                         :content="`${$t('contacts.alertDel')} <b>${getFullName(item.id)}</b>?`"
                         :agree-action="deleteContact"
                         agree-img="mdi-delete"
                         :agree-btn="$t('cForm.delBtn')"
                         :header="$t('contacts.delHeader')"
          />
        </td>
      </template>
      <template #expanded-item="{item}">
        <td :colspan="headers.length + 1" class="non-clickable" @click.stop>
          <ContactTableExpandItem :contact="item" />
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TagsBar from '@/components/shared/tags-bar'
import ContactTableExpandItem from '@/components/admin/contact-table-expand-item'
import DialogConfirm from '@/components/shared/dialog-confirm'
import SearchField from '@/components/shared/search-field'
export default {
  components: {
    ContactTableExpandItem,
    TagsBar,
    DialogConfirm,
    SearchField
  },
  props: {
    contacts: { type: Array, required: true },
    headers: { type: Array, required: true }
  },
  data () {
    return { search: { item: '' } }
  },
  computed: {
    ...mapGetters({
      getTag: 'tags/get',
      getFullName: 'contacts/getFullName'
    }),
    mungedContacts () { return [...this.contacts] }
  },
  methods: {
    goToContact (contact) {
      this.$router.push(`/contacts/detail/${contact.id}`)
    },
    filter (value, search, item) {
      const inFirstname = RegExp(search, 'i').test(item.fName)
      const inLastname = RegExp(search, 'i').test(item.lName)
      const inPlace = RegExp(search, 'i').test(item.place)
      const inUser = RegExp(search, 'i').test(item.userName)
      const inTags = item.tag_ids.some(id =>
        RegExp(search, 'i').test(this.getTag(id).name))
      return inFirstname || inLastname || inPlace || inUser || inTags
    },
    async deleteContact (contact) {
      const fullName = this.getFullName(contact.id)
      await this.$store.dispatch('contacts/delete', contact)
      this.$store.dispatch('snackbar/create', {
        text: this.$t('contacts.delSuccess') + fullName + '.'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.v-data-table {
  background-color:rgba(255, 255, 255, 0.8);
}
::v-deep tbody tr {
  cursor: pointer;
}
::v-deep tbody tr td.non-clickable {
  cursor: auto;
  border-bottom: none !important;
  padding: 0 !important;
}
::v-deep thead.v-data-table-header {
    background-color:rgba(121, 134, 203, 0.3);
    white-space: nowrap;
}
</style>
