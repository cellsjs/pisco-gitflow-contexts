---
title: Make a Hotfix
layout: doc_page.html
---

# How to make a Hotfix?

In order to do a hotfix in master it is necessary to create a hotfix branch to never destabilize master.

## start:hotfix - Starting hotfix branch

checkout master

    git checkout master

Run:

    pisco start [--branchName hotfix/tutorial]

```bash
[14:23:42] Execution contexts: [ recipe, master ]
[14:23:42] Starting flow: [ start ], steps: [ start, setVersion, push ]
...
```

It is not necessary to enter targetBranch parameter because from the master branch, the only branch that can be started is hotfix.

If branchName parameter is not set, you will be asked for the name you want to give the branch:

```
? Write the name of the new hotfix (hotfix/ is already appended) tutorial (best without spaces)
```

Once the execution is finished check that you are in the branch that you just created:

```bash
➜ pisco-git git: (hotfix / tutorial) git branch -l
  develop
* hotfix / tutorial
  master
```

### Conclusions:

- 1. Work on this branch normally with your favorite tools.
- 2. Is possible to start all the feature branches that you want in parallel. But, honestly, it is not recommended.
- 3. Versions in this branch are this way **x.y.z-hotfix.n**
- 4. Note that a tag of type **pre_x.y.z-hotfix.n** has been created with the initial state before starting to work.

## finish:hotfix - Delivery code from hotfix to master

Checkout hotfix branch

    git checkout hotfix/tutorial

Run:

    pisco finish

```bash
[14:24:52] Execution contexts: [ recipe, hotfix ]
[14:24:52] Starting flow: [ finish ], steps: [ merge, validate, setVersion, finish, publish ]
....
```

### Conclusions:

- 1. **IMPORTANT:** Changes from hotfix branch can be manually merge to develop. **Pisco gitflow** will help you with this process: [see section Master-to-Develop Mix Mixing Process] (#Process-of-merging-from-master-to-develop)
- 2. Changes in hotfix branch will be delivered to master.
- 3. All tests implemented for the repository will have been executed on the result of the merge of the hotfix branch with master. If any test fails, the process will not continue.
- 4. Hotfix branch has been deleted.
- 5. Version in the master branch will change from **x.y.z** to **x.y.z-n**
- 5. A tag **x.y.z-n** will be created with the status at the time of delivery.
- 6. Corresponding artifact has been published in the corresponding registry with version **x.y.z-n**

### Common Problems:

- 1. In the merge step there are conflicts and the finish execution stops:

[See the section resolving conflicts using the git command line] (#-gitresolve-resolve-conflicts-using-line-of-git-command)

- 2. Validate ends with errors. If this happens the process will stop and none of the actions will be carried out.

Solve the tests so they do not give error.