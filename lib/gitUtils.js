'use strict';

const path = require('path');
const spawnSync = require('child_process').spawnSync;
let gitBranchLines;

module.exports = {

  _isWin() {
    return process.env.OS && process.env.OS.indexOf('Windows') >= 0;
  },

  _windowsPatch(cmd, args) {
    if (this._isWin()) {
      return {
        cmd: 'cmd',
        args: ['/c', cmd].concat(args)
      };
    }

    return { cmd: cmd, args: args };
  },

  _executeSync(cmd, args) {
    if (cmd !== 'cmd' && cmd !== 'sh') {
      const patch = this._windowsPatch(cmd, args);
      cmd = patch.cmd;
      args = patch.args;
    }
    return spawnSync(cmd, args);
  },

  _getGitBranchLines() {
    if (!gitBranchLines) {
      const cmd = this._executeSync('git', ['branch', '--all']);
      gitBranchLines = cmd.stdout.toString().split('\n');
    }
    return gitBranchLines;
  },

  isBranch(name, isStart) {
    try {
      const lines = this._getGitBranchLines();
      let branch = lines.map((line) => line.startsWith('*') ? line : null).filter((e) => e !== null).pop();
      branch = branch.substring(2, branch.length);
      return isStart ? branch.startsWith(name) : branch === name;
    } catch (e) {
      return false;
    }
  }

};