<template>
  <ContactCarousel :photos="images" />
</template>

<script>
import ContactCarousel from '@/components/contacts/contact-carousel'
export default {
  components: { ContactCarousel },
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
  }
}
</script>
