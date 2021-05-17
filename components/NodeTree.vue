
<template>
  <div class="accordion">
    <button :class="{ 'accordion-button--active': isActive, [className]: true }" class="accordion-button" @click="myFilter">
      {{ cmdName }}<span class="btn-arrow"><fa :icon="['fas', 'angle-down']" /></span>
    </button>
    <div v-if="isActive" class="accordion-content" :class="(level % 2) ? 'accordioncolor2' : 'accordioncolor1'">
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
          <th>{{ syntax }}</th>
        </tr>
        <tr v-if="args.length > 0">
          <th>Arguments</th>
          <th v-html="args" />
        </tr>
        <tr v-if="channelPermissions.length > 0">
          <th>Discord Channel Permissions</th>
          <th v-html="channelPermissions" />
        </tr>
        <tr v-if="permissions.length > 0">
          <th>Discord Permissions</th>
          <th v-html="permissions" />
        </tr>
        <tr v-if="conditions.length > 0">
          <th>Requirements</th>
          <th v-html="conditions" />
        </tr>
        <tr v-if="help.length > 0">
          <th>Extra Help</th>
          <th v-html="help" />
        </tr>
        <tr v-if="examples.length > 0">
          <th>Examples</th>
          <th v-html="examples" />
        </tr>
      </table>
      <br>
      <node v-for="child in node[8]" :key="child[0]" :node="child" :level="level + 1" :extra="extra" />
    </div>
  </div>
</template>

<script>
import { red, blue, green, purple } from '~/constants/constants.js'

function createName (node) {
  const name = node[0]
  const arr = node[3]
  if (arr.length > 0) {
    return name + ' | ' + arr.join(' | ')
  } else {
    return name
  }
}

function createPermissions (extra, perms) {
  return perms.reduce((total, element) => {
    let className
    let permission = extra.discordpermissions[element]

    if (red.includes(permission)) {
      className = 'is-danger'
    } else if (blue.includes(permission)) {
      className = 'is-info'
    } else if (green.includes(permission)) {
      className = 'is-success'
    } else if (purple.includes(permission)) {
      className = 'is-purple'
    } else {
      className = 'is-light'
    }

    return `${total}<span class="tag ${className}">${permission}</span>`
  }, '')
}

function createConditions (extra, conditions) {
  return conditions.reduce((total, element) => {
    let condition = extra.runconditions[element];
    return `${total}<span class="b-tooltip is-dark is-bottom is-medium is-multiline"><div class="tooltip-content" style="display: none;">${condition[1]}</div><div class="tooltip-trigger"><span class="tag is-purple">${condition[0]}</span></div></span>`
  }, '');
}

function createHtml (input) {
  return input
    .replace(/\r*\n/g, '<br>')
    .replace(/%prefix%/g, '>')
    .replace(/`(.*?)`/ig, '<span class="code">$1</span>')
}

export default {
  name: 'Node',
  props: {
    node: {
      type: Array,
      required: true
    },
    level: {
      type: Number,
      required: true
    }, 
    extra: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isActive: false,
      cmdName: '',
      syntax: '',
      args: '',
      permissions: '',
      channelPermissions: '',
      conditions: '',
      permission: '',
      help: '',
      examples: '',
      className: ''
    }
  },
  watch: {
    node () {
      this.refresh()
    }
  },
  mounted () {
    this.refresh()
  },
  methods: {
    myFilter (event) {
      this.isActive = !this.isActive
    },
    refresh () {
      this.cmdName = createName(this.node)
      this.syntax = this.node[2].replace(/%prefix%/g, '>')
      this.args = createHtml(this.node[4])
      this.channelPermissions = createPermissions(this.extra, this.node[5])
      this.permissions = createPermissions(this.extra, this.node[6])
      this.conditions = createConditions(this.extra, this.node[7])
      this.help = createHtml(this.node[9])
      this.examples = createHtml(this.node[10])
      this.className = (this.level % 2) ? 'accordionbtncolor2' : 'accordionbtncolor1'
    }
  }
}
</script>

<style lang="scss">
span.code {
  padding: 2px 4px;
  border-radius: 4px;
  background-color: $darkest;
  color: $grey-laite;
  letter-spacing: 0.2px;
}
span.is-purple {
  background-color: rgb(100, 52, 90);
  color: $grey-laite;
  font-weight: bold;
}
.b-tooltip:hover div.tooltip-content {
  display: block !important;
}
span.is-danger, span.is-info, span.is-success {
  color: $grey-laite;
  font-weight: bold;
}
</style>

<style lang="scss" scoped>
$color1: #252529;
$color2: #34343A;
$color3: #505056;

.btn-arrow {
  display: inline-box;
  float: right;
  transition: 0.2s ease-in-out;
}

.accordion .accordion-content {
  overflow: visible !important;
}

.accordion {
  box-shadow: 0 0 5px 0 #00000021;
  border-radius: 8px;
  @media (max-width: $tablet) {
    border-radius: 6px;
  }
  @media (max-width: $phone) {
    border-radius: 4px;
  }

  .accordionbtncolor2 {
    //background-color: var(--color4)
    background-color: $color3;
  }

  .accordionbtncolor1 {
    //background-color: var(--color3)
    background-color: $color3;
  }

  .accordionbtncolor2.accordion-button--active {
    //background-color: var(--color6)
    background-color: $color3;
  }

  .accordionbtncolor1.accordion-button--active {
    //background-color: var(--color5)
    background-color: $color3;
  }

  .accordioncolor2 {
    //background-color: var(--color2)
    background-color: $color2;
  }

  .accordioncolor1 {
    //background-color: var(--color1)
    background-color: $color1;
  }

  .accordion-button {
    display: block;
    cursor: pointer;
    font-size: 18px;
    width: 100%;
    padding: 15px;
    border: none;
    color: $grey-light;
    text-align: left;
    border-radius: 8px;
    @media (max-width: $tablet) {
      font-size: 16px;
      padding: 12px;
      border-radius: 6px;
      margin: 12px 0 0 0;
      &:last-child {
        margin-bottom: 12px;
      }
    }
    @media (max-width: $phone) {
      font-size: 14px;
      padding: 8px;
      margin: 8px 0 0 0;
      border-radius: 4px;
      &:last-child {
        margin-bottom: 8px;
      }
    }
  }

  .accordion-button--active {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .accordion-button--active + .accordion-content {
    display: block;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    @media (max-width: $tablet) {
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
    }
    @media (max-width: $phone) {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }

  .accordion-button--active .btn-arrow {
    transform: rotate(-180deg);
  }

  // .accordion-button--active::after {
  //   content: '\25b4';
  // }

  .accordion-content {
    font-size: 18px;
    display: none;
    overflow: auto;

    padding: 15px 10px 15px 15px;
    @media (max-width: $tablet) {
      padding: 15px 5px 10px 10px;
    }
    @media (max-width: $phone) {
      padding: 15px 5px 10px 5px;
    }

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
          @media (max-width: $tablet) {
            font-size: 14px;
          }
          @media (max-width: $phone) {
            font-size: 11px;
          }
        }
      }
    }

    .description {
      font-style: italic;
    }
  }
}
</style>
