import * as types from './mutations_types';

export default {
  setUserInfo: async ({ commit }:any, d:any) => {
    commit(types.SETUSERINFO, d);
  },
};
