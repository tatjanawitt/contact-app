<template>
  <nuxt-link :to="`/admin/contacts/${contact.id}/edit`">
    <v-row class="px-6">
      <v-col cols="12" sm="5" md="4">
        <v-img :src="contact.img || imgPlaceholder"
               max-width="300px" max-height="250px"
        />
        <ContactRating :rating="contact.rating" :readonly="true" :large="true" />
      </v-col>
      <v-col cols="12" sm="7" md="8">
        <ContactDetail :contact="contact" :show-footer="false" />
      </v-col>
    </v-row>
  </nuxt-link>
</template>

<script>
import { mapGetters } from 'vuex'
import ContactRating from '@/components/contact-rating'
import ContactDetail from '@/components/contact-detail'
export default {
  components: { ContactRating, ContactDetail },
  props: {
    contact: { type: Object, required: true }
  },
  computed: {
    ...mapGetters({
      getImagePlaceholder: 'contacts/getImgagePlaceholder'
    }),
    imgPlaceholder () { return this.getImagePlaceholder() }
  }
}
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: black;
}
</style>
