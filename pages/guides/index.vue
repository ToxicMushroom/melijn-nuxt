<template>
  <ul>
    <li
      v-for="link of article.toc"
      :key="link.id"
      :class="{ 'toc2': link.depth === 2, 'toc3': link.depth === 3 }"
    >
      <NuxtLink :to="`#${link.id}`">
        {{ link.text }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script>
export default {
  async asyncData ({ $content, params }) {
    const article = await $content('guides', params.slug)
      .fetch()

    return {
      article
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
