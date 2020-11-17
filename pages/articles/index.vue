<template>
  <div class="container">
    <nuxt-link
      v-for="link in articles"
      :key="link.path"
      :to="link.path"
    >
      <div class="card" :style="link.style">
        <div class="author-row">
          <img :src="'/img/users/' + link.author.toLowerCase() + '.png'">
          <p>{{ link.author }}</p>
          <p style="margin-left: auto">
            {{ new Date(link.createdAt).toLocaleDateString() }}
          </p>
        </div>
        <h1 class="title">
          {{ link.title }}
        </h1>
        <h2 class="subtitle">
          {{ link.description }}
        </h2>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
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
