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
import { mapGetters } from 'vuex'
export default {
  props: {
    rating: { type: Number, required: true, default: 0 },
    readonly: { type: Boolean, required: true },
    large: { type: Boolean, required: true }
  },
  computed: {
    ...mapGetters({ getContact: 'contacts/get' }),
    newRating: {
      get () { return this.rating },
      set (newValue) {
        const contact = {
          ...this.getContact(this.$route.params.id),
          rating: newValue
        }
        this.$store.dispatch('contacts/edit', contact)
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
