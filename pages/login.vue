<template>
  <div>
    <h1 class="title">
      Loading login page..
    </h1>
  </div>
</template>

<script>
export default {
  mounted () {
    console.log("/login.vue redirecting to discord login");
    window.location.replace('https://discord.com/oauth2/authorize?client_id=368362411591204865&scope=identify%20guilds&redirect_uri=' +
    window.location.origin + '/callback/dashboard&response_type=code&prompt=none')
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
          content: `https://melijn.com/${this.$route.params.id}`
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
h1 {
  text-align: center;
  color: $grey-light;
}
</style>
