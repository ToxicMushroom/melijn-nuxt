<template>
  <div>
    <h1>osu callback</h1>
    <p v-bind="state"></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: "",
      response: {},
    };
  },
  async asyncData(context) {
    let { route, $axios, $cookies, params } = context;
    let state = "";
    let cookie = $cookies.get("jwt");
    if (!cookie) {
      return { state: "nocookie" };
    }

    if (route.query) {
      if (route.query.code) {
        try {
          let headers = context.$util.getHeaderObject(context, process.server);
          response = await $axios.$post(
            "/osu/link",
            { code: route.query.code, jwt: cookie },
            { headers: headers }
          );

          if (response.error) {
            state = "error";
            return { state };
          }
        } catch (err) {
          state = "error";
        }
      } else if (route.query.error && route.query.error_description) {
        state = "cancelled";
      }
    }

    return { state };
  },
  mounted() {
    if (this.state == "nocookie") {
      window.location.replace("https://google.com");
    }
  },
};
</script>