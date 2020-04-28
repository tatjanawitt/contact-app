<template>
  <v-row class="my-2">
    <v-col cols="12" sm="2" class="hidden-xs-only" />
    <v-col cols="12" sm="8">
      <div class="display-1 center" v-text="headerText" />
    </v-col>
    <v-col cols="12" sm="2">
      <div class="d-flex justify-end">
        <v-btn :fab="fab" :large="large" class="primary" @click="btnAction">
          <v-icon :left="btnText?true:false" v-text="btnIcon" />{{ btnText }}
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    headerText: { type: String, required: true },
    btnAction: { type: Function, required: true },
    btnIcon: { type: String, required: true },
    btnText: { type: String, required: false, default: null },
    fab: { type: Boolean, required: false, default: false },
    large: { type: Boolean, required: false, default: false }
  }
}
</script>
