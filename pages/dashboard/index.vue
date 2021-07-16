<template>
  <div class="wrapper">
    <h1 class="title">
      Guilds ({{ guilds.length }})
    </h1>
    <div v-if="loggedIn" class="guilds card-list">
      <div v-for="guild in guilds" :key="guild.id" class="guild-card card" :style="guild.avatarVariables">
        <div class="avatar" />
        <p class="name">
          {{ guild.name }}
        </p>
        <nuxt-link :to="'/dashboard/' + guild.id" class="button is-link">
          Configure
        </nuxt-link>
      </div>
    </div>

    <b-progress v-else />

    <h1 class="title">
      User settings
    </h1>
    <div v-if="loggedIn" class="users card-list">
      <div class="user-card card" :style="user.avatarVariables">
        <div class="avatar" />
        <p class="name">
          {{ user.tag }}
        </p>
        <nuxt-link to="/dashboard/me" class="button is-link">
          Configure
        </nuxt-link>
        <nuxt-link to="/recaptcha" class="button is-link" style="margin-top: 8px">
          Verify Servers
        </nuxt-link>
      </div>
    </div>
    <b-progress v-else />
  </div>
</template>

<script>
export default {
  data () {
    return {
      loggedIn: false,
      guilds: [],
      user: {}
    }
  },
  mounted () {
    if (this.$cookies.get('sdt')) {
      let headers = this.$util.getHeaderObject(this, process.server);
      this.$axios.$post('/cookie/decrypt/guilds', { jwt: this.$cookies.get('sdt') }, { headers: headers }).then((res) => {
        this.loggedIn = true
        const finalGuilds = []
        for (let j = 0; j < res.guilds.length; j++) {
          const guild = res.guilds[j]
          const isGif = guild.icon.startsWith('a_')
          guild.avatarVariables = {
            '--guild-avatar': 'url(https://cdn.discordapp.com/icons/' + guild.id + '/' + guild.icon + '.webp?size=128)',
            '--guild-avatar-hover': 'url(https://cdn.discordapp.com/icons/' + guild.id + '/' + guild.icon + (isGif ? '.gif' : '.webp') + '?size=128)'
          }
          finalGuilds.push(guild)
        }
        this.guilds = finalGuilds

        const user = {}
        user.tag = res.tag
        if (res.isDefault) {
          user.avatarVariables = {
            '--user-avatar': 'url(' + res.avatar + ')',
            '--user-avatar-hover': 'url(' + res.avatar + ')'
          }
        } else {
          user.avatarVariables = {
            '--user-avatar': 'url(' + res.avatar + '.webp?size=128' + ')',
            '--user-avatar-hover': 'url(' + res.avatar + (res.isGif ? '.gif' : '.webp') + '?size=128' + ')'
          }
        }

        this.user = user
      }).catch((error) => {
        console.log(error)
        //window.location.replace('https://discord.com/oauth2/authorize?client_id=368362411591204865&scope=identify%20guilds&redirect_uri=' + window.location.origin + '/callback/dashboard&response_type=code&prompt=none')
      })
    } else {
      window.location.replace('https://discord.com/oauth2/authorize?client_id=368362411591204865&scope=identify%20guilds&redirect_uri=' +
        window.location.origin + '/callback/dashboard&response_type=code&prompt=none')
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
          content: `https://melijn.com/${this.$route.params.id}`
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
<style>
.progress-wrapper {
  margin: 20px 10vw 1.5rem 10vw;
}
progress.progress:indeterminate {
  background-color: #242529;
  background-image: linear-gradient(to right, #45536a 30%, #242529 30%);
}
</style>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .title {
    text-align: center;
    margin: 5rem 0 0 0;
    color: $grey-light;
  }
}

.card-list {
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  div.card {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
    background-color: #242529;
    width: 190px;
    .avatar {
      background-size: contain;
      margin: 0 auto;
      border-radius: 50%;
      width: 128px;
      height: 128px;
    }
    .name {
      text-align: center;
      color: $grey-light;
      margin: 10px 0;
      font-size: 18px;
      word-wrap: break-word;
    }
  }
  div.card.guild-card {
    .avatar {
      background-image: var(--guild-avatar);
      &:hover{
        background-image: var(--guild-avatar-hover);
      }
    }
  }
  div.card.user-card  {
    width: 250px;
    .name{
      font-size: 16px;
    }
    .avatar {
      background-image: var(--user-avatar);
      &:hover{
        background-image: var(--user-avatar-hover);
      }
    }
  }
}
</style>
