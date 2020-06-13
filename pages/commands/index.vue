<template>
  <div>
    <client-only placeholder="Loading...">
      <div class="color-pickers">
        <color-picker v-model="colors[0]" />
        <color-picker v-model="colors[1]" />
        <color-picker v-model="colors[2]" />
        <color-picker v-model="colors[3]" />
        <color-picker v-model="colors[4]" />
        <color-picker v-model="colors[5]" />
      </div>
    </client-only>

    <aside class="menu">
      <p class="menu-label">
        Categories
      </p>
      <ul class="menu-list">
        <li><a :class="{'active': 'music' == selectedCategory}" @click="categoryClick">Music</a></li>
        <li><a :class="{'active': 'moderation' == selectedCategory}" @click="categoryClick">Moderation</a></li>
        <li><a :class="{'active': 'administration' == selectedCategory}" @click="categoryClick">Administration</a></li>
        <li><a :class="{'active': 'utility' == selectedCategory}" @click="categoryClick">Utility</a></li>
        <li><a :class="{'active': 'image' == selectedCategory}" @click="categoryClick">Image</a></li>
        <li><a :class="{'active': 'anime' == selectedCategory}" @click="categoryClick">Anime</a></li>
        <li><a :class="{'active': 'animal' == selectedCategory}" @click="categoryClick">Animal</a></li>
      </ul>
    </aside>
    <div class="categories">
      <div v-for="category in commands" :id="category[0]" :key="category[0]" class="category" :class="{'visible': category[0].toLowerCase() == selectedCategory}">
        <div v-for="cmd in category[1]" :key="cmd[0]">
          <tree :tree-data="cmd" :tree-colors="colors" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueColorpicker } from 'vue-pop-colorpicker'
import Tree from '@/components/Tree'

export default {
  components: {
    Tree,
    'color-picker': VueColorpicker
  },
  async asyncData ({ $axios }) {
    const commands = Object.entries(await $axios.$get('http://localhost:3000/api'))
    const activeCommands = commands[0][1]
    return { commands, activeCommands }
  },
  data () {
    return {
      selectedCategory: 'music',
      colors: ['#1F363D', '#152429', '#2D5462', '#3E6680', '#fff', '#fff']
    }
  },
  methods: {
    categoryClick (event) {
      const clicked = event.target
      if (this.selectedCategory === clicked.textContent.toLowerCase()) {
        return
      } else {
        this.selectedCategory = clicked.textContent.toLowerCase()
      }

      for (let i = 0; i < this.commands.length; i++) {
        const entry = this.commands[i]
        if (entry[0].toLowerCase() === clicked.textContent.toLowerCase()) {
          this.activeCommands = entry[1]
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.menu {
  padding: 10px;
  margin: 30px;
  width: calc(100% - 60px);
  background-color: $darkr;
  border-radius: 5px;

  .menu-label {
    color: white;
  }

  .menu-list {
    li {
      a {
        color: $grey-laite;
      }

      a:hover {
        background-color: $darkgrey;
      }

      a.active {
        background-color: $grey;
      }
    }
  }
}
.categories {
  margin: 0 40px;

  .category {
    display: none;
  }
  .category.visible {
    display: block;
  }
}
</style>
