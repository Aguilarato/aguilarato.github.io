'use strict';
/*
 * Carga inicial (seed) de la taxonomía y las páginas desde ../seed.json la primera vez que arranca Strapi,
 * y habilita la lectura pública de la API (find/findOne) para consultar los metadatos.
 * seed.json se genera con: node tools/build-exports.js
 */
const path = require('path');
const fs = require('fs');

module.exports = {
  register() {},
  async bootstrap({ strapi }) {
    const docs = (uid) => strapi.documents(uid);
    if ((await docs('api::categoria.categoria').count()) === 0) {
      const seed = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'seed.json'), 'utf8'));
      const cat = {}, pub = {}, pag = {};
      for (const c of seed.categorias) cat[c.nombre] = (await docs('api::categoria.categoria').create({ data: c })).documentId;
      for (const p of seed.publicos) pub[p.nombre] = (await docs('api::publico-objetivo.publico-objetivo').create({ data: p })).documentId;
      for (const p of seed.paginas) {
        const { categoria, publicos, paginaPadre, ...data } = p;
        data.categoria = cat[categoria];
        data.publicos = publicos.map((n) => pub[n]);
        if (paginaPadre) data.paginaPadre = pag[paginaPadre]; // los padres van antes que los hijos en seed.json
        pag[p.identificador] = (await docs('api::pagina.pagina').create({ data })).documentId;
      }
      strapi.log.info(`Seed GTI: ${seed.categorias.length} categorías, ${seed.publicos.length} públicos, ${seed.paginas.length} páginas`);
    }
    const role = await strapi.db.query('plugin::users-permissions.role').findOne({ where: { type: 'public' } });
    for (const t of ['categoria', 'publico-objetivo', 'pagina']) for (const a of ['find', 'findOne']) {
      const action = `api::${t}.${t}.${a}`;
      const exists = await strapi.db.query('plugin::users-permissions.permission').findOne({ where: { action, role: role.id } });
      if (!exists) await strapi.db.query('plugin::users-permissions.permission').create({ data: { action, role: role.id } });
    }
  },
};
