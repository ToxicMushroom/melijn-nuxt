
<template>
  <li class="node-tree">
    <div class="accordion">
      <button :class="{ 'accordion-button--active': isActive }" class="accordion-button" :style="acolordionctitle" @click="myFilter">
        {{ cmdName }}
      </button>
      <div class="accordion-content" :style="acolordioncontent">
        <!-- eslint-disable vue/no-v-html -->
        <table>
          <tr>
            <th>Description</th>
            <th class="description">
              {{ node[1] }}
            </th>
          </tr>
          <tr>
            <th>Syntax</th>
            <th>{{ node[2].replace(/%prefix%/g, '>') }}</th>
          </tr>
          <tr v-if="melijnArguments.length > 0">
            <th>Arguments</th>
            <th v-html="melijnArguments" />
          </tr>
          <tr v-if="discordChannelPerms.length > 0">
            <th>Discord Channel Permissions</th>
            <th v-html="discordChannelPerms" />
          </tr>
          <tr v-if="discordPerms.length > 0">
            <th>Discord Permissions</th>
            <th v-html="discordPerms" />
          </tr>
          <tr v-if="node[7].size > 0">
            <th>Runconditions</th>
            <th>{{ node[7].join(" & ") }}</th>
          </tr>
          <tr>
            <th>Permission</th>
            <th>{{ node[8] }}</th>
          </tr>
          <tr v-if="melijnHelp.length > 0">
            <th>Extra Help</th>
            <th v-html="melijnHelp" />
          </tr>
          <tr v-if="melijnExamples.length > 0">
            <th>Examples</th>
            <th v-html="melijnExamples" />
          </tr>
        </table>
        <br>
        <ul v-if="node[9] && node[9].length">
          <node v-for="child in node[9]" :key="child[0]" :colrs="colrs" :node="child" :level="level + 1" />
        </ul>
      </div>
    </div>
  </li>
</template>

<script>
import { red, blue, green, purple } from '~/constants/constants.js'

export default {
  name: 'Node',
  props: {
    node: {
      type: Array,
      required: true
    },
    colrs: {
      type: Array,
      required: true
    },
    level: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    cmdName () {
      const name = this.node[0]
      const arr = this.node[3]
      if (arr.length > 0) {
        return name + ' | ' + arr.join(' | ')
      } else {
        return name
      }
    },
    perm () {
      if (this.node[8]) {
        return 'yes'
      } else {
        return 'no'
      }
    },
    discordPerms () {
      const perms = this.node[6]
      let total = ''
      perms.forEach((element) => {
        total += '<span class="tag '
        if (red.includes(element)) {
          total += 'is-danger'
        } else if (blue.includes(element)) {
          total += 'is-info'
        } else if (green.includes(element)) {
          total += 'is-success'
        } else if (purple.includes(element)) {
          total += 'is-purple'
        } else {
          total += 'is-light'
        }

        total += '">' + element + '</span>'
      })

      return total
    },
    discordChannelPerms () {
      const perms = this.node[5]
      let total = ''
      perms.forEach((element) => {
        total += '<span class="tag '
        if (red.includes(element)) {
          total += 'is-danger'
        } else if (blue.includes(element)) {
          total += 'is-info'
        } else if (green.includes(element)) {
          total += 'is-success'
        } else if (purple.includes(element)) {
          total += 'is-purple'
        } else {
          total += 'is-light'
        }

        total += '">' + element + '</span>'
      })

      return total
    },
    melijnArguments () {
      const arg = this.node[4]
        .replace(/\r*\n/g, '<br>')
        .replace(/%prefix%/g, '>')
        .replace(/`(.*?)`/ig, '<span class="code">$1</span>')
      return arg
    },
    acolordioncontent () {
      if (this.level % 2) {
        return {
          '--accordion-color': this.colrs[0]
          // '--accordion-color': '#1F363D'
        }
      } else {
        return {
          '--accordion-color': this.colrs[1]
          // '--accordion-color': '#152429'
        }
      }
    },
    acolordionctitle () {
      if (this.level % 2) {
        return {
          // '--accordion-button-color': this.colrs[2] // Keep
          '--accordion-button-color': '#2D5462' // Keep
        }
      } else {
        return {
          // '--accordion-button-color': this.colrs[3]
          '--accordion-button-color': '#3E6680'
        }
      }
    },
    melijnHelp () {
      const arg = this.node[10]
        .replace(/\r*\n/g, '<br>')
        .replace(/%prefix%/g, '>')
        .replace(/`(.*?)`/ig, '<span class="code">$1</span>')
      return arg
    },
    melijnExamples () {
      const arg = this.node[11]
        .replace(/\r*\n/g, '<br>')
        .replace(/%prefix%/g, '>')
        .replace(/`(.*?)`/ig, '<span class="code">$1</span>')
      return arg
    }
  },
  methods: {
    myFilter (event) {
      this.isActive = !this.isActive
    }
  }
}
</script>

<style lang="scss">
span.code {
  padding: 4px;
  border-radius: 8px;
  background-color: $darkest;
}
span.is-purple {
  background-color: pink;
  font-weight: bold;
}
</style>

<style lang="scss" scoped>
.accordion {
  .accordion-button {
    display: block;
    cursor: pointer;
    font-size: 18px;
    width: 100%;
    padding: 15px;
    background-color: var(--accordion-button-color);
    border: none;
    color: $grey-light;
    text-align: left;
    border-bottom: 1px solid grey;
  }

  .accordion-button::after {
    content: '\25be';
    float: right;
    transform: scale(1.5);
  }

  .accordion-button--active {
    background-color: $dark;
  }

  .accordion-button--active + .accordion-content {
    display: block;
  }

  .accordion-button--active::after {
    content: '\25b4';
  }

  .accordion-content {
    font-size: 18px;
    display: none;
    overflow: auto;

    padding: 15px 15px 0 15px;

    background-color: var(--accordion-color);

    color: $grey-lite;
    table {
      tr {
        th:first-child {
          font-weight: bold;
          border-right: 2px solid $grey;
          color: $grey-laite;
          padding: 0 6px 0 0;
        }
        th {
          color: $grey-lite;
          padding-left: 6px;
        }
      }
    }

    .description {
      font-style: italic;
    }
  }
}
</style>
