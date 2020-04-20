<template>
  <v-container>
    <div class="display-2 my-6 center" v-text="content.title" />
    <div class="subtitle-1 my-4 d-flex justify-center" v-text="content.sub" />
    <v-layout elevation-14>
      <v-carousel v-if="content.images.length" cycle hide-delimiters>
        <v-carousel-item v-for="(img,i) in content.images" :key="i" :src="img.src" />
      </v-carousel>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    photos: { type: Array, required: true }
  },
  computed: {
    ...mapState({
      contacts: state => state.contacts.contacts
    }),
    content () {
      if (this.$auth.loggedIn) {
        return {
          title: `Hi ${this.$auth.user.name}!`,
          sub: this.$t('home.subAuth'),
          images: this.updateImages()
        }
      } else {
        return {
          title: this.$t('home.title'),
          sub: this.$t('home.sub'),
          images: this.photos
        }
      }
    }
  },
  methods: {
    updateImages () {
      let cImages = this.contacts.filter(c => c.img.length > 0)
      if (this.contacts.length && cImages.length) {
        cImages = cImages.map(c => ({ src: c.img }))
        cImages.unshift(this.photos[0])
      } else {
        cImages = this.photos
      }
      return cImages
    }
  }
}
</script>
