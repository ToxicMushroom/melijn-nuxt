<template>
  <div>
    <aside class="menu">
      <p class="menu-label">
        Categories
      </p>
      <ul class="menu-list">
        <li>
          <a name="music" :class="{'active': 'music' == selectedCategory}" @click="categoryClick">Music <span class="icon">
            <fa :icon="['fas', 'music']" /></span></a>
        </li>
        <li>
          <a name="moderation" :class="{'active': 'moderation' == selectedCategory}" @click="categoryClick">Moderation <span class="icon">
            <fa :icon="['fas', 'hammer']" />
          </span></a>
        </li>
        <li>
          <a name="administration" :class="{'active': 'administration' == selectedCategory}" @click="categoryClick">Administration <span class="icon">
            <fa :icon="['fas', 'wrench']" />
          </span></a>
        </li>
        <li>
          <a name="utility" :class="{'active': 'utility' == selectedCategory}" @click="categoryClick">Utility <span class="icon">
            <fa :icon="['fas', 'info']" />
          </span></a>
        </li>
        <li>
          <a name="image" :class="{'active': 'image' == selectedCategory}" @click="categoryClick">Image <span class="icon">
            <fa :icon="['fas', 'images']" />
          </span></a>
        </li>
        <li>
          <a name="anime" :class="{'active': 'anime' == selectedCategory}" @click="categoryClick">Anime <span class="icon">
            <fa :icon="['fas', 'torii-gate']" />
          </span></a>
        </li>
        <li>
          <a name="economy" :class="{'active': 'economy' == selectedCategory}" @click="categoryClick">Economy <span class="icon">
            <fa :icon="['far', 'money-bill-alt']" />
          </span></a>
        </li>
        <li>
          <a name="animal" :class="{'active': 'animal' == selectedCategory}" @click="categoryClick">Animal <span class="icon">
            <fa :icon="['fas', 'paw']" />
          </span></a>
        </li>
      </ul>
    </aside>

    <div id="searchbar" class="field is-grouped">
      <p class="control is-expanded">
        <input
          id="searchinput"
          v-model="search"
          class="input"
          type="text"
          placeholder="Find a command"
        >
      </p>
    </div>

    <div class="categories">
      <!-- <client-only placeholder="Loading..."> -->
      <div v-for="category in commands" :id="category[0]" :key="category[0]" class="category" :class="{'visible': category[0].toLowerCase() == selectedCategory}">
        <div v-for="cmd in category[1]" :key="cmd[0]">
          <tree v-if="isVisible(cmd)" :tree-data="cmd" />
        </div>
      </div>
      <!-- </client-only> -->
    </div>
  </div>
</template>

<script>
import Tree from '@/components/Tree'
let commands

export default {
  components: {
    Tree
  },
  async asyncData ({ $axios }) {
    commands = !commands ? Object.entries(await $axios.$get('http://localhost:3000/api')) : commands
    const activeCommands = commands[0][1]
    return { commands, activeCommands }
  },
  data () {
    return {
      selectedCategory: 'music',
      commandLoader: 0,
      search: ''
    }
  },
  mounted () {
    document.getElementById('searchinput').focus()
  },
  methods: {
    categoryClick (event) {
      const clicked = event.target
      if (clicked === undefined || clicked.name === undefined) { return }
      if (this.selectedCategory === clicked.name.toLowerCase()) {
        return
      } else {
        this.selectedCategory = clicked.name.toLowerCase()
      }

      for (let i = 0; i < this.commands.length; i++) {
        const entry = this.commands[i]
        if (entry[0].toLowerCase() === clicked.name.toLowerCase()) {
          this.activeCommands = entry[1]
        }
      }
    },
    isVisible (cmd) {
      const searchQuery = this.search.toLowerCase()
      const aliases = cmd[3]
      const res = cmd[0].toLowerCase().includes(searchQuery) || this.search === ''

      if (res) {
        return res
      }

      for (let i = 0; i < aliases.length; i++) {
        if (aliases[i].toLowerCase().includes(searchQuery)) {
          return true
        }
      }
      return res
    }
  },
  head () {
    return {
      title: 'Melijn - Commands',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Documentation for Melijn\'s commands.'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Melijn - Commands'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://v2.melijn.com/${this.$route.params.id}`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Documentation for Melijn\'s commands.'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

.icon {
  display: inline;
  margin-left: 4px;
}

#searchbar {
  margin: 30px;
  @media (max-width: $tablet) {
    margin: 30px 15px;
  }
  @media (max-width: $phone) {
    margin: 20px 10px;
  }
  p {
    input {
      color: $grey-lite;
      border: none;
      &::placeholder {
        color: $grey;
      }
    }
  }
}

.menu {
  padding: 10px;
  margin: 30px;
  width: calc(100% - 60px);
  background-color: $darkr;
  border-radius: 5px;
  @media (max-width: $tablet) {
    margin: 30px 15px;
    width: calc(100% - 30px);
  }
  @media (max-width: $phone) {
    margin: 20px 10px;
    width: calc(100% - 20px);
    padding: 5px;
  }
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
  margin: 10px 40px 40px 40px;
  @media (max-width: $tablet) {
    margin: 30px 15px;
    width: calc(100% - 30px);
  }
  @media (max-width: $phone) {
    margin: 20px 10px;
    width: calc(100% - 20px);
    padding: 5px;
  }
  .category {
    display: none;
  }
  .category.visible {
    display: block;
  }
}
</style>
