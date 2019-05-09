<template>
  <div class="leader-board">
    <Head :title="title"></Head>
    <div class="loading" v-if="loading">loading...</div>
    <div class="leader-board--content" v-if="!loading">
      <div class="official--title title">官方榜</div>
      <div class="official--content">
        <div class="official--item" v-for="(item, index) in data.list.slice(0, 4)" :key="index">
          <div class="official-item--image">
            <img v-lazy="item.coverImgUrl" :alt="item.coverImgUrl">
            <span class="update">{{item.updateFrequency}}</span>
          </div>
          <div class="official-item--tracks">
            <div class="item--track" v-for="(track, i) in item.tracks" :key="track.first">
              {{i+1}}. {{track.first}}-{{track.second}}
            </div>
          </div>
        </div>
      </div>
      <div class="more--title title">更多榜单</div>
      <div class="more--content">
        <div class="more--item" v-for="(item, index) in data.list.slice(4)" :key="index">
          <div class="more-item--image">
            <img v-lazy="item.coverImgUrl" :alt="item.coverImgUrl">
            <span class="update">{{item.updateFrequency}}</span>
          </div>
          <div class="item--name">{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import fetch from '../../../fetch'
  import Head from '@/components/commonComponents/Head'

  export default {
    name: "Leaderboard",
    components: {
      Head
    },
    data() {
      return {
        data: null,
        fetchError: [],
        title: '排行榜',
        loading: true
      }
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData: function () {
        let self = this;
        fetch.get('/toplist/detail').then(function (res) {
          self.data = res.data;
          self.loading = false;
        }).catch(function (err) {
          self.fetchError.push(err);
        })
      }
    }
  }
</script>

<style scoped>
  .leader-board {
    width: 100%;
    padding-bottom: 70px;
  }

  .loading {
    width: 100%;
    font-size: 1.5rem;
    text-align: center;
  }

  .leader-board--content {
    margin-top: 80px;
    padding: 10px 20px;
  }

  .official--content {
    width: 100%;
  }

  .title {
    font-size: 1.3rem;
    font-weight: 500;
    margin: 15px 0;
  }

  .official--item,
  .more--item {
    margin-bottom: 10px;
  }

  .official--item {
    display: flex;
    justify-content: space-between;
  }

  .official-item--image {
    width: 30%;
  }

  .official-item--image img,
  .more-item--image img {
    width: 100%;
    border-radius: 10px;
  }

  .update {
    position: absolute;
    margin-top: 21.5%;
    margin-left: -24.5%;
    color: white;
  }

  .official-item--tracks {
    width: 64%;
    padding: 5px 10px 10px 0;
  }

  .item--track {
    width: 100%;
    margin: 10px 0;
    font-size: 1rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .more--title {
    margin-top: 30px;
  }

  .more--content {
    display: flex;
    flex-flow: wrap row;
  }

  .more--item {
    width: 30%;
    margin: 1.65%;
  }

  .more-item--image {
    width: 100%;
  }

</style>
