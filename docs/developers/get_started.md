---
title: Pisco GitFlow Methology
layout: doc_page.html
---

(Explicar la metodología, cada uno de los flujos y las versiones de una manera profunda)

Copio esto que salió del de usuarios...

**finish** tiene 5 pasos, como podemos observar arriba. El primero de los pasos es merge, se mezclarán los cambios de develop con los que cambios en la rama feature, si algún conflicto habrá que solucionarlo antes de continuar. [ver el apartado resolver conflictos usando la línea de comando git](#gitresolve-Resolver-conflictos-usando-la-línea-de-comando-de-git)

### merge: Mezcla los cambios de develop

El primero de los pasos es merge, se mezclarán los cambios de develop con los que cambios en la rama feature, si algún conflicto habrá que solucionarlo antes de continuar. [ver el apartado resolver conflictos usando la línea de comando git](#gitresolve-Resolver-conflictos-usando-la-línea-de-comando-de-git)

### validate: Ejecuta tests

Se ejecutan todos los test que tenga disponibles nuesto repositorio.

Si no hay recetas pisco que implementen todos los pasos de validate se considerará como un error:

```bash
[14:24:55] Starting flow: [ validate ], steps: [ lint, unit-testing, demo-tests, check-theme ]
[14:24:55] stepper Step error (flow continues) ERROR Step "lint" is not implemented for context "recipe"
[14:24:55] stepper Step error (flow continues) ERROR Step "unit-testing" is not implemented for context "recipe"
[14:24:55] stepper Step error (flow continues) ERROR Step "demo-tests" is not implemented for context "recipe"
[14:24:55] stepper Step error (flow continues) ERROR Step "check-theme" is not implemented for context "recipe"
[14:24:55] Flow [ validate ] finished - 030 ms
[14:24:55] sipper Flow error (execution stopped) ERROR Flow "validate" ended with an error
[14:24:55] Total time - 03 s 176 ms
```

 **Hasta que validate no sea OK la ejecución no continuará**
 
### setVersion: cambia
