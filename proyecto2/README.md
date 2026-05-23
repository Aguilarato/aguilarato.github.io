# Proyecto 2 — GameVault (prototipo HTML)

Prototipo del sitio de tienda de videojuegos analizado en el **Proyecto 1** (Steam, catálogo en `Proyecto1, Catálogo.xlsx`).

**Autores:** Luis A. Aguilar Bolaños, Pablo A. Alvarado Umaña — EIF 506, UNA 2026.

## Publicación

Publicar la carpeta `Proyecto 2` en GitHub Pages (por ejemplo `aguilarato.github.io/proyecto2/`). En el PDF del aula virtual incluir el enlace público.

## Estructura del sitio

| Página | Archivo | Requisito cubierto |
|--------|---------|-------------------|
| Inicio | `index.html` | Cabecera, sidebar, carrusel, rejillas por categoría |
| Categoría | `categoria.html?cat=N` | Listado con paginación |
| Búsqueda | `busqueda.html?q=` | Campo en cabecera + resultados |
| Detalle (pestañas) | `juego-elden-ring.html` | Pestañas + navegación asociativa |
| Detalle (acordeón) | `juego-hades.html` | Acordeón + relacionados |
| Detalle (secciones) | `juego-baldurs-gate-3.html` | Secciones con títulos |
| Detalle genérico | `juego.html?id=N` | Tarjetas para el resto del catálogo |
| Carrito | `carrito.html` | E-commerce |
| Facturación | `facturacion.html` | Formularios (permisivo, estructurado, sugerencias) |
| Entrega | `entrega.html` | Rellenar espacios, indicadores |
| Bosquejos | `bosquejos/index.html` (+ 10 archivos) | Wireframes HTML separados |

## Formularios (patrones de diseño)

- **Formato permisivo:** nombre completo en facturación.
- **Formato estructurado:** número de tarjeta, vencimiento y CVV agrupados.
- **Rellenar espacios en blanco:** dirección en `entrega.html`.
- **Sugerencias de entrada:** `datalist` en búsqueda y correo.
- **Indicador de entrada:** iconos en correo y teléfono.

## Datos del catálogo

```bash
python scripts/build_catalog.py
```

Regenera `js/catalog.js` desde el Excel del Proyecto 1.

## Entregables al aula virtual

1. **PDF** con capturas de `bosquejos/` y de cada página HTML (bosquejo + resultado codificado).
2. **ZIP** con todos los archivos HTML/CSS/JS de esta carpeta.
3. **Enlace** al sitio publicado en el PDF y en el ZIP (archivo `ENLACE.txt` opcional).

## Vista local

Abrir `index.html` en el navegador o usar un servidor estático:

```bash
python -m http.server 8080
```

Luego visitar `http://localhost:8080/`.
