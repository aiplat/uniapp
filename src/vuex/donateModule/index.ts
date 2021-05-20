export default {
  state: {
    donateId: 0
  },
  mutations: {
    SETDONATEID (store:any, data:any) {
      store.donateId = data
    },
  },
  getters: {
    getDonateId (status:any) {
      return status.donateId
    },
  },
  actions: {
    setDonateId ({ commit }:any, data:any) {
      commit('SETDONATEID', data);
    },
  }
}
