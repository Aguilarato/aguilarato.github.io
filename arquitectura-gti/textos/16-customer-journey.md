# 16. Customer Journey


## 16.1 Persona y escenario

**Persona:** Andrea, persona representativa y no real. Es diseñadora gráfica independiente (persona física) y pertenece a los grupos de usuarios 4.1 y 4.5. Hacienda le exige emitir comprobantes electrónicos y nunca ha usado un sistema de facturación.

**Objetivo:** emitir su primera factura electrónica válida lo antes posible y sin errores ante Hacienda.

## 16.2 Herramienta

La guía del curso propone Miro. El mapa se elaboró en **FigJam**, la pizarra colaborativa de Figma y una herramienta equivalente, para mantener en un mismo espacio los wireframes, el flujo «Comenzar a facturar» y el recorrido. Los datos también se exportan en CSV (`exports/journey/customer-journey.csv`), así que el mapa puede importarse a Miro si se requiere.

## 16.3 Etapas

| Etapa | Objetivo | Puntos de contacto | Dificultad en el sitio actual | Emoción | Oportunidad en la arquitectura propuesta |
|---|---|---|---|---|---|
| 1. Descubrir | Entender qué es la factura electrónica y si está obligada | Buscador web · Inicio · Leyes y reglamentos | Explicaciones mezcladas en Inicio; normativa aislada en «Acerca de» | −1 Duda | «Cómo comenzar» en Inicio; normativa en Ayuda y Contacto; buscador con sinónimos |
| 2. Comparar planes | Elegir el plan según régimen y volumen | Planes · Persona Física | Perfil fiscal oculto dentro de Planes | 0 Neutral | 4 modalidades visibles desde el menú; franja «¿No sabe cuál modalidad necesita?» |
| 3. Comprar | Adquirir el plan | Persona Física · pago · correo | La compra no anticipa la activación ni el registro | 0 Neutral | Bloque «Después de comprar» → Comenzar a facturar |
| 4. Activar cuenta | Activar con el código recibido | Comenzar a facturar · Activar cuenta · correo | Pide un código sin explicar su origen; chatbot solo en el pie | −2 Frustración | Aviso «¿De dónde sale el código?», reenvío por cédula, ayuda persistente |
| 5. Registrarse ante Hacienda | Inscribirse en ATV y obtener la llave criptográfica | Requisitos · Leyes y reglamentos · ATV · Soporte | Requisitos dispersos y lejos del proceso | −2 Frustración | Página «Requisitos para facturar» en la misma categoría; enlaces contextuales |
| 6. Emitir la primera factura | Ingresar y facturar | Iniciar sesión · sistema GTI · App | Login solo en Inicio | +1 Satisfacción | «Iniciar sesión» persistente en el encabezado; app en Herramientas y en el pie |
| 7. Mantener el servicio | Recargar o pagar y resolver dudas | Pagos y recargas · Canales de soporte · WhatsApp | Pagar/recargar repetido en 3 lugares; menú sin URLs | +1 Satisfacción | Destino único «Pagos y recargas»; buscador «cómo recargar» |

El mapa completo agrega las filas de **Acciones** y **Necesidades** de cada etapa.

## 16.4 Hallazgos

- **Las etapas 4 y 5 concentran la frustración.** Coinciden con el problema principal de la secc. 3: el usuario no entiende la relación entre contratar, activar y registrarse ante Hacienda. Por eso se creó la categoría **Comenzar a facturar**, que agrupa pasos, requisitos y activación.
- **La etapa 1 justifica el buscador (secc. 14).** El usuario llega con su propio vocabulario («normativa», «app», «cómo recargar»), no con las etiquetas del menú.
- **Las etapas 6 y 7 corresponden a clientes existentes.** Para ellos lo importante es la rapidez, y por eso Iniciar sesión y Pagos y recargas pasaron a ser accesos persistentes del encabezado y no una categoría del menú.
- **En todas las etapas hay dudas.** Esto respalda mantener «¿Necesita ayuda?» visible en todas las páginas.

## 16.5 Relación con la arquitectura propuesta

Cada punto de contacto del recorrido corresponde a un nodo del sitemap corregido. Cada oportunidad corresponde a una decisión ya incorporada: categorías, etiquetas, enlaces contextuales, accesos persistentes y buscador. El recorrido funciona como validación cualitativa de la arquitectura: muestra que el usuario nuevo puede avanzar de una etapa a la siguiente sin salir de la categoría Comenzar a facturar, y que el cliente existente encuentra sus operaciones desde cualquier página.

*Limitación:* el recorrido se construyó a partir del análisis del sitio y de una persona representativa; no proviene de entrevistas con usuarios reales.
