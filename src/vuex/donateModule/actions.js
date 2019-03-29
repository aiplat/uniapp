import * as types from './mutations_types';

module.exports = {
  tsone: ({
    commit,
  }, index) => {
    commit(types.TSONE, index);
  },
};