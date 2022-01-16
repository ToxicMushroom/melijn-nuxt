<template>
  <div>
    <h1 v-if="success == true" class="title">
      Logged in, redirecting in 3s
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

function setCookieFromResponse(response, $cookies) {
  var fun = new Date(); // getTime gives epoch millis, setTime sets epoch millis
  fun.setTime(fun.getTime() + response.lifeTime * 1000)

  $cookies.remove('sdt') // Makes sure the old cookie is gone (setting cookies doesnt always override)
  console.log("removed old cookie")

  $cookies.set('sdt', response.jwt, { 
    path: "/", // defaults to /callback -> cookie is no longer sent to new pages.. (So this option must be set)
    maxAge: response.lifeTime, // lifeTime is seconds
    expires: fun, // Date object of expiry
    sameSite: 'Strict' // Makes sure this cookie is only sent to melijn.com/ pages
  }) 
  console.log("set cookie " + response.jwt)
}

export default {
  data() {
    return {
      state: '',
      response: {}
    }
  },
  async asyncData (context) {
    let { route, $axios, $cookies, params } = context
    let success = false
    let cancelled = false
    let error = false
    let state = ''
    const dest = '/' + params.slug
    console.log("callback async processing started..")
    

    if (route.query) {
      if (route.query.code) {
        try {
          let headers = context.$util.getHeaderObject(context, process.server);
          response = await $axios.$post('/cookie/encrypt/code', { code: route.query.code, route: dest }, { headers: headers })
          console.log("callback async processing result handling..")
          if (response.error) {
            error = true
            state = 'error'
            console.log(error)
            return { success, cancelled, error, dest }
          }

          setCookieFromResponse(response, $cookies)
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
    
    console.log("callback async processing done!")
    return { success, cancelled, error, state }
  },
  watch: {
    state () {
      console.log(this.state)
      console.log(this.response);
      if (this.state == 'success') {
        setCookieFromResponse(this.response, this.$cookies)
        setTimeout(() => {
         this.$router.push('/' + this.$route.params.slug)
        }, 3000)
      } else {
        // this.$router.push('/')
      }
    }
  },
  mounted() {
    console.log(this.state)
    console.log(this.response);
    if (this.state == 'success') {
      setCookieFromResponse(this.response, this.$cookies)
      setTimeout(() => {
        this.$router.push('/' + this.$route.params.slug)
      }, 3000)
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
