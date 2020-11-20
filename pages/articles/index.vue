<template>
  <div class="container">
    <nuxt-link
      v-for="link in articles"
      :key="link.path"
      :to="link.path"
    >
    <articlecard :card="link"></articlecard>
      
    </nuxt-link>
  </div>
</template>

<script>
import articlecard from '@/components/ArticleCard'
export default {
  components: {
    articlecard
  },
  async asyncData ({ $content, params }) {
    const articles = (await $content('articles', params.slug)
      .fetch()).reverse()

    return {
      articles
    }
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
          content: `https://melijn.com/${this.$route.params.id}`
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

<style lang="scss" scoped>
.container {
  flex-direction: column;
  display: flex;
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>
