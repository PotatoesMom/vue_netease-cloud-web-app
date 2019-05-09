<template>
<!--  精品-->
  <div class="boutique">
    <div class="loading" v-if="loading">loading...</div>
    <div v-if="!loading" class="boutique--container">
      <div class="boutique--item" v-for="(item, index) in data" :key="index"
           :style="{'width': length + 'px'}">
        <div class="item--image" :style="{'width': length + 'px', 'height': length + 'px'}">
          <div class="item--icon icon">&#xe60e;</div>
          <div><img class="image" v-lazy="item.coverImgUrl" :alt="item.coverImgUrl"></div>
        </div>
        <div class="item--description song-list--description">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import fetch from '../../../../fetch'

  export default {
    name: "Boutique",
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
        fetch.get('/top/playlist/highquality').then(function (res) {
          self.data = res.data.playlists;
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

  .boutique {
    margin: 20px;
    padding-bottom: 80px;
  }

  .boutique--container {
    display: flex;
    flex-flow: wrap row;
  }

  .boutique--item {
    margin: 8px 1.66%;
  }

  .item--image,
  .image {
    width: 100%;
    border-radius: 10px;
  }

  .item--icon {
    position: absolute;
    z-index: 10;
    padding: 5px;
    margin-left: -5px;
    margin-top: -5px;
    border-radius: 20px;
    font-size: 1rem;
    font-weight: 900;
    color: white;
    background-color: #e7cf22;
  }

</style>
