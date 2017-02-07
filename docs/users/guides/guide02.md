---
title: The Release process
layout: doc_page.html
---

# The Release Process

Es el proceso de entrega de código de develop a master.

## start:release - Comienzo de la rama de release

Asegurate que estás en la rama develop

    git checkout develop

ejecuta:

    pisco start [--targetBranch release --branchName release/tutorial]

```bash
[14:23:42] Execution contexts: [ recipe, develop ]
[14:23:42] Starting flow: [ start ], steps: [ start, setVersion, push ]
...
```

Si no se introduce el parámetro targetBranch, **Pisco GitFlow**  te preguntará que quieres empezar:

```bash
? What do you want to start? (Use arrow keys)
  new feature
❯ new release
  new master merger
```

Si no se introduce el parámetro branchName, te preguntará por el nombre que le quieres dar a la rama:

```
? Write the name of the new release (release/ is already appended) tutorial
```

Escribe el nombre que quieres que aparezca detrás de release/ (mejor sin espacios)

La creación de una rama de release conlleva el cambio de versión en la rama de develop. Para realizar este proceso **Pisco GitFlow**  te preguntará el tipo de la siguiente release, para poder establecer la versión adecuada.

```bash
? Choose next release change (Use arrow keys)
  major
  minor
❯ patch
```

**IMPORTANTE:** Si durante un sprint o un proceso de desarrollo se desea cambiar el tipo de release que se eligió en su momento basta con cambiar manualmente el fichero de versión a la versión deseada. Este proceso se podrá hacer en cualquier momento.

Una vez terminada la ejecución comprueba que estás en la rama que acabas de crear:

```bash
➜  pisco-git git:(release/tutorial) git branch -l
  develop
* release/tutorial
  master
```

### Conclusiones:

- 1. La rama de release se usa para hacer pequeñas correcciones a problemas detectados en la fase de release. En esta fase se realizan varios ciclos de pruebas como por ejemplo las pruebas de aceptación y de usuario. (ver documento de metodología piscosour-gitflow)
- 2. Puedes trabajar en esta rama normalmente con tus herramientas favoritas.
- 3. Cuando se comienza una rama de release la rama de develop sube de versión el intervalo elegido (major/minor/patch). (p.e. para minor de **x.y.z-beta.n** a **x.(y+1).z-beta.0**)
- 4. Sólo se podrá realizar una release en paralelo.
- 5. Notar que las versiones en esta rama son del tipo **x.y.z-rc.0**.
- 6. Notar que se habrá creado un tag del tipo **pre_x.y.z-rc.0** con el estado inicial antes de empezar a trabajar.

## finish:release - Fin de entrega de código de release a master

Asegurate que estás en la rama de release

    git checkout release/tutorial

ejecuta:

    pisco finish

```
[14:24:52] Execution contexts: [ recipe, release ]
[14:24:52] Starting flow: [ finish ], steps: [ merge, validate, setVersion, finish, publish ]
....
```

### Conclusiones:

- 1. **IMPORTANTE: EN CASO DE CONFLICTO AL MEZCLAR CÓDIGO FUENTE TIENE PREFERENCIA EL CÓDIGO QUE VIENE DE RELEASE**
- 2. **IMPORTANTE:** Los cambios realizados en la rama de release, mientras ha durado el proceso, deberán ser mezclados manualmente a develop si no se quieren perder. **Pisco GitFlow**  te ayudará en este proceso: [ver el apartado Proceso de mezclado de cambios de master a develop](#Proceso-de-mezclado-de-cambios-de-master-a-develop)
- 3. Los cambios de la rama **develop** y los realizados en **release** se habrán entregado a **master**.
- 4. Todos los test implementados para el repositorio se habrán ejecutado sobre el resultado de la mezcla de la rama de release con master. Si los tests no terminan **OK**, el proceso no continuará.
- 5. La versión habrá cambiado automaticamente en la rama de master en función de la versión de release de **x.y.z-rc.0** a **x.y.z** en master. El cambio en la rama de release viene determinado por la respuesta a la pregunta que se hizo al hacer la release anterior. (major/minor/patch).
- 6. La rama release se habrá eliminado.
- 7. Se habrá generado un tag **x.y.z** con el estado en el momento de la entrega.
- 8. Se habrá publicado el artefacto correspondiente en el registro correspondiente con la versión **x.y.z**

### Problemas más comunes:

- 1. Que haya algún problema en alguno de los tests y validate de error, si esto pasa el proceso se detendrá y ninguna de las acciones se llevarán a cabo.

Solucionar los tests para que no den error.