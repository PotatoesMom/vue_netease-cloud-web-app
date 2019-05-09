<template>
  <div class="account">
    <!--加载中-->
    <div class="account__loading account__item" v-if="isLoading">
      Loading...
    </div>

    <!--登陆后，个人信息-->
    <div class="account__user--logged-in account__item" v-if="!isLoading && posts !== ''">
      <div class="account__user-message">
        <div class="account__user-message-first" @click="showMoreDetails">
          <div class="account__user-avatar">
            <img :src="userData.avatarUrl" :alt="userData.avatarImgIdStr">
          </div>
          <div class="account__user-nickname">
            {{userData.nickname}}
          </div>
        </div>
        <div class="account__user-message-second">
          <div class="account__user-message-item">
            <div class="account__user-message-data">{{userData.eventCount}}</div>
            <div class="account__user-message-description">动态</div>
          </div>
          <div class="account__user-message-separation account__user-message-item"></div>
          <div class="account__user-message-item">
            <div class="account__user-message-data">{{userData.follows}}</div>
            <div class="account__user-message-description">关注</div>
          </div>
          <div class="account__user-message-separation account__user-message-item"></div>
          <div class="account__user-message-item">
            <div class="account__user-message-data">{{userData.followeds}}</div>
            <div class="account__user-message-description">粉丝</div>
          </div>
          <div class="account__user-message-separation account__user-message-item"></div>
          <div class="account__user-message-item">
            <div class="account__user-message-data account__user-edit-message icon">&#xe64f;</div>
            <div class="account__user-message-description">编辑资料</div>
          </div>
        </div>
      </div>
    </div>

    <!--设置选项-->
    <div class="account__settings" v-if="!isLoading && posts !== ''">
      <!--<div class="account__settings-item">设置</div>-->
      <div class="account__settings-logout account__settings-item" @click="logout">
        退出登录
      </div>
    </div>

    <!--未登陆时，界面界面显示-->
    <div class="account__user--not-logged-in account__item" v-if="posts === ''">
      <div class="account__user-log-description--not-logged-in">登陆畅享更多高品质音乐</div>
      <div>
        <button class="account__user-log-button--not-logged-in" @click="changeLoginStatus">立即登陆</button>
      </div>
    </div>

  </div>
</template>

<script>

  import fetch from '../../fetch'

  export default {
    name: "Account",
    data: function () {
      return {
        posts: "",
        isLoading: true,
        fetchError: [],
        userId: "",
        userData: ""
      }
    },
    mounted: function () {
      this.fetchData();
    },
    watch: {
      userId: function () { //监测到用户已登陆，获取用户登陆信息
        this.getUserData();
      }
    },
    methods: {
      fetchData: function () { //判断用户是否登陆
        let self = this;
        fetch.get('/login/status').then(function (res) {
          self.posts = res.data;
          self.userId = res.data.profile.userId;
          self.isLoading = false;
        }).catch(function (err) {
          self.fetchError.push(err);
          self.isLoading = false;
        });
      },
      getUserData: function () { //获取用户信息
        let self = this;
        fetch.get('/user/detail?uid=' + self.userId).then(function (res) {
          self.userData = res.data.profile;
        }).catch(function (err) {
          self.fetchError.push(err);
        })
      },
      changeLoginStatus: function () {
        this.$router.push('login');
      },
      logout: function () { //退出登陆
        let self = this;
        fetch.get('/logout').then(function () {
          self.$router.go(0);
        }).catch(function (err) {
          self.fetchError.push(err);
        })
      },
      showMoreDetails: function () { //获取更多信息
        let self = this;
        self.$router.push({ path: `/userDetails/${self.userId}` }); //传入用户id
      }
    },
  }
</script>

<style scoped>
  .account {
    font-size: 1.2rem;
    margin-top: 100px;
  }

  .account button {
    border: 0;
    font-size: 1.3rem;
    background: #ffffff;
  }

  .account__loading {
    text-align: center;
  }

  .account__user-message-first,
  .account__user-message-second {
    display: flex;
    margin: 15px;
  }

  .account__user-avatar img {
    width: 60px;
    border-radius: 30px;
  }

  .account__user-nickname {
    padding: 10px 20px;
    font-size: 1.4rem;
    font-weight: 700;
  }

  .account__user-message-second {
    margin: 20px 0;
    justify-content: center;
  }

  .account__user-message-item {
    width: 24%;
  }

  .account__user-message-separation {
    padding: 0;
    width: 0;
    border: 1px solid #f5f5f5;
  }

  .account__user-message-data {
    padding-bottom: 5px;
    font-size: 1.2rem;
    font-weight: 300;
    text-align: center;
  }

  .account__user-message-description {
    font-size: .8rem;
    text-align: center;
  }

  .account__user-edit-message {
    font-size: 1.2rem;
  }

  .account__settings {
    padding-top: 5px;
    border-bottom: 1px solid #ebebeb;
    background-color: #f5f5f5;
  }

  .account__settings-item {
    width: 100%;
    padding: 20px 30px;
    margin-top: 10px;
    font-size: 1.3rem;
    background-color: #ffffff;
  }

  .account__settings-logout {
    text-align: center;
    color: #ff1231;
  }

  .account__user--not-logged-in {
    text-align: center;
  }

  .account__user--not-logged-in div {
    margin: 25px;
  }

  .account__user-log-button--not-logged-in {
    width: 100%;
    padding: 5px;
    border: 1px solid #b9b9b9 !important;
    border-radius: 20px;
  }

</style>
