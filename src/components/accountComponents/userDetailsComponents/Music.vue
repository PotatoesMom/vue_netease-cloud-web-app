<template>
  <div class="music-list">
    <div class="loading" v-if="loading">Loading...</div>
    <div v-if="!loading">
      <div class="none" v-if="playlist.length === 0">暂无相关内容</div>
      <div v-if="playlist.length !== 0">
        <div class="music-list--head">
          歌单 <span class="music-list--count">({{length}})</span>
        </div>
        <div class="music--item" v-for="(item, index) in playlist" :key="index">
          <img v-lazy="item.coverImgUrl" :alt="item.coverImgId" class="music--item-image">
          <div class="music--item-remark">
            <div class="music--item-name">{{item.name}}</div>
            <div class="music--item-contains">{{item.trackCount}}首，<span
              v-if="judgeUserId(item)">by {{item.creator.nickname}}，</span> 播放{{item.playCount}}次
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import fetch from "../../../fetch"

  export default {
    name: "Music",
    data: function () {
      return {
        playlist: null,
        fetchError: [],
        length: 0,
        loading: true
      }
    },
    mounted: function () {
      this.fetchData();
    },
    methods: {
      fetchData: function () {
        let self = this;
        fetch.get('/user/playlist?uid=' + self.$route.params.id).then(function (res) {
          self.playlist = res.data.playlist;
          self.length = res.data.playlist.length;
          self.loading = false;
        }).catch(function (err) {
          self.fetchError.push(err);
        })
      },
      judgeUserId: function (item) { //获取用户id
        return item.creator.userId.toString() !== this.$route.params.id;
      }
    }
  }
</script>

<style scoped>
  .none,
  .loading {
    padding-top: 30px;
    text-align: center;
    font-size: 1rem;
    color: #505050;
  }

  .music-list {
    margin-bottom: 90px;
    background-color: white;
  }

  .music-list--head {
    padding: 10px 10px 0 10px;
    font-size: .8rem;
    font-weight: 700;
  }

  .music-list--count {
    font-weight: 100;
  }

  .music--item {
    display: flex;
    justify-items: left;
    margin: 10px;
  }

  .music--item-image {
    height: 60px;
    width: 60px;
    border-radius: 10px;
  }

  .music--item-remark {
    margin-left: 15px;
    margin-right: 15px;
    overflow: hidden;
  }

  .music--item-name {
    padding-top: 10px;
    font-size: 1rem;
    font-weight: 500;
  }

  .music--item-contains {
    padding-top: 5px;
    font-size: .8rem;
    color: #5f5f5f;
  }

  .music--item-name,
  .music--item-contains {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

</style>
