<template>
  <v-container>
    <div class="display-2 my-6 center" v-text="content.title" />
    <div class="subtitle-1 my-4 d-flex justify-center" v-text="content.sub" />
    <v-layout elevation-14>
      <v-carousel cycle hide-delimiters>
        <v-carousel-item v-for="(img,i) in content.images" :key="i" :src="img.src" />
      </v-carousel>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  middleware: ['load-contacts'],
  data () {
    return {
      images: [
        { src: 'https://cdn.pixabay.com/photo/2015/11/03/08/58/meeting-1019875_960_720.jpg' },
        { src: 'https://cdn.pixabay.com/photo/2019/11/29/01/58/wedding-4660419_960_720.jpg' },
        { src: 'https://cdn.pixabay.com/photo/2015/01/08/18/27/startup-593341_960_720.jpg' },
        { src: 'https://cdn.pixabay.com/photo/2016/05/27/05/44/bike-ride-1419144_960_720.jpg' },
        { src: 'https://cdn.pixabay.com/photo/2013/12/14/02/10/autumn-228150_960_720.jpg' },
        { src: 'https://cdn.pixabay.com/photo/2018/09/15/21/40/holistic-health-3680377_960_720.jpg' },
        { src: 'https://cdn.pixabay.com/photo/2016/03/09/09/22/workplace-1245776_960_720.jpg' },
        { src: 'https://cdn.pixabay.com/photo/2015/03/26/10/07/restaurant-690975_960_720.jpg' },
        { src: 'https://cdn.pixabay.com/photo/2017/08/03/21/48/drinks-2578446_960_720.jpg' },
        { src: 'https://cdn.pixabay.com/photo/2020/03/04/13/04/network-4901588_960_720.jpg' }
      ]
    }
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
          images: this.contacts.length && this.contacts.filter(c => c.img.length > 0).length
            ? this.contacts.filter(c => c.img.length > 0).map(c => ({ src: c.img }))
            : this.images
        }
      } else {
        return {
          title: this.$t('home.title'),
          sub: this.$t('home.sub'),
          images: this.images
        }
      }
    }
  }
}
</script>
