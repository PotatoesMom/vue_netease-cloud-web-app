<template>
  <div class="function-bar" :style="{'margin-top': top + 'px'}">
    <div class="function-bar--item" v-for="i in functionBarLength" :key="i">
      <div class="function-bar--icon icon">
        <span class="function-bar--icon-container" v-html="functionBarIcons[i-1]" @click="linkTo(i-1)"></span>
      </div>
      <div class="function-bar--description">{{functionBarDescription[i-1]}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FunctionBar",
    data() {
      return {
        top: document.body.clientWidth * 0.37 + 85,
        functionBarLength: 5,
        functionBarIcons: ['&#xe645;', '&#xe62b;', '&#xe618;', '&#xe608;', '&#xe626;'],
        functionBarDescription: ['每日推荐', '歌单', '排行榜', '电台', '直播'],
        links: ['recommendedDaily', 'songList', 'leaderboard', 'radio', 'liveBroadcast']
      }
    },
    methods: {
      linkTo: function (index) { //跳转到相应功能
        let self = this;
        self.$router.push(self.links[index])
      }
    }
  }
</script>

<style scoped>
  .function-bar {
    width: 100%;
    padding: 10px 10px 20px 10px;
    display: flex;
    border-bottom: 1px solid #ebebeb;
  }

  .function-bar--item {
    width: 20%;
  }

  .function-bar--icon {
    font-size: 1.5rem;
    text-align: center;
  }

  .function-bar--icon-container {
    display: inline-block;
    width: 30px;
    height: 30px;
    padding: 10px 10px 8px 10px;
    border-radius: 30px;
    color: white;
    background-color: #ff3a53;
    box-shadow: inset 8px 0 10px #ff8d82;
  }

  .function-bar--description {
    padding-top: 10px;
    font-size: .7rem;
    color: #535353;
    text-align: center;
  }
</style>
