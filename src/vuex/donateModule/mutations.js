import * as types from './mutations_types';

module.exports = {
  [types.TSONE](state, index) {
    state.dnid = index;
  },
};