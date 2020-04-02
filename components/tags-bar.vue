<template>
  <div>
    <v-chip
      v-for="tag_id in contact.tag_ids" :key="`${contact.id}-${tag_id}`"
      color="indigo lighten-2"
      :to="`/contacts/tags/${tag_id}`"
      class="mr-1 my-1"
      small
      dark
      label
      @mousedown.stop
    >
      {{ getTag(tag_id).name }}
    </v-chip>
  </div>
</template>

<script>
'use strict'
import { mapState } from 'vuex'

export default {
  name: 'TagsBar',
  props: {
    contact: { type: Object, required: true }
  },
  computed: {
    ...mapState({
      tags: state => state.tags.tags
    })
  },
  methods: {
    getTag (tagId) {
      return this.tags.find(t => t.id === tagId)
    }
  }
}
</script>
