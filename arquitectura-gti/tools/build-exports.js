/*
 * Regenera todos los archivos de exports/ a partir de js/sitemap-data.js.
 * Uso: node tools/build-exports.js   (correr después de cambiar el sitemap)
 */
global.window = global;
require("../js/sitemap-data.js");
const S = require("../js/search.js");
const fs = require("fs");
const path = require("path");
const OUT = path.join(__dirname, "..", "exports");
const BASE = "https://www.facturaelectronica.cr/";
const write = (f, s) => { fs.mkdirSync(path.dirname(path.join(OUT, f)), { recursive: true }); fs.writeFileSync(path.join(OUT, f), s); console.log("exports/" + f); };
const pretty = url => BASE + url.replace(/(index)?\.html$/, "").replace(/\/$/, "");

/* Árbol completo: menú principal + accesos del encabezado + información legal */
const TREE = [
  ...GTI_SITEMAP,
  { id: "H", label: "Accesos del encabezado", url: "", type: "Utilitario", children: GTI_UTILITY, virtual: true },
  { id: "F", label: "Pie de página · Información legal", url: "", type: "Legal", children: GTI_LEGAL, virtual: true }
];
const flat = [];
(function walk(nodes, parent, level) {
  nodes.forEach(n => { flat.push({ n, parent, level }); walk(n.children || [], n, level + 1); });
})(TREE, null, 1);

