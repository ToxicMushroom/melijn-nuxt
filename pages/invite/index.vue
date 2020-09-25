<template>
  <div>
    <h1 class="title">
      Redirecting to discord to invite Melijn..
    </h1>
  </div>
</template>

<script>
export default {
  mounted () {
    window.location.replace('https://discord.com/oauth2/authorize?client_id=368362411591204865&scope=bot&permissions=457043158&redirect_uri=' +
    window.location.origin + '/callback&response_type=code')
  },
  head () {
    return {
      title: 'Melijn - Invite',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Invite Melijn.'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Melijn - Invite'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://melijn.com/${this.$route.params.id}`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Invite Melijn.'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
h1 {
  text-align: center;
  color: $grey-light;
}
</style>
