<template>
  <v-row justify="center">
    <v-col cols="12" sm="7" md="8">
      <v-combobox
        v-model="contactTags"
        :items="tags"
        item-text="name"
        append-icon="mdi-tag-plus"
        outlined
        dark
        background-color="rgba(232, 135, 0, 0.7)"
        multiple
        chips
        deletable-chips
        hide-selected
        return-object
      />
    </v-col>
    <v-col cols="12" sm="5" md="4">
      <div class="mt-4 d-flex justify-end">
        <v-btn class="primary mr-2" :to="`/contacts/detail/${contact.id}`">
          <v-icon v-text="'mdi-card-account-details'" />
        </v-btn>
        <v-btn class="primary mr-2" :to="`/admin/contacts/${contact.id}/edit`">
          <v-icon v-text="'mdi-account-edit'" />
        </v-btn>
        <v-btn class="primary" :to="`/admin/contacts`">
          <v-icon v-text="'mdi-table-eye'" />
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import _ from 'lodash'
export default {
  props: {
    contact: { type: Object, required: true },
    fullName: { type: String, required: true }
  },
  computed: {
    ...mapState({ tags: state => state.tags.tags }),
    ...mapGetters({ getTag: 'tags/get' }),

    contactTags: {
      get () {
        const tagIds = this.contact.tag_ids
        return tagIds && tagIds.map(id => this.getTag(id))
      },
      async set (newTags) {
        let createdTag = newTags.find(t => typeof t === 'string')

        if (createdTag) {
          createdTag = await this.$store.dispatch('tags/create', {
            name: createdTag
          })
          this.$store.dispatch('tags/connectToContact', {
            tag: createdTag, contact: this.contact
          })
        } else {
          const addedTags = _.differenceBy(newTags, this.contactTags, 'id')
          const removedTags = _.differenceBy(this.contactTags, newTags, 'id')

          if (addedTags.length > 0) {
            this.$store.dispatch('tags/connectToContact', {
              tag: addedTags[0], contact: this.contact
            })
          }
          if (removedTags.length > 0) {
            this.$store.dispatch('tags/disconnectFromContact', {
              tag: removedTags[0], contact: this.contact
            })
          }
        }

        this.$store.dispatch('snackbar/create', {
          text: this.$t('tags.addedSuccess') + this.fullName + '.'
        })
      }
    }
  }
}
</script>
