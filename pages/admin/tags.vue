<template>
  <div>
    <HeaderLayout :header-text="$t('tags.header')"
                  :btn-action="newBtnAction"
                  btn-icon="mdi-tag-plus"
                  :btn-text="$t('new')"
    />
    <TagsTable :start-new="startNew" :tags="tags" :headers="headers" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TagsTable from '@/components/admin/tags-table'
import HeaderLayout from '@/components/shared/header-layout'
export default {
  components: { TagsTable, HeaderLayout },
  data () {
    return { startNew: { tag: false } }
  },
  computed: {
    ...mapState({ tags: state => state.tags.tags }),
    headers () {
      return [
        { text: this.$t('id'), value: 'id' },
        { text: this.$t('tags.name'), value: 'name' },
        { text: this.$t('tags.numContacts'), value: 'contact_ids.length' },
        { text: this.$t('action'), value: 'actions', sortable: false, width: '150px' }
      ]
    }
  },
  methods: {
    newBtnAction () {
      this.startNew.tag = !this.startNew.tag
    }
  }
}
</script>
