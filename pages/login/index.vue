<template>
  <div class="wrapper">
    Loggin in..
  </div>
</template>

<script>
export default {
  mounted () {
    window.location.replace('https://discord.com/oauth2/authorize?client_id=368362411591204865&scope=identify%20guilds&redirect_uri=' +
    window.location.origin + '/callback&response_type=code')
  },
  head () {
    return {
      title: 'Melijn - Login',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Login on Melijn with your discord account.'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Melijn - Login'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://v2.melijn.com/${this.$route.params.id}`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Login on Melijn with your discord account.'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  text-align: center;
}
</style>
