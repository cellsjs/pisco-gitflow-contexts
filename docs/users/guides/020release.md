---
title: The Release process
layout: doc_page.html
---

# The Release Process

It is the code delivery process from develop to master.

## start:release - Start release branch

Checkout develop branch:

    git checkout develop

Run:

    pisco start [ --targetBranch release --branchName release/tutorial ]

```bash
[14:23:42] Execution contexts: [ recipe, develop ]
[14:23:42] Starting flow: [ start ], steps: [ start, setVersion, push ]
...
```

If targetBranch parameter is not set **Pisco GitFlow** will ask:

```bash
? What do you want to start? (Use arrow keys)
  new feature
❯ new release
  new master merger
```

If branchName parameter is not set, you will be asked for the name you want to give the branch:

```
? Write the name of the new release (release/ is already appended) tutorial (better without spaces)
```

The creation of a release branch will change the version of the develop branch. To perform this process **Pisco GitFlow** will ask you to choose next release type, to be able to establish the appropriate version.

```bash
? Choose next release (Use arrow keys)
  major
  minor
❯ patch
```

**IMPORTANT:** During the development process is possible to change the type of release manually anytime if is necessary by changing the version file.

Once the execution is finished check that you are in the branch that you just created:

```bash
➜ pisco-git git: (release/tutorial) git branch -l
  develop
* release/tutorial
  master
```

### Conclusions:

- 1. The release branch is used to make small corrections to problems detected in the release phase. In this phase several test cycles are performed, such as acceptance and user tests. (See piscosour-gitflow methodology document)
- 2. Work on this branch normally with your favorite tools.
- 3. When you start a release branch, the develop branch raises the chosen interval (major/minor/patch). (f.i. for the minor of **x.y.z-beta.n** to **x.(y+1).z-beta.0**)
- 4. Only one release can be made in parallel.
- 5. Note that the versions in this branch are this type **x.y.z-rc.0**.
- 6. Note that a tag of type **pre_x.y.z-rc.0** has been created with the initial state before starting to work.

## finish:release - Delivery code to master

checkout release:

    git checkout release/tutorial

Run:

    pisco finish

```
[14:24:52] Execution contexts: [ recipe, release ]
[14:24:52] Starting flow: [ finish ], steps: [ merge, validate, setVersion, finish, publish ]
....
```

### Conclusions:

- 1. **IMPORTANT: IN CASE OF CONFLICT BY MERGING CODE HAS PREFERENCE CODE COMING FROM RELEASE**
- 2. **IMPORTANT:** Changes made in the release branch, while the process has lasted, must be manually merged into develop. **Pisco GitFlow** will help you in this process: [see section Master-to-Develop Mix Mixing Process] (#Process-of-merging-from-master-to-develop)
- 3. The changes of the **develop** branch and those made in **release** will have been delivered to **master**.
- 4. All the tests implemented for the repository will have been executed on the result of the merge of release branch with master. If the tests do not end **OK**, the process will not continue.
- 5. The version will have automatically changed in the master branch depending on the release version from **x.y.z-rc.0** to **x.y.z** in master. The change in the release branch is determined by the response to the question that was asked in the previous release. (major/minor/patch).
- 6. The release branch has been deleted.
- 7. A tag **x.y.z** will be generated with the status at the time of delivery.
- 8. The corresponding artifact has been published in the corresponding register with the version **x.y.z**

### Common Problems:

- 1. Validate ends with errors. If this happens the process will stop and none of the actions will be carried out.

Solve the tests so they do not give error.