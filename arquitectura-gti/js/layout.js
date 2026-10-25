/*
 * Componentes compartidos del prototipo: encabezado con buscador y accesos de clientes,
 * menú, migas de pan, pie, botón flotante de ayuda y navegación de la documentación.
 *
 * Cada página declara en <body>:
 *   data-root   ruta relativa a la raíz ("" o "../")
 *   data-page   su ruta dentro de GTI_SITEMAP (ej. "planes/index.html")
 *   data-layout "site" (prototipo) o "docs" (documentación del entregable)
 */
(function () {
  var body = document.body;
  var root = body.dataset.root || "";
  var page = body.dataset.page || "";
  var layout = body.dataset.layout || "site";
  var map = window.GTI_SITEMAP || [];

  function href(url) { return root + url; }

  var ICON = {
    search: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M20 20l-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    chat: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 5h16v11H8l-4 4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>'
  };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function findTrail(url) {
    var all = map.concat(window.GTI_UTILITY || [], window.GTI_LEGAL || []);
    for (var i = 0; i < all.length; i++) {
      if (all[i].url === url) return [all[i]];
      var kids0 = all[i].children || [];
      for (var k = 0; k < kids0.length; k++) if (kids0[k].url === url) return [all[i], kids0[k]];
    }
    if (url === "buscar.html") return [{ id: "B", label: "Resultados de búsqueda", url: "buscar.html" }];
    return [];
  }
  var trail = findTrail(page);
  var activeTop = trail.length ? trail[0].id : null;

  /* ---------- Documentación del entregable ---------- */
  var DOCS = [
    { url: "docs/herramientas.html", label: "Herramientas y evidencias" },
    { url: "docs/busqueda.html", label: "Búsqueda (Algolia)" }
  ];

  if (layout === "docs") {
    var nav = DOCS.map(function (d) {
      var cls = d.url === page ? ' class="active" aria-current="page"' : "";
      return '<li><a href="' + href(d.url) + '"' + cls + ">" + d.label + "</a></li>";
    }).join("");
    var h = document.getElementById("site-header");
    if (h) {
      h.outerHTML =
        '<header class="docs-header"><div class="container docs-header__inner">' +
        '<a class="brand" href="' + href("docs/herramientas.html") + '"><span class="brand__mark">AI</span>' +
        '<span>EIF-511 · Proyecto Integrador <small>Grupo 03 · Proyecto integrador</small></span></a>' +
        '<a class="btn btn--ghost btn--sm" href="' + href("index.html") + '">Ver prototipo del sitio →</a>' +
        "</div></header>" +
        '<nav class="docs-nav" aria-label="Secciones del entregable"><div class="container"><ul>' + nav + "</ul></div></nav>";
    }
    var f = document.getElementById("site-footer");
    if (f) {
      f.outerHTML = '<footer class="docs-footer"><div class="container">Universidad Nacional de Costa Rica · EIF-511 Arquitectura de Información · ' +
        "Luis Aguilar Bolaños · Ceasar Calvo Muñoz · Derrek Ureña Solis</div></footer>";
    }
    return;
  }

  /* ---------- Header del prototipo (wireframes 12.x) ---------- */
  var menu = map.map(function (item) {
    var isActive = item.id === activeTop;
    var cur = isActive ? ' aria-current="page"' : "";
    if (!item.children) {
      return '<li class="nav__item' + (isActive ? " is-active" : "") + '"><a class="nav__link" href="' + href(item.url) + '"' + cur + ">" + item.label + "</a></li>";
    }
    var sub = item.children.map(function (c) {
      var ext = c.external ? ' <span class="tag tag--ext" title="Sitio externo">externo</span>' : "";
      var hint = c.hint ? '<small class="nav__hint">' + c.hint + "</small>" : "";
      return '<li><a href="' + href(c.url) + '">' + c.label + ext + hint + "</a></li>";
    }).join("");
    return '<li class="nav__item has-sub' + (isActive ? " is-active" : "") + '">' +
      '<a class="nav__link" href="' + href(item.url) + '"' + cur + ">" + item.label + "</a>" +
      '<button class="nav__toggle" aria-expanded="false" aria-label="Abrir submenú de ' + item.label + '">▾</button>' +
      '<ul class="nav__sub"><li><a href="' + href(item.url) + '"><strong>Ver todo ' + item.label + "</strong></a></li>" + sub + "</ul></li>";
  }).join("");

  var util = (window.GTI_UTILITY || []).map(function (u) {
    var cur = trail.length && trail[0].id === u.id ? ' aria-current="page"' : "";
    return '<a href="' + href(u.url) + '"' + cur + ">" + u.label + "</a>";
  }).join('<span aria-hidden="true">|</span>');

  var header =
    '<a class="skip" href="#main">Saltar al contenido</a>' +
    '<header class="header"><div class="container">' +
    '<div class="header__top">' +
    '<a class="brand" href="' + href("index.html") + '">FACTURAELECTRONICA<span>.CR</span></a>' +
    '<form class="search" role="search" action="' + href("buscar.html") + '" autocomplete="off">' +
    '<label class="sr-only" for="q-header">Buscar en el sitio</label>' +
    '<input id="q-header" class="search__input" type="search" name="q" placeholder="Buscar planes, herramientas, requisitos o ayuda..." ' +
    'aria-describedby="q-header-status" aria-controls="q-header-list" aria-autocomplete="list">' +
    '<button class="search__btn" type="submit" aria-label="Buscar">' + ICON.search + "</button>" +
    '<div id="q-header-list" class="search__suggest" hidden></div>' +
    '<span id="q-header-status" class="sr-only" aria-live="polite"></span>' +
    "</form>" +
    '<nav class="utility" aria-label="Accesos de clientes">' + util + "</nav>" +
    '<button class="menu-btn" aria-expanded="false" aria-controls="main-nav">☰ Menú</button>' +
    "</div>" +
    '<nav id="main-nav" class="nav" aria-label="Navegación principal"><ul class="nav__list">' + menu + "</ul></nav>" +
    "</div></header>";

  var hEl = document.getElementById("site-header");
  if (hEl) hEl.outerHTML = header;

  /* ---------- Migas de pan ---------- */
  var main = document.getElementById("main");
  if (main && trail.length && page !== "index.html") {
    var crumbs = '<li><a href="' + href("index.html") + '">Inicio</a></li>';
    trail.forEach(function (t, i) {
      crumbs += i === trail.length - 1
        ? '<li aria-current="page">' + t.label + "</li>"
        : '<li><a href="' + href(t.url) + '">' + t.label + "</a></li>";
    });
    main.insertAdjacentHTML("afterbegin", '<nav class="breadcrumb" aria-label="Migas de pan"><ol>' + crumbs + "</ol></nav>");
  }

  /* ---------- Pie de página (wireframes: Contacto | Información legal | Redes sociales | © GTI) ---------- */
  var legal = (window.GTI_LEGAL || [])[0];
  var footer =
    '<footer class="footer"><div class="container">' +
    '<nav class="footer__links" aria-label="Pie de página">' +
    '<a href="' + href("ayuda/contacto.html") + '">Contacto</a>' +
    '<a href="' + href(legal ? legal.url : "#") + '">Información legal</a>' +
    '<a href="' + href("herramientas/app-movil.html") + '">Aplicación móvil</a>' +
    '<a href="' + href("ayuda/canales-soporte.html#redes") + '">Redes sociales</a>' +
    "<span>© GTI</span></nav>" +
    '<p class="footer__note">Prototipo académico — EIF-511, Universidad Nacional. No es el sitio oficial de FacturaElectronica.cr. ' +
    '<a href="' + href("docs/herramientas.html") + '">Herramientas y evidencias del proyecto</a></p>' +
    "</div></footer>" +
    '<a class="fab" href="' + href("ayuda/canales-soporte.html") + '" aria-label="¿Necesita ayuda? Abrir canales de soporte">' + ICON.chat + "<span>¿Necesita ayuda?</span></a>";

  var fEl = document.getElementById("site-footer");
  if (fEl) fEl.outerHTML = footer;

  /* ---------- Sugerencias del buscador del encabezado (secc. 14.5) ---------- */
  var S = window.GTISearch;
  var input = document.getElementById("q-header");
  if (S && input) {
    var records = S.buildRecords({ sitemap: map, utility: window.GTI_UTILITY || [], legal: window.GTI_LEGAL || [], updated: window.GTI_UPDATED });
    window.GTI_RECORDS = records;
    var list = document.getElementById("q-header-list");
    var status = document.getElementById("q-header-status");
    var seq = 0;
    input.addEventListener("input", function () {
      var q = input.value.trim(), my = ++seq;
      if (q.length < 2) { list.hidden = true; status.textContent = ""; return; }
      S.search(records, q).then(function (r) {
        if (my !== seq) return;
        var hits = r.hits.slice(0, 5);
        status.textContent = hits.length ? hits.length + " sugerencias" : "Sin sugerencias";
        list.innerHTML = hits.length
          ? hits.map(function (h) {
              return '<a class="search__item" href="' + href(h.url) + '"><strong>' + esc(h.title) + "</strong><small>" + esc(h.path.join(" › ")) + "</small></a>";
            }).join("") + '<a class="search__all" href="' + href("buscar.html") + "?q=" + encodeURIComponent(q) + '">Ver todos los resultados</a>'
          : '<p class="search__empty">Sin coincidencias. Presione Enter para ver opciones.</p>';
        list.hidden = false;
      });
    });
    input.addEventListener("keydown", function (e) { if (e.key === "Escape") { list.hidden = true; } });
    document.addEventListener("click", function (e) { if (!e.target.closest(".search")) list.hidden = true; });
    var qs = new URLSearchParams(location.search).get("q");
    if (qs && page === "buscar.html") input.value = qs;
  }

  /* ---------- Interacción del menú ---------- */
  var btn = document.querySelector(".menu-btn");
  var navEl = document.getElementById("main-nav");
  if (btn && navEl) {
    btn.addEventListener("click", function () {
      var open = navEl.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open);
    });
  }
  document.querySelectorAll(".nav__toggle").forEach(function (t) {
    t.addEventListener("click", function () {
      var li = t.parentElement;
      var open = li.classList.toggle("is-open");
      t.setAttribute("aria-expanded", open);
    });
  });

  /* ---------- Formularios del prototipo (sin backend) ---------- */
  document.querySelectorAll("form[data-demo]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = form.querySelector(".form-msg");
      if (!msg) {
        msg = document.createElement("p");
        msg.className = "form-msg";
        msg.setAttribute("role", "status");
        form.appendChild(msg);
      }
      msg.textContent = form.dataset.demo || "Prototipo: esta acción no envía datos.";
    });
  });
})();
