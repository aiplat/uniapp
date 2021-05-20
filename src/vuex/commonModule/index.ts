export default {
  state: {
    userInfo: null
  },
  mutations: {
    SETUSERINFO (store:any, data:any) {
      store.userInfo = data
    },
  },
  getters: {
    getUserInfo (status:any) {
      return status.userInfo
    },
  },
  actions: {
    setUserInfo ({ commit }:any, data:any) {
      commit('SETUSERINFO', data);
    },
  }
}
