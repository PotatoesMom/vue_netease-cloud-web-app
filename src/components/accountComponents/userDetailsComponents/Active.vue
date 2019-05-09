<template>
  <div class="active">
    <div class="loading" v-if="loading">Loading...</div>
    <div v-if="!loading">
      <div class="none" v-if="!events">暂无相关动态</div>
      <div class="active--item" v-for="(item, index) in events" :key="index">
        <div class="item--head">
          <img v-lazy="item.user.avatarUrl" :alt="item.user.avatarImgIdStr" class="active-item--avatar">
          <div>
            <div>
              <span class="item-head--name">{{item.user.nickname}}</span>
              <span class="item-head--share">分享{{type[item.type]}}:</span>
            </div>
            <div>
              <span class="item-head--time">{{(new Date(item.showTime)).toLocaleString()}}</span>
            </div>
          </div>
        </div>
        <div class="item--msg">
          {{json[index].msg}}
        </div>
        <div class="item&#45;&#45;content"> <!-- 只添加了两种分享类型，其他类型还未添加-->
          <!--分享类型为mv-->
          <div class="content--mv" v-if="json[index].mv">
            <img v-lazy="json[index].mv.imgurl16v9" :alt="json[index].mv.id" class="content--mv-pic">
            <div class="content--mv-play">
              <div class="mv-play--name">{{json[index].mv.name}}</div>
              <div class="mv-play--icon icon">
                &#xe71c;
              </div>
            </div>
          </div>
          <!--分享类型为歌曲-->
          <div class="content--song" v-if="json[index].song">
            <div class="content--song-pic">
              <img v-lazy="json[index].song.album.blurPicUrl" :alt="json[index].song.album.picId"
                   class="content--song-pic">
            </div>
            <div class="content--song-play-icon icon">&#xe6fc;</div>
            <div class="content--song-play">
              <div class="song-play--name">{{json[index].song.name}}({{json[index].song.alias}})</div>
              <div class="song-play--artists"><span v-for="artist in json[index].song.artists" :key="artist.id">{{artist.name}} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import fetch from '../../../fetch'

  export default {
    name: "Active",
    data: function f() {
      return {
        events: null,
        fetchError: [],
        type: { //只添加了两种分享类型
          18: "单曲",
          21: "视频"
        },
        json: [],
        loading: true
      }
    },
    mounted: function () {
      this.fetchData();
    },
    methods: {
      fetchData: function () {
        let self = this;
        fetch.get('/user/event?uid=' + self.$route.params.id).then(function (res) {
          self.events = res.data.events;
          for (let i = 0; i < res.data.events.length; i++) {
            self.json.push(JSON.parse(res.data.events[i].json));
          }
          self.loading = false;
        }).catch(function (err) {
          self.fetchError.push(err);
        })
      }
    },
  }
</script>

<style scoped>
  .active {
    margin-bottom: 70px;
    background-color: white;
  }

  .none,
  .loading {
    padding-top: 30px;
    text-align: center;
    font-size: 1rem;
    color: #505050;
  }

  .active--item {
    padding: 20px;
    border-bottom: 1px solid #e6e6e6;
  }

  .item--head {
    display: flex;
  }

  .item--head div {
    padding-top: 5px;
  }

  .active-item--avatar {
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }

  .item-head--name {
    margin: 15px;
    font-size: .9rem;
    color: #3a58b4;
  }

  .item-head--share {
    color: #7d7d7d;
    font-size: .9rem;
  }

  .item-head--time {
    margin: 15px;
    color: #878787;
    font-size: .5rem;
  }

  .item--msg {
    margin: 20px;
    font-size: 1rem;
  }

  .item--content {
    margin: 20px 20px 10px 20px;
    border-radius: 10px;
  }

  .content--mv {
    position: relative;
    z-index: 0;
  }

  .content--mv-pic {
    display: block;
    width: 100%;
    border-radius: 10px;
  }

  .content--mv-play {
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    z-index: 1;
    border-radius: 10px;
    background: rgba(55, 55, 55, 0.2);
  }

  .mv-play--icon {
    font-size: 2.5rem;
    color: white;
    text-align: center;
  }

  .mv-play--name {
    position: absolute;
    top: 0;
    left: 0;
    color: white;
    padding: 10px;
  }

  .content--song {
    position: relative;
    display: flex;
    padding: 10px;
    border-radius: 10px;
    background: #f0f0f0;
  }

  .content--song-pic {
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 10px;
  }

  .content--song-play-icon {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 50px;
    height: 50px;
    padding-top: 12px;
    font-size: 1.5rem;
    border-radius: 10px;
    text-align: center;
    color: white;
    background: rgba(55, 55, 55, 0.2);
  }

  .content--song-play {
    padding: 10px;
    overflow: hidden;
  }

  .song-play--name {
    width: 100%;
    font-size: .9rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .song-play--artists {
    padding-top: 5px;
    color: #6e6e6e;
  }
</style>
