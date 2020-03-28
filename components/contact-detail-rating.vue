<template>
  <v-rating
    v-model="newRating"
    :readonly="readonly"
    color="red darken-2"
    background-color="white"
    empty-icon="mdi-heart-outline"
    full-icon="mdi-heart"
    hover
    @click="updateRating()"
  />
</template>

<script>
export default {
  props: {
    rating: { type: Number, required: true }
  },
  data: () => ({
    readonly: false
  }),
  computed: {
    newRating: {
      // eslint-disable-next-line object-shorthand
      get: function () {
        return this.rating
      },
      // eslint-disable-next-line object-shorthand
      set: function (newValue) {
        console.log(newValue)
        this.$store.dispatch('contacts/patchRating', { id: this.$route.params.id, rating: this.rating })
        return newValue
      }
    }
  },
  methods: {
    updateRating () {
      console.log('click', this.newRating)
      this.$store.dispatch('contacts/patchRating', { id: this.$route.params.id, rating: this.rating })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
