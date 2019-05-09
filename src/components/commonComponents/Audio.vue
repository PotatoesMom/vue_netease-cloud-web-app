<template>
  <audio :src="songUrl" ref="audio" v-if="!loading"></audio>
</template>

<script>
  import fetch from '../../fetch'

  export default {
    name: "Audio",
    props: ['playId'],
    data() {
      return {
        songUrl: '',
        loading: true,
        fetchError: [],
        endFlag: 0
      }
    },
    computed: {
      id() {
        return this.playId;
      },
      command() {
        return this.$store.state.song.command;
      },
      playListDetails() {
        let self = this;
        return self.$store.state.playList;
      },
      songDetails() {
        let self = this;
        return self.$store.state.song;
      }
    },
    watch: {
      'id': function () { //id改变，重新加载音频资源
        if (this.id !== '' || this.id !== undefined) {
          this.getSongSrc();
        }
      },
      'command': function () { //通过监听command的改变，执行播放上一曲、下一曲的指令
        if (this.command === 'next') {
          this.nextSong();
        } else if (this.command === 'previous') {
          this.previousSong();
        }
      }
    },
    methods: {
      getSongSrc: function () {
        let self = this;

        let playListData = JSON.parse(localStorage.getItem('playListData'));
        self.$store.commit('setPlayListData', playListData);

        fetch.get('/song/url?id=' + self.id).then(function (res) {
          self.songUrl = res.data.data[0].url;
          if (self.songUrl === undefined) {
            self.songUrl = 'https://music.163.com/song/media/outer/url?id=' + self.id + '.mp3';
          }
          self.$store.commit('setSongData', {'songUrl': res.data.data[0].url, 'loading': false});

          self.$nextTick(function () { //等待audio渲染完毕
            self.endFlag = 0; //在音乐播放完成后，只执行一次回调函数

            self.changeStates(); //当音频获取到资源，并加载完成。执行播放

            self.$refs.audio.addEventListener('ended', function () {
              if (self.endFlag === 0) {
                self.changeStates(); //当音乐播放完成，将音频播放状态改为停止状态
                let currentType = self.playListDetails.currentType;
                if (currentType === 0) {
                  self.nextSong();
                  self.nextSong();
                }
                self.endFlag += 1;
              }
            })
          });
          self.loading = false;
        }).catch(function (err) {
          self.fetchError.push(err);
        })
      },
      previousSong: function () { //播放上一首歌曲
        let self = this;
        self.changeStates();
        let currentIndex = self.playListDetails.currentIndex;
        let playList = self.playListDetails.playList;
        if (currentIndex === 0) {
          currentIndex = self.playListDetails.length - 1;
        } else {
          currentIndex -= 1;
        }
        self.$store.commit('setCurrentIndex', {currentIndex: currentIndex, currentPlayId: playList[currentIndex].id});
      },
      nextSong: function () { //播放下以一首歌曲
        let self = this;
        let currentIndex = self.playListDetails.currentIndex;
        let playList = self.playListDetails.playList;
        let length = self.playListDetails.length;
        if (currentIndex === length - 1) {
          currentIndex = 0;
        } else {
          currentIndex += 1;
        }
        self.$store.commit('setCurrentIndex', {currentIndex: currentIndex, currentPlayId: playList[currentIndex].id});
      },
      changeStates: function () { //改变音乐播放状态 （停止 <-> 播放）
        let self = this;
        let currentStates = self.songDetails.currentStates;
        if (currentStates === 0) {
          self.$store.commit('pause', '0');
          self.$refs.audio.pause();
        } else {
          self.$store.commit('play');
          self.$refs.audio.play();
          self.$refs.audio.currentTime = self.songDetails.currentTime;
        }
      },
    }
  }
</script>

<style scoped>

</style>
