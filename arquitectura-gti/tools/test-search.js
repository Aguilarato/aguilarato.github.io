/* Prueba las consultas de la secc. 14.7 contra el buscador local. Uso: node tools/test-search.js */
global.window = global;
require("../js/sitemap-data.js");
const S = require("../js/search.js");
const recs = S.buildRecords({ sitemap: GTI_SITEMAP, utility: GTI_UTILITY, legal: GTI_LEGAL, updated: GTI_UPDATED });
const CASES = require("./search-cases.js");
let fail = 0;
for (const c of CASES) {
  const hits = S.localSearch(recs, c.q);
  const ok = hits[0] && hits[0].title === c.expect;
  if (!ok) fail++;
  console.log((ok ? "OK  " : "FALLA") + "  \"" + c.q + "\" → " + (hits[0] ? hits[0].title : "(sin resultados)") + (ok ? "" : "   (esperado: " + c.expect + ")"));
}
const none = S.localSearch(recs, "zzqx");
console.log((none.length === 0 ? "OK  " : "FALLA") + "  consulta sin coincidencias → " + none.length + " resultados");
if (none.length) fail++;
process.exit(fail ? 1 : 0);
