<template>
  <div class="container">
    <nuxt-link
      v-for="link in guides"
      :key="link.path"
      :to="link.path"
    >
      <div class="card">
        <div class="author-row">
          <img :src="'/img/users/' + link.author.toLowerCase() + '.png'">
          <p>{{ link.author }}</p>
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
    const guides = await $content('guides', params.slug)
      .fetch()

    console.log(guides)
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
          content: `https://v2.melijn.com/${this.$route.params.id}`
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
    text-decoration: none;
    padding: 16px;
    border-radius: 6px;
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
