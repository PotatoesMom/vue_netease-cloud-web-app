<template>
  <div class="banner" v-if="bannerData.length !== 0" id="banner">
    <div class="loading" v-if="loading">loading</div>
    <div class="banner--container" :class="{'banner--container-transition': bannerContainerTransition}"
         :style="{'left': containerLeft + 'px'}" @mouseleave="leaveBanner" @mouseenter="enterBanner"
         @touchstart="enterBanner" @touchend="leaveBanner">
      <div v-for="(item,index) in bannerData" :key="index" class="banner--container-image"
           :style="{'width': clientWidth + 'px'}">
        <img :src="item.imageUrl" :alt="item.encodeId">
      </div>
      <div class="banner--container-image" :style="{'width': clientWidth + 'px'}">
        <img :src="firstData.imageUrl" :alt="firstData.encodeId">
      </div>
    </div>
    <div class="banner--dots icon">
      <div class="banner--dot" v-for="i in bannerData.length" :key="i"
           :class="{'banner--dot__checked': i === index + 1}">&#xe654;
      </div>
    </div>
  </div>
</template>

<script>
  import fetch from '../../fetch'

  export default {
    name: "Banner",
    data() {
      return {
        bannerData: [],
        fetchError: [], //错误收集
        firstData: {},
        clientWidth: document.body.clientWidth, //用户可见屏幕宽度
        containerLeft: 0,
        index: 0,
        bannerContainerTransition: true,
        playInterval: null,
        loading: true
      }
    },
    mounted() {
      let self = this;
      self.fetchData();
      self.playBanner();
    },
    methods: {
      fetchData: function () {
        let self = this;
        fetch.get('/banner').then(function (res) {
          self.bannerData = res.data.banners;
          self.firstData = res.data.banners[0];
        }).catch(function (err) {
          self.fetchError = err;
        })
      },
      changeContainerLeft: function () { //通过改变banner内部容器的left值，以实现图片的切换
        let self = this;
        self.bannerContainerTransition = true;
        self.containerLeft -= self.clientWidth;
        self.index++;
        if (Math.abs(self.containerLeft) === self.clientWidth * self.bannerData.length) {
          setTimeout(function () {
            self.bannerContainerTransition = false;
            self.containerLeft = 0;
            self.index = 0;
            setTimeout(function () {
              self.bannerContainerTransition = true;
            }, 0);
          }, 600);
        }
      },
      playBanner: function () { //设定轮播图的轮播时间
        let self = this;
        self.loading = false;
        self.playInterval = setInterval(function () {
          self.changeContainerLeft();
        }, 5000);
      },
      enterBanner: function () {
        let self = this;
        clearInterval(self.playInterval);
      },
      leaveBanner: function () {
        this.playBanner();
      }
    }
  }
</script>

<style scoped>

  .banner {
    position: absolute;
    top: 90px;
    width: 100%;
    overflow: hidden;
  }

  .banner--container {
    position: relative;
    left: 0;
    width: 99999px;
  }

  .banner--container-transition {
    transition: .5s left ease-out;
  }

  /*清除浮动*/
  /*==for IE6/7 Maxthon2==*/
  .banner--container {
    zoom: 1;
  }

  /*==for FF/chrome/opera/IE8==*/
  .banner--container:after {
    clear: both;
    content: '.';
    display: block;
    width: 0;
    height: 0;
    visibility: hidden;
  }

  .banner--container-image {
    float: left;
    padding: 0 20px;
  }

  .banner--container-image img {
    width: 100%;
    border-radius: 1rem;
  }

  .banner--dots {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 25px;
  }

  .banner--dot {
    font-size: 2.5rem;
    padding: 0;
    margin: 0;
    width: 20px;
    height: 20px;
    color: #e1e1e1;
  }

  .banner--dot__checked {
    color: #ff464f;
  }

</style>
