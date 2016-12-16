'use strict';

const path = require('path');

module.exports = {

  isBranch(name, isStart) {
    try {
      const dir = path.basename(process.cwd());
      return isStart ? dir.startsWith(name) : dir === name;
    } catch (e) {
      return false;
    }
  }

};