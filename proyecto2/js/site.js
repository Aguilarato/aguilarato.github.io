(function () {
  const AUTHORS =
    "Luis A. Aguilar Bolaños y Pablo A. Alvarado Umaña — EIF 506, UNA 2026";
  const STORE = "GameVault";
  const CONTACT = "gamevault@una.ac.cr";

  const catalog = window.GameVaultCatalog || { categorias: [], productos: [] };

  function categorySlug(category) {
    const map = {
      1: "accion",
      2: "aventura",
      3: "rpg",
      4: "deportes",
      5: "estrategia",
      6: "terror",
      7: "simulacion",
      8: "peleas",
      9: "plataformas",
      10: "puzzle",
      11: "indie",
    };
    return map[category.id] || `categoria-${category.id}`;
  }

  function formatPrice(value) {
    if (!value) return "Gratis";
    return `$${value.toFixed(2)} USD`;
  }

  function salePrice(product) {
    if (!product.precio) return 0;
    if (!product.descuento) return product.precio;
    return product.precio * (1 - product.descuento / 100);
  }

  function productCard(product) {
    const finalPrice = salePrice(product);
    const hasDiscount = product.descuento > 0 && product.precio > 0;
    const category = catalog.categorias.find((c) => c.id === product.id_categoria);
    return `
      <article class="col-sm-6 col-xl-4">
        <div class="card gv-card h-100">
          <img src="${product.imagen_url}" class="card-img-top" alt="Portada de ${product.nombre}" loading="lazy" decoding="async">
          <div class="card-body d-flex flex-column">
            <span class="badge text-bg-secondary mb-2 align-self-start">${category ? category.nombre : "Catálogo"}</span>
            <h3 class="h6 card-title">${product.nombre}</h3>
            <p class="card-text small text-secondary flex-grow-1">${product.descripcion.slice(0, 110)}…</p>
            <div class="d-flex justify-content-between align-items-center mt-2">
              <div>
                <div class="gv-price">${formatPrice(finalPrice)}</div>
                ${hasDiscount ? `<div class="gv-price-old">${formatPrice(product.precio)}</div>` : ""}
              </div>
              ${hasDiscount ? `<span class="badge gv-badge-sale">-${product.descuento}%</span>` : ""}
            </div>
            <a class="btn btn-sm btn-outline-info mt-3" href="${product.pagina}">Ver detalle</a>
          </div>
        </div>
      </article>`;
  }

  function renderBreadcrumbs(items) {
    if (!items || !items.length) return "";
    const parts = items
      .map((item, index) => {
        const isLast = index === items.length - 1;
        if (isLast || !item.href) {
          return `<li class="breadcrumb-item${isLast ? " active" : ""}"${isLast ? ' aria-current="page"' : ""}>${item.label}</li>`;
        }
        return `<li class="breadcrumb-item"><a href="${item.href}">${item.label}</a></li>`;
      })
      .join("");
    return `<nav aria-label="Migas de pan" class="mb-3"><ol class="breadcrumb gv-breadcrumb mb-0">${parts}</ol></nav>`;
  }

  function renderHeader(active, breadcrumbs) {
    const nav = [
      { id: "portafolio", label: "Menú del sitio", href: "../index.html" },
      { id: "inicio", label: "Inicio", href: "index.html" },
      { id: "categoria", label: "Categorías", href: "categoria.html?cat=3" },
      { id: "busqueda", label: "Búsqueda", href: "busqueda.html" },
      { id: "carrito", label: "Carrito", href: "carrito.html" },
    ];
    const navHtml = nav
      .map(
        (link) =>
          `<a class="gv-nav-link${active === link.id ? " active" : ""}" href="${link.href}">${link.label}</a>`
      )
      .join("");

    return `
      <header class="gv-topbar py-3">
        <div class="container-fluid px-3 px-lg-4">
          <div class="row g-3 align-items-center">
            <div class="col-lg-3">
              <a class="gv-brand fs-4" href="index.html">${STORE}</a>
              <div class="small text-secondary">Tienda de videojuegos</div>
            </div>
            <div class="col-lg-5">
              <nav class="d-flex flex-wrap gap-1" aria-label="Navegación global">${navHtml}</nav>
            </div>
            <div class="col-lg-4">
              <form class="gv-search d-flex" action="busqueda.html" method="get" role="search">
                <label class="visually-hidden" for="gv-search-input">Buscar juegos</label>
                <input id="gv-search-input" class="form-control" type="search" name="q" placeholder="Buscar por nombre o género" list="gv-search-suggestions" required>
                <button class="btn ms-2" type="submit">Buscar</button>
              </form>
            </div>
          </div>
          ${renderBreadcrumbs(breadcrumbs)}
        </div>
      </header>`;
  }

  function renderSidebar(activeCategoryId) {
    const links = catalog.categorias
      .map((category) => {
        const active = category.id === activeCategoryId ? " active" : "";
        return `<a href="categoria.html?cat=${category.id}" class="list-group-item list-group-item-action${active}">${category.nombre}</a>`;
      })
      .join("");
    return `
      <aside class="gv-sidebar p-3" aria-label="Categorías de contenido">
        <h2 class="h6 text-uppercase text-secondary">Secciones</h2>
        <div class="list-group list-group-flush">${links}</div>
        <hr class="border-secondary">
        <p class="small text-secondary mb-2">Ofertas destacadas</p>
        <a class="btn btn-sm btn-outline-warning w-100 mb-2" href="categoria.html?cat=3">RPG en oferta</a>
        <a class="btn btn-sm btn-outline-info w-100" href="categoria.html?cat=11">Indie recomendados</a>
      </aside>`;
  }

  function renderFooter() {
    return `
      <footer class="gv-footer py-4">
        <div class="container-fluid px-3 px-lg-4">
          <div class="row g-3">
            <div class="col-md-4">
              <strong>${STORE}</strong>
              <p class="small mb-0">Prototipo basado en el análisis de Steam.</p>
            </div>
            <div class="col-md-4">
              <p class="small mb-1"><strong>Autores:</strong> ${AUTHORS}</p>
              <p class="small mb-0"><strong>Contacto:</strong> <a href="mailto:${CONTACT}">${CONTACT}</a></p>
            </div>
            <div class="col-md-4">
              <p class="small mb-0">© 2026 GameVault — Proyecto 2, Diseño de Sitios Web. Contenido de demostración académica.</p>
            </div>
          </div>
        </div>
      </footer>`;
  }

  function mountLayout(options) {
    const header = document.getElementById("gv-header");
    const sidebar = document.getElementById("gv-sidebar");
    const footer = document.getElementById("gv-footer");
    if (header) header.innerHTML = renderHeader(options.activeNav, options.breadcrumbs);
    if (sidebar) sidebar.innerHTML = renderSidebar(options.activeCategory || null);
    if (footer) footer.innerHTML = renderFooter();
  }

  function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function renderProductGrid(container, products, page, pageSize) {
    const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
    const current = Math.min(Math.max(1, page), totalPages);
    const start = (current - 1) * pageSize;
    const slice = products.slice(start, start + pageSize);
    container.innerHTML = `<div class="row g-3">${slice.map(productCard).join("")}</div>`;

    const pagination = document.getElementById("gv-pagination");
    if (!pagination) return;

    let html = "";
    for (let i = 1; i <= totalPages; i += 1) {
      html += `<li class="page-item${i === current ? " active" : ""}">
        <a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
    }
    pagination.innerHTML = html;
    pagination.querySelectorAll("[data-page]").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const next = Number(link.dataset.page);
        const url = new URL(window.location.href);
        url.searchParams.set("page", String(next));
        window.history.replaceState({}, "", url);
        renderProductGrid(container, products, next, pageSize);
      });
    });
  }

  function initHome() {
    const featured = [1, 16, 3, 10, 7];
    const carousel = document.getElementById("gv-home-carousel");
    if (carousel) {
      const slides = featured
        .map((id) => catalog.productos.find((p) => p.id === id))
        .filter(Boolean)
        .map((product, index) => {
          const active = index === 0 ? " active" : "";
          return `<div class="carousel-item${active}">
            <img src="${product.imagen_url}" class="d-block w-100" alt="${product.nombre}">
            <div class="carousel-caption d-none d-md-block text-start bg-dark bg-opacity-75 rounded p-3">
              <h2 class="h4">${product.nombre}</h2>
              <p>${product.descripcion.slice(0, 140)}…</p>
              <a href="${product.pagina}" class="btn btn-info btn-sm">Ver ficha</a>
            </div>
          </div>`;
        })
        .join("");
      carousel.innerHTML = slides;
    }

    ["gv-rec-rpg", "gv-rec-accion", "gv-rec-indie"].forEach((id) => {
      const target = document.getElementById(id);
      if (!target) return;
      const map = { "gv-rec-rpg": 3, "gv-rec-accion": 1, "gv-rec-indie": 11 };
      const catId = map[id];
      const items = catalog.productos.filter((p) => p.id_categoria === catId).slice(0, 3);
      target.innerHTML = `<div class="row g-3">${items.map(productCard).join("")}</div>`;
    });
  }

  function initCategory() {
    const catId = Number(getQueryParam("cat") || 3);
    const page = Number(getQueryParam("page") || 1);
    const category = catalog.categorias.find((c) => c.id === catId) || catalog.categorias[2];
    const title = document.getElementById("gv-category-title");
    const desc = document.getElementById("gv-category-desc");
    if (title) title.textContent = category.nombre;
    if (desc) desc.textContent = category.descripcion;

    const products = catalog.productos.filter((p) => p.id_categoria === category.id);
    const grid = document.getElementById("gv-product-grid");
    if (grid) renderProductGrid(grid, products, page, 6);

    mountLayout({
      activeNav: "categoria",
      activeCategory: category.id,
      breadcrumbs: [
        { label: "Inicio", href: "index.html" },
        { label: "Categorías", href: "categoria.html?cat=3" },
        { label: category.nombre },
      ],
    });
  }

  function initSearch() {
    const query = (getQueryParam("q") || "").trim().toLowerCase();
    const input = document.getElementById("gv-search-input");
    if (input) input.value = query;

    const resultsTitle = document.getElementById("gv-search-results-title");
    const products = catalog.productos.filter((product) => {
      if (!query) return true;
      const category = catalog.categorias.find((c) => c.id === product.id_categoria);
      const haystack = `${product.nombre} ${product.descripcion} ${category ? category.nombre : ""}`.toLowerCase();
      return haystack.includes(query);
    });

    if (resultsTitle) {
      resultsTitle.textContent = query
        ? `${products.length} resultados para “${query}”`
        : `${products.length} juegos en catálogo`;
    }

    const grid = document.getElementById("gv-product-grid");
    if (grid) renderProductGrid(grid, products, 1, 6);

    mountLayout({
      activeNav: "busqueda",
      breadcrumbs: [
        { label: "Inicio", href: "index.html" },
        { label: "Búsqueda" },
      ],
    });
  }

  function initRelatedList(elementId, currentId, categoryId) {
    const target = document.getElementById(elementId);
    if (!target) return;
    const related = catalog.productos
      .filter((p) => p.id_categoria === categoryId && p.id !== currentId)
      .slice(0, 3);
    target.innerHTML = related
      .map(
        (p) => `<a class="list-group-item list-group-item-action" href="${p.pagina}">
          <div class="d-flex gap-2 align-items-center">
            <img src="${p.imagen_url}" alt="" width="72" height="41" class="rounded" style="object-fit:cover">
            <div><strong>${p.nombre}</strong><br><span class="small text-secondary">${formatPrice(salePrice(p))}</span></div>
          </div>
        </a>`
      )
      .join("");
  }

  function buildSearchDatalist() {
    const existing = document.getElementById("gv-search-suggestions");
    if (existing) return;
    const datalist = document.createElement("datalist");
    datalist.id = "gv-search-suggestions";
    catalog.productos.forEach((product) => {
      const option = document.createElement("option");
      option.value = product.nombre;
      datalist.appendChild(option);
    });
    document.body.appendChild(datalist);
  }

  document.addEventListener("DOMContentLoaded", () => {
    buildSearchDatalist();
    const page = document.body.dataset.page;
    if (page === "inicio") {
      mountLayout({ activeNav: "inicio", breadcrumbs: [{ label: "Inicio" }] });
      initHome();
    } else if (page === "categoria") {
      initCategory();
    } else if (page === "busqueda") {
      initSearch();
    } else if (page === "carrito" || page === "facturacion" || page === "entrega") {
      mountLayout({
        activeNav: "carrito",
        breadcrumbs: [
          { label: "Inicio", href: "index.html" },
          { label: document.body.dataset.crumb || "Compra" },
        ],
      });
    } else if (document.getElementById("gv-header")) {
      mountLayout({
        activeNav: document.body.dataset.activeNav || "",
        breadcrumbs: JSON.parse(document.body.dataset.breadcrumbs || "[]"),
        activeCategory: Number(document.body.dataset.activeCategory || 0) || null,
      });
    }

    if (document.body.dataset.related) {
      const payload = JSON.parse(document.body.dataset.related);
      initRelatedList("gv-related", payload.id, payload.category);
    }
  });

  window.GameVault = {
    formatPrice,
    salePrice,
    productCard,
    catalog,
  };
})();
