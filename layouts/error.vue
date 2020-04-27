<template>
  <v-container class="text-center" fill-height style="height: calc(100vh - 58px);">
    <v-row align="center">
      <v-col class="d-flex justify-center">
        <v-card class="pa-3" max-width="400px">
          <div v-if="error.statusCode === 404">
            <h1 class="display-2 primary--text">
              {{ $t('errorSite.notFound') }}
            </h1>
            <p>{{ $t('errorSite.notFoundMsg') }}</p>
          </div>
          <div v-else>
            <h1 class="display-2 primary--text">
              {{ $t('errorSite.title') }}
            </h1>
            <p>{{ $t('errorSite.msg') }}</p>
          </div>
          <v-btn to="/" color="primary" outlined>
            {{ $t('errorSite.btnText') }}
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: { type: Object, default: null }
  },
  data () {
    return {
      pageNotFound: this.$t('errorSite.notFound'),
      otherError: this.$t('errorSite.title')
    }
  },
  head () {
    const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return { title }
  }
}
</script>

<style scoped>
h1 { font-size: 20px; }
</style>
