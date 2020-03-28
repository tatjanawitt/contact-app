<template>
  <v-rating
    v-model="newRating"
    :readonly="readonly"
    color="red darken-2"
    background-color="white"
    empty-icon="mdi-heart-outline"
    full-icon="mdi-heart"
    hover
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
      get () { return this.rating },
      set (newValue) {
        this.$store.dispatch('contacts/patchNewRating', {
          id: this.$route.params.id,
          rating: newValue
        })
      }
    }
  }
}
</script>
