<template>
  <div class="user-details" :style='{"background-image": "url(" + userData.backgroundUrl + ")"}'>
    <div class="user-details--container" :style="{background: 'rgba(25, 25, 25, '+ backgroundTransparency +')'}">
      <BackHead :color="headColor" :style="{background: 'rgba(25, 25, 25, '+ backgroundTransparency +')'}"
                :route="routeBack"></BackHead>
      <div class="user-details--user">
        <div class="user--avatar">
          <img :src="userData.avatarUrl" :alt="userData.avatarImgId" class="user--avatar-img">
        </div>
        <div class="user--name">
          {{userData.nickname}}
        </div>
        <div class="user--follow">
          <div class="more-detail--follows">关注 {{userData.follows}}</div>
          <div class="more-detail--followeds">粉丝 {{userData.followeds}}</div>
        </div>
      </div>
    </div>
    <div class="user-details--more-details-head"
         :style="{background: 'rgba(25, 25, 25, '+ backgroundTransparency +')'}">
      <div class="user-details--more-details-head-container">
        <div class="more-details--head-item" v-for="(item, index) in detailsHead" :key="index"
             @click="changeItem(index)"
             :class="{'checked': checked[index]}">
          {{item}}
        </div>
      </div>
    </div>
    <div class="user-details--more-details" :style="{'min-height': minHeight + 'px'}">
      <router-view :user-data="userData"></router-view>
    </div>
    <div></div>
  </div>
</template>

<script>
  import fetch from '../../fetch'
  import BackHead from '../commonComponents/BackHead'

  export default {
    name: "UserDetails",
    components: {
      BackHead
    },
    data: function () {
      return {
        userData: {},
        fetchError: [],
        detailsHead: ["音乐", "动态", "关于我"],
        checked: [true, false, false],
        detailsHeadName: ["music", "active", "aboutme"],
        backgroundTransparency: 0.2,
        minHeight: 0,
        headColor: 'white',
        routeBack: 'account'
      }
    },
    mounted: function () {
      let self = this;
      self.minHeight = window.screen.height - 120;
      self.fetchData();

      // 监听滚动事件，并把监听次数设为每秒60次
      //参见 https://wangdoc.com/javascript/events/common.html#scroll-%E4%BA%8B%E4%BB%B6
      (function () {
        let throttle = function (type, name, obj) {
          let object = obj || window;
          let running = false;
          let func = function () {
            if (running) {
              return;
            }
            running = true;
            requestAnimationFrame(function () {
              object.dispatchEvent(new CustomEvent(name));
              running = false;
            });
          };
          object.addEventListener(type, func);
        };
        // 将 scroll 事件重定义为 optimizedScroll 事件
        throttle('scroll', 'optimizedScroll');
      })();
      addEventListener('optimizedScroll', self.changeBackgroundColor);
      this.checkItem();
    },
    methods: {
      fetchData: function () {
        let self = this;
        fetch.get('/user/detail?uid=' + self.$route.params.id).then(function (res) {
          self.userData = res.data.profile;
        }).catch(function (err) {
          self.fetchError.push(err);
        })
      },
      changeItem: function (index) {
        let self = this;
        self.checked = [false, false, false];
        self.checked[index] = true;
        self.$router.push(self.detailsHeadName[index]);
      },
      changeBackgroundColor: function () {
        if (scrollY < 220) {
          this.backgroundTransparency = scrollY * 0.0038 + 0.2;
        }
      },
      checkItem: function () {
        let self = this;
        self.checked = [false, false, false];
        let length = self.$route.path.split("/").length;
        self.detailsHeadName.forEach(function (item, index) {
          if (item === self.$route.path.split("/")[length - 1]) {
            self.checked[index] = true;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .user-details {
    background-size: 100%;
    background-repeat: no-repeat;
  }

  .user-details--container {
    padding-top: 70px;
    background-color: rgba(25, 25, 25, 0.2);
  }

  .user-details--user {
    padding: 20px;
  }

  .user--follow {
    display: flex;
  }

  .user--avatar-img {
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }

  .user--name {
    padding-top: 20px;
    font-size: 1.4rem;
    font-weight: 800;
    color: white;
  }

  .more-detail--follows,
  .more-detail--followeds {
    color: white;
    padding: 10px 10px 10px 0;
  }

  .user-details--more-details-head {
    position: -webkit-sticky;
    position: sticky;
    top: 70px;
    z-index: 2;
    /*margin-top: -20px;*/
  }

  .user-details--more-details-head-container {
    display: flex;
    justify-content: space-around;
    border-radius: 20px 20px 0 0;
    border-bottom: 1px solid #c8c8c8;
    background-color: white;
  }

  .more-details--head-item {
    width: 15%;
    text-align: center;
    font-size: 1rem;
    padding-top: 20px;
    padding-bottom: 10px;
  }

  .user-details--more-details {
    height: calc(100% - 120px);
    background-color: white;
  }

  .checked {
    color: #e30b2e;
    border-bottom: 1px solid #e30b2e;
  }

</style>
