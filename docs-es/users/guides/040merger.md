---
title: Mezclando cambios de master a develop
layout: doc_page.html
---

# Proceso de mezclado de cambios de master a develop [[English version](../../../en/users/guides/040merger.html)]

Existen dos casos en la metodología en los que los cambios de master pueden no encontrarse en develop y producirse pérdida involuntaria de código fuente cuando se produce una entrega de release a master. (Recordemos que siempre se mezclará los cambios procedentes de release sobre lo que haya en master).

- 1. Cuando se corrigen problemas en la fase de release en la rama del mismo nombre.
- 2. Cuando se corrigen problemas en master mediante un hotfix.

En estos dos casos es necesario mezclar estos cambios con develop. Este procesos deberá ser siempre manual porque es decisión del equipo establecer la prioridad de esta mezcla o si se deberá hacer o no. **Pisco GitFlow**  ofrece una herramienta para facilitar este procesos y que incluso sea prácticamente automático si no se produce ningún conflicto.

La mezcla de código fuente entre master y develop se tiene que hacer a través de una tercera rama llamada merger.

## start:merger - Comienzo de la rama merger

Asegurate que estás en la rama develop

    git checkout develop

ejecuta:

    pisco start [--targetBranch merger --branchName merger/tutorial]

```bash
[14:23:42] Execution contexts: [ recipe, develop ]
[14:23:42] Starting flow: [ start ], steps: [ start, setVersion, push ]
...
```

Si no se introduce el parámetro targetBranch **Pisco GitFlow** te preguntará que quieres empezar:

```bash
? What do you want to start? (Use arrow keys)
  new feature
  new release
❯ new master merger
```

Si no se introduce el parámetro branchName, te preguntará por el nombre que le quieres dar a la rama:

```
? Write the name of the new merger (merger/ is already appended) tutorial
```

Escribe el nombre que quieres que aparezca detrás de merger/ (mejor sin espacios)

Una vez terminada la ejecución comprueba que estás en la rama que acabas de crear:

```bash
➜  pisco-git git:(merger/tutorial) git branch -l
  develop
* merger/tutorial
  master
```

### Conclusiones:

- 1. **IMPORTANTE:** No es una rama para trabajar, usa esta rama únicamente para mezclar cambios con master. (Aún así no es peligroso porque finalmente estos cambios acabarán en develop)
- 2. No trabajar con varias ramas de merger en paralelo. Es posible pero no tiene sentido.
- 3. Notar que las versiones en esta rama son del tipo **x.y.z-aam.n**
- 4. Notar que se habrá creado un tag del tipo **pre_x.y.z-aam.n** con el estado inicial antes de empezar a trabajar.

## merge:merger - Proceso de mezclado de cambios de master a merger

La mezcla de la rama master con la rama merger se puede hacer manualmente lo único que aporta este proceso es la ejecución del proceso validate después de hacer el mezclado manual.

Asegurate que estás en la rama merger

    git checkout merger/tutorial

ejecuta:

    pisco merge

```bash
[11:52:14] Execution contexts: [ recipe, merger ]
[11:52:14] Starting flow: [ merge ], steps: [ merge, validate ]
...
```

**¡¡Este comando siempre acabará con error!!**

Entre la rama de master y la rama de develop siempre encontraremos un conclicto como mínimo:

```bash
[11:52:17] sipper Flow error (execution stopped) ERROR { cmd: 'git',
  args: [ 'merge', 'master' ],
  options: undefined,
  status: 'ERROR',
  error: undefined,
  output: 'Auto-merging package.json\nCONFLICT (content): Merge conflict in package.json\nAutomatic merge failed; fix conflicts and then commit the result.\n' }
[11:52:17] Total time - 02 s 567 ms
```

El fichero que contenga la versión siempre dará conflicto. Solucionar este conflicto y todos los que se produzcan usando tus herramientas favoritas. **MUY IMPORTANTE: MANTEN LA VERSIÓN DE MERGER EN EL FICHERO DE VERSION** [ver el apartado resolver conflictos usando la línea de comando git](#gitresolve-Resolver-conflictos-usando-la-línea-de-comando-de-git).

Cuando no exista ningún conflicto volver a ejecutar el comando y el proceso validate con la ejecución de todos los tests de ejecutará.

### Conclusiones:

- 1. **LA VERSIÓN DEL FICHERO DE VERSIONES DEBERÁ SER LA MISMA DE LA QUE SE PARTIÓ**
- 2. Los cambios de la rama master se entregarán en la nueva rama merger.

## finish:merger - Entrega de código de merger a develop

Asegurate que estás en una rama de merger

    git checkout merger/tutorial

ejecuta:

    pisco finish

```
[14:24:52] Execution contexts: [ recipe, merger ]
[14:24:52] Starting flow: [ finish ], steps: [ merge, validate, setVersion, finish, publish ]
....
```

### Conclusiones:

- 1. Los cambios de la rama merger y por consiguiente de master se habrán entregado a develop.
- 2. Todos los test implementados para el repositorio se habrán ejecutado sobre el resultado de la mezcla de la rama de merger con develop. Si los tests no terminan OK, el proceso no continuará.
- 3. La versión habrá cambiado automaticamente en la rama de develop de **x.y.z-beta.n** a **x.y.z-beta.(n+1)**
- 4. La rama merger se habrá eliminado.
- 5. Se habrá generado un tag **x.y.z-beta.(n+1)** con el estado en el momento de la entrega.
- 6. Se habrá publicado el artefacto correspondiente en el registro correspondiente con la versión **x.y.z-beta.(n+1)**

### Problemas más comunes:

- 1. Que en el paso de merge haya conflictos y la ejecución de finish se detenga:

[ver el apartado resolver conflictos usando la línea de comando git](#gitresolve-Resolver-conflictos-usando-la-línea-de-comando-de-git)

- 2. Que haya algún problema en alguno de los tests y validate de error, si esto pasa el proceso se detendrá y ninguna de las acciones se llevarán a cabo.

Solucionar los tests para que no den error.