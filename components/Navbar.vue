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
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          More
        </a>

        <div class="navbar-dropdown" disabled>
          <a class="navbar-item" href="/guides" disabled>
            Guides
          </a>
          <a class="navbar-item" href="/about" disabled>
            About
          </a>
          <a class="navbar-item" href="https://discord.com/invite/tfQ9s7u" target="_blank">
            Support server
          </a>
          <a class="navbar-item" href="/contact" disabled>
            Contact
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item" href="https://discord.com/oauth2/authorize?client_id=368362411591204865&scope=bot&permissions=457043158" target="_blank">
            Invite Melijn
          </a>
        </div>
      </div>
      <div class="navbar-item">
        <div class="buttons" disabled>
          <a class="button is-primary" disabled>
            <strong>Login</strong>
          </a>
        </div>
      </div>
    </div>
    <div class="navbar-menu" :class="{ 'is-active': showNav }">
      <div class="navbar-end">
        <a class="navbar-item" href="/">
          Home
        </a>
        <a class="navbar-item" href="/commands">
          Commands
        </a>
        <hr>
        <a class="navbar-item" href="/guides">
          Guides
        </a>
        <a class="navbar-item" href="/about">
          About
        </a>
        <a class="navbar-item" href="https://discord.com/invite/tfQ9s7u" target="_blank">
          Support server
        </a>
        <a class="navbar-item" href="/contact">
          Contact
        </a>
        <hr>
        <a class="navbar-item" href="https://discord.com/oauth2/authorize?client_id=368362411591204865&scope=bot&permissions=457043158" target="_blank">
          Invite Melijn
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      showNav: false
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
