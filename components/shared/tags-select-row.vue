<template>
  <div class="d-flex justify-end" :class="dialog.status ? ' flex-nowrap' : ' flex-wrap-reverse'">
    <v-combobox
      v-model="contactTags"
      :items="tags"
      item-text="name"
      append-icon="mdi-tag-plus"
      outlined
      dark
      background-color="rgba(232, 135, 0, 0.7)"
      style="min-width: 300px; max-width: 100%;"
      multiple
      chips
      deletable-chips
      hide-selected
      hide-details
      return-object
    />
    <div v-if="$route.name.includes('admin') && $auth.user.admin"
         class="d-flex align-center mb-2 ml-2"
    >
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
    <div v-else>
      <v-btn class="mt-4" icon @click="dialog.status=false">
        <v-icon v-text="'mdi-close-circle'" />
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import _ from 'lodash'
export default {
  props: {
    contact: { type: Object, required: true },
    fullName: { type: String, required: true },
    dialog: {
      type: Object,
      required: false,
      default () {
        return { status: false }
      }
    }
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
          await this.$store.dispatch('tags/connectToContact', {
            tag: createdTag, contact: this.contact
          })
        } else {
          const addedTags = _.differenceBy(newTags, this.contactTags, 'id')
          const removedTags = _.differenceBy(this.contactTags, newTags, 'id')

          if (addedTags.length > 0) {
            await this.$store.dispatch('tags/connectToContact', {
              tag: addedTags[0], contact: this.contact
            })
          }
          if (removedTags.length > 0) {
            await this.$store.dispatch('tags/disconnectFromContact', {
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
