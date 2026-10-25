/*
 * Fuente única de la arquitectura de información propuesta (sitemap corregido, Doc secc. 8–10).
 * - layout.js construye con ella el menú, los accesos del encabezado, las migas y el pie.
 * - search.js y tools/build-exports.js generan con ella el índice de búsqueda (Algolia)
 *   y los archivos para FlowMapp, Octopus.do y Optimal Workshop.
 * Si se cambia una etiqueta o una página aquí, se actualiza en todo el sitio y en los exports.
 *
 * Campos:
 *   hint      descripción breve bajo la etiqueta en el menú (opcional)
 *   id        identificador del árbol (Tree Testing)      label   etiqueta propuesta
 *   old       etiqueta / ubicación en el sitio actual      url     ruta relativa a la raíz
 *   type      tipo de contenido del inventario (6.2)       desc    propósito / descripción (14.4)
 *   blocks    bloques de contenido (Octopus.do)            external true si el destino está fuera del dominio
 *   kw        palabras clave (14.4)                        aud     público objetivo (vocabulario GTI_VOCAB.aud)
 *   ctype     tipo de contenido para búsqueda (GTI_VOCAB.ctype)
 */

/* Vocabulario controlado (secc. 14.4–14.5 y 15). Usar solo estos valores en aud y ctype. */
window.GTI_VOCAB = {
  aud: ["Nuevos clientes", "Clientes existentes", "Empresas", "Profesionales contables", "Público general"],
  ctype: ["Página informativa", "Guía", "Herramienta", "Documento", "Acceso a operación"]
};

window.GTI_UPDATED = "2026-10-25";

