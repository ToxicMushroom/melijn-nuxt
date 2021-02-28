
<template>
  <section class="section">
    <div class="container">
      <p class="is-size-7">Created at: {{ createdAt }}<span v-if="createdAt !== updatedAt">, last updated: {{ updatedAt }}</span></p>
      <h1 class="title">
        {{ guide.title }}
      </h1>
      <h3 class="subtitle">
        {{ guide.description }}
      </h3>
      <hr>
      <nuxt-content :document="guide" />
    </div>
  </section>
</template>

<script>
export default {
  async validate ({ params, query, $content }) {
    try {
      await $content('guides', params.slug)
        .fetch()
      return true
    } catch (error) {
      return false
    }
  },
  async asyncData ({ $content, params }) {
    const guide = await $content('guides', params.slug)
      .fetch()
      .catch((error) => {
        error({ statusCode: 404, message: 'Guide not found' })
      })
    const createdAt = new Date(guide.createdAt).toLocaleDateString()
    const updatedAt = new Date(guide.updatedAt).toLocaleDateString()
    return { guide, createdAt, updatedAt }
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
/deep/ {
  
  a {
    color: $blue-minimal-contrast !important;
    text-decoration: none;
    &:hover {
      color: $blue-good-contrast !important;
    }
  }
  table {
    padding: 1rem;
    border-collapse: collapse;
    margin-bottom: 1rem;
    th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #1e3a5a;
      color: white;
    }
    th, td {
      border: 1px solid rgb(26, 26, 26);
      padding: 8px;
    }
    tr:nth-child(even) {
      background-color: #28292b;
    }
  }
  p {
    white-space: pre;
    margin-bottom: 1rem;
  }
  ol {
    list-style: disc;
    margin-left: 2rem;
  }
  code {
    font-size: 0.95rem;
    color: #DCDCDC;
    background-color: #232323;
  }
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
