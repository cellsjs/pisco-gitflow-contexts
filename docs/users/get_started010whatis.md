---
title: What is Pisco GitFlow?
layout: doc_page.html
---

# What is **Pisco GitFlow**?

Taking GitFlow model (http://nvie.com/posts/a-successful-git-branching-model/) for branch based release management. We have developed a release management methodology of code source, artifact generation and automate versioning. (LINK TO METHODOLOGY DOCUMENT)

These are the fundamentals principles of this methodology:

 - **Direct push to master and develop are forbidden**
 - **Unify versions and tags:** Code source version (bower.json, package.json, \*.gradle, pom.xml ...), artifacts version and the tags has to be **consistent and unique**

A set of piscosour recipes have been developed in order to automate many of the tasks involved in **Pisco GitFlow** methodology

These tasks are:

 - **init**: Converts any repository to a repository prepared for **Pisco GitFlow**
 - **start**: Creates a new branch within **Pisco GitFlow**.
 - **finish**: Finish a **Pisco GitFlow** branch
 - **merge**: Merge **master** changes into **develop**.