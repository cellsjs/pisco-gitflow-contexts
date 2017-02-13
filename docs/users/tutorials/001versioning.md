---
title: Versions between branches
layout: doc_page.html
---

# Versions between branches

These are the stable version for source code, tags and artifacts on each branch

| Branch | Version Type | Option |
| --- | --- | --- |
| master | x.y.z | x.y.z-n |
| hotfix | x.y.z-hotfix.n | - |
| release | x.y.z-rc.n | - |
| develop | x.y.z-beta.n | - |
| feature | x.y.z-alpha.n | - |
| merge | x.y.z-aam.n | - |

Nightly build versions has append the timestamp when the version was created:

    x.y.z-beta.n.20170213105634

## How version change with all the **Pisco GitFlow** processes:

### Feature processes

| Action | Init Branch | Init Version | pre tag version |End Branch | End Version |
| --- | --- | --- | --- | --- | --- |
| start feature | develop | x.y.z-beta.n | pre_x.y.z-alpha.n | feature | x.y.z-alpha.n |
| finish feature | feature | x.y.z-alpha.m | x.y.z-beta.n | develop | x.y.z-beta.(n+1) |

Is possible to start multiple features at the same time. All the features branches has to have different **n*+ numbers. **Pisco GitFlow** will create several pre_ versions in order to persist the last version that was created.

Lets play with this...

- 1) Suppose that we start a feature from develop, pre tag -> **1.0.0-beta.0** at **t1** with version **1.0.0-alpha.0**. tag -> **pre_1.0.0-alpha.0**
- 2) At **t2** (t2 > t1) we start a feature with version **1.0.0-alpha.1**. this version is taken from adding one to pre_ tag version **pre_1.0.0-alpha.(0+1)**
- 3) Now we want to finish **1.0.0-alpha.1** feature. Develop result in **1.0.0-beta.1**. Is the result of adding one to pre tag **1.0.0-beta.(0+1)**. Make new tag **1.0.0-beta.1**
- 4) we finish **1.0.0-alpha.0** feature so develop result on **1.0.0-beta.2**. Is the result of adding one to pre tag **1.0.0-beta.(1+1)**. Make new tag **1.0.0-beta.2**

### Hotfix processes

| Action | Init Branch | Init Version | pre tag version |End Branch | End Version |
| --- | --- | --- | --- | --- | --- |
| start hotfix | master | x.y.z | pre_x.y.z-hotfix.n | hotfix | x.y.z-hotfix.n |
| finish hotfix | hotfix | x.y.z-hotfix.m | x.y.z(-n) | master | x.y.z-(n+1) |

### Release processes

| Action | Init Branch | Init Version | pre tag version |End Branch | End Version |
| --- | --- | --- | --- | --- | --- |
| start release (action 1) | develop | x.y.z-beta.n | x.y.z-beta.n | develop | (x+1).(y+1).(z+1)-beta.n |
| start release (action 2) | develop | x.y.z-beta.n | pre_x.y.z-rc.n | release | x.y.z-rc.n |
| finish release | release | x.y.z-rc.n | auto | master | x.y.z |

**Action 1:** Will ask the type of the next release (major/minor/patch)

**Only one release at once!**

### Merge processes

Its pretty similar to feature process.

| Action | Init Branch | Init Version | pre tag version |End Branch | End Version |
| --- | --- | --- | --- | --- | --- |
| start merger | develop | x.y.z-beta.n | pre_x.y.z-aam.n | merger | x.y.z-aam.n |
| finish merger | merger | x.y.z-aam.m | x.y.z-beta.n | develop | x.y.z-beta.(n+1) |



