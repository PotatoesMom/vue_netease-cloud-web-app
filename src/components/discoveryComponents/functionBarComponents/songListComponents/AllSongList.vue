<template>
  <div class="all-song-list">
    <div class="loading" v-if="playListLoading || hotLoading">
      loading...
    </div>
    <Head :title="title"></Head>
    <div v-if="!playListLoading && !hotLoading">
      <div class="all-song-list--content">
        <div class="content" v-for="(category, index) in categories" :key="index">
          <div class="content--head">{{category}}</div>
          <div class="content--items">
            <div v-for="(item) in filterSub(index)" :key="item.name" class="content--item" @click="showItem(item.name)">
              <span v-if="judgeHot(item.name)" class="item-icon icon">&#xe7a9;</span>{{item.name}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Head from '../../../commonComponents/Head'
  import fetch from '../../../../fetch'

  export default {
    name: "AllSongList",
    components: {
      Head
    },
    data() {
      return {
        headColor: 'black',
        fetchError: [],
        categories: null,
        sub: [],
        hot: null,
        length: 0,
        playListLoading: true,
        hotLoading: true,
        title: '所有歌单'
      }
    },
    mounted() {
      this.fetchHotData();
      this.fetchPlayListData();
    },
    methods: {
      fetchPlayListData: function () {
        let self = this;
        fetch.get('/playlist/catlist').then(function (res) {
          self.categories = res.data.categories;
          self.sub = res.data.sub;
          self.playListLoading = false;
        }).then(function (err) {
          self.fetchError = err;
        });
      },
      fetchHotData: function () {
        let self = this;
        fetch.get('/playlist/hot').then(function (res) {
          self.hot = res.data.tags;
          self.hotLoading = false;
        }).then(function (err) {
          self.fetchError = err;
        });
      },
      filterSub: function (index) {
        return this.sub.filter(function (item) {
          return item.category.toString() === index;
        })
      },
      judgeHot: function (name) { //判断哪个是热门标签
        let self = this;
        let length = self.hot.length;
        for (let i = 0; i < length; i++) {
          if (self.hot[i].name === name) {
            return true;
          }
        }
        return false;
      },
      showItem: function (type) {
        this.$router.push({ path: `/songListItem/${type}` });
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

  .item-icon {
    font-size: 1rem;
    color: #f53428;
  }

  .all-song-list {
    position: absolute;
    z-index: 150;
    width: 100%;
    background-color: white;
  }

  .all-song-list--content {
    margin-top: 80px;
    padding: 20px;
  }

  .content--head {
    font-size: 1.2rem;
    font-weight: 500;
    margin: 10px 0;
  }

  .content--items {
    display: flex;
    flex-flow: wrap row;
  }

  .content--item {
    width: 21%;
    margin: 2%;
    padding: 10px 0;
    border-radius: 20px;
    text-align: center;
    background-color: #f5f5f5;
  }

</style>
