<template>
  <div>
    <div class="display-1 my-4 center" v-text="$t('tags.choice')" />
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
    <v-row justify="center">
      <v-col cols="12" sm="12">
        <div class="subtitle-1" v-html="$t('contacts.notice')" />
        <v-card class="cardColor">
          <v-card-title class="secondary">
            <v-avatar v-if="contact.img" size="70px">
              <v-img :src="contact.img" />
            </v-avatar>
            <span class="headline white--text ml-4" v-text="fullName" />
            <v-spacer />
            <ContactRating :rating="contact.rating" :readonly="false" :large="true" />
          </v-card-title>
          <ContactDetail :contact="contact" :show-footer="false" />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import _ from 'lodash'
import ContactDetail from '@/components/contact-detail'
import ContactRating from '@/components/contact-rating'
export default {
  components: {
    ContactDetail,
    ContactRating
  },
  computed: {
    ...mapState({ tags: state => state.tags.tags }),
    ...mapGetters({
      getTag: 'tags/get',
      getContact: 'contacts/get',
      getFullName: 'contacts/getFullName'
    }),
    contact () {
      return this.getContact(this.$route.params.id)
    },
    fullName () {
      return this.getFullName(this.$route.params.id)
    },
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
            tag: createdTag,
            contact: this.contact
          })
        } else {
          const addedTags = _.differenceBy(newTags, this.contactTags, 'id')
          const removedTags = _.differenceBy(this.contactTags, newTags, 'id')

          if (addedTags.length > 0) {
            this.$store.dispatch('tags/connectToContact', {
              tag: addedTags[0],
              contact: this.contact
            })
          }
          if (removedTags.length > 0) {
            this.$store.dispatch('tags/disconnectFromContact', {
              tag: removedTags[0],
              contact: this.contact
            })
          }
        }
      }
    }
  }
}
</script>
