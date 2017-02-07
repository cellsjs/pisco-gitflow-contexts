---
title: Merging master to develop
layout: doc_page.html
---

# Process of merge changes from master to develop

There are two cases in the methodology where master changes may not be encountered in developing and causing unintentional loss of code source when a release to master release occurs. (Remember that changes coming from release always replace changes on master).

- 1. When problems are corrected on release branch.
- 2. When problems are corrected on master using a hotfix.

In these two cases it is necessary to merge these changes with develop. This process should always be manual because it is the team's decision to prioritize this merge or whether it should be done or not. **Pisco GitFlow** offers a tool to facilitate this process and even be practically automatic if there is no conflict.

Merging code between master and develop has to be done through a third branch called merger.

## start:merger - Starts merger branch

Checkout develop branch

    git checkout develop

Run:

    pisco start [--targetBranch merger --branchName merger/tutorial]

```bash
[14:23:42] Execution contexts: [ recipe, develop ]
[14:23:42] Starting flow: [ start ], steps: [ start, setVersion, push ]
...
```

If targetBranch parameter is not set **Pisco GitFlow** will ask:

```bash
? What do you want to start? (Use arrow keys)
  new feature
  new release
❯ new master merger
```

If branchName parameter is not set, you will be asked for the name you want to give the branch:

```
? Write the name of the new feature (feature/ is already appended) tutorial (better without spaces)
```

Once the execution is finished check that you are in the branch that you just created:

```bash
➜ pisco-git git: (merger/tutorial) git branch -l
  develop
* merger / tutorial
  master
```

### Conclusions:

- 1. **IMPORTANT:** Not a branch to work, use this branch only to merge changes with master. (It's still not dangerous because eventually these changes will go to develop)
- 2. Do not work with several branches **merger** in parallel. It is possible but it does not make sense.
- 3. Versions in this branch are **x.y.z-aam.n**
- 4. Note that a tag of type **pre_x.y.z-aam.n** has been created with the initial state before starting to work.

## merge:merger - Merge changes from **master** to **merger** branches

Merge master to merger branch can be done manually. The tool helps you by running validate at the end of the process.

Checkout merger branch

    git checkout merger/tutorial

Run:

    pisco merge

```bash
[11:52:14] Execution contexts: [ recipe, merger ]
[11:52:14] Starting flow: [ merge ], steps: [ merge, validate ]
...
```

**This command will always fails!!**

Between master and develop will always be a conflict at least:

```bash
[11:52:17] sipper Flow error (execution stopped) ERROR {cmd: 'git',
  Args: [ 'merge', 'master' ],
  Options: undefined,
  Status: 'ERROR',
  Error: undefined,
  Output: 'Auto-merging package.json \ nCONFLICT (content): Merge conflict in package.json \ nAutomatic merge failed; Fix conflicts and then commit the result. \ N '}
[11:52:17] Total time - 02 s 567 ms
```

File containing the version will always conflict. Solve all conflicts using your favorite tools. **VERY IMPORTANT: IS MANDATORY TO MAINTAIN THE MERGER VERSION IN THE VERSION FILE** [see the section resolving conflicts using the git command line] (# gitresolve-resolving-conflicts-using-line-of-command- Git).

When there is no conflict re-execute the command and the process validate with the execution of all the tests will run.

    pisco merge

### Conclusions:

- 1. **THE VERSION IN THE VERSION FILE SHOULD BE THE SAME FROM WHICH IT STARTED**
- 2. Changes from master will be delivered to merger branch.

## finish:merger - Finish merger. Delivery code from merger to develop

Checkout merger branch

    git checkout merger/tutorial

Run:

    pisco finish

```
[14:24:52] Execution contexts: [ recipe, merger ]
[14:24:52] Starting flow: [ finish ], steps: [ merge, validate, setVersion, finish, publish ]
....
```

### Conclusions:

- 1. Changes from merger branch, and consequently from master, will have been delivered to develop.
- 2. All tests implemented for the repository will have been executed on the result of the merge of merger branch with develop. If the tests fails, the process will not continue.
- 3. Version will have automatically changed in develop branch from **x.y.z-beta.n** to **x.y.z-beta.(n+1)**
- 4. Merger branch will be deleted.
- 5. A tag **x.y.z-beta.(n+1)** will be created with the status at the time of delivery.
- 6. Corresponding artifact has been published in the corresponding registry with the version **x.y.z-beta.(n+1)**

### Common Problems:

- 1. In the merge step there are conflicts and the finish execution stops:

[See the section resolving conflicts using the git command line] (#-gitresolve-resolve-conflicts-using-line-of-git-command)

- 2. Validate ends with errors. If this happens the process will stop and none of the actions will be carried out.

Solve the tests so they do not give error.