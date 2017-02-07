---
title: Make a Hotfix
layout: doc_page.html
---

# ¿Cómo hacer un Hotfix?

Para hacer un hotfix en master es necesario crear una rama hotfix para no desestabilizar nunca master.

## start:hotfix - Comienzo de un hotfix

Asegurate que estás en la rama master

    git checkout master

ejecuta:

    pisco start [--branchName hotfix/tutorial]

```bash
[14:23:42] Execution contexts: [ recipe, master ]
[14:23:42] Starting flow: [ start ], steps: [ start, setVersion, push ]
...
```

No es necesario introducir el parámetro targetBranch porque desde la rama master lo único que se puede empezar es un hotfix.

Si no se introduce el parámetro branchName, **Pisco GitFlow**  te preguntará por el nombre que le quieres dar a la rama:

```
? Write the name of the new hotfix (hotfix/ is already appended) tutorial
```

Escribe el nombre que quieres que aparezca detrás de hotfix/ (mejor sin espacios)

Una vez terminada la ejecución comprueba que estás en la rama que acabas de crear:

```bash
➜  pisco-git git:(hotfix/tutorial) git branch -l
  develop
* hotfix/tutorial
  master
```

### Conclusiones:

- 1. Puedes trabajar en esta rama normalmente con tus herramientas favoritas.
- 2. Se pueden generar todas las ramas de hotfix que desees en paralelo. Pero, sinceramente, no es recomendable.
- 3. Notar que las versiones en esta rama son del tipo **x.y.z-hotfix.n**
- 4. Notar que se habrá creado un tag del tipo **pre_x.y.z-hotfix.n** con el estado inicial antes de empezar a trabajar.

## finish:hotfix - Entrega de código de hotfix a master

Asegurate que estás en una rama de hotfix

    git checkout hotfix/tutorial

ejecuta:

    pisco finish

```
[14:24:52] Execution contexts: [ recipe, hotfix ]
[14:24:52] Starting flow: [ finish ], steps: [ merge, validate, setVersion, finish, publish ]
....
```

### Conclusiones:

- 1. **IMPORTANTE:** Los cambios realizados en la rama de hotfix, podrán ser mezclados manualmente a develop si no se quieren perder. **Pisco gitflow** te ayudará en este proceso: [ver el apartado Proceso de mezclado de cambios de master a develop](#Proceso-de-mezclado-de-cambios-de-master-a-develop)
- 2. Los cambios de la rama hotfix se habrán entregado a master.
- 3. Todos los test implementados para el repositorio se habrán ejecutado sobre el resultado de la mezcla de la rama de hotfix con master. Si los tests no terminan OK, el proceso no continuará.
- 4. La rama hotfix se habrá eliminado.
- 5. La versión en la rama master cambiará de **x.y.z** a **x.y.z-n**
- 5. Se habrá generado un tag **x.y.z-n** con el estado en el momento de la entrega.
- 6. Se habrá publicado el artefacto correspondiente en el registro correspondiente con la versión **x.y.z-n**

### Problemas más comunes:

- 1. Que en el paso de merge haya conflictos y la ejecución de finish se detenga:

[ver el apartado resolver conflictos usando la línea de comando git](#-gitresolve-Resolver-conflictos-usando-la-línea-de-comando-de-git)

- 2. Que haya algún problema en alguno de los tests y validate de error, si esto pasa el proceso se detendrá y ninguna de las acciones se llevarán a cabo.

Solucionar los tests para que no den error.