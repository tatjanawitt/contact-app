<template>
  <div>
    <h1>Videos</h1>
    <div v-for="contact in contacts" :key="contact.id">
      <p>{{ contact.fName }} {{ contact.lName }}</p>
      <img :src="contact.img" alt="">
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios }) {
    const response = await $axios.get('/contacts')
    let contacts = response.data.data.map(c => c.attributes)
    contacts = response.data.data.map((c) => {
      return { ...c.attributes, id: c.id }
    })

    return {
      contacts
    }
  }
}
</script>
