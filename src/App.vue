<template>
  <div id="app">
    <Playing></Playing>
    <router-view></router-view>
    <BottomNavigationBar></BottomNavigationBar>
    <Audio :play-id="playListData.currentPlayId"></Audio>
  </div>
</template>

<script>
  import Playing from './components/commonComponents/Playing'
  import BottomNavigationBar from './components/commonComponents/BottomNavigationBar'
  import Audio from './components/commonComponents/Audio'

  export default {
    name: 'app',
    components: {
      Playing,
      BottomNavigationBar,
      Audio
    },
    computed: {
      playListData() {
        return this.$store.state.playList;
      },
      currentTime() {
        return this.$refs.audio.currentTime;
      }
    },
  }
</script>

<style>
  #app {
    width: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
