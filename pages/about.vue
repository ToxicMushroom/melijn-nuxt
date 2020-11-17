<template>
  <div class="wrapper">
    <div class="text-block">
      <h3>About Melijn</h3>
      <p>
        Melijn is an opensource discord bot I (ToxicMushroom#2610) started in 2017.<br>
        It started out as a ported moderation & music bot in java which I had once made for a public discord server.<br>
        In 2019 I did a complete rewrite from java to kotlin to get better multithreading support. Melijn has been opensource since the start and I plan to keep it like this. Dependencies might be kept closed source tho so people don't just steal everything and run it under another name. I don't want years of work to go to "waste" or have others profit from it without contributing anything.<br>
        At the start all I really knew how to do was some small web-design things and janky spigot plugins. Over the years in this project I've become happy with my skill and feel confident in maintaining this project for the following years.<br>Below you can see who helped me out and links to their pages &lt;3.
      </p>
    </div>
    <div class="people">
      <h3>Developers</h3>
      <div class="user-boxes">
        <div class="user-box">
          <figure class="avatar">
            <img src="/img/users/toxicmushroom.png" alt="avatar of toxicmushroom">
          </figure>

          <div class="name">
            ToxicMushroom <span class="realname">[Merlijn]</span>
          </div>

          <div class="jobs">
            Project Lead
          </div>
          <div class="links">
            <a href="https://github.com/ToxicMushroom" target="_blank">
              <span class="icon is-medium">
                <fa :icon="['fab', 'github']" />
              </span>
            </a>
            <a href="https://twitter.com/PixelHamster" target="_blank">
              <span class="icon is-medium">
                <fa :icon="['fab', 'twitter']" />
              </span>
            </a>
            <a href="https://discord.com/invite/tfQ9s7u" target="_blank">
              <span class="icon is-medium">
                <fa :icon="['fab', 'discord']" />
              </span>
            </a>
          </div>
        </div>
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
      <h3 class="contributors">
        Contributors &lt;3
      </h3>
      <div class="user-boxes contributors">
        <div class="user-box">
          <figure class="avatar">
            <img src="/img/users/hetyoshiteam.webp" alt="avatar of hetyoshiteam">
          </figure>

          <div class="name">
            HetYoshiTeam
          </div>

          <div class="jobs">
            Economy Category
          </div>
          <div class="links">
            <a href="https://github.com/HetYoshiTeam" target="_blank">
              <span class="icon is-medium">
                <fa :icon="['fab', 'github']" />
              </span>
            </a>
          </div>
        </div>
        <div class="user-box">
          <figure class="avatar">
            <img src="/img/users/duncte123.jpg" alt="avatar of duncte123">
          </figure>

          <div class="name">
            Duncte123 <span class="realname">[Duncan]</span>
          </div>

          <div class="jobs">
            Code Structure
          </div>
          <div class="links">
            <a href="https://github.com/duncte123" target="_blank">
              <span class="icon is-medium">
                <fa :icon="['fab', 'github']" />
              </span>
            </a>
            <a href="https://twitter.com/duncte123" target="_blank">
              <span class="icon is-medium">
                <fa :icon="['fab', 'twitter']" />
              </span>
            </a>
            <a href="https://duncte123.me/" target="_blank">
              <span class="icon is-medium">
                <fa :icon="['fas', 'link']" />
              </span>
            </a>
          </div>
        </div>
        <div class="user-box">
          <figure class="avatar">
            <img src="/img/users/xavin.webp" alt="avatar of xavin">
          </figure>

          <div class="name">
            Xavin
          </div>

          <div class="jobs">
            Music, Deployment, Monitoring
          </div>
          <div class="links">
            <a href="https://github.com/xavinlol" target="_blank">
              <span class="icon is-medium">
                <fa :icon="['fab', 'github']" />
              </span>
            </a>
            <a href="https://hydra.bot/" target="_blank">
              <span class="icon is-medium">
                <fa :icon="['fas', 'link']" />
              </span>
            </a>
          </div>
        </div>
        <div class="user-box">
          <figure class="avatar">
            <img src="/img/users/bytealex.jpg" alt="avatar of bytealex">
          </figure>

          <div class="name">
            ByteAlex
          </div>

          <div class="jobs">
            Music, Hosting
          </div>
          <div class="links">
            <a href="https://github.com/ByteAlex" target="_blank">
              <span class="icon is-medium">
                <fa :icon="['fab', 'github']" />
              </span>
            </a>
            <a href="https://zerotwo.bot/" target="_blank">
              <span class="icon is-medium">
                <fa :icon="['fas', 'link']" />
              </span>
            </a>
          </div>
        </div>
        <div class="user-box">
          <figure class="avatar">
            <img src="/img/users/rxsto.jpg" alt="avatar of rxsto">
          </figure>

          <div class="name">
            rxsto
          </div>

          <div class="jobs">
            Website Backend
          </div>
          <div class="links">
            <a href="https://github.com/rxsto" target="_blank">
              <span class="icon is-medium">
                <fa :icon="['fab', 'github']" />
              </span>
            </a>
            <a href="https://rxs.to/" target="_blank">
              <span class="icon is-medium">
                <fa :icon="['fas', 'link']" />
              </span>
            </a>
          </div>
        </div>
        <div class="user-box">
          <figure class="avatar">
            <img src="/img/users/gerard.jpg" alt="avatar of gerard">
          </figure>

          <div class="name">
            Gerard
          </div>

          <div class="jobs">
            Website Performance
          </div>
          <div class="links">
            <a href="https://github.com/GerardSmit" target="_blank">
              <span class="icon is-medium">
                <fa :icon="['fab', 'github']" />
              </span>
            </a>
          </div>
        </div>
        <div class="user-box">
          <figure class="avatar">
            <img src="/img/users/veld.webp" alt="avatar of veld">
          </figure>

          <div class="name">
            Veld
          </div>

          <div class="jobs">
            Legal & Terms
          </div>
          <div class="links">
            <a href="https://github.com/velddev" target="_blank">
              <span class="icon is-medium">
                <fa :icon="['fab', 'github']" />
              </span>
            </a>
            <a href="https://twitter.com/velddev" target="_blank">
              <span class="icon is-medium">
                <fa :icon="['fab', 'twitter']" />
              </span>
            </a>
            <a href="https://miki.bot/" target="_blank">
              <span class="icon is-medium">
                <fa :icon="['fas', 'link']" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  head () {
    return {
      title: 'Melijn - About',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Page with info about melijn.'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Melijn - About'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://melijn.com/${this.$route.params.id}`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Page with info about melijn.'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media (max-width: $tablet) {
    margin-top: 40px;
  }
  @media (max-width: $phone) {
    margin-top: 25px;
  }
  .text-block {
    h3 {
      font-size: 22px;
      color: white;
    }
    p {
      font-size: 16px;
    }
    margin: 50px 30px;
    background-color: $box-color;
    padding: 8px;
    margin: 30px 80px;
    border-radius: 5px;
    @media (max-width: $desktop) {
      margin: 12px 60px;
    }
    @media (max-width: $tablet) {
      margin: 8px 40px;
    }
    @media (max-width: $phone) {
      margin: 8px 10px;
    }
  }
  .people {
    display: flex;
    flex-direction: column;
    justify-content: center;
    h3 {
      font-size: 24px;
      font-weight: bold;
      text-align: center;
    }
    .wave {
      transform: translateY(5px);
      svg {
        display: block;
        path {
          fill: $box-color !important;
        }
      }
    }
    .user-boxes {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      flex: 1;
      justify-content: center;
      padding: 20px;
      .user-box {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        text-align: center;
        height: 350px;
        background-color: $box-color;
        padding: 10px;
        margin: 20px;
        border-radius: 5px;
        .avatar {
          height: 200px;
          width: 200px;
          border-radius: 20px;
        }
        .name {
          font-size: 16px;
          font-weight: bold;
          .realname {
            color: $grey-lite;
          }
        }
        .jobs {
          color: $grey-lite;
          font-weight: 400;
        }
        .links {
          a {
            display: inline-block;
            height: calc(2rem + 10px);
            padding: 5px;
            text-decoration-style: none;
            .icon {
              color: white;
              svg {
                width: 2em;
                height: 2em;
              }
            }
            &:hover {
              .icon {
                color: $grey-lite;
              }
            }
          }
        }
      }
    }
    .contributors {
      background-color: $box-color;
      .user-box {
        background-color: #242529;
      }
      &.user-boxes {
        padding-bottom: 100px;
      }
    }
  }
}
</style>
