---
title: Component lifecycle using Pisco GitFlow
layout: doc_page.html
---

# Using **Pisco GitFlow** in component development lifecycle

We are going to see a very simple example with the component (Cells) context, but consider this example could be use for all the contexts you can imagine.

## Start working with Pisco GitFlow

Go to the root of your component and execute

    pisco init

If develop not exists will prompt this

```
[10:12:44] git branch develop executed: OK
Switched to branch 'develop'
[10:12:44] git checkout develop executed: OK
```

If develop already exists

```
fatal: A branch named 'develop' already exists.
[10:42:09] git branch develop executed: KO
[10:42:09] continue with execution!
Switched to branch 'develop'
Your branch is up-to-date with 'origin/develop'.
[10:42:09] git checkout develop executed: OK
```

**Pisco GitFlow** will check if develop exists, if not it will be created. Anyway **Pisco GitFlow** will check version file in order to set proper version related to master.

The tool will ask for the next release version.

```
? Choose next release change (Use arrow keys)
  major
  minor
❯ patch
```

If everything is Ok develop will be created with patch version inside version file.

**IMPORTANT**: Is possible to change new release at any time by executing again pisco init.
