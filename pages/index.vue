<template>
  <div class="wrapper">
    <div id="chonky-boy">
      <section id="welcome" class="hero">
        <div class="background" />
        <div class="welcome-content">
          <div class="container">
            <div class="columns is-centered is-vcentered">
              <div class="column is-4 has-text-centered">
                <figure class="image is-4by2">
                  <img src="@/static/img/iconstretched.svg">
                </figure>
              </div>
              <div class="column welcome-text is-5">
                <h1 class="title">
                  Melijn
                </h1>
                <h2 class="subtitle">
                  Another multipurpose bot for <span><a class="text-link" href="https://discordapp.com" target="_blank">discord</a></span>
                </h2>

                <div class="buttons">
                  <a href="https://discordapp.com/oauth2/authorize?client_id=368362411591204865&scope=bot&permissions=322268358" target="_blank" class="button is-primary is-focused is-medium">
                    <span class="icon is-small">
                      <fa :icon="['fas', 'plus-square']" />
                    </span>
                    <span>Invite</span>
                  </a>
                  <a href="https://discordapp.com/invite/E2RfZA9" target="_blank" class="button is-link is-medium">
                    <span class="icon is-small">
                      <fa :icon="['fas', 'question-circle']" />
                    </span>
                    <span>Support</span>
                  </a>
                  <a href="https://www.patreon.com/melijn" target="_blank" class="button is-info is-medium">
                    <span class="icon is-small">
                      <fa :icon="['fab', 'patreon']" />
                    </span>
                    <span>Patreon</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="arrow-wrapper" @click="scroll">
          <div id="arrow" />
        </div>
      </section>
    </div>
    <div class="wave">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 461 60"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xml:space="preserve"
        xmlns:serif="http://www.serif.com/"
      ><path d="M0,15.36c0,0 93.676,-15.657 230.4,0.24c137.073,15.938 230.4,-4.08 230.4,-4.08l0,48.48l-460.8,0l0,-44.64Z" style="fill:#4d4d4d;" /></svg>
    </div>
    <section class="hero is-dark feature">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-6 text-column-hero">
              <h1 class="title">
                Audio
              </h1>
              <h2 class="subtitle">
                We have dedicated servers for audio streaming. Supports YouTube, SoundCloud, Spotify, Twitch, Discord Attachments and <a class="text-link" href="https://bintray.com/sedmelluq/com.sedmelluq/lavaplayer" target="_blank">more...</a><br>
                Melijn has many <a class="text-link" href="/commands#music">commands</a> to make listening with others fun.
              </h2>
            </div>
            <div class="column is-5">
              <span class="icon">
                <fa :icon="['fas', 'music']" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="hero is-dark dark2 feature">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-5">
              <span class="icon">
                <fa :icon="['fas', 'hammer']" />
              </span>
            </div>
            <div class="column is-6 text-column-hero">
              <h1 class="title">
                Moderation
              </h1>
              <h2 class="subtitle">
                Moderate your server with chat-filters, automated punishment system, fullfills all your punishment needs like ban, tempban, softban, ..mute, ..kick etc<br>
                Easily view and remove punishment cases.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="hero is-dark feature">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-6 text-column-hero">
              <h1 class="title">
                Verification
              </h1>
              <h2 class="subtitle">
                To keep spammers, self-bots, raids and people that tell you: "I didn't find the rules" from infiltrating your server. Or to simply have a password protected private server.<br>
                You can require users to pass a verification check (supports: password, reaction or google-recaptchaV2)
              </h2>
            </div>
            <div class="column is-5">
              <span class="icon">
                <fa :icon="['fas', 'shield-alt']" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="hero is-dark dark2 feature">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-5">
              <span class="icon">
                <fa :icon="['fas', 'user-tag']" />
              </span>
            </div>
            <div class="column is-6 text-column-hero">
              <h1 class="title">
                Reaction Roles
              </h1>
              <h2 class="subtitle">
                Create role groups. Setup emotes that grant a role or multiple roles or one out of many roles by chance.<br>
                Auto create a nicelly formatted role menu. You can even customize te line format.<br>
                Or go fully custom and just set the channelId (optional: and messageIds)
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            And much more which you can <a class="text-link" href="/commands">discover</a>.
          </h1>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  methods: {
    scroll (event) {
      window.scroll(0, window.innerHeight)
    }
  },
  head () {
    return {
      title: 'Melijn - Discord Bot',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Melijn is a multipurpose discord bot with lot\'s of functionality and advanced commands.'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Melijn - Discord Bot'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://v2.melijn.com/${this.$route.params.id}`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Melijn is a multipurpose discord bot with lot\'s of functionality and advanced commands.'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

.wrapper {
  .wave {
    transform: translateY(1px);
    svg {
      path {
        fill: $box-color !important;
      }
      display: block;
    }
  }
  hr {
    background-color: $grey;
    margin: 0;
  }
  .hero.is-dark {
    background-color: $box-color;
  }
  #welcome {
    position: relative;
    justify-content: center;
    flex-wrap: nowrap;

    .welcome-content {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-evenly;
      height: 725px;
      padding: 0 100px;
      z-index: 2;
    }

    .background {
      position: absolute;
      height: 100vh;
      left: 0;
      right: 0;
      top: 0;
      z-index: 0;
      overflow: hidden;

      background-image: url("~static/img/background.svg");
      background-position: 50%;

      background-repeat: no-repeat;
      background-size: cover;
    }
    .columns {
      padding: 50px 0;
      background-color: $box-color;

      .welcome-text {
        text-align: left;

        .title {
          font-family: 'Open Sans', sans-serif;
          display: block;
          font-weight: 300;
          font-size: 3rem;
          color: var(--lightest);
        }

        .subtitle {
          font-weight: 300;
          font-size: 2rem;
          color: var(--light-grey);
          word-spacing: 0.25rem;
        }
      }

      @media (max-width: $tablet) {
        .welcome-text {
          text-align: center;

          .buttons {
            justify-content: center;
          }
        }

        .image {
          img {
            height: 40vh;
          }
        }
      }
    }

    #arrow-wrapper {
      position: absolute;
      bottom: 0;
      padding: 50px;
      left: 50%;
      transition: 0.5s ease-in-out;
      transform: translateX(-50%);
      animation: idle-up-down 2s ease-in-out 0.5s infinite;
      z-index: 5;
      &:hover {
        cursor: pointer;
      }
      #arrow {
        border-right: 3px solid $grey;
        border-bottom: 3px solid $grey;
        width: 100px;
        height: 100px;
        transform: rotate(45deg);
      }
    }

    @keyframes idle-up-down {
      0% {
        transform: translateX(-50%) translateY(0vh);
      }
      50% {
        transform: translateX(-50%) translateY(-4vh);
      }
      100% {
        transform: translateX(-50%) translateY(0vh);
      }
    }

    @keyframes idle-up-down-small {
      0% {
        transform: translateX(-50%) translateY(0vh);
      }
      50% {
        transform: translateX(-50%) translateY(-2vh);
      }
      100% {
        transform: translateX(-50%) translateY(0vh);
      }
    }

    @media (max-width: $tablet) {
      #arrow-wrapper {
        bottom: 0;
        padding: 30px;
        animation: idle-up-down-small 2s ease-in-out 0.5s infinite;
        #arrow{
          width: 64px;
          height: 64px;
        }
      }
    }
  }
  .feature.dark2 {
    background-color: #242529;
  }
  .feature {
    padding: 25px 0;
    .columns {
      .column.is-5 {
        display: flex;
        justify-content: center;
        span.icon {
          height: 150px;
          width: 150px;
          svg {
            height: 150px;
            width: 150px;
          }
        }
      }

      .text-column-hero {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }
}
#self-roles-img {
  width: 285px;
}
</style>
