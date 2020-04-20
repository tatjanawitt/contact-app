<template>
  <v-list-item>
    <v-list-item-action>
      <v-icon :color="color" v-text="icon" />
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title class="text-wrap" v-text="content" />
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: {
    icon: { type: String, required: true },
    content: { type: String, required: true, default: '' },
    color: { type: String, default: 'grey' }
  }
}
</script>
