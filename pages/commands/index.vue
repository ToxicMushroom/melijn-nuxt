<template>
  <div id="container" class="columns">
    <div class="column">
      <div class="menu">
        <p class="menu-label">
          Categories
        </p>
        <ul class="menu-list">
          <li>
            <a id="all" :class="{'active': 'all' == selectedCategory}" @click="categoryClick"><span class="icon">
              <fa :icon="['fas', 'border-all']" />
            </span> All</a>
          </li>
          <li>
            <a id="music" :class="{'active': 'music' == selectedCategory}" @click="categoryClick"><span class="icon">
              <fa :icon="['fas', 'music']" /></span> Music</a>
          </li>
          <li>
            <a id="moderation" :class="{'active': 'moderation' == selectedCategory}" @click="categoryClick"><span class="icon">
              <fa :icon="['fas', 'hammer']" />
            </span> Moderation</a>
          </li>
          <li>
            <a id="administration" :class="{'active': 'administration' == selectedCategory}" @click="categoryClick"><span class="icon">
              <fa :icon="['fas', 'wrench']" />
            </span> Administration</a>
          </li>
          <li>
            <a id="utility" :class="{'active': 'utility' == selectedCategory}" @click="categoryClick"><span class="icon">
              <fa :icon="['fas', 'info']" />
            </span> Utility</a>
          </li>
          <li>
            <a id="image" :class="{'active': 'image' == selectedCategory}" @click="categoryClick"><span class="icon">
              <fa :icon="['fas', 'images']" />
            </span> Image</a>
          </li>
          <li>
            <a id="anime" :class="{'active': 'anime' == selectedCategory}" @click="categoryClick"><span class="icon">
              <fa :icon="['fas', 'torii-gate']" />
            </span> Anime</a>
          </li>
          <li>
            <a id="economy" :class="{'active': 'economy' == selectedCategory}" @click="categoryClick"><span class="icon">
              <fa :icon="['far', 'money-bill-alt']" />
            </span> Economy</a>
          </li>
          <li>
            <a id="game" :class="{'active': 'game' == selectedCategory}" @click="categoryClick"><span class="icon">
              <fa :icon="['fas', 'dice']" />
            </span> Games</a>
          </li>
          <li>
            <a id="animal" :class="{'active': 'animal' == selectedCategory}" @click="categoryClick"><span class="icon">
              <fa :icon="['fas', 'paw']" />
            </span> Animal</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="column is-three-quarters is-full-mobile">
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
        <div v-for="category in commands" :id="category[0]" :key="category[0]" class="category" :class="{'visible': category[0].toLowerCase() == selectedCategory || selectedCategory == 'all'}">
          <div v-for="cmd in category[1]" :key="cmd[0]">
            <node-tree class="cmd" :class="{'visible': isVisible(cmd) }" :node="cmd" :level="0" />
          </div>
        </div>
      <!-- </client-only> -->
      </div>
    </div>
  </div>
</template>

<script>
import NodeTree from '@/components/NodeTree'

let commands
export default {
  components: {
    NodeTree
  },
  async asyncData ({ $axios }) {
    commands = !commands ? Object.entries(await $axios.$get('api')) : commands
    const activeCommands = []
    return { commands, activeCommands }
  },
  data () {
    return {
      selectedCategory: this.$route.query.c ? this.$route.query.c : 'music',
      commandLoader: 0,
      search: this.$route.query.q ? this.$route.query.q : ''
    }
  },
  watch: {
    selectedCategory () {
      this.refreshCategory()
    }
  },
  mounted () {
    document.getElementById('searchinput').focus()
    this.refreshCategory()
  },
  methods: {
    refreshCategory () {
      for (let i = 0; i < this.commands.length; i++) {
        const entry = this.commands[i]
        if (entry[0].toLowerCase() === this.selectedCategory) {
          this.activeCommands = entry[1]
        }
      }
    },
    categoryClick (event) {
      const clicked = event.target
      if (clicked === undefined || clicked.id === undefined) { return }
      if (this.selectedCategory !== clicked.id.toLowerCase()) {
        this.selectedCategory = clicked.id.toLowerCase()
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
          content: 'Documentation for Melijn\'s commands.'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Melijn - Commands'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://melijn.com/${this.$route.params.id}`
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
  display: inline-flex;
  margin-left: 4px;
}

#container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .menu {
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin: 30px;
    background-color: $darkr;
    border-radius: 5px;
    @media (max-width: $tablet) {
      margin: 30px 15px;
    }
    @media (max-width: $phone) {
      margin: 20px 10px;
      padding: 5px;
    }
    .menu-label {
      color: white;
    }

    .menu-list {
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        a {
          padding: 0.5em 0.75em 0.5em 0.15em;
          color: $grey-laite;
          span.icon {
            width: 30px;
            padding-right: 10px;
          }
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
    .cmd {
      display: none;
      margin-bottom: 16px;
    }
  }
  .category.visible {
    display: block;
    .cmd.visible {
      display: block;
    }
  }
}
</style>
