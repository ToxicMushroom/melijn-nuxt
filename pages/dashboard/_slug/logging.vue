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
      <p>logging</p>
    </div>
    <div class="container">
      <form id="general-form">
        <b-skeleton width="400px" height="1400px" :active="!loggedIn" />
        <b-field :label="logChannelGroup.group" class="bonk table-container" v-for="(logChannelGroup) in settings.logchannels" :key="logChannelGroup.group">
          <table class="table button-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>TextChannel</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(logChannel, index) in logChannelGroup.channels" :key="index" class="control">
                <td><p>{{ logChannel.textType }}</p></td>
                <td>
                  <b-select v-model="logChannel.value">
                    <option v-bind:value="null">Select a textchannel</option>
                    
                    <optgroup :label="entry.category" v-for="entry in provided.channelStructure" :key="entry.category">
                      <option v-bind:value="channel.id" v-for="channel in entry.channels" :key="channel.id">#{{ channel.name }}</option>
                    </optgroup>
                  </b-select>
                </td>
              </tr>
            </tbody>
          </table>
        </b-field>
        <br>
        <button class="button is-primary" type="button" @click="submit()">
          Save
        </button>
      </form>
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
        logchannels: []
      },
      provided: {
        channelStructure: []
      }
    }
  },
  mounted () {
    if (this.$cookies.get('sdt')) {
      let headers = this.$util.getHeaderObject(this, process.server);
      this.$axios.$post('/getsettings/logging', { jwt: this.$cookies.get('sdt'), id: this.id }, { headers: headers }).then((res) => {
        this.loggedIn = true

        const isGif = res.guild.icon ? res.guild.icon.startsWith('a_') : false
        const guild = {}
        guild.name = res.guild.name
        let avatarUrl = 'https://cdn.discordapp.com/icons/' + res.guild.id + '/' + res.guild.icon;
        let hoverAvatarUrl = avatarUrl;
        if (res.guild.icon == null) {
          avatarUrl = ''
          hoverAvatarUrl = ''
        } else {
          avatarUrl += '.webp?size=128'
          hoverAvatarUrl +=  (isGif ? '.gif' : '.webp') + '?size=128'
        }
        guild.avatarVariables = {
          '--guild-avatar': 'url(' + avatarUrl + ')',
          '--guild-avatar-hover': 'url(' + hoverAvatarUrl + ')'
        }
        this.guild = guild
        this.settings = res.settings
        this.logchannels = res.settings.logchannels
        this.provided.channelStructure = res.provided.channelStructure
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
      let headers = this.$util.getHeaderObject(this, process.server);
      this.$axios.$post('/setsettings/logging', { jwt: this.$cookies.get('sdt'), id: this.id, settings: this.settings }, { headers: headers }).then((res) => {
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
      title: 'Melijn - Dashboard - Logging',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Logging category of the Melijn dashboard to configure logchannels.'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Melijn - Dashboard - Logging'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://melijn.com/${this.$route.params.id}`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Logging category of the Melijn dashboard to configure logchannels.'
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
.wrapper {
  margin: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
}
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
