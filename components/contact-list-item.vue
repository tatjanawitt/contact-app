<template>
  <v-card width="300px" hover class="ma-2">
    <nuxt-link :to="{ path: `/contacts/detail/${contact.id}`}">
      <v-img :src="contact.img || imgPlaceholder" height="200px" class="white--text align-end">
        <v-card-title class="justify-center">
          <v-badge :value="birthday" color="red darken-2" :content="age" overlap>
            <v-btn text dark>
              {{ fullName }}
            </v-btn>
          </v-badge>
        </v-card-title>
      </v-img>

      <v-card-subtitle>
        <ContactDetailItem icon="mdi-cellphone-wireless" :content="contact.mobil" />
        <ContactDetailItem icon="mdi-email" :content="contact.email" />
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
      <TagsBar :contact="contact" />
    </v-card-actions>
  </v-card>
</template>

<script>
'use strict'
import { mapGetters } from 'vuex'
import ContactRating from '@/components/contact-rating'
import ContactDetailItem from '@/components/contact-detail-item'
import TagsBar from '@/components/tags-bar'

export default {
  name: 'ContactListItem',
  components: {
    ContactRating,
    ContactDetailItem,
    TagsBar
  },
  props: {
    contact: { type: Object, required: true }
  },
  computed: {
    ...mapGetters({
      getFullName: 'contacts/getFullName',
      getAge: 'contacts/getAge',
      getBirthdayToday: 'contacts/getBirthdayToday',
      getImagePlaceholder: 'contacts/getImgagePlaceholder'
    }),
    fullName () {
      return this.getFullName(this.contact.id)
    },
    imgPlaceholder () {
      return this.getImagePlaceholder()
    },
    birthday () {
      return this.getBirthdayToday(this.contact.id)
    },
    age () {
      return this.getAge(this.contact.id)
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
