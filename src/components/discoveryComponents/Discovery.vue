<template>
  <div class="discovery">
    <div class="discovery--head">
      <SearchBar></SearchBar>
    </div>
      <Banner></Banner>
      <FunctionBar></FunctionBar>
      <RecommendedSongList></RecommendedSongList>
  </div>
</template>

<script>
  import SearchBar from '@/components/commonComponents/SearchBar'
  import Banner from './Banner'
  import FunctionBar from './FunctionBar'
  import RecommendedSongList from './RecommendedSongList'

  export default {
    name: "Discovery",
    components: {
      SearchBar,
      Banner,
      FunctionBar,
      RecommendedSongList
    },
  }
</script>

<style scoped>
  .discovery--head {
    position: fixed;
    top: 0;
    width: 100%;
    background: white;
    z-index: 10;
  }

</style>
