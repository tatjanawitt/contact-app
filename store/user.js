/*
export const state = () => ({
  users: []
})

export const mutations = {
  MARK_VIDEO_PLAYED(state, { videoId, user }) {
    let playedVideos = user.playedVideoIds.concat(videoId);
    user.playedVideoIds = playedVideos;
  },
}

export const actions = {
  markVideoPlayed({ commit, rootState }, videoId) {
    if (rootState.auth.loggedIn) {
      commit('MARK_VIDEO_PLAYED', { videoId, user: rootState.auth.user });
      this.$axios.post(`/video_plays`, { videoId });
    }
  },
}

export const getters = {
  playedVideos: (state, getters, rootState, rootGetters) => {
    let user = rootState.auth.user
    return user ? user.playedVideoIds : [];
  },
  videoIsPlayed: (state, getters) => videoId => {
    return getters.playedVideos.includes(videoId)
  }
}
*/
