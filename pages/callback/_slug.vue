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
  async asyncData ({ route, $axios, $cookies, params }) {
    let success = false
    let cancelled = false
    let error = false
    let state = ''
    const dest = '/' + params.slug
    

    if (route.query) {
      if (route.query.code) {
        try {
          response = await $axios.$post('/cookie/encrypt/code', { code: route.query.code, route: dest })
          if (response.error) {
            error = true
            state = 'error'
            return { success, cancelled, error, dest }
          }

          $cookies.set('sdt', response.jwt, { maxAge: response.lifeTime })
          state = 'success'
          success = true
        } catch (err) {
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
        this.$router.push('/')
      }
    }
  },
  mounted() {
    if (this.state == 'success') {
      this.$router.push('/' + this.$route.params.slug)
    } else {
      this.$router.push('/')
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
