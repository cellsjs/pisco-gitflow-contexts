'use strict';

const path = require('path');
const spawnSync = require('child_process').spawnSync;

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

  isBranch(name, isStart, noGitFlow) {
    try {
      const cmd = this._executeSync('git', ['branch', '--all']);
      const lines = cmd.stdout.toString().split('\n');
      let branch = lines.map((line) => line.startsWith('*') ? line : null).filter((e) => e !== null).pop();
      const isGitFlow = lines.filter((line) => line.indexOf('remotes/origin/develop') >= 0 || line.indexOf('remotes/origin/master') >= 0).length === 2;
      branch = branch.substring(2, branch.length);
      return isStart ? branch.startsWith(name) : branch === name && (isGitFlow || noGitFlow);
    } catch (e) {
      return false;
    }
  }

};