<template>
  <v-card class="pa-4" color="rgba(255, 255, 255, 0.5)">
    <v-card-title class="display-1 d-flex justify-center">
      Tags auswählen
    </v-card-title>
    <v-row justify="center">
      <v-col cols="12" sm="7" md="8">
        <v-combobox
          v-model="contactTags"
          :items="tags"
          item-text="name"
          class="mr-6"
          multiple
          chips
          deletable-chips
          hide-selected
          return-object
        />
      </v-col>
      <v-col cols="12" sm="3" md="2">
        <div class="mt-4 d-flex justify-end">
          <v-btn class="primary mr-2" :to="`/contacts/detail/${contact.id}`">
            Watch
          </v-btn>
          <v-btn class="primary" :to="`/admin/contacts/${contact.id}/edit`">
            Edit
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="10">
        <v-card>
          <v-card-title class="indigo lighten-2">
            <v-avatar v-if="contact.img" size="70px">
              <v-img :src="contact.img" />
            </v-avatar>
            <span class="headline white--text ml-4">
              {{ fullName }}
            </span>
            <v-spacer />
            <ContactRating :rating="contact.rating" :readonly="false" :large="true" />
          </v-card-title>
          <ContactDetail :contact="contact" :show-footer="false" />
        </v-card>
      </v-col>
    </v-row>
  </v-card>
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
    ...mapState({
      tags: state => state.tags.tags
    }),
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
