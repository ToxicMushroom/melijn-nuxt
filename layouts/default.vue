<template>
  <div id="__content">
    <navbar :loggedin="loggedIn" :tag="tag" :avatar="avatar" :hover-avatar="hoverAvatar" />
    <nuxt />
    <foot />
  </div>
</template>

<script>
import navbar from '@/components/Navbar'
import footer from '@/components/footer'

export default {
  components: {
    navbar,
    foot: footer
  },
  data () {
    return {
      loggedIn: false,
      tag: '',
      avatar: '',
      hoverAvatar: ''
    }
  },
  mounted () {
    if (this.$cookies.get('sdt')) {
      let headers = this.$util.getHeaderObject(this, process.server);
      this.$axios.$post('cookie/decrypt/user', { jwt: this.$cookies.get('sdt') }, { headers: headers }).then((res) => {
        if (res.status !== 'success') { return }
        this.loggedIn = true
        this.tag = res.tag
        if (res.isDefault) {
          this.avatar = res.avatar
          this.hoverAvatar = res.avatar
        } else {
          this.avatar = res.avatar + '.webp?size=64'
          this.hoverAvatar = res.avatar + (res.isGif ? '.gif' : '.webp') + '?size=64'
        }
      })
    }
  }
}
</script>

<style lang="scss">
html, body {
  background-color: $bg-color;
}

.text-link {
  color: $blue-minimal-contrast !important;
  text-decoration: none;
}

.text-link:hover {
  color: $blue-good-contrast !important;
}
</style>

<style>
body, button, input, select, textarea {
  font-family: 'Open Sans', sans-serif;
}

html, body {
  height: 100%;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: var(--grey-light);
}

#__nuxt, #__layout {
  height: 100%;
  display: flex;
  flex-direction: column;
}

#__content {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
}
</style>
