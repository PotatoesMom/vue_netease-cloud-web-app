<template>
  <div class="back-head">
    <div class="back-head--icon icon" @click.stop="back" :style="{'color': color}">&#xe60f;</div>
  </div>
</template>

<script>
  export default {
    name: "BackHead",
    props: ['color', 'route'],
    methods: {
      back: function () {
        let self = this;
        if (self.route === undefined) {
          self.$router.go(-1);
        } else {
          self.$router.push({path: '/' + self.route});
        }
      },
    }
  }
</script>

<style scoped>
  .back-head {
    padding: 25px 20px 10px 25px;
    position: fixed;
    top: 0;
    z-index: 200;
    width: 100%;
  }

  .back-head--icon {
    font-size: 2rem;
  }
</style>
