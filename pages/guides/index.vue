<template>
  <div class="container">
    <nuxt-link
      v-for="link in guides"
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
    const guides = (await $content('guides', params.slug)
      .fetch()).reverse()

    return {
      guides
    }
  },
  head () {
    return {
      title: 'Melijn - Guides',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'List of guides for Melijn.'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Melijn - Guides'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://melijn.com/${this.$route.params.id}`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'List of guides for Melijn.'
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
  .card {
    margin: 8px;
    text-decoration: none;
    padding: 16px;
    border-radius: 4px;
    .author-row {
      display: flex;
      flex-direction: row;
      img {
        height: 32px;
        width: 32px;
        margin-right: 6px;
      }
      p {
        margin: auto 0;
      }
    }
  }
}
</style>
