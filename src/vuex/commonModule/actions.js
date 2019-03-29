import * as types from './mutations_types';

module.exports = {
  pushToBaidu: ({
    commit,
  }) => {
    commit(types.PUSHTOBAIDU);
  },
  updateLogin: ({
    commit,
  }, index) => {
    commit(types.UPDATELOGIN, index);
  },
};