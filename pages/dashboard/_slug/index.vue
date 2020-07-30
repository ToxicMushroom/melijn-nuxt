<template>
  <div class="wrapper">
    <div class="title" :style="guild.avatarVariables">
      <h1>
        <nuxt-link to="/dashboard" class="text-link">
          <span class="icon is-medium">
            <fa :icon="['fas', 'arrow-left']" />
          </span>
          back
        </nuxt-link> / Dashboard: <div class="dashboard-brand">
          <div class="avatar" />{{ guild.name }}
        </div>
      </h1>
    </div>
    <div class="columns is-mobile is-multiline is-centered">
      <nuxt-link :to="'/dashboard/' + id + '/general'">
        <div class="column is-narrow">
          <span class="icon is-large">
            <fa :icon="['fas', 'wrench']" class="fa-3x" />
          </span>
          <p>
            General
          </p>
        </div>
      </nuxt-link>
      <nuxt-link :to="'/dashboard/' + id + '/welcomer'">
        <div class="column is-narrow">
          <span class="icon is-large">
            <fa :icon="['fas', 'door-open']" class="fa-3x" />
          </span>
          <p>
            Welcomer
          </p>
        </div>
      </nuxt-link>
      <nuxt-link :to="'/dashboard/' + id + '/verification'">
        <div class="column is-narrow">
          <span class="icon is-large">
            <fa :icon="['fas', 'shield-alt']" class="fa-3x" />
          </span>
          <p>
            Verification
          </p>
        </div>
      </nuxt-link>
      <nuxt-link :to="'/dashboard/' + id + '/logs'">
        <div class="column is-narrow">
          <span class="icon is-large">
            <fa :icon="['fas', 'hammer']" class="fa-3x" />
          </span>
          <p>
            Punishments
          </p>
        </div>
      </nuxt-link>
      <nuxt-link :to="'/dashboard/' + id + '/logs'">
        <div class="column is-narrow">
          <span class="icon is-large">
            <fa :icon="['fas', 'clipboard-list']" class="fa-3x" />
          </span>
          <p>
            Logging
          </p>
        </div>
      </nuxt-link>
    </div>
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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
  @media (max-width: $tablet) {
    margin: 5px;
  }
  .title {
    color: white;
    text-align: start;
    margin-top: 3rem;
    margin-left: 3rem;
    .icon {
      display: inline-block;
    }
    .dashboard-brand {
      display: inline-flex;
      justify-content: center;
      flex-direction: column;

      .avatar {
        border-radius: 50%;
        background-size: contain;
        background-image: var(--guild-avatar);
        height: 3rem;
        width: 3rem;
        &:hover{
          background-image: var(--guild-avatar-hover);
        }
      }
    }
  }
  .columns  {
    .column {
      background-color: $box-color;
      border-radius: 5px;
      margin: 0.75rem 2rem;
      transition: all .25s linear;
      box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.4);
      &:hover {
        box-shadow: -1px 5px 10px 0px rgba(0,0,0,0.8);
        p {
          color: $grey-ligh;
        }
      }
      .icon {
        color: $grey-ligh;
        text-align: center;
        margin: auto;
        display: flex;
        font-size: 2.5rem;
        width: 10rem;
        height: 10rem;
      }
      p {
        color: $grey-liter;
        text-align: center;
        font-size: 1.15rem;
        padding: 5px 5px 0 5px;
      }
    }
  }
}
</style>
