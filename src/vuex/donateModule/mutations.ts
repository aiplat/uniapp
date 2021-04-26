import * as types from './mutations_types';

export default {
  [types.SETDONATEID](state:any, data:any) {
    state.donateId = data;
  },
};
