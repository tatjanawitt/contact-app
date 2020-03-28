<template>
  <v-card width="300px" hover class="ma-2">
    <nuxt-link :to="{ path: `/contacts/detail/${contact.id}`}">
      <v-img :src="contact.img || ''" />
      <v-card-title>{{ contact.fName }}</v-card-title>
      <v-card-text>{{ contact.lName }}</v-card-text>
    </nuxt-link>

    <v-card-actions>
      <span v-for="tag_id in contact.tag_ids" :key="`${contact.id}-${tag_id}`">
        <v-btn
          color="orange lighten-3"
          class="mr-2"
          small
          :to="`/contacts/tags/${tag_id}`"
          @mousedown.stop
        >{{ getTag(tag_id).name }}</v-btn>
      </span>
    </v-card-actions>
  </v-card>
</template>

<script>
'use strict'
import { mapState } from 'vuex'

export default {
  name: 'ContactListItem',
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

<style scoped lang="scss">
a {
  text-decoration: none;
  color: black;
}
</style>
