<template>
  <div>
    <h1 v-if="gohome == false" class="title">
      Logged in {{ response }}
    </h1>
    <h1 v-if="gohome == true" class="title">
      Cancelled
    </h1>
    <h1 v-if="error == true" class="title">
      An error has occured, please report this to the devs.
    </h1>
  </div>
</template>
<script>
let response

export default {
  async asyncData ({ $config, route, $axios, $cookies }) {
    const locator = route.path
    const fullUri = $config.baseURL + locator
    let gohome = false
    let error = false

    if (route.query) {
      if (route.query.code) {
        try {
          const qs = require('qs')
          const jwt = require('jsonwebtoken')
          const params = {
            client_id: '368362411591204865', // TODO FIX THIS CANCER :D 53 BIT INTEGERS, SHOVE IT JS
            client_secret: $config.melijnSecret,
            grant_type: 'authorization_code',
            code: route.query.code,
            redirect_uri: fullUri,
            scope: 'identify guilds'
          }
          const searchParams = qs.stringify(params)
          // const url = 'https://e3989c1b0eafc044a6ddd706a65c3363.m.pipedream.net'
          // const url = $config.discordAPI + '/oauth2/token'
          let config = {
            url: '/oauth2/token',
            method: 'POST',
            baseURL: $config.discordAPI,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': searchParams.length,
              'user-agent': 'poopoo'
            },
            data: searchParams
          }

          response = await $axios.$request(config)
          response = response.access_token

          config = {
            url: '/users/@me',
            method: 'GET',
            baseURL: $config.discordAPI,
            headers: {
              'user-agent': 'poopoo',
              Authorization: 'Bearer ' + response
            }
          }

          const user = await $axios.$request(config)

          response = {
            response,
            avatar: user.avatar,
            id: user.id
          }

          const signed = jwt.sign(response, $config.signingkey)
          $cookies.set('sdt', signed, { maxAge: 60 * 60 * 24 * 7 })
        } catch (err) {
          console.error(err)
          error = true
        }
      } else if (route.query.error && route.query.error_description) {
        gohome = true
      }
    }
    return { response, gohome, error }
  },
  watch: {
    gohome () {
      if (this.gohome && this.error === false) {
        window.location.replace(window.location.origin)
      }
    }
  },
  mounted () {
    if (this.gohome && this.error === false) {
      window.location.replace(window.location.origin)
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
