# 13. Evaluación de usabilidad

> Borrador para pegar en el documento. Las capturas están en `assets/capturas/heuristica/`.

## 13.1 Metodología

Se realizó una **evaluación heurística** según las 10 heurísticas de usabilidad de Nielsen (1994). El objeto evaluado fue el prototipo navegable en HTML y los wireframes corregidos en Figma (`assets/capturas/figma/`). La evaluación la hizo el equipo con apoyo de herramientas de IA, y cada hallazgo se verificó directamente en el prototipo. Este método no reemplaza las pruebas con usuarios. Por eso se mantiene como trabajo pendiente una prueba en Maze, cuyos resultados se identificarán explícitamente como simulados si no se aplica con participantes reales.

**Tareas recorridas:**

1. Comenzar a facturar siendo un usuario nuevo, desde Inicio hasta Activar cuenta y Requisitos.
2. Encontrar y comparar el plan para Persona Física.
3. Iniciar sesión siendo cliente existente, incluida la recuperación de contraseña.
4. Recargar prepago desde el encabezado.
5. Buscar «necesito ayuda», «planes» y una consulta sin resultados.
6. Navegar en móvil (390 px de ancho).

**Escala de severidad (Nielsen):**

- 0: no es un problema.
- 1: cosmético.
- 2: menor.
- 3: mayor.
- 4: catastrófico.

## 13.2 Resultados

| # | Problema encontrado | Heurística | Sev. | Evidencia | Mejora propuesta |
|---|---|---|---|---|---|
| 1 | «¿Olvidó su contraseña?» lleva a una lista de ayuda y no a un proceso de recuperación. El cliente que no recuerda su clave queda sin salida. | H9 Ayudar a reconocer y recuperarse de errores | 3 | `h-recuperar-contrasena.png` | Crear la página «Recuperar contraseña» (cédula → envío de enlace) y enlazarla desde el formulario. |
| 2 | Los formularios de Activar cuenta, Pagar facturación y Recargar prepago no indican el formato esperado (código, cédula de 9 dígitos o cédula jurídica). | H5 Prevención de errores | 2 | `h-activar-cuenta-sin-formato.png`, `h-recargar-sin-formato.png` | Agregar texto de ayuda con un ejemplo, máscara de entrada y validación en línea. |
| 3 | En los resultados y sugerencias del buscador aparecen términos internos de la clasificación («Accesos del encabezado», «Acceso a operación»). | H2 Relación entre el sistema y el mundo real | 2 | `h-jerga-interna-resultados.png` | Mostrar etiquetas para el usuario («Mi cuenta», «Trámite en línea») y dejar los valores del vocabulario controlado solo como metadatos. |
| 4 | Las sugerencias del buscador no se pueden recorrer con las flechas del teclado; el foco se queda en el campo. | H7 Flexibilidad y eficiencia de uso (también accesibilidad) | 2 | `h-sugerencias-sin-teclado.png` | Implementar el patrón *combobox* de ARIA (flechas, Enter, `aria-activedescendant`). |
| 5 | Dentro de Activar cuenta y Requisitos no se indica en qué paso del proceso de 3 pasos está el usuario. | H1 Visibilidad del estado del sistema | 2 | `h-activar-cuenta-sin-formato.png` | Agregar un indicador de progreso «Paso 2 de 3» en las páginas de Comenzar a facturar. |
| 6 | El orden de los 3 pasos difiere entre los wireframes del documento: en Inicio es plan → activar → registro, y en Comenzar a facturar es plan → registro → activar. | H4 Consistencia y estándares | 2 | Wireframes 12.1 y 12.2.3 | Unificar en plan → activar → registro (orden del sitio real), como ya hace el prototipo. |
| 7 | La página de inicio de sesión todavía dice «Chat / WhatsApp», mientras que el sitemap usa «Canales de soporte». | H4 Consistencia y estándares | 1 | `h-recuperar-contrasena.png` | Usar en todo el sitio la etiqueta del sitemap. |
| 8 | Inicio ya no explica conceptos básicos (¿qué es la factura electrónica?, ¿qué es la ATV?), que sí estaban en el sitio original. | H10 Ayuda y documentación | 2 | `assets/capturas/prototipo/01-inicio.png` | Agregar un bloque de preguntas frecuentes en Comenzar a facturar, enlazado desde «Cómo comenzar». |
| 9 | El botón flotante «¿Necesita ayuda?» tapa parte del contenido (tarjetas de planes, formulario de contacto). | H8 Diseño estético y minimalista | 1 | `h-boton-flotante-tapa-contenido.png` | Reservar un margen inferior y, en escritorio, reducir el botón a solo el ícono al hacer scroll. |
| 10 | «Pagos y recargas» en el encabezado lleva a una página intermedia en vez de mostrar las dos opciones. | H6 Reconocer antes que recordar | 1 | — | Convertirlo en un menú desplegable con «Pagar facturación» y «Recargar prepago». |
| 11 | Algunos enlaces no tienen destino en el prototipo: tiendas de la app, «Iniciar chat», «Redes sociales». | H3 Control y libertad del usuario | 1 | — | Limitación del prototipo; enlazar a los destinos reales en la implementación. |

**Aspectos positivos observados:**

- Migas de pan en todas las páginas internas (H3).
- Buscador persistente con sinónimos y tolerancia a errores (H7).
- Página de «sin resultados» con alternativas (H9).
- Ayuda disponible en todas las páginas (H10).
- Contraste AA en los botones (H8).
- Navegación móvil con menú desplegable y el buscador visible (H4).

## 13.3 Mejoras priorizadas

1. **Severidad 3:** flujo de recuperación de contraseña (problema 1).
2. **Severidad 2:** formatos en formularios, lenguaje del buscador, navegación por teclado, indicador de pasos, orden de pasos unificado y preguntas frecuentes (problemas 2, 3, 4, 5, 6 y 8).
3. **Severidad 1:** etiquetas consistentes, botón flotante y menú de pagos (problemas 7, 9 y 10).

## 13.4 Limitaciones

La evaluación heurística identifica problemas probables según principios reconocidos, pero no mide el desempeño de usuarios reales. Los hallazgos deben validarse con una prueba de tareas (Maze) y con datos de uso (Microsoft Clarity) cuando el prototipo esté publicado.

**Referencia:** Nielsen, J. (1994). *10 usability heuristics for user interface design*. Nielsen Norman Group. https://www.nngroup.com/articles/ten-usability-heuristics/
