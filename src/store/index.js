import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

import playList from './playList'
import song from './song'

export default new vuex.Store({
  modules: {
    playList: playList,
    song: song
  }
})
