<template>
  <div class="container">
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
      <p>starboard</p>
    </div>
      <form id="general-form">
        <b-field label="Starboard Channel" class="bonk table-container">
            <b-select v-model="starboardChannel">
            <option v-bind:value="null">Select a textchannel</option>
            
            <optgroup :label="entry.category" v-for="entry in provided.channelStructure" :key="entry.category">
                <option v-bind:value="channel.id" v-for="channel in entry.channels" :key="channel.id">#{{ channel.name }}</option>
            </optgroup>
            </b-select>
        </b-field>
        <br>
        <b-field label="Excluded Channels" class="bonk table-container">
            <b-select v-model="excludedChannels">
            
            
            <optgroup :label="entry.category" v-for="entry in provided.channelStructure" :key="entry.category">
                <option v-bind:value="channel.id" v-for="channel in entry.channels" :key="channel.id">#{{ channel.name }}</option>
            </optgroup>
            </b-select>
        </b-field>
        <br>
        <button class="button is-primary" type="button" @click="submit()">
          Save
        </button>
      </form>
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
        starboardChannel: null,
        excludedChannels: [],
        minStarCount: 3,
      },
      provided: {
        channelStructure: [],
        roleStructure: []
      }
    }
  },
  mounted () {
    if (this.$cookies.get('sdt')) {
      this.$axios.$post('/getsettings/starboard', { jwt: this.$cookies.get('sdt'), id: this.id }).then((res) => {
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
        this.provided = res.provided
        console.log(res)
      }).catch((error) => {
        console.log(error)
        window.location.replace(window.location.origin)
      })
    } else {
      window.location.replace(window.location.origin)
    }
  },
  methods: {
    submit () {
      this.$axios.$post('/setsettings/starboard', { jwt: this.$cookies.get('sdt'), id: this.id, settings: this.settings }).then((res) => {
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
computed: {
    pageUrl() {
      return `https://melijn.com${this.$route.fullPath}`
    }
  },
  head () {
    return {
      title: 'Melijn - Dashboard - Starboard',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Starboard page of the Melijn dashboard to configure starboard settings.'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Melijn - Dashboard - Starboard'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.pageUrl
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Starboard page of the Melijn dashboard to configure starboard settings.'
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
  .select > select {
    border-color: black;
  }
  .select > select:hover {
    border-color: #72767d;
  }
  .select select option {
    color: #d2d6dd;
  }
</style>

<style lang="scss" scoped>
.container {
  width: 100%;
  .select select optgroup {
    background-color: black;
  }
  .bonk {
    margin: 20px auto;
    width: max-content;
    .table {
      th, td {
        border-color: black;
      }
      td {
        vertical-align: middle;
      }
      background-color: $darkr;
    }
  }
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
  &.logChannel-entry {
    margin-bottom: 8px;
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
  margin: auto;
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
}
</style>
