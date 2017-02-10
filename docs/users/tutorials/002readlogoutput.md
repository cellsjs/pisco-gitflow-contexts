---
title: Reading log execution of Pisco GitFlow
layout: doc_page.html
---

# Reading log execution of Pisco GitFlow

Is incredible but all the letters that come up very fast when you execute any command means something!!. let's see!

```bash
➜  cells-icons git:(develop) pisco start
[16:55:33] Execution contexts: [ develop, component ]
[16:55:35] Starting flow: [ start ], steps: [ start, setVersion, push ]
[16:55:36]

 Starting | start one gitFlow branch  | [ develop::start ]

[16:55:36] Waiting for git ...
[16:55:36] git ( any ) is required ->  git is installed ... OK
? What do you want to start? (Use arrow keys)
❯ new feature
  new release
  new master merger
```

Line by line

    [16:55:33] Execution contexts: [ develop, component ]

Shows all the contexts of this directory in this case you are in a component in develop branch, all the steps will be executed in all the contexts

    [16:55:35] Starting flow: [ start ], steps: [ start, setVersion, push ]

**start** flow has three steps -> start, setVersion, push

```
 Starting | start one gitFlow branch  | [ develop::start ]
```

This is the beginning of the step execution

```
[16:55:36] Waiting for git ...
[16:55:36] git ( any ) is required ->  git is installed ... OK
```

System checks to see if all the tools and dependencies are installed ok.

```
? What do you want to start? (Use arrow keys)
❯ new feature
  new release
  new master merger
```

Ask to choose your selection -> we choose new feature

```
? What do you want to start? new feature
[17:00:56] check stage running...
[17:00:58] git fetch -p executed: OK
Already up-to-date.
[17:00:59] git pull executed: OK
[17:00:59] run stage running...
? Write the name of the new feature (feature/ is already appended)
```

    [17:00:56] check stage running...

Phase check is running...

    [17:00:58] git fetch -p executed: OK

This line means that git fetch -p command was executed OK, this es always the same

```
Already up-to-date.
[17:00:59] git pull executed: OK
```

git pull was executed and -> Already up-to-date. was the output... Note: de output of a command always is shown before command executed: OK line.


    ? Write the name of the new feature (feature/ is already appended)

Lets continue writing the feature name.

```
? Write the name of the new feature (feature/ is already appended) tutorial
[17:05:02] git branch feature/tutorial executed: OK
Switched to branch 'feature/tutorial'
[17:05:03] git checkout feature/tutorial executed: OK
```

Branch feature/tutorial is created and checkout.

```
[17:05:03] emit stage running...
[17:05:03]
    Finished | start one gitFlow branch  - 09 m 26 s 824 ms
```

Execution of develop::start ends

```
[17:05:03] Allowed not implemented step: [ component::start ]
[17:05:03] Execution of step "setVersion" is excluded for context "develop"
```

Step component::start is not implemented but is allowed and develop::setVersion has been excluded of execution

```
[17:05:03]

 Starting | Write version on project json file | [ component::setVersion ]

[17:05:03] run stage running...
```

component::setVersion starts execution

