'use strict';

const git = require('../../lib/gitUtils');

module.exports = {

  check(noCache) {
    return git.isBranch('consolidation', true, noCache);
  }

};
