<template>
  <div>
    <h1>Kontakte</h1>
    <div v-for="contact in contacts" :key="contact.id">
      <p>{{ contact.fName }} {{ contact.lName }}</p>
      <img :src="contact.img" alt="">
    </div>
  </div>
</template>

<script>
'use strict'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      contacts: state => state.contacts.contacts
    })
  }
}
</script>
