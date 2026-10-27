# Proyecto Integrador EIF-511 — Arquitectura de Información para FacturaElectronica.cr

Universidad Nacional de Costa Rica · EIF-511 Arquitectura de Información
Profesora: Cynthia Vanessa Bolaños Espinoza
Grupo 03: Luis Aguilar Bolaños · Ceasar Calvo Muñoz · Derrek Ureña Solis

Sitio analizado: <https://www.facturaelectronica.cr/> (GTI — Gestión en Tecnología e Información)

# 1. Resumen

Problemática: el sitio atiende a usuarios en etapas muy distintas (quien investiga, quien compra, quien activa, el cliente que factura, quien busca soporte), pero agrupa los contenidos por marca o producto en lugar de por tarea:

- «Servicios» y «Herramientas» son etiquetas genéricas.
- El perfil fiscal está oculto dentro de Planes.
- El contenido legal está aislado en «Acerca de».
- El login solo está en Home y el chatbot solo en un footer.
- El menú usa doPostBack (no tiene URLs reales).

Propuesta (sitemap final, Doc secc. 8–10): esquema híbrido tarea + audiencia, jerárquico de 3 niveles, con 6 categorías + accesos persistentes en el encabezado + información legal en el pie.

| # | Categoría | Subcategorías |
|---|-----------|---------------|
| 1 | Inicio | — |
| 2 | Planes | Persona Física · Persona Jurídica · Régimen Especial Agropecuario · Régimen Simplificado |
| 3 | Comenzar a facturar | Pasos para comenzar · Requisitos para facturar · Activar cuenta |
| 4 | Herramientas y Recursos | Q-Declaro · De Tiquete a Factura · Club de Contadores · Integraciones y Conectividad GTI · Aplicación móvil · Sistema anterior |
| 5 | Nosotros | Nuestro servicio · Programa L |
| 6 | Ayuda y Contacto | Leyes y reglamentos · Formulario de contacto · Canales de soporte |
| — | Encabezado | Buscador · Iniciar sesión · Pagos y recargas (Pagar facturación · Recargar prepago) |
| — | Pie | Información legal (Política de Administración de Datos) |

# 2. Estructura del proyecto

```
Arquitectura/
├── index.html                  Inicio (wireframe 12.1)
├── buscar.html                 Resultados de búsqueda con filtros (secc. 14.5–14.7)
├── planes/                     2. Planes + 4 perfiles fiscales (wireframe 12.2.3)
├── comenzar/                   3. Comenzar a facturar, Pasos, Requisitos, Activar cuenta (wireframe 12.2.2)
├── herramientas/               4. Q-Declaro, De Tiquete a Factura, Club, Conectividad, App móvil, Sistema anterior
├── nosotros/                   5. Nuestro servicio, Programa L
├── ayuda/                      6. Leyes, Contacto, Canales de soporte (wireframe 12.2.1)
├── cuenta/                     Accesos del encabezado: Iniciar sesión, Pagos y recargas
├── legal/                      Pie: Política de Administración de Datos
├── docs/                       herramientas.html (evidencias), busqueda.html (pruebas del buscador) y texto.html (visor de textos)
├── exports/                    Archivos para importar en las herramientas (se regeneran, ver abajo)
│   ├── sitemap.xml / .csv      FlowMapp / Octopus.do
│   ├── octopus-outline.txt     Octopus.do
│   ├── algolia/                records.json, settings.json, synonyms.json, rules.json
│   ├── optimal-workshop/       tree.txt (árbol Treejack) y tasks.csv (12 tareas)
│   ├── strapi/                 Tipos de contenido (taxonomía, públicos, páginas) + seed.json
│   ├── journey/                Customer Journey en JSON y CSV (importable en Miro)
│   └── figma/pantallas.html    HTML autocontenido de las 5 pantallas (para html.to.design)
├── textos/                     Textos de los apartados 11.4, 13, 15 y 16 del documento
├── assets/capturas/            Evidencias: algolia, figma, prototipo, strapi, heuristica, journey
├── tools/
│   ├── build-exports.js        node tools/build-exports.js → regenera exports/
│   ├── test-search.js          node tools/test-search.js → prueba las consultas de la 14.7
│   └── search-cases.js         consultas de prueba y resultado esperado
├── css/styles.css              Paleta de los wireframes (beige + naranja, contraste AA)
└── js/
    ├── sitemap-data.js         FUENTE ÚNICA de la arquitectura y los metadatos (14.4)
    ├── search.js               Buscador: local o Algolia (mismas reglas de relevancia)
    ├── search-config.js        App ID + Search-Only Key de Algolia (vacío = modo local)
    └── layout.js               Encabezado con buscador, menú, migas, pie y botón de ayuda
```

