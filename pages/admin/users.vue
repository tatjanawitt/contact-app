<template>
  <div>
    <HeaderLayout :header-text="$t('users.header')"
                  :btn-action="openDialog"
                  btn-icon="mdi-lock-plus"
                  :btn-text="$t('new')"
    />
    <UsersForm :header-text="$t('users.newLabel')"
               :save-user="create"
               :user="user"
               :dialog="dialog"
    />
    <UsersTable :users="users" :headers="headers" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UsersTable from '@/components/admin/users-table'
import UsersForm from '@/components/forms/users-form'
import HeaderLayout from '@/components/shared/header-layout'
export default {
  components: { UsersTable, UsersForm, HeaderLayout },
  data () {
    return { user: {}, dialog: { show: false } }
  },
  computed: {
    ...mapState({ users: state => state.users.users }),
    headers () {
      return [
        { text: this.$t('id'), value: 'id' },
        { text: this.$t('users.name'), value: 'name' },
        { text: this.$t('users.email'), value: 'email' },
        { text: this.$t('tags.numContacts'), value: 'contact_ids.length' },
        { text: this.$t('users.role'), value: 'admin' },
        { text: this.$t('action'), value: 'actions', sortable: false, width: '150px' }
      ]
    }
  },
  methods: {
    openDialog () {
      this.dialog.show = true
    },
    async create (newUser) {
      const user = await this.$store.dispatch('users/create', newUser)
      this.$store.dispatch('snackbar/create', {
        text: this.$t('users.newSuccess') + user.name + '.'
      })
    }
  }
}
</script>
