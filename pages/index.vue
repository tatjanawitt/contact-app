<template>
  <v-container>
    <div class="display-2 ma-4 d-flex justify-center">
      Willkommen
    </div>
    <div v-if="$auth.loggedIn" to="/birthdays" />
    <div v-else to="/login">
      <v-btn to="/login">
        login
      </v-btn>
      <v-btn to="/register">
        register
      </v-btn>
    </div>

    <v-carousel>
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      />
    </v-carousel>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { src: 'https://cdn.pixabay.com/photo/2019/11/29/01/58/wedding-4660419_960_720.jpg' },
        {
          src: 'https://cdn.pixabay.com/photo/2015/01/08/18/27/startup-593341_960_720.jpg'
        },
        { src: 'https://cdn.pixabay.com/photo/2016/05/27/05/44/bike-ride-1419144_960_720.jpg' },
        { src: 'https://cdn.pixabay.com/photo/2013/12/14/02/10/autumn-228150_960_720.jpg' },
        { src: 'https://cdn.pixabay.com/photo/2018/09/15/21/40/holistic-health-3680377_960_720.jpg' },
        {
          src: 'https://cdn.pixabay.com/photo/2016/03/09/09/22/workplace-1245776_960_720.jpg'
        },
        { src: 'https://cdn.pixabay.com/photo/2015/03/26/10/07/restaurant-690975_960_720.jpg' },
        {
          src: 'https://cdn.pixabay.com/photo/2017/08/03/21/48/drinks-2578446_960_720.jpg'
        },
        {
          src: 'https://cdn.pixabay.com/photo/2020/03/04/13/04/network-4901588_960_720.jpg'
        }
      ]
    }
  },
  methods: {
    goToLogin () {
      this.this.$router.push('/login')
    }
  }
}
</script>
