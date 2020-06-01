<template>
  <div class="foot">
    <div class="left">
      Copyright © 2018-2020 ToxicMushroom#2610. All rights reserved.
    </div>

    <div class="right">
      Links go here
    </div>
  </div>
</template>

<style lang="scss" scoped>
.foot {
  display: flex;
  justify-content: space-between;
  height: 52px;
  font-size: 0.875rem;
  background-color: $bar-color;

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .left {
     margin: 0 0.5em 0 1em;
  }

  .right {
     margin: 0 1em 0 0.5em;
  }
}
</style>
