---
title: How to use piscosour GitFlow
layout: doc_page.html
---

## Introducción

Partiendo de modelo GitFlow (http://nvie.com/posts/a-successful-git-branching-model/) para el manejo de releases basado en ramas, se ha desarrollado una metodología para la gestión de la promoción de código, generación de artefactos y versionado automático. (metodología explicada en detalle aquí [enlace a otro documento])

Estos son los principios fundamentales de la metodología:

 - **Publicación directa de cógido en master y develop estarán prohibidas**
 - La versión del código fuente (bower.json, package.json, *.gradle, pom.xml ...), la versión de los artefactos y los tags en el scm tienen que ser **coherentes y únicos** 

Se han desarrollado un conjunto de recetas piscosour que automatizan gran cantidad de las tareas involucradas en la metodología **Pisco GitFlow**

Estas tareas son:

 - **init**: Convierte un repositorio cualquiera en un repositorio preparado para **Pisco GitFlow**
 - **start**: Crea una rama nueva dentro de **Pisco GitFlow** .
 - **finish**: Termina una rama **Pisco GitFlow** .
 - **merge**: Mezcla los cambios de master en una rama merger para posteriormente ser mezclados en develop.

## Instalación

Instalación de piscosour

    npm i -g piscosour

Instalación del conjunto de comandos y contextos de **Pisco GitFlow**

    npm -i -g pisco-gitflow-contexts

Si queremos usar **Pisco GitFlow**  para contextos cells será necesario instalar el conjunto de comandos y contextos de cells

    npm -i -g pisco-cells-contexts

## init - Comenzar a trabajar con **Pisco GitFlow**

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

## start:release - Comienzo de entrega de código de develop a master

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

## finish:release - Fin de entrega de código de develop a master

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

## Proceso de mezclado de cambios de master a develop

Existen dos casos en la metodología en los que los cambios de master pueden no encontrarse en develop y producirse pérdida involuntaria de código fuente cuando se produce una entrega de release a master. (Recordemos que siempre se mezclará los cambios procedentes de release sobre lo que haya en master).

- 1. Cuando se corrigen problemas en la fase de release en la rama del mismo nombre.
- 2. Cuando se corrigen problemas en master mediante un hotfix.

En estos dos casos es necesario mezclar estos cambios con develop. Este procesos deberá ser siempre manual porque es decisión del equipo establecer la prioridad de esta mezcla o si se deberá hacer o no. **Pisco GitFlow**  ofrece una herramienta para facilitar este procesos y que incluso sea prácticamente automático si no se produce ningún conflicto.

La mezcla de código fuente entre master y develop se tiene que hacer a través de una tercera rama llamada merger.

### start:merger - Comienzo de la rama merger

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

### merge:merger - Proceso de mezclado de cambios de master a merger

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

### finish:merger - Entrega de código de merger a develop

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

## git:resolve - Resolver conflictos usando la línea de comando de git

Para la resolución de conflictos es posible usar la herramienta que más os guste, aquí ponemos un sencillo ejemplo de uso de resolución de conflictos usando git por línea de comando.

Supongamos que obtenemos un conflicto al mezclar dos ramas.

```bash
[13:01:19] sipper Flow error (execution stopped) ERROR { cmd: 'git',
  args: [ 'merge', 'master' ],
  options: undefined,
  status: 'ERROR',
  error: undefined,
  output: 'Auto-merging package.json\nCONFLICT (content): Merge conflict in package.json\nAutomatic merge failed; fix conflicts and then commit the result.\n' }
[13:01:19] Total time - 02 s 025 ms
```

En el fichero package.json aparecerán estás anotaciones:

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

Editar el fichero y resolver el conflicto con el código final que queremos que se quede en la rama.

```javascript
{
  "name": "pisco-plugin-npm",
  "version": "0.1.6-aam.0",
....
```

Hacer commit del fichero

```bash
git add .
git commit -m "resolve()"
```

Este conflicto ya estaría resuelto.