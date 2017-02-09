---
title: Resolving conflicts with git
layout: doc_page.html
---
# Resolve conflicts using git command line [[Versión en español](../../../es/users/guides/050conflicts.html)]

Use you favorite tools for git conflict resolution, here is a simple example of using conflict resolution using git by command line.

Suppose we get a merge conflict.

```bash
[13:01:19] sipper Flow error (execution stopped) ERROR {cmd: 'git',
  Args: ['merge', 'master'],
  Options: undefined,
  Status: 'ERROR',
  Error: undefined,
  Output: 'Auto-merging package.json \ nCONFLICT (content): Merge conflict in package.json \ nAutomatic merge failed; Fix conflicts and then commit the result. \ N '}
[13:01:19] Total time - 02 s 025 ms
```

In the package.json file you will see these annotations:

```javascript
{
  "name": "pisco-plugin-npm",
<<<<<<< HEAD
  "version": "0.1.6-aam.0",
=======
  "version": "0.1.5",
>>>>>>> master
....
```

Edit the file and resolve the conflict.

```javascript
{
  "name": "pisco-plugin-npm",
  "version": "0.1.6-aam.0",
....
```

Commit the file

```bash
git add.
git commit -m "resolve ()"
```

This conflict will be resolved. Now is possible to go on with any Gitflow task!