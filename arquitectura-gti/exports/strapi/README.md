# Modelo de contenido en Strapi (Doc secc. 15)

Tipos de contenido y datos para reproducir el CMS con la taxonomía y los metadatos del proyecto.

- `src/api/categoria`: taxonomía (8 categorías: menú principal, encabezado y pie).
- `src/api/publico-objetivo`: vocabulario controlado de audiencias.
- `src/api/pagina`: las 29 páginas del sitemap con sus metadatos (14.4).
- `src/index.js`: carga `seed.json` la primera vez y habilita la lectura pública de la API.
- `seed.json`: se genera con `node tools/build-exports.js` desde `js/sitemap-data.js`.

## Cómo levantarlo (Strapi 5, Node 20 o 22)

```bash
npx create-strapi@latest gti-cms --skip-cloud --no-example --js --dbclient=sqlite --use-npm
cp -r exports/strapi/src/api gti-cms/src/
cp exports/strapi/src/index.js gti-cms/src/index.js
cp exports/strapi/seed.json gti-cms/
cd gti-cms
# si .env tiene DATABASE_FILENAME vacío, ponerle .tmp/data.db y crear la carpeta .tmp
npm run develop
```

Al abrir http://localhost:1337/admin se pide crear el usuario administrador. La API queda en http://localhost:1337/api/paginas?populate=*.
