<template>
  <div class="wrapper">
    <div id="navigator" class="title vertically-centered-line wrap" :style="guild.avatarVariables">
      <nuxt-link to="/dashboard" class="text-link back">
        <span class="icon is-medium">
          <fa :icon="['fas', 'arrow-left']" />
        </span>
        <p>
          all
        </p>
      </nuxt-link>
      <p>/</p>
      <div class="avatar">
        <b-skeleton circle width="5rem" :active="!guild.name" height="5rem" />
      </div>

      <nuxt-link v-if="guild.name" :to="'/dashboard/' + id" class="text-link back">
        {{ guild.name }}
      </nuxt-link>
      <b-skeleton width="15rem" height="36px" :active="!guild.name" />
      <p>/</p>
      <p>general</p>
    </div>
    <div id="settings-box" class="container">
      <form id="general-form">
        <b-field label="Prefixes" class="bonk" grouped>
          <div v-for="(prefix, index) in settings.prefixes" :key="index" class="control">
            <div class="vertically-centered-line prefix-entry">
              <p>{{ index + 1 }} </p>
              <input
                ref="prefixInput"
                class="input"
                type="text"
                placeholder="a prefix.."
                :value="prefix"
                disabled
                expanded
              >
              <span class="icon is-medium hover-pointer" @click="close(index)">
                <fa :icon="['fas', 'times']" class="fa-2x" />
              </span>
            </div>
          </div>
          <div class="vertically-centered-line">
            <button class="button is-primary" type="button" :disabled="cantAddPrefix()" @click="addPrefix()">
              Add
            </button>
            <input ref="prefixInput" v-model="prefixAddInput" class="input" type="text" placeholder="a prefix..">
          </div>
        </b-field>
        <div class="field flex-row">
          <b-switch
            v-model="settings.allowSpacePrefix"
          >
            Spaced Prefix Support
          </b-switch><b-tooltip type="is-dark" label="When enabled you can put one or more spaces between the prefix and the command" multilined>
            <span class="icon is-small">
              <fa :icon="['fas', 'question-circle']" />
            </span>
          </b-tooltip>
        </div>
        <br>
        <b-field label="Embed Color (HEX)" :message="errors.hex" grouped>
          <b-input
            v-model="settings.embedColor"
            placeholder="#FFF / #AB9944"
            type="text"
            name="hex"
            expanded
          />
          <p class="control">
            <a href="https://www.google.com/search?q=color+picker" target="_blank">
              <button class="button is-primary" type="button">
                Color-Picker
              </button>
            </a>
          </p>
        </b-field>
        <div class="field flex-row">
          <b-switch
            v-model="settings.embedsDisabled"
            type="is-danger"
          >
            Disable Embeds
          </b-switch><b-tooltip type="is-dark" label="Only disable embeds if they're causing an issue" multilined>
            <span class="icon is-small">
              <fa :icon="['fas', 'question-circle']" />
            </span>
          </b-tooltip>
        </div>
        <br>
        <b-field label="TimeZone">
          <input v-model="settings.timeZone" class="input timezone-selected" type="text" placeholder="GMT" disabled>
          <button type="button" class="button is-primary" @click="openTimezonePicker = !openTimezonePicker">
            Change
          </button>
        </b-field>
        <br>
        <button class="button is-primary" type="button" @click="submit()">
          Save
        </button>
      </form>
    </div>
    <!-- Timezone selection modal -->
    <div class="modal" :class="openTimezonePicker ? 'is-active' : ''">
      <div class="modal-background" @click="openTimezonePicker = !openTimezonePicker" />
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            Select your server timezone
          </p>
          <button class="delete" aria-label="close" @click="openTimezonePicker = !openTimezonePicker" />
        </header>
        <section class="modal-card-body custom-selector">
          <input v-model="timeZoneFilter" class="input" type="text" placeholder="filter..">
          <div v-for="tz in provided.timeZones" :key="tz" :value="tz">
            <div v-if="isTzVisible(tz)" class="item" @click="settings.timeZone = tz">
              <div class="item-text">
                {{ tz }}
              </div>
              <div class="item-select-indicator" :class="tz == settings.timeZone ? 'active' : ''">
                <svg v-if="tz == settings.timeZone" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24"><path fill="#ffffff" fill-rule="evenodd" clip-rule="evenodd" d="M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 7.00003L19.5899 5.59003L8.99991 16.17Z" /></svg>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-primary" @click="openTimezonePicker = !openTimezonePicker">
            OK
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  asyncData ({ $content, params }) {
    return { id: params.slug }
  },
  data () {
    return {
      loggedIn: false,
      guild: {},
      settings: {
        prefixes: [],
        allowSpacePrefix: false,
        embedColor: '',
        timeZone: '',
        language: 'EN',
        embedsDisabled: false
      },
      provided: {
        timeZones: [],
        premiumPrefixLimit: 0,
        prefixLimit: 0
      },
      timeZoneFilter: '',
      prefixAddInput: '',
      openTimezonePicker: false,
      errors: {}
    }
  },
  mounted () {
    if (this.$cookies.get('sdt')) {
      this.$axios.$post('/cookie/decrypt/guild/general', { jwt: this.$cookies.get('sdt'), id: this.id }).then((res) => {
        this.loggedIn = true

        const isGif = res.guild.icon ? res.guild.icon.startsWith('a_') : false
        const guild = {}
        guild.name = res.guild.name
        guild.avatarVariables = {
          '--guild-avatar': 'url(https://cdn.discordapp.com/icons/' + res.guild.id + '/' + res.guild.icon + '.webp?size=128)',
          '--guild-avatar-hover': 'url(https://cdn.discordapp.com/icons/' + res.guild.id + '/' + res.guild.icon + (isGif ? '.gif' : '.webp') + '?size=128)'
        }
        this.guild = guild
        this.settings = res.settings
        this.provided.timeZones = res.provided.timezones
        this.provided.prefixLimit = res.provided.prefixLimit
      }).catch((error) => {
        console.log(error)
        window.location.replace(window.location.origin)
      })
    } else {
      window.location.replace(window.location.origin)
    }
  },
  methods: {
    close (index) {
      this.settings.prefixes.splice(index, 1)
    },
    addPrefix () {
      this.settings.prefixes.push(this.prefixAddInput)
      this.prefixAddInput = ''
      this.$refs.prefixInput.focus()
    },
    isTzVisible (tz) {
      const searchQuery = this.timeZoneFilter.toLowerCase()
      const res = tz.toLowerCase().includes(searchQuery) || this.search === ''
      return res
    },
    submit () {
      this.$axios.$post('/postsettings/general', { jwt: this.$cookies.get('sdt'), id: this.id, settings: this.settings }).then((res) => {
        if (res.success) {
          this.$buefy.toast.open({
            message: 'Saved!',
            position: 'is-bottom',
            type: 'is-success'
          })
        } else {
          this.$buefy.toast.open({
            duration: 5000,
            message: 'Something went wrong, check if your inputs are valid!',
            position: 'is-bottom',
            type: 'is-danger'
          })
        }
      }).catch((error) => {
        console.log(error)
        this.$buefy.toast.open({
          duration: 5000,
          message: 'Something went horribly wrong, report to our devs!',
          position: 'is-bottom',
          type: 'is-danger'
        })
      })
    },
    cantAddPrefix () {
      return (this.prefixAddInput.length === 0 ||
       this.settings.prefixes.includes(this.prefixAddInput) ||
         this.settings.prefixes.length >= this.provided.prefixLimit)
    }
  },
  head () {
    return {
      title: 'Melijn - Dashboard - General',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'General category of the Melijn dashboard to configure most common server settings.'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Melijn - Dashboard - General'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://melijn.com/${this.$route.params.id}`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'General category of the Melijn dashboard to configure most common server settings.'
        }
      ]
    }
  }
}
</script>

