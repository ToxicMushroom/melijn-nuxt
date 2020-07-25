<template>
  <div class="wrapper">
    Redirecting..
  </div>
</template>

<script>
export default {
  mounted () {
    this.$cookies.set('test', 'test')
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
