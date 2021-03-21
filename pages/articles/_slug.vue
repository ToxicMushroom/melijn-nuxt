
<template>
  <section class="section">
    <div class="container">
      <p class="is-size-7">
        Created at: {{ createdAt }}<span v-if="createdAt !== updatedAt">, last updated: {{ updatedAt }}</span>
      </p>
      <h1 class="title">
        {{ article.title }}
      </h1>
      <h3 class="subtitle">
        {{ article.description }}
      </h3>
      <hr>
      <nuxt-content :document="article" />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData ({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()
      .catch((error) => {
        error({ statusCode: 404, message: 'Article not found' })
      })
    const createdAt = new Date(article.createdAt).toLocaleDateString()
    const updatedAt = new Date(article.updatedAt).toLocaleDateString()
    return { article, createdAt, updatedAt, params }
  },
  head () {
    return {
      title: 'Melijn - ' + this.article.title,
      description: this.article.description,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Melijn - ' + this.article.title
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://melijn.com/articles/${this.params.slug}`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:  this.article.description
        },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:article:author', property: 'og:article:author', content: this.article.author },
        { hid: 'og:article:published_time', property: 'og:article:published_time', content: this.article.createdAt },
        { hid: 'og:article:tag', property: 'og:article:tag', content: this.article.tags }
      ]
    }
  }
}
</script>

<!-- only works on stuff inside this slug and outside the markdown -->
<style lang="scss" scoped>
h1.title {
  color: $grey-light;
}
h3.subtitle {
  color: $grey-liter;
}
</style>

<!-- works on stuff inside and outside the markdown on this page -->
<style>
a[ariahidden=true] {
  display: none;
}

h1 {
  font-size: 2rem;
}

h2 {
  font-size: 1.75rem;
}

h3 {
  font-size: 1.5rem;
}

h5 {
  font-size: 1.25rem;
}

ul {
  margin-left: 2rem;
  list-style: disc;
}

strong {
  color: #fafafa;
}
</style>
