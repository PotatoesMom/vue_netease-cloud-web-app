<template>
  <div class="about">
    <div class="loading" v-if="loading">Loading...</div>
    <div>
      <div class="personal-information about--item">
        个人信息
        <div class="personal-information--sex personal-information--item">
          性别：
          <span v-if="data.gender === 1">男</span>
          <span v-if="data.gender === 2">女</span>
        </div>
        <div class="personal-information--age personal-information--item">生日：{{new
          Date(data.birthday).toLocaleDateString()}}
        </div>
        <div class="personal-information--area personal-information--item">地区：{{area}}</div>
      </div>
      <div class="personal-profile about--item">
        个人简介
        <div class="personal-profile--content personal-profile--item">
          {{data.signature}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import city from '../../../assets/data/cityCode'

  export default {
    name: "AboutMe",
    props: ['userData'],
    data() {
      return {
        area: '',
        data: this.userData,
        loading: true
      }
    },
    mounted() {
      this.getCity();
    },
    methods: {
      getCity: function () { //通过城市代码获取城市信息
        let self = this;
        for (let i = 0; i < city.length; i++) {
          if (city[i].code === self.data.province.toString()) {
            self.area += city[i].name + " ";
            let children = city[i].children;
            for (let j = 0; j < children.length; j++) {
              if (children[j].code === self.data.city.toString()) {
                self.area += children[j].name;
                break;
              }
            }
            break;
          }
        }
        self.loading = false;
      }
    }
  }
</script>

<style scoped>
  .loading {
    padding-top: 30px;
    text-align: center;
    font-size: 1rem;
    color: #505050;
  }

  .about {
    padding: 30px 20px 20px 20px;
    margin-bottom: 70px;
    background-color: white;
  }

  .about--item {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 30px;
  }

  .personal-information--item,
  .personal-profile--item {
    font-size: .8rem;
    font-weight: normal;
    color: #5f5f5f;
    padding-top: 10px;
  }

</style>