window.GTI_SITEMAP = [
  {
    id: "1", label: "Inicio", old: "Inicio", url: "index.html", type: "Informativo / comercial",
    desc: "Presenta el servicio y dirige a cada usuario a su siguiente paso.",
    kw: ["inicio", "factura electrónica", "GTI"], aud: ["Público general"], ctype: "Página informativa",
    blocks: ["Encabezado: buscador + Iniciar sesión + Pagos y recargas", "Mensaje principal (Consultar planes / Cómo comenzar)",
      "Comience a facturar en 3 pasos", "Herramientas y recursos destacados", "Pie: Contacto · Información legal · Redes sociales"]
  },
  {
    id: "2", label: "Planes", old: "Planes", url: "planes/index.html", type: "Comercial",
    desc: "Comparar las modalidades de contratación según el perfil fiscal del usuario.",
    kw: ["planes", "precios", "contratar", "comprar plan", "prepago", "pospago"], aud: ["Nuevos clientes"], ctype: "Página informativa",
    blocks: ["Seleccione su modalidad (4 perfiles)", "Prepago vs pospago", "¿No sabe cuál modalidad necesita? → Cómo comenzar"],
    children: [
      { id: "2.1", label: "Persona Física", old: "Planes (dentro de la página)", url: "planes/persona-fisica.html", type: "Comercial",
        desc: "Planes para profesionales y trabajadores independientes.",
        kw: ["persona física", "independiente", "profesional", "planes"], aud: ["Nuevos clientes"], ctype: "Página informativa",
        blocks: ["Para quién es", "Planes prepago", "Planes pospago", "Comprar ahora", "Siguiente paso: activar cuenta"] },
      { id: "2.2", label: "Persona Jurídica", old: "Planes (dentro de la página)", url: "planes/persona-juridica.html", type: "Comercial",
        desc: "Planes para empresas y organizaciones formalmente constituidas.",
        kw: ["persona jurídica", "empresa", "sociedad", "pyme", "planes"], aud: ["Nuevos clientes", "Empresas"], ctype: "Página informativa",
        blocks: ["Para quién es", "Planes prepago", "Planes pospago", "Integración ERP", "Comprar ahora"] },
      { id: "2.3", label: "Régimen Especial Agropecuario", old: "Planes (dentro de la página)", url: "planes/regimen-agropecuario.html", type: "Comercial",
        desc: "Planes para contribuyentes del régimen especial agropecuario.",
        kw: ["agropecuario", "agricultor", "REA", "régimen", "planes"], aud: ["Nuevos clientes"], ctype: "Página informativa",
        blocks: ["Para quién es", "Planes disponibles", "Normativa relacionada", "Comprar ahora"] },
      { id: "2.4", label: "Régimen Simplificado", old: "Planes (dentro de la página)", url: "planes/regimen-simplificado.html", type: "Comercial",
        desc: "Planes para contribuyentes registrados en el régimen de tributación simplificada.",
        kw: ["simplificado", "régimen", "tributación simplificada", "planes"], aud: ["Nuevos clientes"], ctype: "Página informativa",
        blocks: ["Para quién es", "Planes disponibles", "Normativa relacionada", "Comprar ahora"] }
    ]
  },
  {
    id: "3", label: "Comenzar a facturar", old: "Activar Cuenta + «3 pasos» de Home", url: "comenzar/index.html", type: "Guía / transaccional",
    desc: "Reúne los pasos, requisitos y la activación que necesita un usuario nuevo.",
    kw: ["comenzar", "empezar", "cómo empezar", "primeros pasos", "nuevo cliente"], aud: ["Nuevos clientes"], ctype: "Guía",
    blocks: ["Activar cuenta / Ver requisitos", "Proceso en 3 pasos", "Documentación: requisitos, guía de activación, leyes", "¿Necesita ayuda? → Ayuda y Contacto"],
    children: [
      { id: "3.1", label: "Pasos para comenzar", old: "«3 pasos» del Home", url: "comenzar/pasos.html", type: "Guía",
        desc: "Proceso completo: elegir un plan, activar la cuenta GTI y registrarse ante Hacienda.",
        kw: ["pasos", "proceso", "cómo empezar", "guía", "comenzar a facturar"], aud: ["Nuevos clientes"], ctype: "Guía",
        blocks: ["Paso 1: elegir plan", "Paso 2: activar cuenta", "Paso 3: registro en ATV de Hacienda", "Preguntas frecuentes"] },
      { id: "3.2", label: "Requisitos para facturar", old: "Leyes y reglamentos (registro y llave)", url: "comenzar/requisitos.html", type: "Guía",
        desc: "Qué necesita para emitir comprobantes: inscripción en ATV, llave criptográfica y datos del emisor.",
        kw: ["requisitos", "ATV", "Hacienda", "llave criptográfica", "registro", "inscripción", "emisor"], aud: ["Nuevos clientes"], ctype: "Guía",
        blocks: ["Inscripción como emisor en ATV", "Llave criptográfica y PIN", "Datos que solicita GTI", "Enlace a Leyes y reglamentos"] },
      { id: "3.3", label: "Activar cuenta", old: "Activar Cuenta (menú principal)", url: "comenzar/activar-cuenta.html", type: "Transaccional",
        desc: "Información y acceso al proceso de activación del servicio de facturación electrónica.",
        kw: ["activar", "cuenta", "activación", "código", "código de activación", "registro"], aud: ["Nuevos clientes"], ctype: "Acceso a operación",
        blocks: ["Explicación: de dónde sale el código", "Formulario código + captcha", "Reenviar código por cédula", "Siguiente paso: registro ante Hacienda"] }
    ]
  },
  {
    id: "4", label: "Herramientas y Recursos", old: "Herramientas", url: "herramientas/index.html", type: "Herramientas / microsites",
    desc: "Herramientas complementarias, integraciones, recursos tecnológicos y aplicaciones.",
    kw: ["herramientas", "recursos", "utilidades"], aud: ["Público general"], ctype: "Página informativa",
    blocks: ["Listado de herramientas", "Aviso de sitios externos", "Para quién es cada herramienta"],
    children: [
      { id: "4.1", label: "Q-Declaro", old: "Herramientas → Q-Declaro", url: "herramientas/q-declaro.html", type: "Herramienta externa", external: true,
        desc: "Sistema contable externo (qdeclaro.com) complementario a la facturación.",
        kw: ["Q-Declaro", "qdeclaro", "contabilidad", "declaración", "impuestos"], aud: ["Empresas", "Profesionales contables"], ctype: "Herramienta",
        blocks: ["Qué es", "Para quién es", "Aviso: sitio externo", "Ir a Q-Declaro"] },
      { id: "4.2", label: "De Tiquete a Factura", old: "Herramientas → De Tiquete a Factura", url: "herramientas/de-tiquete-a-factura.html", type: "Herramienta",
        desc: "Conversión de un tiquete electrónico en factura electrónica a nombre del cliente.",
        kw: ["tiquete", "convertir", "factura a mi nombre", "tiquete electrónico"], aud: ["Público general"], ctype: "Herramienta",
        blocks: ["Qué es", "Cómo funciona (pasos)", "Iniciar proceso"] },
      { id: "4.3", label: "Club de Contadores", hint: "Beneficios para contadores", old: "Herramientas → Club de Contadores", url: "herramientas/club-de-contadores.html", type: "Herramienta",
        desc: "Programa de beneficios para profesionales contables que administran clientes.",
        kw: ["club", "contadores", "contador", "contable", "beneficios"], aud: ["Profesionales contables"], ctype: "Herramienta",
        blocks: ["Qué es", "Beneficios", "Cómo unirse"] },
      { id: "4.4", label: "Integraciones y Conectividad GTI", hint: "Conecte su ERP o sistema propio", old: "GTI Conectividad (menú principal)", url: "herramientas/conectividad.html", type: "Herramienta / producto",
        desc: "Integración de ERP y sistemas propios con la facturación electrónica de GTI.",
        kw: ["integración", "integrar", "ERP", "API", "conectividad", "sistemas"], aud: ["Empresas"], ctype: "Herramienta",
        blocks: ["Qué es", "Integración ERP", "Contactar ventas"] },
      { id: "4.5", label: "Aplicación móvil", old: "Banners de tiendas en Home", url: "herramientas/app-movil.html", type: "Recurso",
        desc: "Descargue la app de GTI Factura Electrónica para Android, iOS y Huawei.",
        kw: ["aplicación", "app", "móvil", "celular", "descargar", "Play Store", "App Store", "AppGallery"], aud: ["Clientes existentes"], ctype: "Herramienta",
        blocks: ["Funciones de la app", "Play Store", "App Store", "AppGallery"] },
      { id: "4.6", label: "Sistema anterior", old: "Ingresar al sistema anterior", url: "herramientas/sistema-anterior.html", type: "Herramienta externa", external: true,
        desc: "Acceso legado a la versión anterior del sistema (anterior.facturaelectronica.cr).",
        kw: ["sistema anterior", "legado", "versión anterior"], aud: ["Clientes existentes"], ctype: "Acceso a operación",
        blocks: ["Aviso: sistema legado", "Ingresar al sistema anterior", "Migrar al sistema actual"] }
    ]
  },
  {
    id: "5", label: "Nosotros", old: "Acerca de", url: "nosotros/index.html", type: "Institucional",
    desc: "Información institucional de GTI, sus servicios y reconocimientos.",
    kw: ["nosotros", "GTI", "empresa", "quiénes somos", "oficinas", "horarios"], aud: ["Público general"], ctype: "Página informativa",
    blocks: ["Quiénes somos", "Nuestro servicio", "Programa L", "Oficinas y horarios"],
    children: [
      { id: "5.1", label: "Nuestro servicio", old: "Acerca de → Nuestro servicio", url: "nosotros/nuestro-servicio.html", type: "Informativo",
        desc: "Funciones y beneficios del sistema de facturación electrónica de GTI.",
        kw: ["servicio", "funciones", "beneficios", "qué ofrece"], aud: ["Público general"], ctype: "Página informativa",
        blocks: ["Funciones del sistema", "Beneficios", "Comenzar"] },
      { id: "5.2", label: "Programa L", hint: "Sello y certificaciones de confianza", old: "Acerca de → Programa L", url: "nosotros/programa-l.html", type: "Institucional / certificación",
        desc: "Sello Programa L y certificaciones de confianza (GS1).",
        kw: ["Programa L", "sello", "certificación", "GS1"], aud: ["Público general"], ctype: "Página informativa",
        blocks: ["Qué es", "Certificaciones (GS1)"] }
    ]
  },
  {
    id: "6", label: "Ayuda y Contacto", old: "Contacto (+ Leyes en Acerca de)", url: "ayuda/index.html", type: "Soporte",
    desc: "Canales de atención, soporte y documentación de consulta.",
    kw: ["contacto", "consultas"], aud: ["Público general"], ctype: "Página informativa",
    blocks: ["WhatsApp · Teléfono · Correo", "Leyes y reglamentos", "Formulario de contacto"],
    children: [
      { id: "6.1", label: "Leyes y reglamentos", old: "Acerca de → Leyes y reglamentos", url: "ayuda/leyes-y-reglamentos.html", type: "Informativo / legal",
        desc: "Manuales, resoluciones y disposiciones del Ministerio de Hacienda sobre comprobantes electrónicos.",
        kw: ["leyes", "reglamentos", "normativa", "resoluciones", "Hacienda", "DGT", "manuales", "versión 4.4"], aud: ["Público general", "Profesionales contables"], ctype: "Documento",
        blocks: ["Comprobantes electrónicos v4.4", "Registro y llave criptográfica", "Reglamentos y resoluciones DGT", "Manuales"] },
      { id: "6.2", label: "Formulario de contacto", old: "Contacto", url: "ayuda/contacto.html", type: "Transaccional / soporte",
        desc: "Envíe una consulta a GTI. Incluye oficinas, horarios y correos de ventas y servicio.",
        kw: ["formulario", "contacto", "consulta", "correo", "oficinas", "horarios", "ventas"], aud: ["Público general"], ctype: "Acceso a operación",
        blocks: ["Formulario + captcha", "Oficinas y horarios", "Correos de ventas y servicio"] },
      { id: "6.3", label: "Canales de soporte", old: "Chatbot (solo en footer de ActivarCuentas)", url: "ayuda/canales-soporte.html", type: "Soporte",
        desc: "Chatbot, WhatsApp, teléfono y correo para resolver problemas con el servicio.",
        kw: ["ayuda", "soporte", "chat", "chatbot", "WhatsApp", "teléfono", "asistencia", "problema"], aud: ["Clientes existentes", "Público general"], ctype: "Acceso a operación",
        blocks: ["Iniciar chat", "WhatsApp", "Teléfono y correo"] }
    ]
  }
];

