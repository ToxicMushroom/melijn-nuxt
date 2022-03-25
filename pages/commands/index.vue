<template>
  <div id="container" class="container">
    <div>
      <div class="menu">
        <p class="menu-label">
          Categories
        </p>
        <div class="menu-list">
          <div class="menu-item" v-for="category in categories" :key="category.name">
            <a :id="category.name" :class="{'active': category.name == selectedCategory}" @click="categoryClick(category.name)"><span class="icon">
              <fa :icon="category.icon" />
            </span> {{ category.name.charAt(0).toUpperCase() + category.name.slice(1) }}</a>
          </div>
        </div>
      </div>
    </div>
    <div>
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
            <node-tree class="cmd" :class="{'visible': isVisible(cmd) }" :node="cmd" :level="0" :extra="extra" />
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
  async asyncData (context) {
    let headers = context.$util.getHeaderObject(context, process.server)
    let responseObj = await context.$axios.$get('commands', {
      headers: headers
    });
    let extra = responseObj.extra;
    delete responseObj.extra;

    commands = !commands ? Object.entries(responseObj) : commands
    
    const activeCommands = []
    return { commands, activeCommands, extra }
  },
  data () {
    return {
      selectedCategory: this.$route.query.c ? this.$route.query.c : 'all',
      commandLoader: 0,
      search: this.$route.query.q ? this.$route.query.q : '',
      categories: [
        {
          name: 'all',
          icon: ['fas', 'border-all']
        }, {
          name: 'music',
          icon: ['fas', 'music']
        }, {
          name: 'moderation',
          icon: ['fas', 'hammer']
        }, {
          name: 'administration',
          icon: ['fas', 'wrench']
        }, {
          name: 'utility',
          icon: ['fas', 'info']
        }, {
          name: 'image',
          icon: ['fas', 'images']
        }, {
          name: 'anime',
          icon: ['fas', 'torii-gate']
        }, {
          name: 'economy',
          icon: ['far', 'money-bill-alt']
        }, {
          name: 'game',
          icon: ['fas', 'dice']
        }, {
          name: 'animal',
          icon: ['fas', 'paw']
        }
      ]
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
    categoryClick (clicked) {
      if (this.selectedCategory !== clicked.toLowerCase()) {
        this.selectedCategory = clicked.toLowerCase()
      }
      document.getElementById('searchinput').focus()
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
          content: `https://melijn.com/commands`
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
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  .menu {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 25px 30px 20px 30px;

    @media (max-width: $tablet) {
      margin: 25px 15px 25px 15px;
    }
    @media (max-width: $phone) {
      margin: 25px 10px 20px 10px;
      padding: 5px;
    }

    .menu-label {
      color: white;
      text-align: left;
    }

    .menu-list {
      padding: 10px;
      background-color: $darkr;
      border-radius: 5px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
     
      .menu-item {
        margin: 0 8px 0 0;
        a {
          padding: 0.5em 0.75em 0.5em 0.15em;
          color: $grey-laite;
          span.icon {
            svg {
              height: 16px;
            }
            width: 30px;
            padding-right: 0px;
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
