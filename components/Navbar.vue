<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <nuxt-link to="/" class="navbar-item">
        <img src="@/static/img/icon.svg" alt="Melijn icon" width="60" height="60">
        <h1>Melijn</h1>
      </nuxt-link>
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        :class="{ 'is-active': showNav }"
        @click="showNav = !showNav"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>
    <div class="navbar-end">
      <nuxt-link to="/" class="navbar-item">
        Home
      </nuxt-link>
      <nuxt-link to="/commands" class="navbar-item">
        Commands
      </nuxt-link>
      <nuxt-link to="/guides" class="navbar-item">
        Guides
      </nuxt-link>
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          More
        </a>

        <div class="navbar-dropdown" disabled>
          <nuxt-link to="/about" class="navbar-item">
            About
          </nuxt-link>
          <nuxt-link to="/legal" class="navbar-item">
            Privacy & Terms
          </nuxt-link>
          <a class="navbar-item" rel="noopener noreferrer nofollow" href="https://discord.com/invite/tfQ9s7u" target="_blank">
            Support server
          </a>
          <a class="navbar-item" rel="noopener noreferrer nofollow" href="mailto:contact@melijn.me" target="_blank">
            Email Contact
          </a>
          <hr class="navbar-divider">
          <nuxt-link class="navbar-item" to="/invite" target="_blank">
            Invite Melijn
          </nuxt-link>
        </div>
      </div>
      <div v-if="loggedIn == false" class="navbar-item">
        <div class="buttons" disabled>
          <nuxt-link to="/login" class="button is-primary">
            <strong>Login</strong>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="navbar-menu" :class="{ 'is-active': showNav }">
      <div class="navbar-end">
        <nuxt-link to="/" class="navbar-item" @click="showNav = !showNav">
          Home
        </nuxt-link>
        <nuxt-link to="/commands" class="navbar-item" @click="showNav = !showNav">
          Commands
        </nuxt-link>
        <nuxt-link to="/guides" class="navbar-item" @click="showNav = !showNav">
          Guides
        </nuxt-link>
        <hr>
        <nuxt-link to="/about" class="navbar-item" @click="showNav = !showNav">
          About
        </nuxt-link>
        <nuxt-link to="/legal" class="navbar-item" @click="showNav = !showNav">
          Privacy & Terms
        </nuxt-link>
        <a class="navbar-item" rel="noopener noreferrer nofollow" href="https://discord.com/invite/tfQ9s7u" target="_blank" @click="showNav = !showNav">
          Support server
        </a>
        <a class="navbar-item" rel="noopener noreferrer nofollow" href="mailto:contact@melijn.me" target="_blank" @click="showNav = !showNav">
          Email Contact
        </a>
        <hr>
        <nuxt-link class="navbar-item" to="/invite" target="_blank" @click="showNav = !showNav">
          Invite Melijn
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  async asyncData ({ $cookies, $config }) {
    const jwt = require('jsonwebtoken')
    console.log('help')
    const cookie = $cookies.get('sdt')
    console.log(cookie)
    let avatarUrl = 'https://discord.com/assets/e0c782560fd96acd7f01fda1f8c6ff24.svg'
    let error = false
    let loggedIn = false

    if (cookie) {
      try {
        const obj = await jwt.verify(cookie, $config.signingkey)
        console.log(obj)
        avatarUrl = 'https://cdn.discordapp.com/avatars/' + obj.id + '/' + obj.avatarUrl + '.webp?size=128'
        loggedIn = true
      } catch (err) {
        console.error(err)
        error = true
      }
      console.log(cookie)
    }
    console.log('no cookie')

    return { loggedIn, avatarUrl, error }
  },
  data () {
    return {
      showNav: false
    }
  },
  watch: {
    error () {
      if (this.error === true) {
        window.location.replace('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
      }
    }
  },
  mounted () {
    if (this.error === true) {
      window.location.replace('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
    }
  }
}
</script>

<style lang="scss" scoped>
hr {
  background-color: $darkgrey;
  margin: 5px 10px;
}
.navbar {
  background: none;
  height: 60px;
  .navbar-brand {
    .navbar-item {
      padding: 0;
      h1 {
        font-size: 28px;
        color: $grey-light;
      }
      img {
        max-height: 56px;
      }
    }
    .navbar-burger {
      height: 60px;
      width: 60px;
      color: $grey-light;
    }
  }
  .navbar-end {
    @media (max-width: $desktop) {
      display: none;
    }
    a.navbar-item {
      &:hover, &:focus {
        color: $grey-light;
        background: none;
      }

      color: $grey-lite;
    }
    div.navbar-item.has-dropdown {
      &:hover, &:focus {
        background: none;
        color: $grey-light;
        .navbar-link {
          color: $grey-light;
          background: none;
        }
      }

      .navbar-link {
        color: $grey-lite;
        &:hover, &:focus {
          background: none;
          color: $grey-light;
        }
      }

      .navbar-dropdown {
        border-top: 2px solid $dark;
        .navbar-item {
          &:hover, &:focus {
            background-color: $dark;
          }
          color: $grey-lite;
        }
        .navbar-divider {
          background-color: $dark;
        }
      }
      color: $grey-lite;
    }
  }
  .navbar-menu {
    .navbar-item {
      margin: 4px 10px;
      border-radius: 4px;
    }
    @media (min-width: $desktop) {
      display: none;
    }
    &.is-active .navbar-end {
      @media (max-width: $desktop) {
        display: block;
      }
    }
  }
}
</style>
