<template>
  <div class="wrapper">
    <div id="chonky-boy">
      <section id="welcome" class="hero is-fullheight-with-navbar">
        <div class="hero-body">
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
                  <a href="https://discordapp.com/oauth2/authorize?client_id=368362411591204865&scope=bot&permissions=322268358" target="_blank" class="button is-primary is-focused">
                    <span class="icon is-small">
                      <fa :icon="['fas', 'plus-square']" />
                    </span>
                    <span>Invite</span>
                  </a>
                  <a href="https://discordapp.com/invite/E2RfZA9" target="_blank" class="button is-link">
                    <span class="icon is-small">
                      <fa :icon="['fas', 'question-circle']" />
                    </span>
                    <span>Support</span>
                  </a>
                  <a href="https://www.patreon.com/melijn" target="_blank" class="button is-info">
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
        <div id="arrow-wrapper">
          <div id="arrow" />
        </div>
      </section>
    </div>
    <hr>
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-6 text-column-hero">
              <h1 class="title">
                Audio
              </h1>
              <h2 class="subtitle">
                We have dedicated servers for audio streaming. Supports YouTube, SoundCloud, Spotify, Twitch and more...<br>With premium you can stream from any <a class="text-link" href="https://bintray.com/sedmelluq/com.sedmelluq/lavaplayer" target="_blank">supported</a> http url.<br>
                Melijn has many <a class="text-link" href="/commands#music">commands</a> to make listening with others fun.
              </h2>
            </div>
            <div class="column is-5">
              <figure class="image">
                <img src="@/static/img/music.gif">
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
    <hr>
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-5">
              <figure class="image">
                <img src="@/static/img/music.gif">
              </figure>
            </div>
            <div class="column is-6 text-column-hero">
              <h1 class="title">
                Moderation
              </h1>
              <h2 class="subtitle">
                Moderate your server with chat-filters, automated punishment system, all you punishment needs like ban, tempban, softban, ..mute, ..kick etc<br>
                Easily view and remove punishment cases if mistakes we're made.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
    <hr>
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-6 text-column-hero">
              <h1 class="title">
                Verification
              </h1>
              <h2 class="subtitle">
                To keep spammers, self-bots, raids and people that say "I didn't find the rules" from infiltrating your server. Or to simply have a password protected private server.<br>
                You can require users to pass a verification check like: password, reaction or google-recaptchaV2
              </h2>
            </div>
            <div class="column is-5">
              <figure class="image">
                <img src="@/static/img/music.gif">
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
    <hr>
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-5">
              <figure class="image">
                <img src="@/static/img/music.gif">
              </figure>
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
    <hr>
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            And much more which you discover <a class="text-link" href="/commands">here</a>.
          </h1>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  components: {

  }
}
</script>

<style lang="scss" scoped>

.wrapper {
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

    .columns {
      padding: 50px 0;
      background-color: $box-color;

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
      bottom: 60px;
      left: 50%;
      transition: 0.5s ease-in-out;
      transform: translateX(-50%);
      animation: idle-up-down 2s ease-in-out 0.5s infinite;
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
        bottom: 22px;
        animation: idle-up-down-small 2s ease-in-out 0.5s infinite;
        #arrow{
          width: 64px;
          height: 64px;
        }
      }
    }
  }
  .columns {
    .text-column-hero {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .welcome-text {
      text-align: left;

      .title {
        font-family: 'Open Sans', sans-serif;
        display: block;
        font-weight: 300;
        font-size: 2.5rem;
        color: var(--lightest);
      }

      .subtitle {
        font-weight: 300;
        font-size: 1.5rem;
        color: var(--light-grey);
        word-spacing: 0.25rem;
      }
    }
  }
}

</style>
