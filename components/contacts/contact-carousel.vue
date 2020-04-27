<template>
  <v-container>
    <div class="display-2 my-6 center" v-text="content.title" />
    <div class="subtitle-1 my-4 d-flex justify-center" v-html="content.sub" />
    <v-layout elevation-14>
      <v-carousel v-if="content.images.length" cycle hide-delimiters>
        <v-carousel-item v-for="(img,i) in content.images" :key="i" :src="img.src" />
      </v-carousel>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
export default {
  props: {
    photos: { type: Array, required: true }
  },
  data () {
    return { maxImg: 10 }
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
          images: this.contacts.length && this.$auth.user.id === this.contacts[0].user_id
            ? this.updateImages()
            : this.photos
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
      let cImg = this.contacts.filter(c => c.img.length > 0)
      if (cImg.length) {
        cImg = cImg.map(c => ({ src: c.img }))
        cImg = _.sampleSize(cImg, cImg.length <= this.maxImg ? cImg.length : this.maxImg)
        cImg.unshift(this.photos[0])
      } else {
        cImg = this.photos
      }
      return cImg
    }
  }
}
</script>
