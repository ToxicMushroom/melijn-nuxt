<template>
  <div class="wrapper">
    Redirecting..
  </div>
</template>

<script>
export default {
  mounted () {
    window.location.replace('https://discord.com/oauth2/authorize?client_id=368362411591204865&scope=bot&permissions=457043158&redirect_uri=' +
    window.location.origin + '&response_type=code')
  }
}
</script>
