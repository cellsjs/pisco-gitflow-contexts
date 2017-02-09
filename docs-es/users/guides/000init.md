---
title: Comenzar Pisco GitFlow!
layout: doc_page.html
---

# Comenzar a trabajar con **Pisco GitFlow** [[English version](../../../en/users/guides/000init.html)]

Partiendo de un repositorio normal donde solo exista la rama master transformaremos dicho repositorio en un repositorio **Pisco GitFlow**  con su correspondiente rama develop y con el número de versión correcto.

    pisco gitflow:init

Al crear la nueva rama de develop preguntará el tipo de la siguiente release para poder establecer la versión adecuada.

```bash
? Choose next release change (Use arrow keys)
  major
  minor
❯ patch
```

**IMPORTANTE:** Si durante un sprint o un proceso de desarrollo se desea cambiar el tipo de release que se eligió en su momento basta con cambiar manualmente el fichero de versión a la versión deseada. Este proceso se podrá hacer en cualquier momento.

Comprobar que ha generado correctamente la nueva rama

```bash
➜  pisco-git git:(master) git branch --all
  develop
* master
  remotes/origin/develop
  remotes/origin/master
```

Cambiar a la rama de develop para empezar a trabajar.

    git checkout develop

NOTA: No debes entregar código directamente a develop, para desarrollar una nueva feature crea una nueva rama **Pisco GitFlow**

Notar que las versiones en la rama develop son del tipo **x.y.z-beta.n**