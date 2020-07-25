
<template>
  <article>
    <nuxt-content :document="article" />
  </article>
</template>

<script>
export default {
  async asyncData ({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    return { article }
  },
  head () {
    return {
      title: 'Melijn - Articles',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'List of articles about Melijn.'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Melijn - Articles'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://v2.melijn.com/${this.$route.params.id}`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'List of articles about Melijn.'
        }
      ]
    }
  }
}
</script>

<style>
article a[aria-hidden=true] {
  display: none;
}
</style>
