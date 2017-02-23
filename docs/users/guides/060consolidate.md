---
title: Consolidate dependencies of master
layout: doc_page.html
---

# Consolidate dependencies of master

Semver dependencies could vary between to install executions due to patch/fix auto update skill of semver. Sometimes this is useful for developers and integrators in order to get all patches and fixes from all its dependencies. But sometimes for C.I. purposes is more a problem than a solution.

In C.I. process is mandatory to fix all the versions of dependencies once you test one application. To do this we have two mechanism.

- 1. Shrinkwrap off tested installation or order to repeat allways same groups of dependencies whenever you install your app. This is made by command finish every time creating a file called _(bower/npm)_shrinkwrap.json.
- 2. When install this app our tool copy this file into the right one (npm_shrinkwrap.json/bower.json) and make the installation with it all the time.
- 3. If our software component is a dependency of another semver still works when our software component are needed as a dependency. So bower.json or package.json inside are with ^ or ~ semver methods...

## Consolidation process

With this process is possible to update and test any software component that has dependencies keeping the shrinkwrap file updated all the time.

This flow do this steps:

- 1. start one branch
- 2. install npm or bower -F
- 3. execute shrinkwrap both (bower is a local tool developed by QPA team)
- 4. if there is any update execute validate
- 5. if everything is OK, increase one hotfix version to master (from x.y.z -> x.y.z-0)
- 6. if there is not any update do not do anything finish with NOT BUILT state.

```
➜  cells-icons git:(master) pisco consolidate
[17:18:42] Execution contexts: [ master, component ]
[17:18:42] Starting flow: [ consolidate ], steps: [ start, finish ]
[17:18:42] Starting flow: [ start ], steps: [ start, setVersion, push ]
[17:18:43]

 Starting | start one gitFlow branch  | [ master::start ]

[17:18:43] Waiting for git ...
[17:18:43] git ( any ) is required ->  git is installed ... OK
[17:18:43] check stage running...
[17:18:44] git fetch -p executed: OK
Already up-to-date.
[17:18:45] git pull executed: OK
[17:18:45] run stage running...
[17:18:45] git branch consolidation/auto_consolidate executed: OK
Switched to branch 'consolidation/auto_consolidate'
[17:18:45] git checkout consolidation/auto_consolidate executed: OK
[17:18:45] emit stage running...
[17:18:45]

 Finished | start one gitFlow branch  - 02 s 539 ms

[17:18:45] Allowed not implemented step: [ component::start ]
[17:18:45] Execution of step "setVersion" is excluded for context "master"
[17:18:45]

 Starting | Write version on project json file | [ component::setVersion ]

[17:18:45] run stage running...
[17:18:45] Initial version on bower.json -> 3.1.10-6
[17:18:45] Applying start action on consolidation branch using strategy...
[17:18:45] Executing consolidate shrinkwrap on  bower
[17:18:45] Bower installed: OK
[17:18:46] Dependencies has changed false
[17:18:46] Final version on bower.json -> 3.1.10-6 (Not changed)
[17:18:46]

 Finished | Write version on project json file - 160 ms

[17:18:46]

 Starting | start one gitFlow branch  | [ master::push ]

[17:18:46] git ( any ) is required ->  git is installed ... OK
[17:18:46] WARNING value areChoices doesn't exists!! in this step
[17:18:46] WARNING value validateBranch doesn't exists!! in this step
[17:18:46] WARNING value getChoices doesn't exists!! in this step
[17:18:46] run stage running...
remote:
remote: Create pull request for consolidation/auto_consolidate:
remote:   https://globaldevtools.bbva.com/bitbucket/projects/CTOOL/repos/cells-icons/compare/commits?sourceBranch=refs/heads/consolidation/auto_consolidate
remote:
To ssh://git@globaldevtools.bbva.com:7999/ctool/cells-icons.git
 * [new branch]      consolidation/auto_consolidate -> consolidation/auto_consolidate
Branch consolidation/auto_consolidate set up to track remote branch consolidation/auto_consolidate from origin.
[17:18:47] git push --set-upstream origin consolidation/auto_consolidate executed: OK
Everything up-to-date
[17:18:48] git push --all executed: OK
Everything up-to-date
[17:18:49] git push --tags executed: OK
[17:18:49]

 Finished | start one gitFlow branch  - 03 s 370 ms

[17:18:49] Allowed not implemented step: [ component::push ]
[17:18:49] Flow [ start ] finished - 06 s 695 ms
[17:18:49] Starting flow: [ finish ], steps: [ merge, setVersion, finish, validate, publish ]
[17:18:49]

 Starting | Git Flow Finish | [ consolidation::merge ]

[17:18:49] check stage running...
[17:18:50] git fetch -p executed: OK
Already up-to-date.
[17:18:51] git pull executed: OK
[17:18:51] run stage running...
[17:18:51] Trying to auto-merge master to consolidation/auto_consolidate
Already up-to-date.
[17:18:51] git merge master executed: OK
Everything up-to-date
[17:18:52] git push executed: OK
[17:18:52]

 Finished | Git Flow Finish - 02 s 539 ms

[17:18:52] Allowed not implemented step: [ component::merge ]
[17:18:52] Execution of step "setVersion" is excluded for context "consolidation"
[17:18:52]

 Starting | Write version on project json file | [ component::setVersion ]

[17:18:52] run stage running...
[17:18:52] Initial version on bower.json -> 3.1.10-6
[17:18:52] Applying finish action on consolidation branch using remove strategy...
3.0.2
3.1.0
3.1.10
3.1.10-0
3.1.10-1
3.1.10-2
3.1.10-3
3.1.10-4
3.1.10-5
3.1.10-6
3.1.2
3.1.8
3.1.9
pre_3.1.10-consolidate.5
pre_3.1.10-consolidate.6
zz
[17:18:52] git tag -l executed: OK
[17:18:52] version: 3.1.10-6 strategy: remove tag: consolidate
[17:18:52] Final version on bower.json -> 3.1.10-6 (Not changed)
[17:18:52]

 Finished | Write version on project json file - 029 ms

[17:18:52]

 Starting | Git Flow Finish | [ consolidation::finish ]

[17:18:52] check stage running...
[17:18:52] git fetch -p executed: OK
Already up-to-date.
[17:18:53] git pull executed: OK
[17:18:53] run stage running...
[17:18:53] Trying to auto-merge consolidation/auto_consolidate to master
[17:18:53] git branch --unset-upstream executed: OK
Switched to branch 'master'
Your branch is up-to-date with 'origin/master'.
[17:18:53] git checkout master executed: OK
Already up-to-date.
[17:18:54] git pull executed: OK
Already up-to-date.
[17:18:54] git merge consolidation/auto_consolidate executed: OK
Deleted branch consolidation/auto_consolidate (was 966b4ee).
[17:18:54] git branch -d consolidation/auto_consolidate executed: OK
To ssh://git@globaldevtools.bbva.com:7999/ctool/cells-icons.git
 - [deleted]         consolidation/auto_consolidate
[17:18:55] git push origin :consolidation/auto_consolidate executed: OK
[17:18:55]

 Finished | Git Flow Finish - 03 s 610 ms

[17:18:55] Execution NOT BUILT
[17:18:55] Total time - 13 s 652 ms
```