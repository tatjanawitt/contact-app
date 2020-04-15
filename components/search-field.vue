<template>
  <v-row justify="center">
    <v-col cols="12" sm="6" md="6" lg="5">
      <v-text-field
        v-model="search.item"
        :append-icon="icon"
        :label="label"
        clearable
        filled
        color="primary"
        background-color="rgba(255,255,255, 0.5)"
        class="mb-2"
        hide-details
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    label: { type: String, required: true },
    icon: { type: String, required: true },
    search: { type: Object, required: true }
  }
}
</script>
