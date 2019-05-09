<template>
  <!--登陆界面-->
  <div class="account__user--log-in">
    <div class="log-in-page__button--close">
      <BackHead></BackHead>
    </div>
    <form class="log-in-page__form" @submit.prevent="login">
      <label class="log-in-page__form-username">
        <input type="text" v-model="user" class="log-in-page__form-item" placeholder="手机/邮箱" required
               autocomplete="username">
      </label>
      <label class="log-in-page__form-password">
        <input type="password" v-model="password" class="log-in-page__form-item" placeholder="密码" required
               autocomplete="current-password">
      </label>
      <div class="log-in-page__form-submit">
        <button class="log-in-page__form-submit-button">登陆</button>
      </div>
    </form>
    <div class="log-in-page__log-in-method">
      <div class="log-in-page__phone-log-in log-in-page__log-in-method-item">
        <div>
          <button class="log-in-page__phone-log-in-button log-in-page__button icon"
                  :class="{'log-in-page__button---choose': loginMethod}" @click="changeLoginMethod(true)">&#xe66b;
          </button>
        </div>
        <div :class="{'log-in-page__button---choose': loginMethod}">手机登陆</div>
      </div>
      <div class="log-in-page__email-log-in log-in-page__log-in-method-item">
        <div>
          <button class="log-in-page__email-log-in-button log-in-page__button icon"
                  :class="{'log-in-page__button---choose': !loginMethod}" @click="changeLoginMethod(false)">&#xe62e;
          </button>
        </div>
        <div :class="{'log-in-page__button---choose': !loginMethod}">邮箱登陆</div>
      </div>
    </div>
    <transition name="fade">
      <div class="log-in-page__alert" v-if="loginError">
        登陆错误
      </div>
    </transition>
  </div>
</template>

<script>
  import fetch from '../../fetch'
  import BackHead from '../commonComponents/BackHead'

  export default {
    name: "Login",
    components: {
      BackHead
    },
    data: function () {
      return {
        user: "",
        password: "",
        loginMethod: true, //登陆方式：true=>手机登陆；false=>邮箱登陆
        fetchError: [],
        loginError: false
      }
    },
    methods: {
      login: function () {
        let self = this;
        let url = "";
        if (self.loginMethod) {
          url = '/login/cellphone?phone=' + self.user + '&password=' + self.password;
        } else {
          url = '/login?email=' + self.user + '&password=' + self.password;
        }
        fetch.get(url).then(function (res) {
          self.posts = res;
          self.$router.push({path: '/account'});
        }).catch(function (err) {
          self.fetchError.push(err);
          self.loginError = true;
          setTimeout(function () {
            self.loginError = false;
          }, 1500)
        })
      },
      changeLoginMethod: function (value) {
        this.loginMethod = value;
      }
    }
  }
</script>

<style scoped>
  .account__user--log-in {
    position: fixed;
    top: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: #ffffff;
  }

  .account__user--log-in button {
    border: 0;
    background-color: #ffffff;
  }

  .log-in-page__button {
    font-size: 16px;
  }

  .log-in-page__button--close {
    padding: 40px 0;
  }

  .log-in-page__form label {
    display: block;
    width: 100%;
    text-align: center;
  }

  .log-in-page__form-item {
    width: 80%;
    height: 50px;
    margin: 10px 0;
    padding: 20px;
    border: 1px solid #b9b9b9;
    border-radius: 25px;
    font-size: 1.2rem;
  }

  .log-in-page__form-submit {
    text-align: center;
  }

  .log-in-page__form-submit-button {
    width: 80%;
    height: 50px;
    margin: 20px 0;
    color: white;
    background-color: #ff0b2f !important;
    box-shadow: inset 20px 0 40px #ff7d6e;
    border: 1px solid #ff7d6e !important;
    border-radius: 25px;
  }

  .log-in-page__log-in-method {
    display: flex;
    justify-content: center;
  }

  .log-in-page__log-in-method-item {
    margin: 20px;
    font-size: .8rem;
  }

  .log-in-page__log-in-method-item div {
    margin-bottom: 10px;
    color: #737373;
    text-align: center;
  }

  .log-in-page__log-in-method-item .log-in-page__button {
    padding: 10px;
    border: 1px solid #c3c3c3;
    border-radius: 30px;
  }

  button.log-in-page__button---choose {
    color: white;
    background-color: #ff0b2f !important;
    box-shadow: inset 5px 0 10px #ff7d6e;
    border: 1px solid #ff7d6e !important;
  }

  div.log-in-page__button---choose {
    color: #ff0b2f;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

  .log-in-page__alert {
    position: fixed;
    top: 20%;
    left: 10%;
    width: 80%;
    height: 20%;
    padding-top: 50px;
    border-radius: 30px;
    font-size: 1.3rem;
    font-weight: 800;
    text-align: center;
    color: rgba(75, 75, 75, 0.85);
    background-color: rgba(255, 255, 255, 0.9)
  }

</style>
