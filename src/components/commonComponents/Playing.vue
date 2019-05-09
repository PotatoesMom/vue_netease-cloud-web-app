<template>
  <div>
    <div class="playing" :style="{'color': color}" @click="playCurrent">
      <span class="playing__icon icon">&#xe644;</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Playing",
    data: function () {
      return {
        color: "black",
      }
    },
    watch: {
      $route: function () {
        let self = this;
        let route = self.$route.fullPath.split("/")[1];
        if (route === "userDetails" || route === "recommendedDaily" || route === "song") {
          self.color = "white";
        } else {
          self.color = "black";
        }
      },
    },
    methods: {
      playCurrent: function () {
        this.$router.push({path: '/song'});
      }
    }
  }
</script>

<style scoped>

  .playing__icon {
    font-size: 2.5em;
  }

  .playing {
    position: fixed;
    top: 25px;
    right: 25px;
    z-index: 900;
  }

</style>
