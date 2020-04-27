<template>
  <div v-if="loading" class="loading-page">
    <div>
      <v-progress-circular :size="70" :width="5"
                           color="grey-darken-1" indeterminate
      /><p>Loading...</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return { loading: false }
  },
  methods: {
    start () { this.loading = true },
    finish () { this.loading = false }
  }
}
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(240, 240, 240, 0.7);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
  color: #757575;
  z-index: 50;
}
</style>
