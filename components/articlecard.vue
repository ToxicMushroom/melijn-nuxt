<template>
<div class="card" :style="card.style">
    <div class="author-row">
        <img :src="'/img/users/' + card.author.toLowerCase() + '.png'">
        <p>{{ card.author }}</p>
        <p style="margin-left: auto">
        {{ new Date(card.createdAt).toLocaleDateString() }}
        </p>
    </div>
    <h1 class="title">
        {{ card.title }}
    </h1>
    <h2 class="subtitle">
        {{ card.description }}
    </h2>
</div>    
</template>

<script>
export default {
  name: 'ArticleCard',
  props: {
    card: {
      type: Object,
      required: true
    }
  },
}
</script>
<style lang="scss" scoped>
.card {
  margin: 8px;
  text-decoration: none;
  padding: 16px;
  border-radius: 4px;
  .author-row {
    display: flex;
    flex-direction: row;
    img {
      height: 32px;
      width: 32px;
      margin-right: 6px;
    }
    p {
      margin: auto 0;
    }
  }
}
</style>