<template>
<!--  推荐-->
  <div class="recommend">
    <div class="loading" v-if="loading">loading...</div>
    <div v-if="!loading" class="recommend--container">
      <div class="recommended--item" v-for="(item, index) in data" :key="index"
           :style="{'width': length + 'px'}">
        <div class="item--image" :style="{'width': length + 'px', 'height': length + 'px'}">
          <img class="image" v-lazy="item.picUrl" :alt="item.picUrl"></div>
        <div class="item--description song-list--description">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import fetch from '../../../../fetch'

  export default {
    name: "Recommend",
    data() {
      return {
        data: null,
        fetchError: [],
        length: (document.body.clientWidth - 40) * 0.3,
        loading: true
      }
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData: function () {
        let self = this;
        fetch.get('/personalized').then(function (res) {
          self.data = res.data.result;
          self.loading = false;
        }).then(function (err) {
          self.fetchError.push(err);
        })
      }
    }
  }
</script>

<style scoped>
  .loading {
    width: 100%;
    font-size: 1.5rem;
    text-align: center;
  }

  .recommend {
    margin: 20px;
    padding-bottom: 80px;
  }

  .recommend--container {
    display: flex;
    flex-flow: wrap row;
  }

  .recommended--item {
    margin: 8px 1.66%;
  }

  .item--image,
  .image {
    width: 100%;
    border-radius: 10px;
  }
</style>
