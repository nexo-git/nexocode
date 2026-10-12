# Pendientes del sitio

Esto es lo que falta o conviene corregir en nexocourier.com para que los tutoriales y los mensajes de marca coincidan con lo que ve el cliente. Está ordenado por impacto en el calendario. Las rutas son del repo.

## ✅ Resueltos en código el 12 oct (falta hacer deploy de la web y del backend)

### 1. La web dice «Miami», pero la bodega real es Los Ángeles · antes del 13 oct
El cliente recibe la dirección de Los Ángeles (`src/lib/constants.ts:3`, `src/components/casillero/AddressCard.tsx`), pero el marketing sigue diciendo Miami:
- `src/components/sections/HeroSection.tsx:81-82`: tarjeta decorativa «MIA / Miami, FL» (home).
- `src/components/sections/HowItWorksSection.tsx:8,14`: «Usá nuestra dirección en Miami…», «…bodega en Miami».
- `src/components/sections/ValuesSection.tsx:27`: «…desde Miami hasta tu puerta.»
- `src/components/sections/ContactSection.tsx:29-31`: «Bodega Miami / Miami, Florida, USA» (/nosotros).
- Datos muertos: `src/lib/constants.ts:30`, `src/lib/tracking.ts`, `src/components/sections/TestimonialsSection.tsx:16`.

**Hecho:** todos los textos dicen Los Ángeles (la tarjeta del hero ahora muestra «LAX · Los Ángeles, CA»). También se quitó la promesa de «foto y peso», que no existía: ahora dice «te avisamos por correo en cada etapa».

### 2. El modal de SINPE cobra sin el descuento de Nexo Fiel · antes del 3 nov (tutorial 04)
- La tarjeta del pedido muestra el precio con descuento.
- El correo usa `totalFinal` del backend.
- Pero el modal «Sinpe Movil» muestra `totalPagado` sin descuento (`src/app/pedidos/page.tsx:170-243`).

Además, el tipo `NexoOrder` (`src/types/casillero.ts:4-20`) no trae `totalBase`, `discountPct` ni `totalFinal`. Resultado: el mismo pedido puede mostrar tres montos distintos.
**Hecho:** el tipo trae esos campos y la tarjeta, el modal de SINPE y el admin usan el monto que guarda el backend (`orderAmount` en `src/lib/loyalty.ts`). El modal muestra «✦ Incluye X% de descuento Nexo Fiel».

### 3. Nexo Fiel: el backend aplica una regla distinta a la que comunicamos · antes del 31 oct
- **Lo que comunica la web y el contenido:** el descuento aplica solo al pedido que alcanza el hito y el contador vuelve a 0 después de Oro (`src/components/sections/NexoFielSection.tsx`, `src/lib/loyalty.ts`).
- **Lo que hace el backend** (`infrastructure/nexo-stack.ts:581-603`): suma todos los kg históricos, aplica el % a **todos** los pedidos desde que alcanzás el nivel y **nunca reinicia**.

**Hecho:** el backend usa la misma regla que la web (probado con 20.000 casos aleatorios, sin diferencias) y `docs/backend.tex` está actualizado. Queda pendiente la nota de `src/components/pedidos/LoyaltyBar.tsx`: dice «Solo cuentan pedidos Entregados», pero también cuenta Bodega CR y Pago · Ruta Local.

## 🟠 Importantes (afectan la promesa de marca)

### 4. Rastreo: no hay buscador ni línea de tiempo
- `/tracking` no tiene campo para el número de tracking, solo «Ver mis pedidos» y «Preguntar por WhatsApp».
- Aun así, el texto dice «en tiempo real» (`src/app/tracking/page.tsx:14-15`, `ValuesSection.tsx`, la meta de `src/app/layout.tsx:22` y la tarjeta del hero).
- En `/pedidos` el estado se carga una vez por visita, sin actualización automática.

**Arreglo:** conectar los componentes que ya existen y no se usan (`src/components/tracking/TrackingCard.tsx`, `TrackingTimeline.tsx`, `StatusBadge.tsx`) a los pedidos reales, con el historial de cambios de estado y la hora. Mientras tanto, cambiar «tiempo real» por «estado actualizado + correo en cada etapa».

