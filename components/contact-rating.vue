<template>
  <v-rating
    v-model="newRating"
    :readonly="readonly"
    color="error"
    :background-color="small ? 'red lighten-2' : 'red lighten-4'"
    empty-icon="mdi-heart-outline"
    full-icon="mdi-heart"
    :large="large"
    :small="small"
    hover
  />
</template>

<script>
export default {
  props: {
    rating: { type: Number, required: true },
    readonly: { type: Boolean, required: true },
    large: { type: Boolean, required: true }
  },
  computed: {
    newRating: {
      get () { return this.rating },
      set (newValue) {
        this.$store.dispatch('contacts/patchNewRating', {
          id: this.$route.params.id,
          rating: newValue
        })
        this.$store.dispatch('snackbar/create', {
          text: this.$t('contacts.ratingSuccess') + newValue + '.'
        })
      }
    },
    small () {
      return !this.large
    }
  }
}
</script>
