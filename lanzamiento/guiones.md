# Guiones de los videos semanales

Son 11 tutoriales, uno por semana, que se publican los martes. El formato es reel 1080×1920: vos hablás a cámara y entran grabaciones de la web en picture-in-picture (PiP) o en corte a pantalla completa.

**Cómo leer cada guion**
- **Tiempo:** segundos aproximados.
- **A cámara:** lo que decís (se puede parafrasear; mantené el voseo).
- **En pantalla:** qué grabación entra. Los códigos `G01`, `G02`… remiten a la [lista de grabaciones](#lista-maestra-de-grabaciones-de-pantalla) al final.
- **Texto sobreimpreso:** Inter Black para frases y JetBrains Mono para botones, rutas y estados. Subtítulos siempre activados.

**Antes de grabar cualquier cosa**
- Prepará la [cuenta de prueba](#preparación-cuenta-de-prueba).
- Miami → Los Ángeles ya está corregido en el código ([pendiente #1](pendientes-del-sitio.md)). Hasta que hagás el deploy, no grabés el home ni /nosotros. Igual conviene entrar escribiendo la ruta directa (por ejemplo, `nexocourier.com/casillero`), porque el home muestra logos de tiendas.
- Nunca muestres nombres ni logos de tiendas (incluye el placeholder del Asistente y la tarjeta «Tiendas soportadas»), ni correos de confirmación de tiendas.

---

## Tutorial 01 · mar 13 oct · Cómo crear tu casillero en Nexo
**Duración objetivo:** 45 s · **Pilar:** Educativo · **Grabaciones:** G01–G04

**Gancho (0–3 s):** «¿Querés comprar en Estados Unidos y no tenés dirección allá? Te la doy en un minuto.»
Texto: `TU DIRECCIÓN EN EE.UU. · 1 MINUTO`

| Tiempo | A cámara | En pantalla | Texto sobreimpreso |
|---|---|---|---|
| 0–3 | Gancho | Vos a cámara, plano medio | TU DIRECCIÓN EN EE.UU. · 1 MINUTO |
| 3–8 | «Soy Alejandro, de Nexo. Entrá a nexocourier.com/casillero.» | **G01** en PiP: escribís la URL, carga «Abrí tu casillero» | `nexocourier.com/casillero` |
| 8–20 | «Elegí Persona o Empresa, poné tu nombre completo, tu móvil, tu correo dos veces y una contraseña. Aceptá los términos y tocá "Crear casillero".» | **G02** a pantalla completa, acelerado ×2 | `Crear casillero` |
| 20–27 | «Te llega un código de 6 dígitos al correo. Lo ponés acá y tocás "Confirmar cuenta".» | **G03** a pantalla completa | `Confirmar cuenta` |
| 27–38 | «Listo: esta es tu dirección en Los Ángeles. Fijate en esto: tu nombre va con "guion NEXO" al final, tal cual. Así sabemos en bodega que el paquete es tuyo.» | **G04**: tarjeta «Tu casillero en USA», zoom a la fila Nombre y al aviso | `NOMBRE - NEXO` resaltado en cyan |
| 38–45 | «Tocá "Copiar dirección", pegala cuando comprés, y el martes que viene te enseño a avisarnos de tu pedido.» | **G04** (toque en «Copiar dirección» → «Copiado») + vos a cámara | `Copiar dirección` · WhatsApp +506 6113-2863 |

**CTA:** «Guardá este video y escribinos al WhatsApp si te trabás.»

---

## Tutorial 02 · mar 20 oct · Cómo hacer la prealerta de tu pedido
**Duración objetivo:** 55 s · **Grabaciones:** G05–G08

**Gancho (0–3 s):** «Compraste algo en Estados Unidos. Si no hacés esto, tu paquete se puede atrasar.»
Texto: `PREALERTA · 3 PASOS`

| Tiempo | A cámara | En pantalla | Texto sobreimpreso |
|---|---|---|---|
| 0–3 | Gancho | Vos a cámara | PREALERTA · 3 PASOS |
| 3–15 | «La primera vez, guardá tu dirección en Costa Rica: en el menú con tu nombre, "Dirección CR", "Nueva dirección". Elegí provincia, cantón y distrito, escribí las señas y "Guardar dirección".» | **G05** a pantalla completa | `Dirección CR` → `Nueva dirección` → `Guardar dirección` |
| 15–20 | «Si te lo saltás, la web te lo recuerda con este aviso.» | **G06**: modal «Falta tu dirección de entrega» | — |
| 20–40 | «Ahora sí: entrá a "Tus pedidos" y tocá "Agregar pedido". Pegá el número de tracking que te manda la tienda en el correo de envío, poné una descripción como "audífonos", elegí la dirección y otra vez "Agregar pedido".» | **G07** a pantalla completa (tracking de ejemplo `1Z999AA10123456784`) | `Agregar pedido` · `Número de tracking *` |
| 40–48 | «Tu pedido aparece de primero en la lista, y desde ahí lo seguís hasta que te llega.» | **G08**: tarjeta nueva arriba con estado «En Ruta» | — |
| 48–55 | «Un pedido por cada tracking. El martes que viene: cómo seguirlo.» | Vos a cámara | Un tracking = un pedido |

**CTA:** «¿Te trabaste? Escribinos al +506 6113-2863.»
**Nota:** no muestres el correo real de la tienda. Si querés enseñar de dónde sale el tracking, usá una captura genérica hecha en Claude Design con «Número de seguimiento: 1Z999AA10123456784».

---

## Tutorial 03 · mar 27 oct · Cómo seguir tu pedido
**Duración objetivo:** 45 s · **Grabaciones:** G08, G09, G10

**Gancho (0–3 s):** «¿Dónde está mi paquete? Te lo enseño en 40 segundos.»
Texto: `¿DÓNDE ESTÁ MI PAQUETE?`

| Tiempo | A cámara | En pantalla | Texto sobreimpreso |
|---|---|---|---|
| 0–3 | Gancho | Vos a cámara | ¿DÓNDE ESTÁ MI PAQUETE? |
| 3–10 | «Entrá a "Tus pedidos". Cada tarjeta te dice el tracking, el estado, el peso y el monto.» | **G09**: lista con varios pedidos de prueba en estados distintos, scroll lento | `Tus pedidos` |
| 10–32 | «Son cinco estados: En Ruta, registrado y en camino. En Aduana, en el trámite aduanero. Bodega CR · Pagar, ya está en nuestra bodega en Costa Rica y podés pagar. Pago · Ruta Local, ya pagaste y coordinamos la entrega. Y Entregado.» | PiP de **G09** con zoom a cada chip de estado mientras lo nombrás | Cada estado en JetBrains Mono al nombrarlo |
| 32–40 | «Y no tenés que estar preguntando: cada vez que cambia el estado te llega un correo.» | **G10**: bandeja de entrada → correo «¡Tu pedido está en camino!» | 1 estado = 1 correo |
| 40–45 | «La semana que viene: cómo pagar con SINPE en un minuto.» | Vos a cámara | — |

**CTA:** «Guardalo para cuando tengás tu primer pedido.»
**Ojo con el tono:** no digás «tiempo real» (decisión tomada; ver [pendiente #4](pendientes-del-sitio.md)). Decí «estado actualizado en tu cuenta + correo en cada etapa».

---

## Tutorial 04 · mar 3 nov · Cómo pagar con SINPE Móvil
**Duración objetivo:** 55 s · **Grabaciones:** G11, G12, G13

**Gancho (0–3 s):** «Te llegó este correo. Así pagás en un minuto, sin salir de tu cuenta.»
Texto: `PAGÁ CON SINPE MÓVIL`

| Tiempo | A cámara | En pantalla | Texto sobreimpreso |
|---|---|---|---|
| 0–3 | Gancho mostrando el teléfono | **G11**: correo «¡Tu pedido llegó a nuestra bodega en CR!» con la tarjeta Peso / Total a pagar | PAGÁ CON SINPE MÓVIL |
| 3–10 | «Tocá "Ver mis pedidos". Tu pedido dice "Bodega CR · Pagar".» | **G11** → **G12** (lista con el chip naranja) | `Bodega CR · Pagar` |
| 10–30 | «Tocá "Sinpe Movil". Te salen el teléfono, el nombre, la descripción, que es "nexo-" y tu tracking, y el monto en colones. Cada dato tiene su botón para copiar.» | **G12** a pantalla completa: modal; toques en los íconos de copiar | `Sinpe Movil` · `nexo-{tracking}` |
| 30–40 | «Pagás desde la app de tu banco, con esa descripción, y listo.» | Vos a cámara con el teléfono (sin mostrar la app del banco) | — |
| 40–48 | «Te confirmamos por correo y tu pedido pasa a "Pago · Ruta Local".» | **G13**: correo «¡Pago recibido! Tu pedido está en camino» + chip verde | `Pago · Ruta Local` |
| 48–55 | «Importante: pagá solo a los datos que aparecen dentro de tu cuenta. Nunca te vamos a pedir que pagués a otro número.» | Vos a cámara, plano cerrado | 🔒 Solo a los datos de tu cuenta |

**CTA:** «¿Dudas con el pago? Escribinos.»
**Antes de grabar:** hacé el deploy de la corrección del monto del modal ([pendiente #2](pendientes-del-sitio.md)); ahora el modal cobra con el descuento Nexo Fiel. Difuminá el teléfono y el nombre del SINPE: refuerza el mensaje de pagar solo desde la cuenta.

---

## Tutorial 05 · mar 10 nov · Dónde ver el estado, el peso y el total (y tu Nexo Fiel)
**Duración objetivo:** 50 s · **Grabaciones:** G14, G15

**Gancho (0–3 s):** «¿Cuánto pesó mi paquete y cuánto pago? Todo está en una sola tarjeta.»
Texto: `PESO, TOTAL Y DESCUENTO`

| Tiempo | A cámara | En pantalla | Texto sobreimpreso |
|---|---|---|---|
| 0–3 | Gancho | Vos a cámara | PESO, TOTAL Y DESCUENTO |
| 3–15 | «En "Tus pedidos", cada tarjeta tiene el tracking, el estado, la dirección de entrega, la fecha, el peso en kilos y el total en dólares.» | **G14**: zoom recorriendo una tarjeta | `kg` · `$` |
| 15–25 | «Mientras viene en ruta o en aduana, dice "Pendiente de facturar": el total aparece cuando llega a la bodega en Costa Rica y lo pesamos. También te lo mandamos por correo.» | **G14**: tarjeta En Ruta con el botón gris | `Pendiente de facturar` |
| 25–40 | «Si te toca descuento Nexo Fiel, ves esta etiqueta, el precio original tachado y el precio con descuento.» | **G14**: tarjeta con «✦ 3% Nexo Fiel» y precio tachado | `✦ 3% Nexo Fiel` |
| 40–50 | «Y a la par, tu barra: cuántos kilos te faltan para el siguiente descuento. 3, 5 y 7 por ciento.» | **G15**: barra Nexo Fiel | `kg más → % off` |

**CTA:** «¿Ya revisaste tu barra? Entrá y contame en qué nivel vas.»
**Antes de grabar:** hacé el deploy de la web y del backend ([pendientes #2 y #3](pendientes-del-sitio.md)), y pasá el pedido de prueba a Bodega CR **después** del deploy, así guarda el descuento con la regla nueva.

---

## Tutorial 06 · mar 17 nov · Cómo escribirnos y quién te responde
**Duración objetivo:** 50 s · **Grabaciones:** G16, G17, G18, G19

**Gancho (0–3 s):** «¿Te responde un bot o una persona? Las dos cosas, y te explico cuándo.»
Texto: `IA 24/7 + UNA PERSONA`

| Tiempo | A cámara | En pantalla | Texto sobreimpreso |
|---|---|---|---|
| 0–3 | Gancho | Vos a cámara | IA 24/7 + UNA PERSONA |
| 3–10 | «En cualquier página de nexocourier.com tenés este botón verde. Te lleva directo a nuestro WhatsApp.» | **G16**: botón flotante abajo a la derecha, toque | — |
| 10–20 | «O en "Asistente" pegás el link de lo que querés traer y tocás "Cotizar por WhatsApp".» | **G17** con el campo de link difuminado | `Cotizar por WhatsApp` |
| 20–35 | «Te contesta primero nuestro asistente con IA, a cualquier hora: tarifas, casillero, cómo comprar.» | **G18**: chat de prueba con el bot (de noche, mostrando la hora) | IA · 24/7 |
| 35–45 | «Si tu caso necesita una persona, entro yo o alguien del equipo en el mismo chat. Vemos toda la conversación, así que no repetís nada.» | **G19**: en el panel admin, «Pausar bot» → respondés (solo la conversación de prueba) | Una persona, mismo chat |
| 45–50 | «Y si preferís correo: soporte@nexocourier.com.» | Vos a cámara | soporte@nexocourier.com |

**CTA:** «Escribinos ahora y probalo: +506 6113-2863.»
**Notas:** en G19 mostrá solo el hilo de prueba y difuminá la lista de chats (tiene números de clientes reales). No digás que el bot consulta pedidos: no lo hace.

---

## Tutorial 07 · mar 24 nov · Cotizá tu envío en 30 segundos
**Duración objetivo:** 45 s · **Grabaciones:** G20

**Gancho (0–3 s):** «Antes de comprar en Black Friday, sabé cuánto te sale traerlo.»
Texto: `COTIZÁ EN 30 SEGUNDOS`

| Tiempo | A cámara | En pantalla | Texto sobreimpreso |
|---|---|---|---|
| 0–3 | Gancho | Vos a cámara | COTIZÁ EN 30 SEGUNDOS |
| 3–20 | «Entrá a nexocourier.com/cotizar. Elegí la provincia, el tipo de paquete y el peso estimado, y tocá "Calcular precio".» | **G20** a pantalla completa (ejemplo: Limón · Paquete pequeño · 2 kg) | `Calcular precio` |
| 20–32 | «Te sale el total: 14 dólares por kilo de peso real, sin mínimo. Y el tiempo estimado: de 5 a 8 días hábiles. El precio final se confirma con el peso real.» | **G20**: resultado con zoom a «Tarifa ($14 × peso)» | $14/kg · 5–8 días hábiles |
| 32–40 | «Si te gusta, tocá "Iniciar envío por WhatsApp" y seguimos por ahí.» | **G20**: toque en el botón | `Iniciar envío por WhatsApp` |
| 40–45 | «Sin registro, sin compromiso. Este viernes: precios finales de Black Friday.» | Vos a cámara | — |

**CTA:** «Cotizá antes de comprar.»

---

## Tutorial 08 · mar 1 dic · Mandanos el link y te cotizamos
**Duración objetivo:** 45 s · **Grabaciones:** G17

**Gancho (0–3 s):** «¿Viste algo en internet y no sabés cuánto te sale traerlo? Mandame el link.»
Texto: `MANDANOS EL LINK`

| Tiempo | A cámara | En pantalla | Texto sobreimpreso |
|---|---|---|---|
| 0–3 | Gancho | Vos a cámara | MANDANOS EL LINK |
| 3–20 | «Entrá a nexocourier.com/asistente. Pegá el link en "Link del producto" y, si querés, agregá talla, color o cantidad en comentarios.» | **G17** (URL difuminada) | `Link del producto *` |
| 20–30 | «Tocá "Cotizar por WhatsApp": se abre el chat con tu link listo para enviar.» | **G17**: se abre WhatsApp con el mensaje «Hola, quiero cotizar este producto…» (link difuminado) | `Cotizar por WhatsApp` |
| 30–38 | «Revisamos el producto y te confirmamos el peso estimado y cuánto cuesta el envío.» | Vos a cámara | — |
| 38–45 | «¿Es para Navidad? La fecha límite para recibir antes del 24 es el {{FECHA_LIMITE_NAVIDAD}}.» | Vos a cámara | {{FECHA_LIMITE_NAVIDAD}} |

**Notas:** no grabes la tarjeta «Tiendas soportadas» ni el placeholder del campo de link, porque nombran tiendas ([pendiente #10](pendientes-del-sitio.md)).

---

## Tutorial 09 · mar 8 dic · 3 errores que atrasan tu paquete
**Duración objetivo:** 50 s · **Grabaciones:** G04, G06, G07

**Gancho (0–3 s):** «Tres errores que en diciembre te atrasan el paquete días.»
Texto: `3 ERRORES`

| Tiempo | A cámara | En pantalla | Texto sobreimpreso |
|---|---|---|---|
| 0–3 | Gancho | Vos a cámara | 3 ERRORES |
| 3–18 | «Uno: poner tu nombre sin "guion NEXO". Usá el botón "Copiar dirección" y pegala tal cual.» | **G04**: zoom a la fila Nombre + toque en «Copiar dirección» | ❌ 01 · `- NEXO` |
| 18–32 | «Dos: no tener guardada tu dirección en Costa Rica. Sin eso no podés ni agregar el pedido: te sale este aviso.» | **G06** | ❌ 02 · `Dirección CR` |
| 32–45 | «Tres: no agregar el tracking. Apenas la tienda te lo mande, "Tus pedidos", "Agregar pedido".» | **G07** acelerado | ❌ 03 · `Agregar pedido` |
| 45–50 | «Tres minutos hoy te ahorran días. Guardá este video.» | Vos a cámara | — |

---

## Tutorial 10 · mar 15 dic · Todo Nexo en 1 minuto
**Duración objetivo:** 60 s · **Grabaciones:** reutiliza G02, G04, G07, G09, G12, G13

**Gancho (0–3 s):** «Si alguien te pregunta cómo traés tus cosas de Estados Unidos, mandale este video.»
Texto: `TODO NEXO EN 1 MINUTO`

| Tiempo | A cámara | En pantalla | Texto sobreimpreso |
|---|---|---|---|
| 0–3 | Gancho | Vos a cámara | TODO NEXO EN 1 MINUTO |
| 3–15 | «Uno: abrís tu casillero gratis y copiás tu dirección en Los Ángeles.» | **G02** + **G04** acelerados | 01 · Casillero |
| 15–27 | «Dos: comprás y agregás el pedido con el tracking.» | **G07** | 02 · Agregar pedido |
| 27–39 | «Tres: seguís los estados, y te llega un correo en cada uno.» | **G09** | 03 · Estados |
| 39–51 | «Cuatro: cuando llega a la bodega en Costa Rica, pagás con SINPE y te lo llevamos.» | **G12** + **G13** | 04 · SINPE → tu puerta |
| 51–60 | «14 dólares por kilo, entrega gratis en Guápiles Centro, y una IA con personas detrás en WhatsApp. Eso es Nexo.» | Vos a cámara | $14/kg · Guápiles gratis · IA 24/7 |

---

## Tutorial 11 · mar 22 dic · Cómo dejar tu reseña (y gracias)
**Duración objetivo:** 40 s · **Grabaciones:** G21

**Gancho (0–3 s):** «Si Nexo te sirvió este año, te pido un favor de 20 segundos.»
Texto: `DEJÁ TU RESEÑA`

| Tiempo | A cámara | En pantalla | Texto sobreimpreso |
|---|---|---|---|
| 0–3 | Gancho | Vos a cámara | DEJÁ TU RESEÑA |
| 3–20 | «Entrá a "Tus pedidos" y tocá "Dejar reseña". Aparece cuando ya recibiste un pedido. Elegí las estrellas, escribí tu comentario y "Enviar reseña".» | **G21** | `Dejar reseña` → `Enviar reseña` |
| 20–28 | «Tu reseña sale en nexocourier.com/resenas y le ayuda a otra persona a decidirse.» | **G21**: página /resenas | nexocourier.com/resenas |
| 28–40 | «Y gracias. De verdad. Por confiar en un courier de Guápiles este 2026.» | Vos a cámara, plano cerrado | Gracias, 2026 |

**Nota:** con la cuenta de prueba grabá hasta antes de tocar «Enviar reseña», o borrá la reseña desde el admin («Reseñas») justo después. No puede quedar publicada una reseña de prueba.

---

## Preparación: cuenta de prueba
1. Creá un casillero con un correo tuyo de pruebas. Nombre sugerido: «Cliente Prueba».
2. Guardá una Dirección CR (Guápiles, Pococí, Limón).
3. Agregá 5 pedidos con trackings de prueba (`NXTEST0001`…`NXTEST0005`) y, desde `/admin`, dejá uno en cada estado:
   - En Ruta
   - En Aduana
   - Bodega CR · Pagar (sin descuento, para G12)
   - Pago · Ruta Local
   - Entregado
4. Para G14/G15 (Nexo Fiel), poné pesos que sumen más de 10 kg con un pedido que cruce el hito (por ejemplo, Entregado 6 kg + Bodega CR 4,5 kg).
5. Al terminar la temporada, eliminá la cuenta desde «Cuenta» → «Eliminar mi cuenta».

## Lista maestra de grabaciones de pantalla
Grabá en el teléfono, en vertical (1080×1920), con el modo oscuro de la web, el teclado limpio y las notificaciones apagadas. Repetí cada toma dos veces: una lenta y una normal.

| ID | Ruta / lugar | Qué grabar | Difuminar / cuidado | Usado en |
|---|---|---|---|---|
| G01 | `/casillero` (sin sesión) | Escribir la URL y que cargue «Abrí tu casillero» | No pasar por el home | T01 |
| G02 | `/casillero` | Llenar «Crear cuenta»: Persona, nombre, móvil, correo ×2, contraseña ×2, términos → «Crear casillero» | Correo y teléfono de prueba | T01, T10 |
| G03 | `/casillero` paso 2 | «Verificá tu correo» → código → «Confirmar cuenta» | — | T01 |
| G04 | `/casillero` con sesión | Tarjeta «Tu casillero en USA», zoom a Nombre «… - NEXO» y al aviso; toque en «Copiar dirección» → «Copiado» | — | T01, T09, T10 |
| G05 | `/direccion` | «Nueva dirección» → Provincia, Cantón, Distrito, Señas → «Guardar dirección» | Señas genéricas | T02 |
| G06 | `/pedidos` sin dirección | «Agregar pedido» → modal «Falta tu dirección de entrega» | Usar una 2.ª cuenta sin dirección | T02, T09 |
| G07 | `/pedidos` | «Agregar pedido» → «Número de tracking *», «Descripción (opcional)», elegir dirección → «Agregar pedido» | Tracking de ejemplo | T02, T09, T10 |
| G08 | `/pedidos` | El pedido nuevo aparece arriba con «En Ruta» | — | T02, T03 |
| G09 | `/pedidos` | Lista con los 5 estados, scroll lento | — | T03, T10 |
| G10 | Correo de prueba | Correo «¡Tu pedido está en camino!» (cambiar un pedido a En Ruta desde el admin) | Otros correos de la bandeja | T03 |
| G11 | Correo de prueba | Correo «¡Tu pedido llegó a nuestra bodega en CR!» con Peso / Total a pagar → «Ver mis pedidos» | — | T04 |
| G12 | `/pedidos` | Pedido en «Bodega CR · Pagar» → «Sinpe Movil» → modal con copiar | Difuminar teléfono y nombre del SINPE | T04, T10 |
| G13 | Correo + `/pedidos` | Correo «¡Pago recibido!…» y chip «Pago · Ruta Local» | — | T04, T10 |
| G14 | `/pedidos` | Tarjeta completa; tarjeta «Pendiente de facturar»; tarjeta con «✦ 3% Nexo Fiel» y precio tachado | Después del deploy (pendientes #2 y #3) | T05 |
| G15 | `/pedidos` (lateral) | Barra Nexo Fiel («kg más → % off», «Total … kg histórico») | Después del deploy (pendiente #3) | T05 |
| G16 | Cualquier página (no el home) | Botón verde de WhatsApp → abre el chat | — | T06 |
| G17 | `/asistente` | Pegar link → comentarios → «Cotizar por WhatsApp» → WhatsApp con el mensaje | Difuminar URL, placeholder y tarjeta «Tiendas soportadas» | T06, T08 |
| G18 | WhatsApp en un teléfono personal | Conversación con el bot de noche (pregunta de tarifa → respuesta) | Mostrar la hora del teléfono | T06 |
| G19 | `/admin` → Conversaciones | Abrir el hilo de prueba → «Pausar bot» → escribir y enviar | Difuminar la lista de chats | T06 |
| G20 | `/cotizar` | Provincia, Tipo de paquete, Peso → «Calcular precio» → resultado → «Iniciar envío por WhatsApp» | No grabar las preguntas frecuentes | T07 |
| G21 | `/pedidos` + `/resenas` | «Dejar reseña» → estrellas → comentario → (no enviar) · página /resenas | No dejar publicada la reseña de prueba | T11 |
