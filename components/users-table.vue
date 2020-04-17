<template>
  <div>
    <SearchField
      :label="$t('users.tabSearch')"
      icon="mdi-magnify"
      :search="search"
    />
    <v-data-table
      :items="mungedUsers"
      :headers="headers"
      :search="search.item"
      :items-per-page="5"
      sort-by="id"
      :sort-desc="true"
      :no-results-text="$t('noData')"
      @click:row="goToContact"
    >
      <template #item.actions="{item}">
        <td class="non-clickable" @click.stop>
          <v-btn small class="primary" :to="`/admin/contacts/${item.id}/edit`">
            <v-icon v-text="'mdi-pencil'" />
          </v-btn>
          <span v-if="!item.admin">
            <DialogConfirm
              :item="item"
              :content="`${$t('users.alertDel')} <b>${item.name}</b>?`"
              :agree-action="deleteUser"
              agree-img="mdi-delete"
              :agree-btn="$t('cForm.delBtn')"
              :header="$t('users.delHeader')"
            />
          </span>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import SearchField from '@/components/search-field'
import DialogConfirm from '@/components/dialog-confirm'
export default {
  components: { SearchField, DialogConfirm },
  props: {
    users: { type: Array, required: true },
    headers: { type: Array, required: true }
  },
  data () {
    return { search: { item: '' } }
  },
  computed: {
    mungedUsers () {
      return [...this.users]
    }
  },
  methods: {
    goToContact (contact) {
      this.$router.push(`/contacts/detail/${contact.id}`)
    },
    async deleteUser (user) {
      console.log(user) // auch contacte löschen
      const info = { text: this.$t('users.delSuccess') + user.name + '.' }
      const res = await this.$store.dispatch('users/delete', user)
      if (res.status !== 200 && res.status !== 204) {
        info.text = this.$t('errorMsg')
        info.color = 'error'
      }
      this.$store.dispatch('snackbar/create', { ...info })
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