<style>
  #general-form .field .control input {
    border: none;
  }
  #general-form .field .switch input[type="checkbox"]:not(:checked) + .check {
    background-color: #72767d;
  }
  #general-form .field.bonk .field-body .field {
    display: flex;
    flex-direction: column;
  }
  .tooltip-trigger {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>

<style lang="scss" scoped>
.wrapper {
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
  @media (max-width: $tablet) {
    margin: 5px;
  }
  .vertically-centered-line {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    text-align: start;
    & > * {
      margin: auto 10px auto 0;
    }
    &.wrap {
      flex-wrap: wrap;
    }
  }
  #navigator.title {
    color: white;
    margin-top: 3rem;
    margin-left: 3rem;
    & > * {
      margin: auto 12px auto 0;
    }

    .back {
      .icon {
        display: inline-block;
      }
      p {
        display: inline-block;
      }
    }
    .avatar {
      border-radius: 50%;
      background-size: contain;
      background-image: var(--guild-avatar);
      height: 5rem;
      width: 5rem;
      margin: auto 6px auto 0;
      &:hover{
        background-image: var(--guild-avatar-hover);
      }
    }
    div {
      display: inline-flex;
    }
    .b-skeleton {
      width: auto;
    }
  }
  #general-form {
    width: 80vw;
    max-width: 600px;
    margin-bottom: 40px;
    input {
      border: none;
      color: $grey-laite;
      &::placeholder {
        color: $grey;
      }
      &[disabled="disabled"] {
        background-color: black;
      }
    }
    .prefix-entry {
      margin: 0 0 10px 10px;
      .icon {
        font-size: 14px;
      }
    }
    .label {
      color: white;
    }
    .hover-pointer {
      cursor: pointer;
    }
    .flex-row {
      display: flex;
      flex-direction: row;
    }
    .timezone-selected {
      margin-right: 10px;
    }
  }
  .modal {
    .modal-card {
      height: calc(100vh - 40px);
      .modal-card-head {
        border: none;
        .modal-card-title {
          color: $grey-light;
        }
        .delete {
          background-color: rgba(253, 253, 253, 0.6);
          &:hover {
            background-color: rgba(253, 253, 253, 0.8);
          }
        }
      }
      .modal-card-body {
        background-color: $bg-color;
      }
       .modal-card-foot {
         border: none;
         display: flex;
         justify-content: flex-end;
       }
      .modal-card-head, .modal-card-foot {
        background-color: #242529;
      }
    }
    .custom-selector {
      input {
        background-color: $bar-color;
        border: none;
        color: $grey-laite;
        margin-bottom: 10px;
        &::placeholder {
          color: $grey;
        }
      }
      .item {
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        flex: 1;
        justify-content: space-between;
        .item-select-indicator {
          border-radius: 50%;
          width: 24px;
          border: 1px solid grey;
          display: flex;
          justify-content: center;
          svg {
            margin: auto;
          }
          &.active {
            background-color: #43B581;
            border: 1px solid #43B581;
          }
        }
      }
      .item:hover {
        background-color: $dark;
      }
    }
  }
}
</style>
