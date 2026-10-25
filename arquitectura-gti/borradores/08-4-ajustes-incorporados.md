# 8.4 Ajustes incorporados en el sitemap corregido

> Borrador para agregar al final de la sección 8 (Validación de la arquitectura), después de 8.3. Las figuras de Optimal Workshop están en `assets/capturas/optimal/`.

Los estudios de OptimalSort y Treejack se aplicaron sobre el árbol del Avance 1 (cinco categorías, con «Mi Cuenta»). Sus hallazgos, junto con la retroalimentación del avance, se usaron para construir el **sitemap corregido**, que es el que implementan el prototipo HTML, los wireframes en Figma, el índice de búsqueda en Algolia y el modelo de contenido en Strapi. La siguiente tabla muestra cómo responde la versión final a cada hallazgo.

| Hallazgo (Optimal Workshop) | Ajuste propuesto en 8.3 | Estado en el sitemap corregido |
|---|---|---|
| GTI Conectividad se busca en Herramientas y Recursos (card sorting 2/2; peor resultado del tree testing) | Moverla a Herramientas y Recursos con una etiqueta descriptiva | **Incorporado:** Herramientas y Recursos → «Integraciones y Conectividad GTI» |
| Descargar app se ubica en Herramientas y Recursos (2/2) | Moverla a Herramientas y Recursos | **Incorporado:** Herramientas y Recursos → «Aplicación móvil», también enlazada desde el pie de página |
| Recargar y pagar se buscan en Planes (tarea 3: 50 % directness) | Acceso contextual desde Planes | **Incorporado:** enlaces desde las páginas de Planes y «Pagos y recargas» como acceso persistente en el encabezado |
| Pagar y Recargar sin acuerdo entre Mi Cuenta y Planes | — | **Incorporado:** «Mi Cuenta» se sustituyó por «Comenzar a facturar» (usuarios nuevos) y accesos persistentes en el encabezado (clientes existentes) |
| Leyes y reglamentos no se asocia con Ayuda (tarea 4: 50 % directness) | Mantenerla en Ayuda y Contacto con enlaces contextuales | **Incorporado:** se mantiene en Ayuda y Contacto con enlaces desde Nosotros, Planes, Activar cuenta y Requisitos para facturar |
| Términos de marca poco conocidos (Programa L, Club de Contadores, ATV) | Descripción breve en el menú o en la página | **Incorporado:** el menú muestra una descripción breve bajo Programa L, Club de Contadores e Integraciones y Conectividad GTI; ATV se explica en Requisitos para facturar |

**Versiones del sitemap:**

1. **v1 (Avance 1):** árbol con «Mi Cuenta» evaluado en OptimalSort y Treejack.
2. **v2 (ajustes de Optimal):** `assets/SiteMap_v2_FlowMapp.png` y tablero de Octopus.do actualizado. Aplica los cambios de ubicación y etiquetado derivados de los estudios.
3. **Sitemap corregido (final):** parte de la v2, incorpora los seis ajustes y agrega dos cambios con respaldo: se elimina «Mi Cuenta» (Pagar y Recargar sin acuerdo en el card sorting → acceso persistente «Pagos y recargas») y se crea «Comenzar a facturar» (problemática de las secciones 3 y 7 y Customer Journey). GTI Conectividad pasa a Herramientas y Recursos.

*Limitación:* ambos estudios se hicieron con dos participantes (límite del plan gratuito), así que los porcentajes son indicativos. Confirmar los cambios exigiría repetir el tree testing con el árbol corregido (`exports/optimal-workshop/tree.txt`, 12 tareas en `tasks.csv`) y con más participantes.