### 5. La prealerta es mínima
«Agregar pedido» (`src/app/pedidos/page.tsx:331-391`) pide solo «Número de tracking *» y «Descripción (opcional)».
- Faltan: tienda o remitente, valor declarado, transportista y subir la factura. Todo esto ayuda en aduana y a identificar paquetes sin «- NEXO».
- Conviene llamarlo «Prealerta» o «Avisar de un pedido», que es como lo busca la gente.

### 6. Un pedido nuevo aparece como «En Ruta» antes de llegar a la bodega
Al crearse, el pedido entra con `status: 'en_ruta'` (`infrastructure/nexo-stack.ts:466,526`). En Ruta significa «salió de nuestras bodegas en Estados Unidos», según el correo, así que el cliente ve «En Ruta» aunque el paquete todavía no haya llegado a Los Ángeles.
**Arreglo:** agregar los estados «Prealertado» y «Recibido en bodega LA».

### 7. No hay factura ni desglose por pedido
No existe una página de factura. El único desglose (peso, total, descuento) llega en el correo de Bodega CR.
**Arreglo:** agregar un detalle de pedido con peso, tarifa, descuento, total en USD, total en ₡ con el tipo de cambio y el estado del pago.

### 8. Pago
- «Tarjeta» está deshabilitado («Próximamente»): Stripe es un stub (`src/lib/payments.ts:5`, Lambda `nexo-payment-create` devuelve 503).
- No hay forma de subir el comprobante de SINPE. La confirmación es manual.
- El botón dice «Sinpe Movil» sin tilde. Conviene «SINPE Móvil».

### 9. Promesas contradictorias en el copy de la web
- **Atención:** «Atención 24/7» (hero, ValuesSection, ContactSection) contra «Respuesta en menos de 1 hora en horario laboral» (`ContactSection.tsx:10`) y «24 horas hábiles» (`src/app/reembolsos/page.tsx:60`). Propuesta: «IA 24/7 en WhatsApp · un humano en horario de {{HORARIO}}».
- **Tiempos de entrega:** «2 días» (tarjeta del hero), «6 días tiempo promedio» (`src/app/page.tsx:11`) y «5–8 días hábiles» (cotizador, `src/lib/pricing.ts:11-12`). El contenido usa **5–8 días hábiles**.
- **Fotos:** «Te notificamos de inmediato con foto y peso» (`HowItWorksSection.tsx:14`), pero no existe la función de foto.

## 🟡 Menores

10. **El «Asistente» no es IA.** `/asistente` es un formulario que abre WhatsApp. El bot real vive en WhatsApp (nexobot, fuera de este repo).
    - Opciones: renombrar el menú a «Cotizar un producto», o agregar un widget de chat del bot en la web.
    - El placeholder `https://www.amazon.com/dp/...` y la tarjeta «Tiendas soportadas» nombran tiendas: cambiar el placeholder por `https://…` y quitar los nombres.
11. **Sección de logos de tiendas en el home** (`src/components/sections/StoreLogosSection.tsx`). Choca con la regla de marca de no mostrar tiendas, y obliga a evitar el home en los videos.
12. **Reseñas semilla:** si la API no devuelve reseñas, el home muestra tres reseñas hard-codeadas (`src/components/sections/ReviewsSection.tsx`). Para una marca basada en la confianza, conviene ocultar la sección en lugar de mostrar reseñas de ejemplo.
13. **Instagram del footer:** apunta a `instagram.com/nexo.cr` (`src/components/layout/Footer.tsx:64-72`), no a **@nexo.courier**. Revisar también Facebook y LinkedIn.
14. **No hay /contacto ni página de preguntas frecuentes:** el bloque de contacto solo está en `/nosotros` y las preguntas frecuentes solo en `/cotizar`. Un `/ayuda` con FAQ y contacto serviría de destino para los CTA.
15. **Impuestos:** los términos dicen que los impuestos de aduana no están incluidos en la tarifa (`src/app/terminos/page.tsx:32`). Conviene aclarar que la reventa a precio final es una modalidad aparte, con los impuestos incluidos, para que nadie lo lea como contradicción.
