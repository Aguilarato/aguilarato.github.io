/*
 * Buscador del prototipo (Doc secc. 14). Mismo modelo de registros que se exporta a Algolia.
 * - Sin credenciales: busca localmente con las reglas de relevancia de la secc. 14.6
 *   (título > palabras clave > categoría/subcategoría > descripción, sinónimos, tolerancia a errores).
 * - Con js/search-config.js completo: consulta el índice real de Algolia por REST.
 * Funciona en el navegador (window.GTISearch) y en Node (module.exports) para tools/.
 */
(function (g) {
  /* Sinónimos de la tabla 14.6. Grupos de palabras equivalentes (sin tildes). */
  var SYNONYMS = [
    ["activar", "activacion", "codigo"],
    ["aplicacion", "app", "movil", "celular"],
    ["prepago", "recargar", "recarga", "saldo"],
    ["reglamentos", "reglamento", "normativa", "leyes", "ley"],
    ["contactar", "soporte", "atencion", "ayuda", "asistencia"],
    ["integracion", "integrar", "conectividad", "erp"]
  ];
  /* Reglas de consulta (equivalen a las Query Rules de Algolia): si la consulta contiene el
     término, el registro indicado sube al primer lugar. "ayuda" coincide con el título de la
     portada Ayuda y Contacto, pero la intención es contactar a soporte (14.7). */
  var RULES = [{ id: "ayuda-soporte", contains: "ayuda", promote: "Canales de soporte" }];
  var STOP = "a al como cual de del el en es la las lo los mi mis me necesito para por puedo que quiero se su sus un una y o donde hacer".split(" ");

  function norm(s) {
    return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9ñ\s-]/g, " ");
  }
  function words(s) { return norm(s).split(/[\s-]+/).filter(Boolean); }
  function tokens(q) { return words(q).filter(function (w) { return STOP.indexOf(w) < 0; }); }

  function lev(a, b) {
    if (Math.abs(a.length - b.length) > 2) return 3;
    var prev = [], i, j;
    for (j = 0; j <= b.length; j++) prev[j] = j;
    for (i = 1; i <= a.length; i++) {
      var cur = [i];
      for (j = 1; j <= b.length; j++)
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = cur;
    }
    return prev[b.length];
  }
  function synonymsOf(t) {
    for (var i = 0; i < SYNONYMS.length; i++) if (SYNONYMS[i].indexOf(t) >= 0) return SYNONYMS[i];
    return [];
  }
  /* Calidad de coincidencia de un término contra una palabra: 1 exacta, .9 sinónimo, .8 prefijo, .6 error tipográfico. */
  function match(t, w) {
    if (t === w) return 1;
    if (synonymsOf(t).indexOf(w) >= 0) return 0.9;
    if (t.length >= 3 && w.indexOf(t) === 0) return 0.8;
    var tol = t.length >= 8 ? 2 : t.length >= 4 ? 1 : 0; // como el typoTolerance de Algolia
    if (tol && lev(t, w) <= tol) return 0.6;
    return 0;
  }

  /* ---------- Registros (modelo 14.4) ---------- */
  function buildRecords(data) {
    var recs = [], n = 0;
    function add(node, category, parent) {
      n++;
      recs.push({
        objectID: "GTI-" + String(n).padStart(3, "0"),
        title: node.label,
        description: node.desc,
        category: category,
        subcategory: parent ? node.label : "",
        keywords: node.kw || [],
        audience: node.aud || [],
        contentType: node.ctype,
        url: node.url,
        external: !!node.external,
        isHub: !!node.children,
        path: parent ? [category, node.label] : [category],
        updatedAt: data.updated
      });
      (node.children || []).forEach(function (c) { add(c, category, node); });
    }
    data.sitemap.forEach(function (top) { if (top.url !== "index.html") add(top, top.label, null); });
    data.utility.forEach(function (u) { add(u, "Accesos del encabezado", null); });
    data.legal.forEach(function (l) { add(l, "Información legal", null); });
    return recs;
  }

  var ATTRS = [["title", 10], ["keywords", 7], ["subcategory", 4], ["category", 4], ["description", 2]];

  function scoreRecord(rec, toks) {
    var matched = 0, score = 0;
    toks.forEach(function (t) {
      var best = 0;
      ATTRS.forEach(function (a) {
        var val = rec[a[0]];
        var ws = words(Array.isArray(val) ? val.join(" ") : val || "");
        ws.forEach(function (w) { var m = match(t, w); if (m * a[1] > best) best = m * a[1]; });
      });
      if (best > 0) { matched++; score += best; }
    });
    if (rec.isHub) score -= 1;              // 14.6 "relación con la intención": la página concreta antes que la portada de categoría
    if (tokens(rec.title).join(" ") === toks.join(" ")) score += 5; // la consulta es exactamente el título
    return { matched: matched, score: score };
  }

  function localSearch(records, q, filters) {
    var toks = tokens(q);
    if (!toks.length) return [];
    var res = records.map(function (r) { var s = scoreRecord(r, toks); return { rec: r, matched: s.matched, score: s.score }; })
      .filter(function (x) { return x.matched > 0 && passes(x.rec, filters); });
    // como removeWordsIfNoResults: primero los que cumplen todos los términos
    res.sort(function (a, b) { return b.matched - a.matched || b.score - a.score; });
    var full = res.filter(function (x) { return x.matched === toks.length; });
    var out = (full.length ? full : res).map(function (x) { return x.rec; });
    RULES.forEach(function (r) {
      if (toks.indexOf(r.contains) < 0) return;
      var i = out.findIndex(function (h) { return h.title === r.promote; });
      if (i > 0) out.unshift(out.splice(i, 1)[0]);
    });
    return out;
  }

  function passes(rec, f) {
    if (!f) return true;
    if (f.category && rec.category !== f.category) return false;
    if (f.contentType && rec.contentType !== f.contentType) return false;
    if (f.audience && rec.audience.indexOf(f.audience) < 0) return false;
    return true;
  }

  /* ---------- Algolia (REST, sin dependencias) ---------- */
  function algoliaSearch(cfg, q, f) {
    var facetFilters = [];
    if (f && f.category) facetFilters.push("category:" + f.category);
    if (f && f.contentType) facetFilters.push("contentType:" + f.contentType);
    if (f && f.audience) facetFilters.push("audience:" + f.audience);
    return fetch("https://" + cfg.appId + "-dsn.algolia.net/1/indexes/" + encodeURIComponent(cfg.indexName) + "/query", {
      method: "POST",
      headers: { "X-Algolia-Application-Id": cfg.appId, "X-Algolia-API-Key": cfg.searchKey, "Content-Type": "application/json" },
      body: JSON.stringify({ query: q, facetFilters: facetFilters, hitsPerPage: 20 })
    }).then(function (r) { if (!r.ok) throw new Error("Algolia " + r.status); return r.json(); })
      .then(function (j) { return j.hits; });
  }

  var api = {
    SYNONYMS: SYNONYMS, RULES: RULES, buildRecords: buildRecords, localSearch: localSearch, tokens: tokens,
    /* Devuelve una promesa con {hits, engine}. Si Algolia falla, cae al buscador local. */
    search: function (records, q, filters) {
      var cfg = g.GTI_SEARCH_CONFIG;
      if (cfg && cfg.appId && cfg.searchKey) {
        return algoliaSearch(cfg, q, filters).then(function (h) { return { hits: h, engine: "Algolia" }; })
          .catch(function () { return { hits: localSearch(records, q, filters), engine: "local" }; });
      }
      return Promise.resolve({ hits: localSearch(records, q, filters), engine: "local" });
    }
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  g.GTISearch = api;
})(typeof window !== "undefined" ? window : globalThis);
