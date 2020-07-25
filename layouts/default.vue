<template>
  <div id="__content">
    <navbar />
    <nuxt />
    <foot />
  </div>
</template>

<script>
import navbar from '@/components/Navbar'
import footer from '@/components/footer'

export default {
  components: {
    navbar,
    foot: footer
  }
}
</script>

<style lang="scss">
html, body {
  background-color: $bg-color;
}
</style>

<style>
body, button, input, select, textarea {
  font-family: 'Open Sans', sans-serif;
}

html, body {
  height: 100%;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: var(--grey-light);
}

#__nuxt, #__layout {
  height: 100%;
  display: flex;
  flex-direction: column;
}

#__content {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
}

.text-link {
  color: var(--blue-darker) !important;
  text-decoration: none;
}

.text-link:hover {
  color: var(--blue-dark) !important;
}
</style>
