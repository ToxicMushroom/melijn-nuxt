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
    console.log("invite.vue redirecting to discord bot invite");
    window.location.replace('https://discord.com/oauth2/authorize?client_id=368362411591204865&scope=bot&permissions=456518870&redirect_uri=' +
    window.location.origin + '/')
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