```
[17:05:03] Initial version on bower.json -> 3.1.7-beta.0
[17:05:03] Applying start action on feature branch using prerelease strategy...
0.1.14
0.10.1
0.10.5-beta.0
0.10.6-beta.0
0.10.7-beta.0
0.11.1-beta.0
0.12.0
0.12.0-beta.0
0.13.0-beta.0
0.13.1-beta.0
0.14.1-beta.0
0.15.0
0.17.0-beta.0
1.0.0
1.0.1
1.0.10
1.0.11
1.0.12
1.0.13
1.0.14
1.0.15
1.0.16
1.0.17
1.0.18
1.0.19
1.0.2
1.0.20
1.0.21
1.0.22
1.0.23
1.0.24
1.0.25
1.0.3
1.0.4
1.0.5
1.0.6
1.0.7
1.0.8
1.0.9
1.1.0
1.1.1
1.1.2
1.1.3
1.1.4
1.1.5
1.1.6
1.1.7
1.1.8
1.2.0
1.2.1
1.2.10
1.2.11
1.2.11-beta.0
1.2.11-beta.1
1.2.11-beta.2
1.2.11-beta.3
1.2.11-beta.4
1.2.11-beta.5
1.2.2
1.2.3
1.2.4
1.2.5
1.2.6
1.2.6-beta.1
1.2.6-beta.3
1.2.6-hotfix.0
1.2.6-hotfix.2
1.2.7
1.2.8
1.2.9
1.2.9-alpha.0
1.3.0
1.4.0
1.5.0
1.5.0-beta.0
1.5.0-beta.1
1.5.0-beta.2
1.6.0
1.6.0-beta.0
1.6.0-beta.1
1.6.1-beta.0
1.6.1-beta.1
1.7.0
1.7.1
1.7.2
1.7.3
1.7.4
1.7.4-beta.0
1.7.4-beta.1
2.0.0
2.0.1
2.0.1-beta.0
2.0.2
2.0.3
2.0.3-.0
2.0.3-1
2.0.3-2
2.1.0
2.2.1
2.2.1-0
2.2.2
2.3.1
2.3.1-2
2.3.10
2.3.2
2.3.3
2.3.4
2.3.5
2.3.6
2.3.6-0
2.3.6-1
2.3.7
2.3.8
2.3.8-beta.0
2.3.9
3.0.0
3.0.0-0
3.0.0-1
3.0.1
3.0.1-beta.0
3.0.2
3.0.2-beta.0
3.1.0
3.1.0-3
3.1.0-4
3.1.2
3.1.3-beta.0
3.1.3-beta.1
3.1.3-beta.2
3.1.6-beta.0
3.2.0-beta.0
3.2.0-beta.1
3.2.0-beta.2
[17:05:03] git tag -l executed: OK
```

setVersion search for pre_ tags in order to get the last version of all branches

```
[17:05:03] version: 3.1.7-beta.0 strategy: prerelease tag: alpha
[17:05:03] Final version on bower.json -> 3.1.7-alpha.0
```

Final version calculated using strategy prerelease with tag alpha.

```
[feature/tutorial 2528b14] chore(): change version file: 3.1.7-alpha.0
 1 file changed, 1 insertion(+), 1 deletion(-)
[17:05:03] git commit -m chore(): change version file: 3.1.7-alpha.0 . executed: OK
[17:05:03] git tag pre_3.1.7-alpha.0 executed: OK
```

commit this change but not push it in this section.

```
[17:05:03]

 Finished | Write version on project json file - 055 ms
[17:05:03]

 Starting | git flow push | [ develop::push ]
```
Obvious ;).

```
[17:05:03] run stage running...
remote:
remote: Create pull request for feature/tutorial:
remote:   https://globaldevtools.bbva.com/bitbucket/projects/CTOOL/repos/cells-icons/compare/commits?sourceBranch=refs/heads/feature/tutorial
remote:
To ssh://git@globaldevtools.bbva.com:7999/ctool/cells-icons.git
 * [new branch]      feature/tutorial -> feature/tutorial
Branch feature/tutorial set up to track remote branch feature/tutorial from origin.
[17:05:04] git push --set-upstream origin feature/tutorial executed: OK
```

set default upstream to your local branch

```
Everything up-to-date
[17:05:05] git push --all executed: OK
To ssh://git@globaldevtools.bbva.com:7999/ctool/cells-icons.git
 * [new tag]         pre_3.1.7-alpha.0 -> pre_3.1.7-alpha.0
[17:05:07] git push --tags executed: OK

```

Push all changes and all tags

```
[17:05:07]

 Finished | git flow push - 04 s 375 ms

[17:05:07] Allowed not implemented step: [ component::push ]
[17:05:07] Flow [ start ] finished - 09 m 32 s 288 ms
[17:05:07] Total time - 09 m 33 s 668 ms
```

It's easy to see what is going on watching this log, the rule is: Execution log before executed command + result OK or KO...