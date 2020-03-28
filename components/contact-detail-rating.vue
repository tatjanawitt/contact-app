<template>
  <v-rating
    v-model="rating"
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
  data: () => ({
    rating: 3,
    readonly: false
  })
}
</script>

<style lang="scss" scoped>

</style>
