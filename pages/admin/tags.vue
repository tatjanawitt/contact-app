<template>
  <v-container class="px-0">
    <v-row class="ma-2">
      <div class="display-1" v-text="$t('tags.header')" />
      <v-spacer />
      <v-btn class="primary" @click="startNew.tag=!startNew.tag">
        <v-icon left v-text="'mdi-tag-plus'" />{{ $t('new') }}
      </v-btn>
    </v-row>
    <TagsTable :start-new="startNew" :tags="tags" :headers="headers" />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import TagsTable from '@/components/tags-table'
export default {
  components: { TagsTable },
  data () {
    return {
      startNew: { tag: false }
    }
  },
  computed: {
    ...mapState({ tags: state => state.tags.tags }),
    headers () {
      return [
        { text: 'Id', value: 'id' },
        { text: this.$t('tags.name'), value: 'name' },
        { text: this.$t('tags.numContacts'), value: 'contact_ids.length' },
        { text: this.$t('action'), value: 'actions', sortable: false, width: '150px' }
      ]
    }
  }
}
</script>
