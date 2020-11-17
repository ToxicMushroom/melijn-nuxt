<template>
  <div class="container">
    <h1 class="title errorcode">
      {{ error.statusCode }}
    </h1>

    <h1 v-if="error.statusCode === 404" class="title">
      Page not found
    </h1>

    <img v-if="error.statusCode === 404" src="/img/404.webp">
    <h1 v-else class="title">
      An error occurred. Please report this to the developers.
    </h1>

    <p>
      <fa :icon="['fas', 'arrow-left']" /> <span class="text-link" @click="back()">Go back</span>
      or <nuxt-link to="/" class="text-link">
        home
      </nuxt-link>
    </p>
  </div>
</template>

<script>
export default {
  layout: 'default',
  // eslint-disable-next-line vue/require-prop-types
  props: ['error'], // you can set a custom layout for the error page
  methods: {
    back () {
      window.history.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex: 1;
    justify-content: center;
    flex-direction: column;
    .title {
        display: block;
        font-size: 3rem;
        color: $grey-light;
        text-align: center;
        &:last-child {
            margin-bottom: 52px;
        }
    }
    .text-link {
      font-size: 1.5rem;
    }
}
</style>
