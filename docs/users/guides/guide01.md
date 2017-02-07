---
title: Working with Features
layout: doc_page.html
---

# Working with features

## start:feature - Comenzar una feature

Asegurate que estás en la rama develop

    git checkout develop

ejecuta:

    pisco start [--targetBranch feature --branchName feature/tutorial]

```bash
[14:23:42] Execution contexts: [ recipe, develop ]
[14:23:42] Starting flow: [ start ], steps: [ start, setVersion, push ]
...
```

Si no se introduce el parámetro targetBranch **Pisco GitFlow**  te preguntará que quieres empezar:

```bash
? What do you want to start? (Use arrow keys)
❯ new feature
  new release
  new master merger
```

Si no se introduce el parámetro branchName, te preguntará por el nombre que le quieres dar a la rama:

```
? Write the name of the new feature (feature/ is already appended) tutorial
```

Escribe el nombre que quieres que aparezca detrás de feature/ (mejor sin espacios)

Una vez terminada la ejecución comprueba que estás en la rama que acabas de crear:

```bash
➜  pisco-git git:(feature/tutorial) git branch -l
  develop
* feature/tutorial
  master
```

### Conclusiones:

- 1. Puedes trabajar en esta rama normalmente con tus herramientas favoritas.
- 2. Se pueden generar todas las ramas de feature que desees en paralelo.
- 3. Notar que las versiones en esta rama son del tipo **x.y.z-alpha.n**
- 4. Notar que se habrá creado un tag del tipo **pre_x.y.z-alpha.n** con el estado inicial antes de empezar a trabajar.

## finish:feature - Entrega de código de una feature a develop

Asegurate que estás en una rama de feature

    git checkout feature/tutorial

ejecuta:

    pisco finish

```
[14:24:52] Execution contexts: [ recipe, feature ]
[14:24:52] Starting flow: [ finish ], steps: [ merge, validate, setVersion, finish, publish ]
....
```

### Conclusiones:

- 1. Los cambios de la rama feature se habrán entregado a develop.
- 2. Todos los test implementados para el repositorio se habrán ejecutado sobre el resultado de la mezcla de la rama de feature con develop. Si los tests no terminan OK, el proceso no continuará.
- 3. La versión habrá cambiado automaticamente en la rama de develop de **x.y.z-beta.n** a **x.y.z-beta.(n+1)**
- 4. La rama feature se habrá eliminado.
- 5. Se habrá generado un tag **x.y.z-beta.(n+1)** con el estado en el momento de la entrega.
- 6. Se habrá publicado el artefacto correspondiente en el registro correspondiente con la versión **x.y.z-beta.(n+1)**

### Problemas más comunes:

- 1. Que en el paso de merge haya conflictos y la ejecución de finish se detenga:

[ver el apartado resolver conflictos usando la línea de comando git](#-gitresolve-Resolver-conflictos-usando-la-línea-de-comando-de-git)

- 2. Que haya algún problema en alguno de los tests y validate de error, si esto pasa el proceso se detendrá y ninguna de las acciones se llevarán a cabo.

Solucionar los tests para que no den error.