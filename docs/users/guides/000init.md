---
title: Start working with Pisco GitFlow!
layout: doc_page.html
---

# Start working with **Pisco GitFlow** [[Versión en español](../../../es/users/guides/000init.html)]

First is necessary to create or configure develop. Execute

    pisco master:init

The tool will ask for the type of the next release in order to set the next right version.

```bash
? Choose next release change (Use arrow keys)
  major
  minor
❯ patch
```

**IMPORTANT:** During the development process is possible to change the type of release executing **pisco master:init** on master anytime as you wish if is necessary.

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