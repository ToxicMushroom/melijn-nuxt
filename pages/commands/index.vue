<template>
  <div>
    <h1 class="title" style="color: white;">
      command list:
    </h1>
    <div class="categories">
      <div v-for="category in commands" :key="category">
        {{ category[0] }}
        <br>
        <div v-for="cmd in category[1]" :key="cmd" style="margin: 10px">
          <tree :tree-data="cmd" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tree from '@/components/Tree'

export default {
  components: {
    Tree
  },
  async asyncData ({ $axios }) {
    const commands = Object.entries(await $axios.$get('http://localhost:8080/fullCommands'))
    return { commands }
  }
}
</script>

<style>

</style>
