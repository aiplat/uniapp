import * as types from './mutations_types';

export default {
  setDonateId: ({ commit }:any, d:any) => {
    commit(types.SETDONATEID, d);
  },
};
