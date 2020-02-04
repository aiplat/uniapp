import * as types from './mutations_types';

export default {
  [types.SETUSERINFO](state:any, d:any) {
    state.userInfo = d;
  },
};
