<template>
  <v-card width="300px" hover class="ma-2">
    <nuxt-link :to="{ path: `/contacts/detail/${contact.id}`}">
      <v-img :src="contact.img || avatar" height="200px" class="white--text align-end">
        <v-card-title class="justify-center">
          <v-badge :value="birthday" color="red darken-2" :content="age" overlap>
            <v-btn text dark>
              {{ contact.fName }} {{ contact.lName }}
            </v-btn>
          </v-badge>
        </v-card-title>
      </v-img>

      <v-card-subtitle>
        <ContactDetail icon="mdi-cellphone-wireless" :content="contact.mobil" />
        <ContactDetail icon="mdi-email" :content="contact.email" />
      </v-card-subtitle>

      <v-divider class="mx-4" />

      <v-card-text class="py-0">
        <v-row>
          <ContactRating :rating="contact.rating" :readonly="true" :large="false" />
          <v-spacer />
          <v-icon :color="birthday ? 'red darken-2' : 'pink lighten-5'" class="mr-3">
            mdi-cake
          </v-icon>
        </v-row>
      </v-card-text>
    </nuxt-link>

    <v-divider class="mx-4" />

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
import ContactRating from '@/components/contact-rating'
import ContactDetail from '@/components/contact-detail'

export default {
  name: 'ContactListItem',
  components: {
    ContactRating,
    ContactDetail
  },
  props: {
    contact: { type: Object, required: true }
  },
  computed: {
    ...mapState({
      tags: state => state.tags.tags
    }),
    avatar () {
      return 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461__340.png'
    },
    birthday () {
      let bornDay = false // in store einbauen als getter
      if (this.contact.born) {
        bornDay = this.contact.born.getDate() === new Date().getDate() &&
          this.contact.born.getMonth() === new Date().getMonth()
      }
      return bornDay
    },
    age () {
      let age = null // in store einbauen als getter
      if (this.contact.born) {
        const ageDifMs = Date.now() - this.contact.born.getTime()
        const ageDate = new Date(ageDifMs)
        age = Math.abs(ageDate.getUTCFullYear() - 1970)
      }
      return age
    }
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
