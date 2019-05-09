<template>
  <div id="navigation-bar">
    <ul class="navigation-bar-container">
      <li v-for="(navigationBarItem, index) in navigationBarItems" :key="index" class="navigation-bar__item"
          :class="{'navigation-bar__item--clicked': current[index]}">
        <div class="navigation-bar__item-icon icon" @click="changeTab(index)"><span v-html="navigationBarItem.icon"></span>
        </div>
        <div class="navigation-bar__item-description">{{ navigationBarItem.description }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "BottomNavigationBar",
    data: function () {
      return {
        "navigationBarItems": [{"icon": "&#xe643;", "description": "发现"}, {
          "icon": "&#xe64d;",
          "description": "视频"
        }, {"icon": "&#xe642;", "description": "我的"}, {"icon": "&#xe64e;", "description": "朋友"}, {
          "icon": "&#xe64b;",
          "description": "账户"
        }],
        "current": [false, false, false, false, false],
        "routes": ["discovery", "video", "mine", "friends", "account"]
      }
    },
    watch: {
      '$route': function () {
        let path = this.$route.path.slice(1);
        let self = this;
        self.routes.forEach(function (value, index) {
          if (value === path) {
            self.setCurrentTab(self, index);
            return null;
          }
        })
      }
    },
    methods: {
      setCurrentTab: function (self, index) {
        self.current = [false, false, false, false, false];
        self.current[index] = true;
      },
      changeTab: function (index) {
        this.setCurrentTab(this, index);
        this.$router.push({ path: '/' + this.routes[index]});
      }
    }
  }
</script>

<style scoped>

  /*
  声明顺序：
  Positioning
  Box model
  Typographic
  Visual
  */

  #navigation-bar {
    position: fixed;
    z-index: 100;
    bottom: 0;
    width: 100%;
    background-color: rgba(245, 245, 245, 0.97);
  }

  .navigation-bar-container {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin: 10px 0 5px 0;
  }

  .navigation-bar__item {
    width: 25%;
  }

  .navigation-bar__item-icon,
  .navigation-bar__item-description {
    font-size: 1em;
    text-align: center;
    margin: 5px 0;
  }

  .navigation-bar__item-icon {
    width: 34px;
    height: 34px;
    font-size: 22px;
    padding: 5px 4px;
    margin: auto;
    border-radius: 17px;
  }

  .navigation-bar__item--clicked .navigation-bar__item-icon {
    color: white;
    background-color: #ff0b2f;
    box-shadow: inset 8px 0 10px #ff7d6e;
  }

  .navigation-bar__item--clicked .navigation-bar__item-description {
    color: #e30b2e;
  }

</style>
