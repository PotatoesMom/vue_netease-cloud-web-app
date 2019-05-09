export default {
  state: {
    playList: [],
    currentPlayId: '',
    currentIndex: 0,
    currentType: 0
  },
  mutations: {
    setPlayListData(state, data) {
      ({
        playList: state.playList,
        currentPlayId: state.currentPlayId,
        currentIndex: state.currentIndex,
        currentType: state.currentType
      } = data);
      //为防止页面刷新，vuex存储的状态信息丢失，将信息转存在localStorage
      localStorage.setItem('playListData', JSON.stringify(state));
    },
    setCurrentIndex(state, data) {
      ({currentIndex: state.currentIndex, currentPlayId: state.currentPlayId} = data);
      localStorage.setItem('playListData', JSON.stringify(state));
    },
    changeCurrentType(state, data) {
      ({currentType: state.currentType} = data);
      localStorage.setItem('playListData', JSON.stringify(state));
    },
  }
}
