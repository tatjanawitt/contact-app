<template>
  <v-card flat height="100%" @dblclick="goToContact(contact)">
    <v-img :src="contact.img || imgPlaceholder" height="200px"
           class="white--text align-end"
    >
      <v-card-title class="justify-center">
        <v-badge :value="bToday" :color="color" :content="age" overlap>
          <v-btn color="rgba(121, 134, 203, 0.5)" small dark
                 @mousedown.stop @click="goToContact(contact)"
                 v-text="fullName"
          />
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
        <v-icon :color="color" class="mr-3" v-text="'mdi-cake-variant'" />
      </v-row>
    </v-card-text>
    <v-divider class="mx-4" />
    <v-card-actions>
      <TagsBar :contact="contact" />
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import ContactRating from '@/components/contact-rating'
import ContactDetailItem from '@/components/contact-detail-item'
import TagsBar from '@/components/tags-bar'

export default {
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
    bToday () {
      return this.getBirthdayToday(this.contact.id)
    },
    age () {
      return this.getAge(this.contact.id)
    },
    color () {
      return this.bToday ? 'red darken-2' : 'grey'
    }
  },
  methods: {
    goToContact (contact) {
      this.$router.push(`/contacts/detail/${contact.id}`)
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
