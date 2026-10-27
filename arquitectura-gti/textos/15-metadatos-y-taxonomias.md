# 15. Metadatos y taxonomías


## 15.1 Enfoque

La propuesta separa tres elementos que trabajan juntos:

- **Taxonomía:** estructura de clasificación del contenido. Dice *dónde* vive cada página.
- **Metadatos:** atributos que describen cada página. Dicen *qué es* y *para quién*.
- **Vocabulario controlado:** lista cerrada de valores permitidos para algunos metadatos. Evita que cada editor clasifique distinto.

Los tres se definen una sola vez en el repositorio (`js/sitemap-data.js`). Desde ahí alimentan la navegación del prototipo, el índice de búsqueda en Algolia (secc. 14) y el gestor de contenidos Strapi. Así se garantiza que menú, buscador y CMS usen la misma clasificación.

## 15.2 Taxonomía

Se usa una **taxonomía jerárquica** de tres niveles (sitio → categoría → subcategoría), la misma del sitemap corregido. Se complementa con **facetas** (tipo de contenido y público objetivo), que permiten clasificar una página en más de una dimensión.

| Categoría | Ubicación | Subcategorías |
|---|---|---|
| Inicio | Menú principal | — |
| Planes | Menú principal | Persona Física · Persona Jurídica · Régimen Especial Agropecuario · Régimen Simplificado |
| Comenzar a facturar | Menú principal | Pasos para comenzar · Requisitos para facturar · Activar cuenta |
| Herramientas y Recursos | Menú principal | Q-Declaro · De Tiquete a Factura · Club de Contadores · Integraciones y Conectividad GTI · Aplicación móvil · Sistema anterior |
| Nosotros | Menú principal | Nuestro servicio · Programa L |
| Ayuda y Contacto | Menú principal | Leyes y reglamentos · Formulario de contacto · Canales de soporte |
| Accesos del encabezado | Encabezado | Iniciar sesión · Pagos y recargas (Pagar facturación · Recargar prepago) |
| Información legal | Pie de página | Política de Administración de Datos |

## 15.3 Vocabularios controlados

| Faceta | Valores permitidos | Uso |
|---|---|---|
| **Tipo de contenido** | Página informativa · Guía · Herramienta · Documento · Acceso a operación | Filtro del buscador (14.5); distingue explicar de hacer. |
| **Público objetivo** | Nuevos clientes · Clientes existentes · Empresas · Profesionales contables · Público general | Filtro del buscador; corresponde a los grupos de usuarios de la secc. 4. |
| **Categoría** | Las 8 categorías de la tabla 15.2 | Navegación, migas de pan y filtro del buscador. |

**Sinónimos.** Son términos equivalentes del vocabulario de los usuarios (14.6). Se registran aparte para no mezclar términos distintos: por ejemplo, «comprar plan» y «recargar prepago» no son equivalentes.

- activar cuenta = activación = código de activación
- aplicación móvil = app = descargar aplicación
- facturación prepago = prepago = recargar saldo
- reglamentos = normativa = leyes
- contactar = soporte = atención = ayuda
- integración = conectividad = ERP

## 15.4 Modelo de metadatos

| Metadato | Campo en Strapi | Atributo en Algolia | Tipo / valores | Obligatorio |
|---|---|---|---|---|
| Identificador | `identificador` | `objectID` | Texto único (GTI-000…GTI-028) | Sí |
| Título | `titulo` | `title` | Texto | Sí |
| Descripción | `descripcion` | `description` | Texto | Sí |
| Categoría | `categoria` (relación → Categoría) | `category` | Vocabulario controlado | Sí |
| Subcategoría | `paginaPadre` (relación → Página) | `subcategory` | Jerarquía | No |
| Palabras clave | `palabrasClave` | `keywords` | Lista de términos | Sí |
| Público objetivo | `publicos` (relación → Público objetivo) | `audience` | Vocabulario controlado (varios) | Sí |
| Tipo de contenido | `tipoContenido` | `contentType` | Vocabulario controlado (enumeración) | Sí |
| URL | `url` | `url` | Ruta | Sí |
| Etiqueta anterior | `etiquetaAnterior` | — | Texto (trazabilidad del sistema de etiquetado, secc. 10.2) | No |
| Sitio externo | `externo` | `external` | Sí/No | No |
| Fecha de actualización | `fechaActualizacion` | `updatedAt` | Fecha | Sí |

## 15.5 Ejemplos de clasificación

