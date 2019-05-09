<template>
  <div class="song-list">
    <Head :title="title" :route="route"></Head>
    <div class="song-list--select-bar">
      <div class="select-bar--item" :class="{'select-bar--current-item': judgeCurrent(index)}"
           v-for="(item, index) in mySongList" :key="index" @click="changeTab(index)">
        {{item}}
      </div>
      <div class="select-bar--item select-bar--icon icon" @click="showAll">&#xe600;</div>
    </div>
    <div class="song-list--content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Head from '@/components/commonComponents/Head'

  export default {
    name: "SongList",
    components: {
      Head
    },
    data() {
      return {
        data: null,
        headColor: 'black',
        fetchError: [],
        mySongList: ['推荐', '精品'],
        tabList: ['recommend', 'boutique'],
        currentSongListIndex: 0,
        route: 'discovery',
        title: '歌单广场'
      }
    },
    mounted() {
      this.judgeTab();
    },
    methods: {
      showAll: function () {
        this.$router.push({path: '/allSongList'});
      },
      changeTab: function (index) { //改变当前标签
        let self = this;
        self.currentSongListIndex = index;
        self.$router.push(self.tabList[index]);
      },
      judgeCurrent: function (index) {
        return this.currentSongListIndex === index;
      },
      judgeTab: function () {
        let self = this;
        let route = this.$route.fullPath.split('/')[2];
        self.tabList.forEach(function (item, index) {
          if (item === route) {
            self.currentSongListIndex = index;
          }
        })
      }
    }
  }
</script>

<style scoped>
  .song-list--select-bar {
    position: fixed;
    z-index: 100;
    top: -10px;
    display: flex;
    width: 100%;
    margin-top: 80px;
    margin-bottom: 20px;
    padding: 10px 70px 0 20px;
    border-bottom: 1px solid #ebebeb;
    background-color: white;
  }

  .select-bar--item:nth-child(2) {
    color: #e3cd1a;
  }

  .select-bar--item {
    padding: 10px 5px;
    margin: 0 10px;
    font-size: 1rem;
    font-weight: 500;
  }

  .select-bar--current-item {
    color: #ff2922 !important;
    border-bottom: 1px solid #ff2922;
  }

  .select-bar--icon {
    position: fixed;
    top: 85px;
    right: 22px;
    padding: 0;
    margin: 0;
    font-size: 1.8rem;
    font-weight: 300;
  }

  .song-list--content {
    margin-top: 140px;
  }

</style>
