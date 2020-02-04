import * as types from './mutations_types';

export default {
  setDnid: ({ commit }:any, d:any) => {
    commit(types.SETDNID, d);
  },
};
