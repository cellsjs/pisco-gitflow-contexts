---
title: Start working with Pisco GitFlow!
layout: doc_page.html
---

# Start working with **Pisco GitFlow**

From a repository with only master branch transform into a **Pisco GitFlow** repository with both branches develop and master and the right version numbers.

    pisco gitflow:init

The tool will ask for the type of the next release in order to set the next right version.

```bash
? Choose next release change (Use arrow keys)
  major
  minor
❯ patch
```

**IMPORTANT:** During the development process is possible to change the type of release manually anytime if is necessary by changing the version file.

Check that new branch was generated ok:

```bash
➜  pisco-git git:(master) git branch --all
  develop
* master
  remotes/origin/develop
  remotes/origin/master
```

Checkout develop to start to work.

    git checkout develop

**Do not push code to develop. Create new feature **Pisco GitFlow** branch with start feature command.**

Versions of this branch are this type: **x.y.z-beta.n**