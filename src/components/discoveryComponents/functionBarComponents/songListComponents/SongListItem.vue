<template>
<!--  在标签分类中点击某一标签 跳转到的页面-->
  <div class="song-list-item">
    <div class="loading" v-if="loading">
      loading...
    </div>
    <Head :title="type"></Head>
    <div class="song-list-item--content" v-if="!loading">
      <div class="song-list-item--item" v-for="(item, index) in data" :key="index"
           :style="{'width': length + 'px'}">
        <div class="item--image" :style="{'width': length + 'px', 'height': length + 'px'}">
          <img class="image" v-lazy="item.coverImgUrl" :alt="item.coverImgUrl"></div>
        <div class="item--description song-list--description">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Head from '../../../commonComponents/Head'
  import fetch from '../../../../fetch'

  export default {
    name: "SongListItem",
    props: ['type'],
    components: {
      Head
    },
    data() {
      return {
        headColor: 'black',
        data: null,
        fetchError: [],
        loading: true,
        length: (document.body.clientWidth - 40) * 0.3,
      }
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData: function () {
        let self = this;
        fetch.get('/top/playlist?cat=' + self.type).then(function (res) {
          self.data = res.data.playlists;
          self.loading = false;
        }).then(function (err) {
          self.fetchError = err;
        });
      }
    }
  }
</script>

<style scoped>
  .loading {
    margin-top: 100px;
    font-size: 1.5rem;
    text-align: center;
  }

  .song-list-item {
    position: absolute;
    z-index: 150;
    width: 100%;
    background-color: white;
  }

  .song-list-item--content {
    display: flex;
    flex-flow: wrap row;
    margin: 20px;
    padding-top: 80px;
  }

  .song-list-item--item {
    margin: 8px 1.66%;
  }

  .item--image,
  .image {
    width: 100%;
    border-radius: 10px;
  }

</style>
