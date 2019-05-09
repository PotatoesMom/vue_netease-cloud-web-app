<template>
  <div class="song" :style="{'height': height + 'px'}"
       v-if="playListDetails.playList[playListDetails.currentIndex].album !== undefined">
    <div class="song--background"
         :style="{'background-image': 'url(' + playListDetails.playList[playListDetails.currentIndex].album.blurPicUrl + ')'}">
    </div>
    <div class="song--container">
      <BackHead :color="headColor"></BackHead>
      <div class="song--head">
        <div class="song--name">{{playListDetails.playList[playListDetails.currentIndex].name}}</div>
        <div class="song--artists">
          <span v-for="(artist, i) in playListDetails.playList[playListDetails.currentIndex].artists" :key="artist.id">{{artist.name}}<span
            v-if="playListDetails.playList[playListDetails.currentIndex].artists.length > 1 && i !== playListDetails.playList[playListDetails.currentIndex].artists.length-1">/</span>
              </span>{{playListDetails.playList[playListDetails.currentIndex].length}}
        </div>
      </div>
      <div ref="song">
        <div class="song--image" :style="{'margin-top': height * 0.09 + 'px', 'margin-bottom': height * 0.09 + 'px'}">
          <div class="image"
               :style="{'background-image': 'url(' + playListDetails.playList[playListDetails.currentIndex].album.blurPicUrl + ')', 'width': length * 0.7 + 'px', 'height': length * 0.7 + 'px'}">
          </div>
        </div>
        <div class="song--audio" v-if="songDetails !== undefined">
          <div class="audio--progress">
            <div class="song--time">{{timeStr}}</div>
            <div class="audio--bar">
              <div class="audio--bar__playing icon" :style="{'left': barWidth + '%'}">&#xe654;</div>
              <div class="audio--bar__played" :style="{'width': barWidth + '%'}"></div>
            </div>
            <div class="song--time">
              {{getTime(playListDetails.playList[playListDetails.currentIndex].bMusic.playTime)}}
            </div>
          </div>
          <div class="audio--bottom">
            <div class="audio--play-type icon" @click="changeType" v-html="type[playListDetails.currentType]"></div>
            <div class="audio--play-previous icon" @click="previousSong">&#xe664;</div>
            <div class="audio--play icon" v-html="playStates[songDetails.currentStates]" @click="changeStates"></div>
            <div class="audio--play-next icon" @click="nextSong">&#xe663;</div>
            <div class="audio--play-list icon">&#xe665;</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import fetch from '../fetch'
  import BackHead from './commonComponents/BackHead'

  export default {
    name: "Song",
    components: {
      BackHead
    },
    data() {
      return {
        fetchError: [],  //错误收集
        headColor: 'white', //设定 BackHead 组件的标题颜色
        height: document.body.clientHeight, //为
        length: document.body.clientWidth,
        type: ['&#xe667;', '&#xe66a;', '&#xe668;'],
        playStates: ['&#xe666;', '&#xe669;'],
        time: 0, //音频已播放的时长
        totalTime: 0, //音频总时长
        timeStr: '00:00', //对音频已播放时长格式化显示
        barWidth: 0, //设定音频显示栏的宽度
        audio: {}, //获取音频对象
      }
    },
    computed: {
      playListDetails() { //获取播放列表信息
        let self = this;
        return self.$store.state.playList;
      },
      songDetails() {  //获取音频内容信息
        let self = this;
        return self.$store.state.song;
      }
    },
    mounted() {
      let self = this;
      self.getSongInfo();
    },
    watch: {
      'songDetails.songUrl': function () { //监听音频自资源，资源改变，初始化显示内容，并重新监听audio
        let self = this;
        self.initializeAudio();
        self.getAudioInfo();
      }
    },
    methods: {
      getSongInfo: function () { //获取歌曲显示信息
        let self = this;
        let playListData = JSON.parse(localStorage.getItem('playListData'));
        self.$store.commit('setPlayListData', playListData);
        self.time = self.songDetails.currentTime;
        self.timeStr = self.formatTime(Math.floor(self.time / 60).toString(), (self.time % 60).toString());
        self.barWidth = (self.time - 1) / self.totalTime * 100;
        self.getAudioInfo();
      },
      getAudioInfo: function () { //获取音频资源
        let self = this;
        if (self.songDetails.songUrl) {
          self.audio = document.querySelector('audio');
          self.addAudioEventListener();
        }
      },
      addAudioEventListener: function () { //监听播放时间
        let self = this;
        self.audio.addEventListener('timeupdate', function () {
          self.time = Math.ceil(self.audio.currentTime);
          self.barWidth = (self.time - 1) / self.totalTime * 100;
          if (self.time > self.totalTime) {
            self.timeStr = self.formatTime(Math.floor(self.totalTime / 60).toString(), (self.totalTime % 60).toString());
          } else {
            self.timeStr = self.formatTime(Math.floor(self.time / 60).toString(), (self.time % 60).toString());
          }
        });
      },
      initializeAudio: function () { //初始化歌曲显示信息
        this.time = 0;
        this.timeStr = '00:00';
        this.barWidth = 0;
        this.$store.commit('initializeAudio');
        this.$store.commit('initializeCommand');
      },
      getTime: function (time) {
        let date = new Date(time);
        this.totalTime = date.getMinutes() * 60 + date.getSeconds();
        return this.formatTime(date.getMinutes().toString(), date.getSeconds().toString());
      },
      changeType: function () { //改变播放类型 （列表循环，单曲循环，随机播放--未实现）
        let self = this;
        let currentType = self.playListDetails.currentType;
        document.querySelector('audio').loop = currentType === 0; //设置是否循环歌曲
        if (currentType === 2) {
          currentType = 0;
        } else {
          currentType += 1;
        }
        self.$store.commit('changeCurrentType', {currentType: currentType});
      },
      changeStates: function () { //改变音乐播放状态 （停止 <-> 播放）
        let self = this;
        let currentStates = self.songDetails.currentStates;
        if (currentStates === 0) {
          self.$store.commit('pause', self.time);
          self.audio.pause();
        } else {
          self.$store.commit('play');
          self.audio.play();
          self.audio.currentTime = self.songDetails.currentTime;
        }
      },
      formatTime: function (minutes, seconds) { //将时间格式化显示
        return minutes.padStart(2, '00') + ':' + seconds.padStart(2, '00');
      },
      previousSong: function () { //播放上一曲
        let self = this;
        self.$store.commit('previousSong');
      },
      nextSong: function () { //播放下一曲
        let self = this;
        self.$store.commit('nextSong');
      }
    }
  }
