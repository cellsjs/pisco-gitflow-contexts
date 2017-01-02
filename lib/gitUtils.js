'use strict';

const path = require('path');
const spawnSync = require('child_process').spawnSync;
const gitflowBranches = ['remotes/origin/master', 'remotes/origin/develop'];
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

  isBranch(name, isStart, noGitFlow) {
    try {
      const lines = this._getGitBranchLines();
      let branch = lines.map((line) => line.startsWith('*') ? line : null).filter((e) => e !== null).pop();
      let isGitFlow = lines.filter((line) => gitflowBranches.indexOf(line.trim()) >= 0).length === 2;
      branch = branch.substring(2, branch.length);
      isGitFlow = noGitFlow ? !isGitFlow : isGitFlow;
      return isStart ? branch.startsWith(name) : branch === name && isGitFlow;
    } catch (e) {
      return false;
    }
  }

};