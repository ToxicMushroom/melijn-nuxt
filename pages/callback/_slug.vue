<template>
  <div>
    <h1 v-if="success == true" class="title">
      Logged in
    </h1>
    <h1 v-if="cancelled == true" class="title">
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
  data() {
    return {
      state: ''
    }
  },
  async asyncData (context) {
    let { route, $axios, $cookies, params } = context
    let success = false
    let cancelled = false
    let error = false
    let state = ''
    const dest = '/' + params.slug
    

    if (route.query) {
      if (route.query.code) {
        try {
          let headers = context.$util.getHeaderObject(context, process.server);
          response = await $axios.$post('/cookie/encrypt/code', { code: route.query.code, route: dest }, { headers: headers })
          if (response.error) {
            error = true
            state = 'error'
            return { success, cancelled, error, dest }
          }

          var fun = new Date(); // getTime gives epoch millis, setTime sets epoch millis
          fun.setTime(fun.getTime() + response.lifeTime * 1000)
          $cookies.set('sdt', response.jwt, { 
            path: "/", // defaults to /callback -> cookie is no longer sent to new pages.. (So this option must be set)
            maxAge: response.lifeTime, // lifeTime is seconds
            expires: fun // Date object of expiry
          }) 
          state = 'success'
          success = true
        } catch (err) {
          console.log(err)
          state = 'error'
          error = true
        }
      } else if (route.query.error && route.query.error_description) {
        state = 'cancelled'
        cancelled = true
      }
    }
    
    return { success, cancelled, error, state }
  },
  watch: {
    state () {
      if (this.state == 'success') {
        this.$router.push('/' + this.$route.params.slug)
      } else {
        // this.$router.push('/')
      }
    }
  },
  mounted() {
    if (this.state == 'success') {
      this.$router.push('/' + this.$route.params.slug)
    } else {
      // this.$router.push('/')
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