/* ---------- FlowMapp / Octopus.do ---------- */
const q = s => '"' + String(s || "").replace(/"/g, '""') + '"';
write("sitemap.csv", "﻿id,nivel,etiqueta,padre,url_propuesta,etiqueta_actual,tipo\n" +
  flat.map(({ n, parent, level }) => [n.id, level, n.label, parent ? parent.label : (n.id === "1" ? "" : "Inicio"),
    n.url ? pretty(n.url) : "", n.old || "", n.type].map(q).join(",")).join("\n") + "\n");

write("sitemap.xml", '<?xml version="1.0" encoding="UTF-8"?>\n<!-- Sitemap corregido FacturaElectronica.cr - EIF-511 Grupo 03. Importable en FlowMapp y Octopus.do -->\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  flat.filter(x => x.n.url).map(x => "  <url><loc>" + pretty(x.n.url) + "</loc><lastmod>" + GTI_UPDATED + "</lastmod></url>").join("\n") + "\n</urlset>\n");

write("octopus-outline.txt",
  "Organización jerárquica y bloques de contenido (Octopus.do) - FacturaElectronica.cr (sitemap corregido)\n" +
  "Nivel 1 = categoría · Nivel 2 = subcategoría · [bloque] = contenido de la página (nivel 3)\n\n" +
  flat.map(({ n, level }) => "    ".repeat(level - 1) + n.id + ". " + n.label + (n.type && level > 1 ? "  (" + n.type + ")" : "") + "\n" +
    (n.blocks || []).map(b => "    ".repeat(level) + "[bloque] " + b + "\n").join("")).join(""));

/* ---------- Algolia (Doc secc. 14) ---------- */
const records = S.buildRecords({ sitemap: GTI_SITEMAP, utility: GTI_UTILITY, legal: GTI_LEGAL, updated: GTI_UPDATED });
write("algolia/records.json", JSON.stringify(records, null, 2) + "\n");
write("algolia/settings.json", JSON.stringify({
  searchableAttributes: ["title", "keywords", "category,subcategory", "unordered(description)"],
  attributesForFaceting: ["searchable(category)", "contentType", "audience"],
  customRanking: ["asc(isHub)"],
  attributesToSnippet: ["description:20"],
  queryLanguages: ["es"], indexLanguages: ["es"],
  ignorePlurals: true, removeStopWords: true,
  typoTolerance: true, minWordSizefor1Typo: 4, minWordSizefor2Typos: 8,
  removeWordsIfNoResults: "allOptional",
  hitsPerPage: 20
}, null, 2) + "\n");
/* Tabla de sinónimos 14.6 (sinónimos regulares; "comprar plan" y "recargar prepago" NO son equivalentes) */
const SYN = [
  ["activar cuenta", "activación", "código de activación"],
  ["aplicación móvil", "app", "descargar aplicación"],
  ["facturación prepago", "prepago", "recargar saldo"],
  ["reglamentos", "normativa", "leyes"],
  ["contactar", "soporte", "atención", "ayuda"],
  ["integración", "conectividad", "ERP"]
];
write("algolia/synonyms.json", JSON.stringify(SYN.map((s, i) => ({ objectID: "syn-" + (i + 1), type: "synonym", synonyms: s })), null, 2) + "\n");
write("algolia/rules.json", JSON.stringify(S.RULES.map(r => ({
  objectID: r.id, description: "Promover " + r.promote + " cuando la consulta contiene «" + r.contains + "»",
  conditions: [{ pattern: r.contains, anchoring: "contains" }],
  consequence: { promote: [{ objectID: records.find(x => x.title === r.promote).objectID, position: 0 }] }
})), null, 2) + "\n");

/* ---------- Strapi (Doc secc. 15): taxonomía + vocabulario controlado + páginas ---------- */
const slug = t => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const CTYPE = { "Página informativa": "pagina_informativa", "Guía": "guia", "Herramienta": "herramienta", "Documento": "documento", "Acceso a operación": "acceso_a_operacion" };
const CATS = [
  ...GTI_SITEMAP.map((c, i) => ({ nombre: c.label, slug: slug(c.label), descripcion: c.desc, orden: i + 1, ubicacion: "menu_principal" })),
  { nombre: "Accesos del encabezado", slug: "accesos-del-encabezado", descripcion: "Accesos persistentes para clientes existentes.", orden: 90, ubicacion: "encabezado" },
  { nombre: "Información legal", slug: "informacion-legal", descripcion: "Documentos legales del pie de página.", orden: 99, ubicacion: "pie" }
];
const ID = Object.fromEntries(records.map(r => [r.url, r.objectID])); // mismo identificador que en Algolia
const paginas = [];
const addPage = (n, cat, parent) => {
  paginas.push({ identificador: ID[n.url] || "GTI-000" /* Inicio no está en el índice */, titulo: n.label, slug: slug(n.label), descripcion: n.desc,
    url: n.url, categoria: cat, paginaPadre: parent ? ID[parent.url] : null, tipoContenido: CTYPE[n.ctype], publicos: n.aud,
    palabrasClave: n.kw, etiquetaAnterior: n.old, tipoInventario: n.type, externo: !!n.external, fechaActualizacion: GTI_UPDATED });
  (n.children || []).forEach(c => addPage(c, cat, n));
};
GTI_SITEMAP.forEach(c => addPage(c, c.label, null));
GTI_UTILITY.forEach(u => addPage(u, "Accesos del encabezado", null));
GTI_LEGAL.forEach(l => addPage(l, "Información legal", null));
write("strapi/seed.json", JSON.stringify({ categorias: CATS, publicos: GTI_VOCAB.aud.map(a => ({ nombre: a })), paginas }, null, 2) + "\n");

/* ---------- Optimal Workshop · Treejack (Doc secc. 11) ---------- */
// Treejack: pegar el árbol con un nivel de sangría (tab) por nivel.
write("optimal-workshop/tree.txt", flat.map(({ n, level }) => "\t".repeat(level - 1) + n.label).join("\n") + "\n");
const TASKS = [
  ["Ya eres cliente de GTI y quieres ingresar a tu cuenta.", "Accesos del encabezado > Iniciar sesión"],
  ["Acabas de adquirir un plan y necesitas ingresar el código para activar tu cuenta.", "Comenzar a facturar > Activar cuenta"],
  ["Necesitas recargar tu saldo de prepago.", "Accesos del encabezado > Pagos y recargas > Recargar prepago"],
  ["Quieres conocer los planes disponibles para una persona física.", "Planes > Persona Física"],
  ["Necesitas consultar las leyes y reglamentos relacionados con la factura electrónica.", "Ayuda y Contacto > Leyes y reglamentos"],
  ["Quieres utilizar la herramienta Q-Declaro.", "Herramientas y Recursos > Q-Declaro"],
  ["Tienes una consulta sobre el servicio y quieres comunicarte con GTI.", "Ayuda y Contacto > Canales de soporte | Ayuda y Contacto > Formulario de contacto"],
  ["Quieres conocer información general sobre el servicio que ofrece GTI.", "Nosotros > Nuestro servicio"],
  ["Eres contador y quieres conocer el Club de Contadores.", "Herramientas y Recursos > Club de Contadores"],
  ["Necesitas descargar la aplicación móvil de GTI.", "Herramientas y Recursos > Aplicación móvil"],
  ["Quieres saber qué requisitos de Hacienda necesitas antes de facturar.", "Comenzar a facturar > Requisitos para facturar"],
  ["Tu empresa quiere conectar su ERP con la facturación electrónica.", "Herramientas y Recursos > Integraciones y Conectividad GTI"]
];
write("optimal-workshop/tasks.csv", "﻿tarea,respuesta_correcta\n" + TASKS.map(t => t.map(q).join(",")).join("\n") + "\n");
