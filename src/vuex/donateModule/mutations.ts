import * as types from './mutations_types';

export default {
  [types.SETDNID](state:any, d:any) {
    state.dnid = d;
  },
};
