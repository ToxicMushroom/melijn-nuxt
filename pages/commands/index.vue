<template>
  <p>command list:<br>{{ commands }}</p>
</template>

<script>
export default {
  async asyncData ({ $axios }) {
    const commands = await $axios.$get('http://localhost:8080/fullCommands')
    return { commands }
  }
}
</script>

<style>

</style>