/* Accesos persistentes del encabezado (no forman parte del menú principal). */
window.GTI_UTILITY = [
  { id: "U1", label: "Iniciar sesión", old: "¿Ya es cliente de GTI? (solo en Home)", url: "cuenta/iniciar-sesion.html", type: "Transaccional",
    desc: "Acceso al sistema de facturación con número de identificación y contraseña.",
    kw: ["iniciar sesión", "ingresar", "login", "entrar", "contraseña", "acceso clientes"], aud: ["Clientes existentes"], ctype: "Acceso a operación",
    blocks: ["Formulario de acceso", "Recuperar contraseña", "¿Aún no tiene cuenta? → Comenzar a facturar"] },
  { id: "U2", label: "Pagos y recargas", old: "Servicios (menú)", url: "cuenta/pagos-y-recargas.html", type: "Transaccional",
    desc: "Pague su plan pospago o recargue documentos de su plan prepago.",
    kw: ["pagos", "pagar", "recargas", "recargar"], aud: ["Clientes existentes"], ctype: "Acceso a operación",
    blocks: ["Pagar facturación", "Recargar prepago"],
    children: [
      { id: "U2.1", label: "Pagar facturación", old: "Servicios → Pagar Facturación", url: "cuenta/pagar-facturacion.html", type: "Transaccional",
        desc: "Pago de la facturación de planes pospago con el número de cédula.",
        kw: ["pagar", "pago", "factura", "pospago", "mensualidad"], aud: ["Clientes existentes"], ctype: "Acceso a operación",
        blocks: ["Formulario de cédula", "Detalle de pago", "Soporte"] },
      { id: "U2.2", label: "Recargar prepago", old: "Servicios → Recargar Prepago", url: "cuenta/recargar-prepago.html", type: "Transaccional",
        desc: "Recarga de documentos y saldo para planes prepago.",
        kw: ["recargar", "recarga", "prepago", "saldo", "recargar saldo", "documentos"], aud: ["Clientes existentes"], ctype: "Acceso a operación",
        blocks: ["Formulario de cédula", "Paquetes de recarga", "Soporte"] }
    ] }
];

/* Información legal del pie de página. */
window.GTI_LEGAL = [
  { id: "L1", label: "Política de Administración de Datos", old: "Acerca de → Política Administración de Datos", url: "legal/politica-datos.html", type: "Legal",
    desc: "Cómo GTI recopila, usa y protege los datos personales.",
    kw: ["privacidad", "datos personales", "política", "protección de datos"], aud: ["Público general"], ctype: "Documento",
    blocks: ["Alcance", "Datos que se recopilan", "Derechos del usuario"] }
];
