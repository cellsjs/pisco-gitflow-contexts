---
title: Resolving conflicts with git
layout: doc_page.html
---

# Resolver conflictos usando la línea de comando de git

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