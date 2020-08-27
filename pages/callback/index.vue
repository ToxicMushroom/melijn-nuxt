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
  async asyncData ({ route, $axios, $cookies }) {
    let success = false
    let cancelled = false
    let error = false

    if (route.query) {
      if (route.query.code) {
        try {
          response = await $axios.$post('/cookie/encrypt/code', { code: route.query.code })
          if (response.error) {
            error = true
            console.log(response)
            return { success, cancelled, error }
          }

          $cookies.set('sdt', response.jwt, { maxAge: response.lifeTime })
          success = true
        } catch (err) {
          console.error(err)
          error = true
        }
      } else if (route.query.error && route.query.error_description) {
        cancelled = true
      }
    }
    return { success, cancelled, error }
  },
  watch: {
    gohome () {
      if (!this.error) {
        window.location.replace(window.location.origin + '/dashboard')
      }
    }
  },
  mounted () {
    if (!this.error) {
      window.location.replace(window.location.origin + '/dashboard')
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
