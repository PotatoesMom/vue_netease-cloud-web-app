export default {
  state: {
    songUrl: '',
    currentTime: 0,
    currentStates: 1, //音乐播放状态：1 停止状态，0 播放状态
    loading: true,
    command: '' //指令，（上一曲、下一曲）
  },
  mutations: {
    setSongData(state, data) {
      ({songUrl: state.songUrl, loading: state.loading} = data);
    },
    pause(state, currentTime) {
      state.currentTime = currentTime;
      state.currentStates = 1;
    },
    play(state) {
      state.currentStates = 0;
    },
    initializeAudio(state) {
      state.currentTime = 0;
      state.currentStates = 1;
    },
    nextSong(state) {
      state.command = 'next';
    },
    previousSong(state) {
      state.command = 'previous';
    },
    initializeCommand(state) {
      state.command = '';
    }
  }
}
