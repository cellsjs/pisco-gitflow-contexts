'use strict';

const git = require('../../lib/gitUtils');

module.exports = {

  check() {
    return git.isBranch('master', false, true);
  }

};