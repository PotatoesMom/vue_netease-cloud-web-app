<template>
<!--  功能未实现-->
  <div class="search-bar" :class="{'search-bar__searched': isFocus}">
    <div class="search-bar__container">
      <div class="search-bar__icon icon">&#xe64c;</div>
      <label>
        <input type="search" class="search-bar__search" @focus="runSearch()" :value="value">
      </label>
    </div>
    <div class="search-bar__del" v-if="isFocus" @click="resetSearchBar()">取消</div>
  </div>
</template>

<script>
  export default {
    name: "SearchBar",
    data: function () {
      return {
        isFocus: false,
        value: ""
      }
    },
    methods: {
      runSearch: function () {
        this.isFocus = !this.isFocus;
      },
      resetSearchBar: function () {
        this.isFocus = !this.isFocus;
        this.value = "";
      }
    }
  }
</script>

<style scoped>
  .search-bar {
    position: static;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 20px;
  }

  .search-bar__container {
    display: flex;
    justify-content: center;
    align-content: center;
    width: 80%;
    height: 45px;
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 20px;
  }

  .search-bar__icon {
    width: 15%;
    font-size: 2em;
    color: #737373;
    padding-left: 10px;
  }

  label {
    width: 85%;
  }

  .search-bar__search {
    width: 100%;
    height: 100%;
    display: inline;
    font-size: 1.5em;
    color: #737373;
    background-color: #f5f5f5;
    border: none;
  }

  .search-bar__del {
    width: 20%;
    text-align: center;
    font-size: 1.5em;
    padding: 15px 0;
  }

  .search-bar__searched {
    position: fixed;
    z-index: 1000;
    height: 100%;
    background-color: white;
  }

</style>