</script>

<style scoped>
  .song {
    position: fixed;
    width: 100%;
    z-index: 150;
    background-color: white;
  }

  .song--background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;
    filter: blur(3rem);
  }

  .song--container {
    position: relative;
    height: 100%;
    background-color: rgba(40, 40, 40, 0.45);
  }

  .song--head {
    height: 90px;
    padding-top: 27px;
    font-size: 1.2rem;
    text-align: center;
    color: white;
  }

  .song--name {
    display: inline-block;
    width: 50%;
  }

  .song--artists {
    padding-top: 3px;
    font-size: .8rem;
    color: rgba(255, 255, 255, 0.61);
  }

  .song--image {
    text-align: center;
  }

  .image {
    display: inline-block;
    border-radius: 300px;
    background-size: cover;
  }

  .song--audio {
    width: 100%;
    padding: 0 10px;
  }

  .audio--bottom,
  .audio--progress {
    display: flex;
    justify-content: space-around;
    text-align: center;
  }

  .song--time {
    width: 10%;
    color: rgba(255, 255, 255, 0.51);
  }

  .audio--bar {
    position: relative;
    width: 65%;
    height: 2px;
    margin-top: 5px;
    background-color: rgba(255, 255, 255, 0.31);
  }

  .audio--bar__played {
    height: 2px;
    width: 0;
    background-color: rgba(255, 255, 255, 0.8);
  }

  .audio--bar__playing {
    position: absolute;
    left: 0;
    top: -30px;
    height: 30px !important;
    width: 30px !important;
    padding: 0 !important;
    margin-left: -25px;
    font-size: 3rem !important;
    color: rgba(255, 255, 255, 0.8) !important;
  }

  .icon {
    flex: auto;
    width: 15%;
    padding-top: 20px;
    font-size: 2rem;
    color: #d7d7d7;
  }

  .audio--play {
    padding-top: 0;
    font-size: 4rem;
  }

</style>
