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
      <div class="avatar" />
      <nuxt-link :to="'/dashboard/' + id" class="text-link back">
        {{ guild.name }}
      </nuxt-link>
      <p>/</p>
      <p>general</p>
    </div>
    <div id="settings-box" class="container">
      <form id="general-form">
        <input type="number" name="id" style="display: none" :value="id">
        <div class="field">
          <label class="label">Prefixes</label>
          <div v-for="(prefix, index) in settings.prefixes" :key="index" class="control">
            <div class="vertically-centered-line prefix-entry">
              <p>{{ index + 1 }} </p>
              <input class="input" type="text" placeholder="a prefix.." :value="prefix" disabled>
              <span class="icon is-medium hover-pointer" @click="close(index)">
                <fa :icon="['fas', 'times']" class="fa-2x" />
              </span>
            </div>
          </div>
          <div class="vertically-centered-line">
            <button class="button is-primary" type="button" :disabled="(prefixAddInput.length == 0 || settings.prefixes.includes(prefixAddInput))" @click="addPrefix()">
              Add
            </button>
            <input v-model="prefixAddInput" class="input" type="text" placeholder="a prefix..">
          </div>
        </div>
        <br>
        <div class="field">
          <label class="label">Spaced Prefix Support</label>
          <label class="control switch">
            <input v-model="settings.allowSpacePrefix" type="checkbox">
            <span class="slider round" />
          </label>
        </div>
        <br>
        <b-field label="Embed Color (HEX)">
          <b-input
            v-model="settings.embedColor"
            placeholder="#FFF / #AB9944"
            type="text"
            validation-message="Please match #XXX | #XXXXXX"
            pattern="#?([a-fA-F]|\d){3}(([a-fA-F]|\d){3})?"
          />
        </b-field>

        <br>
        <div class="field">
          <label class="label">Disable Embeds (leave off unless you have problems with embeds)</label>
          <label class="control switch">
            <input v-model="settings.embedsDisabled" type="checkbox">
            <span class="slider round" />
          </label>
        </div>
        <br>
        <div class="field">
          <label class="label">TimeZone</label>
          <div class="control flex-row">
            <input v-model="settings.timeZone" class="input timezone-selected" type="text" placeholder="GMT" disabled>
            <button type="button" class="button is-primary" @click="openTimezonePicker = !openTimezonePicker">
              Change
            </button>
          </div>
        </div>
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
        timeZones: []
      },
      timeZoneFilter: '',
      prefixAddInput: '',
      openTimezonePicker: false
    }
  },
  mounted () {
    if (this.$cookies.get('sdt')) {
      this.$axios.$post('/cookie/decrypt/guild/general', { jwt: this.$cookies.get('sdt'), id: this.id }).then((res) => {
        this.loggedIn = true

        const isGif = res.guild.icon.startsWith('a_')
        const guild = {}
        guild.name = res.guild.name
        guild.avatarVariables = {
          '--guild-avatar': 'url(https://cdn.discordapp.com/icons/' + res.guild.id + '/' + res.guild.icon + '.webp?size=128)',
          '--guild-avatar-hover': 'url(https://cdn.discordapp.com/icons/' + res.guild.id + '/' + res.guild.icon + (isGif ? '.gif' : '.webp') + '?size=128)'
        }
        this.guild = guild
        this.settings = res.settings
        this.provided.timeZones = res.provided.timezones
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
          content: `https://v2.melijn.com/${this.$route.params.id}`
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
  }
  #general-form {
    margin-bottom: 40px;
    .field {
      .control {
        input.input {
          border: none;
        }
      }
    }
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
      margin: 10px;
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
    .switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
      input {
        opacity: 0;
        width: 0;
        height: 0;
      }
      input:checked + .slider {
          background-color: #7594D1;
        }
      input:focus + .slider {
        box-shadow: 0 0 1px #7594D1;
      }
      input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
      }
      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #72767d;
        -webkit-transition: .2s;
        transition: .2s;
        &:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          -webkit-box-shadow: 0 2px 4px rgba(0,0,0,.3);
          box-shadow: 0 2px 4px rgba(0,0,0,.3);
          -webkit-transition: .2s;
          transition: .2s;
        }
      }

      /* Rounded sliders */
      .slider.round {
        border-radius: 34px;
      }

      .slider.round:before {
        border-radius: 50%;
      }
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
