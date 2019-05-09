<template>
  <div class="recommended-daily" v-if="!loading">
    <div class="recommended-daily--head" :style="{'background-image': 'url(' + background + ')'}">
      <div class="recommended-daily--title">
        每日推荐
      </div>
      <BackHead :color="headColor"></BackHead>
    </div>
    <!--    :style="{'background': url(data[0].album.blurPicUrl)}"-->
    <div class="recommended-daily--content" :style="{'background-image': 'url(' + background + ')'}"> <!--sticky-->
      <div class="content--container"> <!--歌单-->
        <div class="content--container-head" :style="{'background-image': 'url(' + background + ')'}">
          <div class="content-head--container">
            <div class="play-all--icon icon">&#xe6fc;</div>
            <div class="play-all">播放全部</div>
          </div>
        </div>
        <div class="song" v-for="(item,index) in data" :key="index" @click="playSong(item.id, index)">
          <div class="song--pic">
            <img v-lazy="item.album.blurPicUrl" :alt="item.album.id" class="song--pic">
          </div>
          <div class="song--content">
            <div class="song--name">
              {{item.name}}
              <span v-if="item.alias.length" class="song--alia">(<span v-for="alia in item.alias"
                                                                       :key="alia">{{alia}} </span>)</span>
            </div>
            <div class="song--artists">
              <span v-for="(artist, i) in item.artists" :key="artist.id">{{artist.name}}<span
                v-if="item.artists.length > 1 && i !== item.artists.length-1">/</span>
              </span> - {{item.album.name}}
            </div>
          </div>
          <div class="song--play icon">
            &#xe6fc;
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BackHead from '../../commonComponents/BackHead'
  import fetch from '../../../fetch'

  export default {
    name: "RecommendedDaily",
    components: {
      BackHead
    },
    data() {
      return {
        data: null,
        fetchError: [],
        background: '',
        headColor: 'white',
        loading: true
      }
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData: function () {
        let self = this;
        fetch.get('/recommend/songs').then(function (res) {
          self.data = res.data.recommend;
          self.background = res.data.recommend[0].album.blurPicUrl;
          self.loading = false
        }).catch(function (err) {
          self.$router.push('account');
          self.fetchError.push(err);
        })
      },
      playSong: function (id, index) { //播放音乐，跳转到音乐详情界面，将歌单信息commit
        let self = this;
        let currentType = 0;
        if (localStorage.getItem('playListData') !== undefined && JSON.parse(localStorage.getItem('playListData')).currentType !== undefined) {
          currentType = JSON.parse(localStorage.getItem('playListData')).currentType;
        }
        let playListData = {'playList': self.data, 'currentPlayId': id, 'currentIndex': index, 'currentType': currentType};
        self.$store.commit('setPlayListData', playListData);
        self.$router.push('song');
      }
    }
  }
</script>

<style scoped>
  .recommended-daily--head,
  .recommended-daily--content,
  .content--container-head {
    background-size: 100%;
    background-position-y: -90px;
    background-attachment: fixed;
  }

  .recommended-daily--head {
    position: fixed;
    top: 0;
    height: 90px;
    width: 100%;
    border-bottom: none;
  }

  .recommended-daily--title {
    position: fixed;
    top: 0;
    z-index: 200;
    width: 100%;
    padding: 35px;
    font-size: 1.3rem;
    font-weight: 600;
    text-align: center;
    color: white;
    background: linear-gradient(rgba(0, 0, 0, 0.51), rgba(37, 37, 37, 0));
  }

  .recommended-daily--content {
    margin-bottom: 85px;
    padding-top: 150px;
  }

  .content--container {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background: white;
  }

  .content--container-head {
    position: sticky;
    top: 75px;
    font-size: 1.2rem;
    font-weight: 500;
  }

  .content-head--container {
    display: flex;
    padding: 15px 20px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background: white;
  }

  .play-all--icon {
    font-size: 1.8rem;
    font-weight: 300;
    color: #6f6f6f;
  }

  .play-all {
    padding-top: 5px;
    margin-left: 10px;
  }

  .song {
    display: flex;
    width: 100%;
    padding: 0 20px;
    margin: 20px 0;
  }

  .song--pic {
    height: 50px;
    width: 50px;
    border-radius: 5px;
  }

  .song--content {
    width: 75%;
    padding: 5px 15px 5px 10px;
  }

  .song--name,
  .song--artists {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .song--name {
    font-size: 1.2rem;
    font-weight: 400;
  }

  .song--alia {
    color: rgb(125, 125, 125);
  }

  .song--artists {
    padding-top: 5px;
    font-size: .8rem;
    color: rgb(125, 125, 125);
  }

  .song--play {
    font-size: 2rem;
    color: #bbbbbb;
  }

</style>
