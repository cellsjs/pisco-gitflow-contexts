---
title: Working with Features
layout: doc_page.html
---

# Working with features

## start:feature - Start new feature

Make sure you are in the develop branch

    git checkout develop

Run:

    pisco start [--targetBranch feature --branchName feature/tutorial]

```bash
[14:23:42] Execution contexts: [ recipe, develop ]
[14:23:42] Starting flow: [ start ], steps: [ start, setVersion, push ]
...
```

If targetBranch parameter is not set **Pisco GitFlow** will ask:

```bash
? What do you want to start? (Use arrow keys)
❯ new feature
  new release
  new master merger
```

If branchName parameter is not set, you will be asked for the name you want to give the branch:

```
? Write the name of the new feature (feature/ is already appended) tutorial (better without spaces)
```

Once the execution is finished check that you are in the branch that you just created:

```bash
➜ pisco-git git: (feature / tutorial) git branch -l
  Develop
* Feature / tutorial
  Master
```

### Conclusions:

- 1. Work on this branch normally with your favorite tools.
- 2. Is possible to start all the feature branches that you want in parallel.
- 3. Note that the versions in this branch are **x.y.z-alpha.n**
- 4. Note that a tag of type **pre_x.y.z-alpha.n** has been created with the initial state before starting to work.

## finish:feature - Code delivery from feature to develop

Make sure you are on a feature branch

    git checkout feature/tutorial

Run:

    pisco finish

```
[14:24:52] Execution contexts: [ recipe, feature ]
[14:24:52] Starting flow: [ finish ], steps: [ merge, validate, setVersion, finish, publish ]
....
```

### Conclusions:

- 1. Feature branch changes will be delivered to develop.
- 2. All the tests implemented for the repository will have been executed on the result of the merge of the feature branch with develop. If the tests do not end OK, the process will not continue.
- 3. Version will have automatically changed in the develop branch from **x.y.z-beta.n** to **x.y.z-beta.(n + 1)**
- 4. Feature branch has been deleted.
- 5. A tag **x.y.z-beta.(n + 1)** will be generated with the status at the time of delivery.
- 6. Corresponding artifact has been published in the corresponding registry with the version **x.y.z-beta.(n + 1)**

### Common Problems:

- 1. In the merge step there are conflicts and the finish execution stops:

[See the section resolving conflicts using the git command line] (#-gitresolve-resolve-conflicts-using-line-of-git-command)

- 2. Validate ends with errors. If this happens the process will stop and none of the actions will be carried out.

Solve the tests so they do not give error.