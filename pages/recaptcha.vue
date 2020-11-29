<template>
  <div class="wrapper">
    <div>
      <h1 class="title has-text-centered">
        Guilds ({{ guilds.length }})
      </h1>
      <h2 class="subtitle has-text-centered" v-if="guilds.length == 0">
        You are verified in all servers :>
      </h2>
      <h2 class="subtitle has-text-centered" v-else>
        Complete the captcha below before using the verify buttons :3
      </h2>
    </div>
    <div v-if="guilds.length > 0" style="margin: auto">
        <form action="?" method="POST" id="recaptcha">
        </form>
    </div>
    <div v-if="loggedIn" class="guilds card-list">
      <div v-for="guild in guilds" :key="guild.id" class="guild-card card" :style="guild.avatarVariables">
        <div class="avatar" />
        <p class="name">
          {{ guild.name }}
        </p>
        <button class="button is-link" @click="verify(guild.id)">
          Verify
        </button>
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
      guilds: []
    }
  },
  mounted () {
    if (this.$cookies.get('sdt')) {
      this.$axios.$post('/cookie/decrypt/verifyguilds', { jwt: this.$cookies.get('sdt') }).then((res) => {
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
      }).catch((error) => {
        window.location.replace('https://discord.com/oauth2/authorize?client_id=368362411591204865&scope=identify%20guilds&redirect_uri=' +
          window.location.origin + '/callback&response_type=code&prompt=none')
      })
    } else {
      window.location.replace('https://discord.com/oauth2/authorize?client_id=368362411591204865&scope=identify%20guilds&redirect_uri=' +
        window.location.origin + '/callback&response_type=code&prompt=none')
    }

    this.renderRecaptcha()
    
  },
  methods: {
     verify (guildId) {
        if (!grecaptcha) {
          this.$buefy.toast.open({
            duration: 5000,
            message: 'The captcha might be missing, try waiting a bit and completing it.',
            position: 'is-bottom',
            type: 'is-danger'
          })
          return;
        }
        const response = grecaptcha.getResponse()
        if (response == "") {
          this.$buefy.toast.open({
            duration: 5000,
            message: 'Complete the captcha first!',
            position: 'is-bottom',
            type: 'is-danger'
          })
          return
        }

        if (this.$cookies.get('sdt')) {
          this.$axios.$post('/verifyguild', { jwt: this.$cookies.get('sdt'), guild: guildId, recaptcha: response }).then((res) => {
            
            this.guilds.splice(this.guilds.findIndex(function(i){
                return i.id === guildId;
            }), 1);
            this.$buefy.toast.open({
              duration: 5000,
              message: 'Verified!',
              position: 'is-bottom',
              type: 'is-success'
            })
          }).catch((error) => {
            console.log(error)
            this.$buefy.toast.open({
              duration: 5000,
              message: 'Verify failed! Try again after refreshing.',
              position: 'is-bottom',
              type: 'is-danger'
            })
          })
        } else {
          window.location.replace('https://discord.com/oauth2/authorize?client_id=368362411591204865&scope=identify%20guilds&redirect_uri=' +
            window.location.origin + '/callback&response_type=code&prompt=none')
        }
    },
    renderRecaptcha() {
      setTimeout(function () {
        if (!grecaptcha) {
          renderRecaptcha()
          return;
        }
        grecaptcha.render('recaptcha', {
          'sitekey': '6LfjA4YUAAAAAEz0-8oXgAqcRobNGsFQ-wEsiFrw',
          'theme': 'dark',
          'size': 'compact'
        });
      }, 1000)
    }
  },
  computed: {
    pageUrl() {
      return `https://melijn.com${this.$route.fullPath}`
    }
  },
  head () {
    return {
      title: 'Melijn - Verification',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Verification page of Melijn, verify your account and get access to servers.'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Melijn - Verification'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.pageUrl
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Verification page of Melijn, verify your account and get access to servers.'
        }
      ],
      script: [
        {
          src: 'https://www.google.com/recaptcha/api.js?render=explicit'
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
}
</style>
