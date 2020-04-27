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
    >
      <template #item.contact_ids.length="{ item }">
        <v-chip v-if="item.contact_ids.length" color="secondary" small dark label>
          <v-icon left v-text="'mdi-account-multiple'" />{{ item.contact_ids.length }}
        </v-chip>
      </template>
      <template #item.admin="{ item }">
        <v-chip :color="getColor(item.admin)" small outlined label dark>
          {{ item.admin ? $t('users.roleAdmin') : $t('users.roleUser') }}
        </v-chip>
      </template>
      <template #item.actions="{item}">
        <UsersForm :header-text="$t('users.editLabel')"
                   :save-user="update"
                   :user="item"
        />
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
      </template>
    </v-data-table>
  </div>
</template>

<script>
import SearchField from '@/components/shared/search-field'
import DialogConfirm from '@/components/shared/dialog-confirm'
import UsersForm from '@/components/forms/users-form'
export default {
  components: { SearchField, DialogConfirm, UsersForm },
  props: {
    users: { type: Array, required: true },
    headers: { type: Array, required: true }
  },
  data () {
    return { search: { item: '' } }
  },
  computed: {
    mungedUsers () {
      return this.users.map(u => ({ ...u }))
    }
  },
  methods: {
    async update (newUser) {
      const user = await this.$store.dispatch('users/edit', newUser)
      this.$store.dispatch('snackbar/create', {
        text: this.$t('users.editSuccess') + user.name + '.'
      })
    },
    async deleteUser (user) {
      const info = { text: this.$t('users.delSuccess') + user.name + '.' }
      const res = await this.$store.dispatch('users/delete', user)
      if (res.status !== 200 && res.status !== 204) {
        info.text = this.$t('errorMsg')
        info.color = 'error'
      }
      this.$store.dispatch('snackbar/create', { ...info })
    },
    getColor (admin) {
      if (admin) { return 'error' } else { return 'secondary' }
    }
  }
}
</script>

<style lang="scss" scoped>
.v-data-table {
  background-color:rgba(255, 255, 255, 0.8);
}
::v-deep thead.v-data-table-header {
    background-color:rgba(121, 134, 203, 0.3);
    white-space: nowrap;
}
</style>
