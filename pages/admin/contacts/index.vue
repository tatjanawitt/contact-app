<template>
  <div>
    <HeaderLayout :header-text="$t('contacts.header')"
                  :btn-action="goToNewContact"
                  btn-icon="mdi-account-plus"
                  :btn-text="$t('new')"
    />
    <ContactTable :contacts="adjustContacts" :headers="headers" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ContactTable from '@/components/contact-table'
import HeaderLayout from '@/components/header-layout'
export default {
  components: { ContactTable, HeaderLayout },
  computed: {
    ...mapState({ contacts: state => state.contacts.contacts }),
    ...mapGetters({ getUser: 'users/get' }),
    adjustContacts () {
      return this.contacts.map(c => ({ ...c, userName: this.getUser(c.user_id).name }))
    },
    headers () {
      return [
        { text: 'Id', value: 'id' },
        { text: this.$t('cForm.fName').slice(0, -1), value: 'fName' },
        { text: this.$t('cForm.lName').slice(0, -1), value: 'lName' },
        { text: this.$t('cForm.place'), value: 'place' },
        { text: this.$t('links.users'), value: 'userName' },
        { text: this.$t('links.tags'), value: 'tags', sortable: false },
        { text: this.$t('action'), value: 'actions', sortable: false, width: '225px' }
      ]
    }
  },
  methods: {
    goToNewContact () {
      this.$router.push('/admin/contacts/new')
    }
  }
}
</script>
