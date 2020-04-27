<template>
  <div>
    <v-chip v-for="tag_id in contact.tag_ids" :key="`${contact.id}-${tag_id}`"
            :to="`/contacts/tags/${tag_id}`"
            class="mr-1 my-1 secondary" small dark
            @mousedown.stop v-text="getTag(tag_id).name"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    contact: { type: Object, required: true }
  },
  computed: {
    ...mapState({ tags: state => state.tags.tags })
  },
  methods: {
    getTag (tagId) { return this.tags.find(t => t.id === tagId) }
  }
}
</script>
