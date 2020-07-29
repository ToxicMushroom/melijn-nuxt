<template>
  <div class="wrapper">
    <h1 class="title">
      Dashboard: {{ guild.name }}
    </h1>
  </div>
</template>

<script>
export default {
  asyncData ({ $content, params }) {
    return { id: params.slug }
  },
  data () {
    return {
      loggedIn: false,
      guild: {}
    }
  },
  mounted () {
    if (this.$cookies.get('sdt')) {
      this.$axios.$post('/cookie/decrypt/guild', { jwt: this.$cookies.get('sdt'), id: this.id }).then((res) => {
        this.loggedIn = true

        const isGif = res.icon.startsWith('a_')
        const guild = {}
        guild.name = res.name
        guild.avatarVariables = {
          '--guild-avatar': 'url(https://cdn.discordapp.com/icons/' + res.id + '/' + res.icon + '.webp?size=128)',
          '--guild-avatar-hover': 'url(https://cdn.discordapp.com/icons/' + res.id + '/' + res.icon + (isGif ? '.gif' : '.webp') + '?size=128)'
        }
        this.guild = guild
      }).catch((error) => {
        console.log(error)
        window.location.replace(window.location.origin)
      })
    } else {
      window.location.replace(window.location.origin)
    }
  },
  head () {
    return {
      title: 'Melijn - Dashboard',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Dashboard of Melijn to configure servers and user settings.'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Melijn - Dashboard'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://v2.melijn.com/${this.$route.params.id}`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Dashboard of Melijn to configure servers and user settings.'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 10px;
  @media (max-width: $tablet) {
    margin: 5px;
  }
  .title {
    color: white;
  }
}
</style>
