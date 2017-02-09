---
title: Qué es Pisco GitFlow?
layout: doc_page.html
---

# ¿Qué es **Pisco GitFlow**?

Partiendo de modelo GitFlow (http://nvie.com/posts/a-successful-git-branching-model/) para el manejo de releases basado en ramas, se ha desarrollado una metodología para la gestión de la promoción de código, generación de artefactos y versionado automático. (metodología explicada en detalle aquí [enlace a otro documento])

Estos son los principios fundamentales de la metodología:

 - **Publicación directa de cógido en master y develop no permitida**
 - **Unificar versiones y tags:** La versión del código fuente (bower.json, package.json, \*.gradle, pom.xml ...), la versión de los artefactos y los tags en el scm tienen que ser **coherentes y únicos**

Se han desarrollado un conjunto de recetas piscosour que automatizan gran cantidad de las tareas involucradas en la metodología **Pisco GitFlow**

Estas tareas son:

 - **init**: Convierte un repositorio cualquiera en un repositorio preparado para **Pisco GitFlow**
 - **start**: Crea una rama nueva dentro de **Pisco GitFlow** .
 - **finish**: Termina una rama **Pisco GitFlow** .
 - **merge**: Mezcla los cambios de master en una rama merger para posteriormente ser mezclados en develop.

 [English version](../../en/users/get_started010whatis.html)