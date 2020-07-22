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
      <h3>Software Engeneers</h3>
      <div class="avatar-boxes">
        <div class="avatar-box">
          <figure>
            <img src="" alt="">
          </figure>
        </div>
        <div class="jobs">
          Website, Melijn
        </div>
        <div class="links">
          <a href="https://github.com/ToxicMushroom">
            <i />
          </a>
        </div>
      </div>

      <h3>People who helped me &lt;3</h3>
      <div class="avatar-boxes">
        <div class="avatar-box">
          <figure>
            <img src="" alt="">
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  .text-block {
    h3 {
      font-size: 22px;
      color: white;
    }
    p {
      font-size: 16px;
    }
    background-color: $box-color;
    padding: 16px;
    margin: 16px 100px;
  }
}
</style>
