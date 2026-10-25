/* Consultas de prueba de la secc. 14.7 y resultado esperado.
   Es .js (no .json) para que docs/busqueda.html funcione también abierto como archivo (file://). */
(typeof window !== "undefined" ? window : globalThis).GTI_SEARCH_CASES = [
  {"q": "activar mi cuenta", "expect": "Activar cuenta", "category": "Comenzar a facturar"},
  {"q": "planes persona física", "expect": "Persona Física", "category": "Planes"},
  {"q": "descargar aplicación", "expect": "Aplicación móvil", "category": "Herramientas y Recursos"},
  {"q": "cómo recargar", "expect": "Recargar prepago", "category": "Accesos del encabezado"},
  {"q": "reglamentos facturación", "expect": "Leyes y reglamentos", "category": "Ayuda y Contacto"},
  {"q": "club contadores", "expect": "Club de Contadores", "category": "Herramientas y Recursos"},
  {"q": "integrar ERP", "expect": "Integraciones y Conectividad GTI", "category": "Herramientas y Recursos"},
  {"q": "necesito ayuda", "expect": "Canales de soporte", "category": "Ayuda y Contacto"},
  {"q": "app", "expect": "Aplicación móvil", "category": "Herramientas y Recursos"},
  {"q": "normativa", "expect": "Leyes y reglamentos", "category": "Ayuda y Contacto"},
  {"q": "contraseña", "expect": "Iniciar sesión", "category": "Accesos del encabezado"},
  {"q": "requisitos hacienda", "expect": "Requisitos para facturar", "category": "Comenzar a facturar"},
  {"q": "activr cuenta", "expect": "Activar cuenta", "category": "Comenzar a facturar"}
];
if (typeof module !== "undefined") module.exports = globalThis.GTI_SEARCH_CASES || window.GTI_SEARCH_CASES;
