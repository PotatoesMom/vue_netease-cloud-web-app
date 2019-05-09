<template>
  <div class="recommended-song-list">
    <div class="loading" v-if="loading">loading...</div>
    <div v-if="!loading">
      <div class="recommended-song-list--head">
        <div class="recommended-song-list--title">推荐歌单</div>
        <div class="recommended-song-list--more" @click="toSongList">歌单广场</div>
      </div>
      <div class="recommended-song-list--content">
        <div class="recommended-song-list--item" v-for="(item, index) in data.slice(0,9)" :key="index"
             :style="{'width': length + 'px'}">
          <div class="item--image" :style="{'width': length + 'px', 'height': length + 'px'}">
            <img class="image" v-lazy="item.picUrl"></div>
          <div class="item--description song-list--description">{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import fetch from '../../fetch'

  export default {
    name: "RecommendedSongList",
    data() {
      return {
        data: [],
        fetchError: [],
        length: (document.body.clientWidth - 40) * 0.3,
        loading: true,
        imageNodes: null
      }
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData: function () {
        let self = this;
        fetch.get('/personalized').then(function (res) {
          self.data = res.data.result;
          self.loading = false;
        }).catch(function (err) {
          self.fetchError.push(err);
        })
      },
      toSongList: function () { //跳转到歌单广场
        this.$router.push('songList');
      }
    }
  }
</script>

<style scoped>

  .recommended-song-list {
    margin: 20px;
    padding-bottom: 100px;
  }

  .recommended-song-list--head {
    display: flex;
    justify-content: space-between;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .recommended-song-list--title {
    padding: 5px 0;
  }

  .recommended-song-list--more {
    padding: 5px 10px;
    border: 1px solid #d7d7d7;
    border-radius: 20px;
    font-size: 1rem;
    font-weight: 400;
  }

  .recommended-song-list--content {
    display: flex;
    flex-flow: wrap row;
    justify-content: space-between;
  }

  .recommended-song-list--item {
    margin-top: 15px;
  }

  .item--image,
  .image {
    width: 100%;
    border-radius: 10px;
  }

</style>