| Contenido | Categoría › Subcategoría | Tipo de contenido | Público objetivo | Palabras clave |
|---|---|---|---|---|
| Activar cuenta (GTI-009) | Comenzar a facturar › Activar cuenta | Acceso a operación | Nuevos clientes | activar, cuenta, activación, código, código de activación, registro |
| Persona Física (GTI-002) | Planes › Persona Física | Página informativa | Nuevos clientes | persona física, independiente, profesional, planes |
| Q-Declaro (GTI-011) | Herramientas y Recursos › Q-Declaro | Herramienta | Empresas, Profesionales contables | Q-Declaro, contabilidad, declaración, impuestos |
| Aplicación móvil (GTI-015) | Herramientas y Recursos › Aplicación móvil | Herramienta | Clientes existentes | aplicación, app, móvil, celular, descargar |
| Leyes y reglamentos (GTI-021) | Ayuda y Contacto › Leyes y reglamentos | Documento | Público general, Profesionales contables | leyes, reglamentos, normativa, resoluciones, Hacienda |

## 15.6 Gestión de contenidos con Strapi

Para mostrar cómo se gestionaría esta clasificación, se implementó el modelo en **Strapi 5**, un CMS *headless* de código abierto. Se instaló localmente con base de datos SQLite.

**Tipos de contenido** (archivos en `exports/strapi/src/api/`):

- **Categoría:** la taxonomía. Campos: nombre, slug, descripción, orden y ubicación (menú principal / encabezado / pie).
- **Público objetivo:** el vocabulario controlado de audiencias.
- **Página:** cada nodo del sitemap con los metadatos de la tabla 15.4. Se relaciona con su Categoría, con su página padre (jerarquía) y con uno o varios Públicos objetivo. El tipo de contenido es una enumeración cerrada.

**Carga.** Las 8 categorías, 5 públicos y 29 páginas se cargaron automáticamente desde `exports/strapi/seed.json`, que se genera desde el mismo archivo que alimenta a Algolia.

**Consulta.** Strapi expone el contenido clasificado por una API REST, por ejemplo `/api/paginas?filters[slug][$eq]=activar-cuenta&populate=categoria,publicos`. Desde ahí se puede enviar al buscador o a cualquier interfaz.

**Capturas (`assets/capturas/strapi/`):**

- Modelo de Página y de Categoría en el *Content-Type Builder*.
- Listado de las 29 páginas.
- Listado de las categorías y del vocabulario de públicos.
- Ficha de «Activar cuenta» con sus relaciones.
- Respuesta de la API.

**Comparación con Contentful.**

| Criterio | Strapi | Contentful |
|---|---|---|
| Modelo | Código abierto, autoalojado o en la nube | SaaS en la nube |
| Modelado | Tipos de contenido, relaciones y enumeraciones en el panel o en archivos JSON versionables | Modelos de contenido en la web; campos de referencia y validaciones |
| Taxonomía | Relaciones entre colecciones (como en esta propuesta) | Ofrece además un módulo de *Taxonomy* (conceptos y esquemas de conceptos) y etiquetas |
| Costo para el proyecto | Gratuito en local | Requiere cuenta; plan gratuito con límites |

Se eligió Strapi porque permite versionar el modelo de contenido en el repositorio, junto al sitemap, y ejecutarlo sin cuentas externas. La propuesta es equivalente en Contentful.

## 15.7 Relación entre metadatos, navegación y recuperación

- La **categoría y la subcategoría** construyen el menú, las migas de pan y el pie de página, y en el buscador se muestran como la ruta de cada resultado.
- El **tipo de contenido** y el **público objetivo** no cambian la navegación, pero son las facetas que permiten filtrar los resultados (14.5).
- Las **palabras clave** y los **sinónimos** conectan el lenguaje de los usuarios con las etiquetas oficiales. Por ejemplo, «app» encuentra Aplicación móvil y «normativa» encuentra Leyes y reglamentos.
- Como todo sale de una fuente única, un cambio de etiqueta o de categoría se refleja a la vez en el menú, el CMS y el índice de búsqueda. Así se evita la inconsistencia de etiquetado detectada en el sitio actual.

**Referencias:**

- Rosenfeld, L., Morville, P., & Arango, J. (2015). *Information architecture: For the web and beyond* (4th ed.). O'Reilly Media.
- Strapi. (s. f.). *Content-type Builder*. Strapi Documentation. https://docs.strapi.io/cms/features/content-type-builder
- Contentful. (s. f.). *Taxonomy*. Contentful Help Center. https://www.contentful.com/help/taxonomy/
