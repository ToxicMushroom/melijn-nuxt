<template>
  <div class="wrapper">
    Loggin out..
  </div>
</template>

<script>
export default {
  mounted () {
    this.$cookies.remove('sdt')
    window.location.replace(window.location.origin)
  },
  head () {
    return {
      title: 'Melijn - Logout',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Logout from Melijn.'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Melijn - Logout'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://v2.melijn.com/${this.$route.params.id}`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Logout from Melijn.'
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
