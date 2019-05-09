<template>
  <div class="head">
    <div class="head--title">
      {{title}}
    </div>
    <BackHead :color="headColor" :route="route"></BackHead>
  </div>
</template>

<script>
  import BackHead from './BackHead'

  export default {
    name: "Head",
    props: ['title', 'headColor', 'route'],
    components: {
      BackHead
    }
  }
</script>

<style scoped>
  .head {
    position: fixed;
    z-index: 100;
    top: 0;
    height: 75px;
    width: 100%;
    background-color: white;
  }

  .head--title {
    position: fixed;
    z-index: 100;
    top: 0;
    width: 100%;
    padding: 32px;
    font-size: 1.3rem;
    font-weight: 600;
    text-align: center;
  }
</style>