### `js/sitemap-data.js`: la fuente única

Las categorías, subcategorías, etiquetas, etiquetas anteriores, tipos de contenido, bloques y metadatos de búsqueda (palabras clave, público objetivo, tipo de contenido, con vocabulario controlado en `GTI_VOCAB`) se definen **una sola vez** en este archivo. A partir de él se generan:

- el menú principal y los submenús,
- las migas de pan,
- los accesos del encabezado y el pie de página,
- el índice del buscador y todos los archivos de `exports/` (`node tools/build-exports.js`).

Si se renombra una etiqueta ahí, el cambio aparece en todo el sitio, lo que garantiza un etiquetado consistente.

## 4. Herramientas de la guía y versión del sitemap

El sitemap tuvo tres versiones: la **inicial** (primer avance, con «Mi Cuenta»), la **versión 2** con los ajustes propuestos a partir de Optimal Workshop y la **versión final**, la de este repositorio. FlowMapp y Octopus.do conservan la versión 2 como registro; el resto de las herramientas se aplicó sobre la versión final.

| Semana | Herramienta | Aplicación al proyecto | Versión del sitemap | Evidencia |
|---|---|---|---|---|
| 4 | FlowMapp | Diseño del sitemap | Inicial y versión 2 | `assets/SiteMap_v2_FlowMapp.png`; versión final en `assets/SiteMap_corregido.png` y `exports/sitemap.xml` |
| 5 | Octopus.do | Organización jerárquica y etiquetado | Inicial y versión 2 | [Tablero](https://octopus.do/ehdjf242j8h); versión final en `exports/octopus-outline.txt` |
| 6 | Optimal Workshop | Validación con card sorting y tree testing | Inicial | `assets/capturas/optimal/`; ajustes en `textos/11-4-ajustes-incorporados.md` |
| 7 | Figma + FigJam | Wireframes de las principales pantallas | Final | [Wireframes](https://www.figma.com/design/o0hd4Xfn45ygl4PVb7DRf7) y [flujo en FigJam](https://www.figma.com/board/D7GIEBK7ICql2tinT7rnpz) |
| 8 | Evaluación de usabilidad | Evaluación heurística (alternativa a Maze y Clarity) | Final | `textos/13-evaluacion-de-usabilidad.md`, `assets/capturas/heuristica/` |
| 10 | Algolia + Azure AI Search | Buscador y estrategia de recuperación | Final | Índice `gti_contenidos`; pruebas en `docs/busqueda.html` |
| 11 | Contentful + Strapi | Metadatos, taxonomías y vocabularios controlados | Final | `exports/strapi/`, `textos/15-metadatos-y-taxonomias.md` |
| 12 | Miro (FigJam) | Customer Journey | Final | [Mapa en FigJam](https://www.figma.com/board/bt09biHBOxATfWGoPhBO8v), `exports/journey/` |
| 13 | IA generativa | Uso crítico de IA | Transversal | Sección 17 del documento |

Prototipo publicado: <https://aguilarato.github.io/arquitectura-gti/>

# Qué se implementó en cada tema

**1–3. Presentación y sistemas de organización.** Introducción, organización, problemática, objetivos, usuarios, inventario, análisis de la estructura actual y propuesta de organización están en el documento del proyecto. En el repo, la propuesta se materializa en el **prototipo HTML navegable**: una vista por cada nodo del sitemap corregido, basada en los wireframes 12.x.

**4. FlowMapp y 5. Octopus.do.** Sitemap y jerarquía con bloques de contenido. Las herramientas conservan la versión 2; la versión final se exporta desde `js/sitemap-data.js` en `exports/sitemap.xml`, `sitemap.csv` y `octopus-outline.txt`.

**6. Optimal Workshop.** Card sorting y tree testing sobre el sitemap inicial; sus hallazgos están incorporados en la versión final. Para repetir el tree testing con el árbol nuevo: `exports/optimal-workshop/`.

**7. Figma + FigJam.** Wireframes con prototipo navegable y flujo «Comenzar a facturar».

**8. Evaluación de usabilidad.** Evaluación heurística de Nielsen con 11 hallazgos (`textos/13-evaluacion-de-usabilidad.md`).

**10. Algolia.** Metadatos por página, sinónimos, facetas y una regla de relevancia. Buscador en el encabezado con sugerencias, página de resultados con filtros y manejo de búsquedas sin resultados.

**11. Strapi.** Taxonomía, vocabulario controlado y metadatos como tipos de contenido, con las 29 páginas cargadas (`exports/strapi/`).

**12. Customer Journey.** Mapa en FigJam y datos en CSV (`exports/journey/`).

Todas las evidencias (capturas y enlaces) se pueden ver en **`docs/herramientas.html`**.
