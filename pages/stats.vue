<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          <span class="icon">
            <fa :icon="['fas', 'chart-bar']" />
          </span>
          Stats
        </h1>
        <h2 class="subtitle">
          General bot statistics
        </h2>
      </div>
    </div>
    <div class="container">
      <div class="flex">
        <div class="flex-item box">
          <p class="title">Rank</p>
          <figure class="image is-8by3">
            <img src="https://dblstatistics.com/bot/368362411591204865/widget/ranks?width=605&height=350">
          </figure>
        </div>
        <div class="flex-item box">
          <p class="title">Server Count</p>
          <figure class="image is-8by3 bordered-graph">
            <img src="https://dblstatistics.com/bot/368362411591204865/widget/servers?backgroundColor=2A2B2E&width=600&height=300">
          </figure>
        </div>
        <div class="flex-item box">
          <p class="title">Monthly Votes</p>
          <figure class="image is-8by3 bordered-graph">
            <img src="https://dblstatistics.com/bot/368362411591204865/widget/monthlyVotes?backgroundColor=2A2B2E&width=600&height=300">
          </figure>
        </div>
        <div class="flex-item box">
          <p class="title">All Votes</p>
          <figure class="image is-8by3 bordered-graph">
            <img src="https://dblstatistics.com/bot/368362411591204865/widget/totalVotes?backgroundColor=2A2B2E&width=600&height=300">
          </figure>
        </div>
      </div>
    </div>
    <div class="hero-body">
      <div class="container">
          <h1 class="title">
            <span class="icon">
              <fa :icon="['fas', 'chart-bar']" />
            </span>
            Shards
          </h1>
          <h2 class="subtitle">
            Shard statistics
          </h2>
      </div>
    </div>
    <div class="container">
      <div class="flex">
        <div class="flex-item box" :class="{ 'box-lined': shard.status == 'CONNECTED' }" v-for="shard in stats.shards" :key="shard.id">
          <p class="title">Shard #{{ shard.id }}</p>
          <p class="block">
            Status: {{ shard.status }}<br>
            Ping: {{ shard.ping }}<br>
            Servers: {{ shard.guildCount }}<br>
            Users: {{ shard.userCount }}<br>
            Unavailable Servers: {{ shard.unavailable }}<br>
          </p>
        </div>
      </div>
    </div> 
    <div class="hero-body">
      <div class="container">
          <h1 class="title">
            <span class="icon">
              <fa :icon="['fas', 'chart-bar']" />
            </span>
            Botlists
          </h1>
          <h2 class="subtitle">
            widgets
          </h2>
      </div>
    </div>
    <div class="container">
      <div class="flex">
        <div class="flex-item box">
          <p class="subtitle">discord.boats</p>
          <a href="https://discord.boats/bot/368362411591204865" rel="nofollow" target="_blank">
            <img class="bordered-graph" src="https://discord.boats/api/widget/368362411591204865" alt="Discord Boats Widget">
          </a>
        </div>
        <div class="flex-item box">
          <p class="subtitle">botsfordiscord.com</p>
          <a href="https://botsfordiscord.com/bots/368362411591204865" >
            <img class="bordered-graph" src="https://botsfordiscord.com/api/bot/368362411591204865/widget?theme=dark" title="Visit Melijn listed on Bots for Discord!" alt="BFD Widget" />
          </a>
        </div>
        <div class="flex-item box">
          <p class="subtitle">top.gg</p>
          <a href="https://top.gg/bot/368362411591204865">
            <img class="bordered-graph" src="https://top.gg/api/widget/368362411591204865.svg" alt="Melijn" />
          </a>
        </div>
      </div>
    </div> 
  </section>
</template>

<script>

let stats
export default {
  computed: {
    pageUrl() {
      return `https://melijn.com${this.$route.fullPath}`
    }
  },
  async asyncData ({ $axios }) {
    stats = await $axios.$get('statsApi')
    console.log(stats)
    return { stats }
  },
  head () {
    return {
      title: 'Melijn - Stats',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Stats of the bot.'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Melijn - Stats'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.pageUrl
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Stats of the bot.'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.hero {
  margin-bottom: 16px;
}
.flex-item {
  margin: 8px;
}
.bordered-graph {
  border: 3px solid #5E6276;

}
.box-lined {
  border-left: 4px solid #00d812;
  border-radius: 4px;
}
p {
  color: $grey-ligh;
}
</style>