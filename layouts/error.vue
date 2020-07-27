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
    <nuxt-link to="/" class="text-link">
      <fa :icon="['fas', 'arrow-left']" /> Go home
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'default' // you can set a custom layout for the error page
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
