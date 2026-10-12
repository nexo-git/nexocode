# Prompts para Claude Design

Cada prompt es autocontenido: copialo entero en Claude Design. Trae las reglas de marca, el formato exacto, el texto en pantalla y la composición.

- **Posts y carruseles:** 1080×1350. **Reels:** el prompt es la portada (1080×1920 con el área segura de 1080×1350). **Historias:** 1080×1920.
- Las historias de tipo «Compartir post/reel» son el fondo sobre el que Instagram pega la vista previa del post.
- Las de tipo «Selfie a cámara» o «Video detrás de cámara» son la capa de texto sobre tu video.
- Los posts comerciales usan la plantilla de [plantilla-comercial.md](plantilla-comercial.md).

## Posts del feed

### S1-EDU · mar 13 oct · Cómo crear tu casillero en Nexo

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Cómo crear tu casillero en Nexo

FORMATO: portada de reel, lienzo vertical 1080×1920 px. Todo el texto y el sujeto principal dentro del área central de 1080×1350 px (lo que se ve en la grilla del perfil). Exportar también el recorte 1080×1350.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
ABRÍ TU CASILLERO
EN 1 MINUTO

COMPOSICIÓN:
Portada de reel. Mitad inferior: espacio para recorte de Alejandro (foto a cámara, sonriendo, fondo oscuro). Mitad superior: titular en dos líneas, 'EN 1 MINUTO' en cyan. Chip pequeño en JetBrains Mono arriba: 'TUTORIAL 01'. Mockup de teléfono inclinado a la derecha con la tarjeta 'Tu casillero en USA' (filas Nombre / Dirección / Ciudad: LOS ANGELES / Estado: California (CA)) en estilo dark. Todo el contenido clave dentro del área central 1080×1350.
```

### S1-COM · jue 15 oct · Audífonos inalámbricos a precio final

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Audífonos inalámbricos a precio final

FORMATO: post de feed 1080×1350 px (4:5 vertical, nunca cuadrado).

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
PRECIO FINAL
{{PRECIO_FINAL}}
Audífonos inalámbricos con cancelación de ruido
Incluye producto, peso, traída e impuestos

COMPOSICIÓN:
Usar la PLANTILLA COMERCIAL (ver plantilla-comercial.md). Foto del producto recortada (sin caja ni etiquetas de tienda) centrada sobre un círculo de glow cyan suave. Etiqueta 'PRECIO FINAL' en JetBrains Mono cyan, precio grande en JetBrains Mono Bold Ghost White. Debajo, línea Slate Gray 'Incluye producto, peso, traída e impuestos'. Pie: 'Escribinos «AUDÍFONOS» · +506 6113-2863'.
```

### S1-CONF · sáb 17 oct · Qué es Nexo y cómo la IA te atiende 24/7

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Qué es Nexo y cómo la IA te atiende 24/7

FORMATO: carrusel de 5 láminas, cada una 1080×1350 px (4:5 vertical, nunca cuadrado). Diseño continuo y coherente entre láminas.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
L1: ¿Nos escribís a las 2 a. m.?
Te respondemos.
L2: Nexo = tu casillero en Los Ángeles para traer tus compras de EE.UU. a Costa Rica.
L3: IA 24/7 en WhatsApp
Tarifas · casillero · cómo comprar
L4: ¿Necesitás una persona?
Entra alguien del equipo en el mismo chat. Sin repetir nada.
L5: Escribinos
+506 6113-2863
nexocourier.com

COMPOSICIÓN:
Carrusel con hilo visual continuo: una línea cyan fina que recorre las 5 láminas. L1: titular gigante centrado, reloj en JetBrains Mono '02:00' arriba en cyan. L2: mapa minimalista con dos puntos (LAX → CR) unidos por arco cyan, etiquetas en JetBrains Mono 'LOS ANGELES, CA' y 'GUÁPILES, CR'. L3: burbujas de chat oscuras estilo WhatsApp (sin logo de WhatsApp), una con etiqueta 'IA' en chip cyan. L4: misma conversación, aparece burbuja con etiqueta 'EQUIPO NEXO' y espacio circular para foto de Alejandro. L5: cierre con número grande en JetBrains Mono y wordmark nexo.
```

### S2-EDU · mar 20 oct · Cómo hacer la prealerta de tu pedido

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Cómo hacer la prealerta de tu pedido

FORMATO: portada de reel, lienzo vertical 1080×1920 px. Todo el texto y el sujeto principal dentro del área central de 1080×1350 px (lo que se ve en la grilla del perfil). Exportar también el recorte 1080×1350.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
PREALERTA
EN 3 PASOS

COMPOSICIÓN:
Portada de reel. Alejandro a la izquierda (recorte), a la derecha un mockup de teléfono con el formulario 'Nuevo pedido' (campo 'Número de tracking *' con valor en JetBrains Mono '1Z999AA10123456784' y botón cyan 'Agregar pedido'). Chip arriba 'TUTORIAL 02'. Titular abajo: 'PREALERTA' Ghost White, 'EN 3 PASOS' cyan.
```

### S2-COM · jue 22 oct · Consola o videojuego a precio final

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Consola o videojuego a precio final

FORMATO: post de feed 1080×1350 px (4:5 vertical, nunca cuadrado).

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
PRECIO FINAL
{{PRECIO_FINAL}}
{{PRODUCTO}}
Incluye producto, peso, traída e impuestos

COMPOSICIÓN:
PLANTILLA COMERCIAL. Producto recortado con ligero ángulo y reflejo en el piso oscuro; detalles de luz cyan tipo 'gaming' pero sobrios. Mismo bloque de precio que en S1-COM. Pie: 'Escribinos «GAMER» · +506 6113-2863'.
```

### S2-CONF · sáb 24 oct · $14 por kilo, sin letra pequeña

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: $14 por kilo, sin letra pequeña

FORMATO: post de feed 1080×1350 px (4:5 vertical, nunca cuadrado).

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
$14/kg
Peso real · Sin mínimo · Sin recargos ocultos
1,5 kg → $21

COMPOSICIÓN:
Tipográfico puro. '$14/kg' enorme en JetBrains Mono Bold Ghost White, '/kg' en cyan. Debajo, tres chips en fila con borde cyan 1 px: 'PESO REAL', 'SIN MÍNIMO', 'SIN RECARGOS OCULTOS'. Abajo, una 'línea de cálculo' estilo terminal en JetBrains Mono Slate Gray: '1,5 kg × $14 = $21'. Grilla sutil de fondo.
```

### S3-EDU · mar 27 oct · Cómo seguir tu pedido

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Cómo seguir tu pedido

FORMATO: portada de reel, lienzo vertical 1080×1920 px. Todo el texto y el sujeto principal dentro del área central de 1080×1350 px (lo que se ve en la grilla del perfil). Exportar también el recorte 1080×1350.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
¿DÓNDE ESTÁ
MI PAQUETE?

COMPOSICIÓN:
Portada de reel. Línea de tiempo vertical a la derecha con 5 puntos y etiquetas en JetBrains Mono: EN RUTA · EN ADUANA · BODEGA CR · PAGAR · PAGO · RUTA LOCAL · ENTREGADO; el tercero resaltado en cyan con glow. Alejandro a la izquierda señalando la línea. Chip 'TUTORIAL 03'.
```

### S3-COM · jue 29 oct · Taladro inalámbrico a precio final

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Taladro inalámbrico a precio final

FORMATO: post de feed 1080×1350 px (4:5 vertical, nunca cuadrado).

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
PRECIO FINAL
{{PRECIO_FINAL}}
Taladro inalámbrico
Incluye producto, peso, traída e impuestos

COMPOSICIÓN:
PLANTILLA COMERCIAL. Taladro recortado en diagonal, batería y accesorios alineados en grilla debajo (si vienen en el kit). Mismo bloque de precio. Pie: 'Escribinos «TALADRO» · +506 6113-2863'.
```

### S3-CONF · sáb 31 oct · Nexo Fiel: mientras más enviás, más ahorrás

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Nexo Fiel: mientras más enviás, más ahorrás

FORMATO: carrusel de 4 láminas, cada una 1080×1350 px (4:5 vertical, nunca cuadrado). Diseño continuo y coherente entre láminas.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
L1: NEXO FIEL
Mientras más enviás, más ahorrás
L2: BRONCE 3% · 10 kg
PLATA 5% · 25 kg
ORO 7% · 50 kg
L3: Las reglas
① Aplica al pedido que alcanza el hito
② Después de Oro, vuelve a 0 kg
③ Automático
L4: Mirá tu avance en «Tus pedidos»

COMPOSICIÓN:
L1: símbolo ✦ grande en cyan con glow, titular Inter Black. L2: tres tarjetas verticales escalonadas (bronce, plata, oro como acentos metálicos muy sutiles sobre el fondo oscuro; el porcentaje en JetBrains Mono grande). L3: lista numerada limpia. L4: mockup de teléfono con la barra 'Nexo Fiel' ('{x} kg más → 5% off', 'Total … kg histórico').
```

### S4-EDU · mar 3 nov · Cómo pagar tu pedido con SINPE Móvil

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Cómo pagar tu pedido con SINPE Móvil

FORMATO: portada de reel, lienzo vertical 1080×1920 px. Todo el texto y el sujeto principal dentro del área central de 1080×1350 px (lo que se ve en la grilla del perfil). Exportar también el recorte 1080×1350.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
PAGÁ CON
SINPE MÓVIL

COMPOSICIÓN:
Portada de reel. Mockup de teléfono al centro con el modal de pago (filas Teléfono / Nombre / Descripción 'nexo-1Z999…' / Monto en colones '₡ —' en JetBrains Mono; datos personales difuminados). Alejandro a la derecha. Chip 'TUTORIAL 04'.
```

### S4-COM · jue 5 nov · Guía de regalos 1: regalos que sí usan

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Guía de regalos 1: regalos que sí usan

FORMATO: carrusel de 6 láminas, cada una 1080×1350 px (4:5 vertical, nunca cuadrado). Diseño continuo y coherente entre láminas.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
L1: GUÍA DE REGALOS #1
Regalos que sí se usan
L2–L5: {{PRODUCTO_n}}
PRECIO FINAL {{PRECIO_FINAL_n}}
L6: Escribinos «REGALO» + número
+506 6113-2863

COMPOSICIÓN:
L1 portada: los 4 productos recortados en grilla 2×2 sobre fondo oscuro con moño minimal en línea cyan. L2–L5: una lámina por producto con la PLANTILLA COMERCIAL y número grande '01'…'04' en JetBrains Mono Slate Gray. L6: cierre con CTA.
```

### S4-CONF · sáb 7 nov · El tipo de cambio no lo inventamos

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: El tipo de cambio no lo inventamos

FORMATO: post de feed 1080×1350 px (4:5 vertical, nunca cuadrado).

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
EL TIPO DE CAMBIO
NO LO INVENTAMOS
TC venta · Fuente: BCCR

COMPOSICIÓN:
Titular en dos líneas, 'NO LO INVENTAMOS' en cyan. Debajo, una 'tarjeta recibo' oscura con borde fino que replica el pie del modal de pago en JetBrains Mono: 'Monto (USD) $—', 'Monto en colones ₡—', 'TC venta: ₡—/USD · DD/MM/AAAA · Fuente: BCCR' (valores con guiones, no inventar cifras).
```

### S5-EDU · mar 10 nov · Dónde ver el estado, el peso y el total de tu pedido

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Dónde ver el estado, el peso y el total de tu pedido

FORMATO: portada de reel, lienzo vertical 1080×1920 px. Todo el texto y el sujeto principal dentro del área central de 1080×1350 px (lo que se ve en la grilla del perfil). Exportar también el recorte 1080×1350.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
PESO, TOTAL
Y DESCUENTO

COMPOSICIÓN:
Portada de reel. Tarjeta de pedido ampliada (estilo de la web) con: tracking en JetBrains Mono, chip de estado 'Bodega CR · Pagar', '2,4 kg', precio tachado y precio final en verde #00E5A0 con chip '✦ 3% Nexo Fiel' (cifras de ejemplo marcadas como 'ejemplo'). Alejandro abajo a la izquierda. Chip 'TUTORIAL 05'.
```

### S5-COM · jue 12 nov · Reloj inteligente a precio final

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Reloj inteligente a precio final

FORMATO: post de feed 1080×1350 px (4:5 vertical, nunca cuadrado).

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
PRECIO FINAL
{{PRECIO_FINAL}}
Reloj inteligente
Incluye producto, peso, traída e impuestos

COMPOSICIÓN:
PLANTILLA COMERCIAL. Reloj de frente, pantalla encendida con UI genérica en cyan (sin logos de marca en la pantalla). Pie: 'Escribinos «RELOJ» · +506 6113-2863'.
```

### S5-CONF · sáb 14 nov · Detrás de Nexo hay una persona de Guápiles

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Detrás de Nexo hay una persona de Guápiles

FORMATO: post de feed 1080×1350 px (4:5 vertical, nunca cuadrado).

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
DETRÁS DE NEXO
HAY UNA PERSONA
DE GUÁPILES
Alejandro · fundador

COMPOSICIÓN:
Foto real de Alejandro (retrato, luz natural, fondo de Guápiles o de la bodega) ocupando 60% superior con degradado hacia #0A0E1A. Titular sobre el degradado, 'DE GUÁPILES' en cyan. Firma en JetBrains Mono Slate Gray 'Alejandro · fundador'. NO usar foto de stock: dejar marco con placeholder 'FOTO REAL'.
```

### S6-EDU · mar 17 nov · Cómo escribirnos y quién te responde (IA + persona)

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Cómo escribirnos y quién te responde (IA + persona)

FORMATO: portada de reel, lienzo vertical 1080×1920 px. Todo el texto y el sujeto principal dentro del área central de 1080×1350 px (lo que se ve en la grilla del perfil). Exportar también el recorte 1080×1350.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
IA 24/7
+ UNA PERSONA

COMPOSICIÓN:
Portada de reel. Chat oscuro tipo WhatsApp (sin logo de WhatsApp) con burbuja etiquetada 'IA' y luego una etiquetada 'EQUIPO NEXO'. Alejandro a la derecha con el teléfono en la mano. Chip 'TUTORIAL 06'.
```

### S6-COM · jue 19 nov · Guía de regalos 2: para gamers

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Guía de regalos 2: para gamers

FORMATO: carrusel de 6 láminas, cada una 1080×1350 px (4:5 vertical, nunca cuadrado). Diseño continuo y coherente entre láminas.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
L1: GUÍA DE REGALOS #2
Para gamers
L2–L5: {{PRODUCTO_n}}
PRECIO FINAL {{PRECIO_FINAL_n}}
L6: Escribinos «GAMER» + número
+506 6113-2863

COMPOSICIÓN:
Igual a S4-COM pero con acentos de luz cyan más intensos (estilo setup gamer nocturno). Portada con los 4 productos sobre un escritorio oscuro.
```

### S6-CONF · sáb 21 nov · Reseñas reales de clientes

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Reseñas reales de clientes

FORMATO: carrusel de 4 láminas, cada una 1080×1350 px (4:5 vertical, nunca cuadrado). Diseño continuo y coherente entre láminas.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
L1: NO LO DECIMOS NOSOTROS
L2–L4: «{{RESEÑA_n}}»
★★★★★ {{NOMBRE_n}} · {{LUGAR_n}}

COMPOSICIÓN:
L1: titular, cinco estrellas en cyan. L2–L4: una reseña por lámina, comillas gigantes en cyan, texto en Inter, firma en JetBrains Mono. SOLO reseñas reales tomadas de /resenas, con permiso del cliente. No inventar texto ni nombres.
```

### S7-EDU · mar 24 nov · Cotizá tu envío en 30 segundos (antes de Black Friday)

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Cotizá tu envío en 30 segundos (antes de Black Friday)

FORMATO: portada de reel, lienzo vertical 1080×1920 px. Todo el texto y el sujeto principal dentro del área central de 1080×1350 px (lo que se ve en la grilla del perfil). Exportar también el recorte 1080×1350.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
COTIZÁ TU ENVÍO
EN 30 SEGUNDOS

COMPOSICIÓN:
Portada de reel. Mockup de teléfono con el resultado de la cotización: 'Cotización estimada', '$— USD' en JetBrains Mono, línea 'Tarifa ($14 × peso)'. Cronómetro '00:30' en cyan arriba. Alejandro abajo. Chip 'TUTORIAL 07'.
```

### S7-BF · vie 27 nov · Black Friday Nexo: precios finales

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Black Friday Nexo: precios finales

FORMATO: carrusel de 6 láminas, cada una 1080×1350 px (4:5 vertical, nunca cuadrado). Diseño continuo y coherente entre láminas.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
L1: BLACK FRIDAY
PRECIOS FINALES EN COLONES
L2–L5: {{PRODUCTO_n}} · {{PRECIO_FINAL_n}}
L6: Válido hasta {{FIN_PROMO_BF}} · Escribinos «BLACK»

COMPOSICIÓN:
L1: 'BLACK FRIDAY' en Inter Black gigante, contorno cyan, sobre el negro de marca. Sin rojos ni amarillos de oferta genérica: premium y sobrio. L2–L5: PLANTILLA COMERCIAL con banda superior 'BLACK FRIDAY' en JetBrains Mono. Si hay precio anterior real, mostrarlo tachado en Slate Gray; si no, omitir. L6: condiciones y CTA.
```

### S7-CONF · sáb 28 nov · Compraste en Black Friday: agregá cada tracking

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Compraste en Black Friday: agregá cada tracking

FORMATO: post de feed 1080×1350 px (4:5 vertical, nunca cuadrado).

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
¿COMPRASTE EN
BLACK FRIDAY?
☑ Nombre + «- NEXO»
☑ Dirección CR guardada
☑ Cada tracking en «Tus pedidos»

COMPOSICIÓN:
Checklist grande con casillas cyan marcadas, estilo terminal. Titular arriba. Pie con wordmark nexo y 'nexocourier.com'.
```

### S7-CM · lun 30 nov · Cyber Monday: tecnología a precio final

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Cyber Monday: tecnología a precio final

FORMATO: post de feed 1080×1350 px (4:5 vertical, nunca cuadrado).

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
CYBER MONDAY
SOLO HOY
{{PRODUCTO}}
PRECIO FINAL {{PRECIO_FINAL}}

COMPOSICIÓN:
PLANTILLA COMERCIAL con banda 'CYBER MONDAY · SOLO HOY' en JetBrains Mono cyan y efecto de líneas de circuito muy sutiles en el fondo.
```

### S8-EDU · mar 1 dic · Pedinos cualquier producto con solo el link

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Pedinos cualquier producto con solo el link

FORMATO: portada de reel, lienzo vertical 1080×1920 px. Todo el texto y el sujeto principal dentro del área central de 1080×1350 px (lo que se ve en la grilla del perfil). Exportar también el recorte 1080×1350.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
MANDANOS
EL LINK

COMPOSICIÓN:
Portada de reel. Campo de formulario grande 'Link del producto *' con URL genérica difuminada y botón cyan 'Cotizar por WhatsApp'. Ícono de enlace en cyan. Alejandro a la izquierda. Chip 'TUTORIAL 08'.
```

### S8-COM · jue 3 dic · Regalos listos para Navidad a precio final

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Regalos listos para Navidad a precio final

FORMATO: carrusel de 6 láminas, cada una 1080×1350 px (4:5 vertical, nunca cuadrado). Diseño continuo y coherente entre láminas.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
L1: REGALOS LISTOS
PARA NAVIDAD
L2–L5: {{PRODUCTO_n}} · PRECIO FINAL {{PRECIO_FINAL_n}}
L6: Apartalo antes del {{FECHA_LIMITE_REVENTA}}

COMPOSICIÓN:
Navidad en versión dark premium: nada de rojo y verde clásicos; luces tipo bokeh en cyan y blanco frío sobre #0A0E1A, una rama minimal en línea. PLANTILLA COMERCIAL en L2–L5.
```

### S8-CONF · sáb 5 dic · Fecha límite para recibir antes de Navidad

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Fecha límite para recibir antes de Navidad

FORMATO: post de feed 1080×1350 px (4:5 vertical, nunca cuadrado).

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
FECHA LÍMITE
PARA RECIBIR ANTES DE NAVIDAD
{{FECHA_LIMITE_NAVIDAD}}
En bodega Los Ángeles

COMPOSICIÓN:
Calendario minimal: fecha gigante en JetBrains Mono Bold Ghost White dentro de un marco con esquinas cyan. Arriba el titular. Abajo en Slate Gray: 'Llegada a bodega Los Ángeles'. Sin elementos navideños cursis.
```

### S9-EDU · mar 8 dic · 3 errores que atrasan tu paquete

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: 3 errores que atrasan tu paquete

FORMATO: portada de reel, lienzo vertical 1080×1920 px. Todo el texto y el sujeto principal dentro del área central de 1080×1350 px (lo que se ve en la grilla del perfil). Exportar también el recorte 1080×1350.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
3 ERRORES QUE
ATRASAN TU PAQUETE

COMPOSICIÓN:
Portada de reel. Tres tarjetas apiladas con '❌ 01', '❌ 02', '❌ 03' en JetBrains Mono (sin emoji real: usar una X geométrica en #FF4D6A para el error, solo en este acento). Alejandro con gesto de 'ojo'. Chip 'TUTORIAL 09'.
```

### S9-COM · jue 10 dic · Regalos de última semana

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Regalos de última semana

FORMATO: post de feed 1080×1350 px (4:5 vertical, nunca cuadrado).

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
REGALOS DE
ÚLTIMA SEMANA
{{PRODUCTO}}
PRECIO FINAL {{PRECIO_FINAL}}
{{DISPONIBILIDAD}}

COMPOSICIÓN:
PLANTILLA COMERCIAL con chip extra de disponibilidad (verde #00E5A0 'EN STOCK EN GUÁPILES' o cyan 'POR ENCARGO').
```

### S9-CONF · sáb 12 dic · Cómo trabajamos en temporada alta

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Cómo trabajamos en temporada alta

FORMATO: carrusel de 4 láminas, cada una 1080×1350 px (4:5 vertical, nunca cuadrado). Diseño continuo y coherente entre láminas.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
L1: DICIEMBRE EN NEXO
L2: IA 24/7 para lo rápido
L3: Personas para lo que necesita criterio
L4: Correo en cada estado · Fechas honestas

COMPOSICIÓN:
Carrusel con íconos lineales cyan grandes (chat, persona, sobre, calendario). Mucho aire. Hilo de línea continua entre láminas.
```

### S10-EDU · mar 15 dic · Recap: de tu compra a tu puerta en 4 pasos

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Recap: de tu compra a tu puerta en 4 pasos

FORMATO: portada de reel, lienzo vertical 1080×1920 px. Todo el texto y el sujeto principal dentro del área central de 1080×1350 px (lo que se ve en la grilla del perfil). Exportar también el recorte 1080×1350.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
TODO NEXO
EN 1 MINUTO

COMPOSICIÓN:
Portada de reel. Cuatro íconos en fila conectados por una línea cyan (casillero, tracking, estados, SINPE→puerta) con números en JetBrains Mono. Alejandro al centro abajo. Chip 'TUTORIAL 10'.
```

### S10-COM · jue 17 dic · Último llamado de Navidad

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Último llamado de Navidad

FORMATO: post de feed 1080×1350 px (4:5 vertical, nunca cuadrado).

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
ÚLTIMO LLAMADO
PARA NAVIDAD
{{PRODUCTO}} · {{PRECIO_FINAL}}

COMPOSICIÓN:
PLANTILLA COMERCIAL con banda superior 'ÚLTIMO LLAMADO' en JetBrains Mono y contador visual de días en cyan.
```

### S10-CONF · sáb 19 dic · Detrás de cámara: entregas de la semana

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Detrás de cámara: entregas de la semana

FORMATO: post de feed 1080×1350 px (4:5 vertical, nunca cuadrado).

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
UNA SEMANA
DE ENTREGAS
Guápiles · Diciembre 2026

COMPOSICIÓN:
Collage de 3–4 fotos reales (paquetes, entregas, bodega) en grilla con separadores finos cyan, sin mostrar etiquetas de tiendas ni datos personales. Titular abajo. Placeholders 'FOTO REAL'.
```

### S11-EDU · mar 22 dic · Cómo dejar tu reseña (y gracias)

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Cómo dejar tu reseña (y gracias)

FORMATO: portada de reel, lienzo vertical 1080×1920 px. Todo el texto y el sujeto principal dentro del área central de 1080×1350 px (lo que se ve en la grilla del perfil). Exportar también el recorte 1080×1350.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
DEJÁ TU
RESEÑA

COMPOSICIÓN:
Portada de reel. Modal de reseña con cinco estrellas en cyan (cuatro llenas, una a medio llenar animable) y botón 'Enviar reseña'. Alejandro sonriendo. Chip 'TUTORIAL 11'.
```

### S11-COM · jue 24 dic · ¿Se te pasó? Regalá en Año Nuevo

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: ¿Se te pasó? Regalá en Año Nuevo

FORMATO: post de feed 1080×1350 px (4:5 vertical, nunca cuadrado).

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
¿SE TE PASÓ?
REGALÁ EN AÑO NUEVO
{{PRODUCTO}} · {{PRECIO_FINAL}}

COMPOSICIÓN:
PLANTILLA COMERCIAL con destellos tipo fuegos artificiales en línea cyan muy finos en el fondo.
```

### S11-CONF · sáb 26 dic · Cierre de año: gracias y lo que viene en 2027

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Cierre de año: gracias y lo que viene en 2027

FORMATO: carrusel de 4 láminas, cada una 1080×1350 px (4:5 vertical, nunca cuadrado). Diseño continuo y coherente entre láminas.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
L1: GRACIAS, 2026
L2: {{DATO_REAL_2026}} (opcional)
L3: LO QUE VIENE EN 2027
{{NOVEDADES_2027}}
L4: Nos vemos en enero · +506 6113-2863

COMPOSICIÓN:
L1: '2026' enorme en JetBrains Mono con contorno, 'GRACIAS' en Inter Black. L2: dato real opcional (solo si Alejandro lo confirma; si no, eliminar la lámina). L3: lista de novedades con viñetas cyan. L4: foto real de Alejandro despidiéndose + wordmark.
```

## Historias

### H-1013 · mar 13 oct · Historia: Video nuevo: abrí tu casillero

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Video nuevo: abrí tu casillero

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
VIDEO NUEVO
Abrí tu casillero en 1 minuto 👇
(Espacio reservado para sticker: Link: nexocourier.com/casillero)

COMPOSICIÓN:
Fondo para compartir el post del feed: dejar libre un rectángulo central de 900×1125 donde Instagram coloca la vista previa del post. Texto arriba (fuera de los 250 px superiores) y CTA abajo (fuera de los 250 px inferiores).
```

### H-1014 · mié 14 oct · Historia: ¿Ya compraste en EE.UU.?

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: ¿Ya compraste en EE.UU.?

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
¿Ya compraste algo en Estados Unidos alguna vez?
(Espacio reservado para sticker: Encuesta: «Sí, varias» / «Todavía no»)

COMPOSICIÓN:
Pregunta grande en Inter Black centrada; dejar espacio vacío debajo para el sticker de encuesta. Ícono de paquete lineal cyan arriba.
```

### H-1015 · jue 15 oct · Historia: Audífonos a precio final

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Audífonos a precio final

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
PRECIO FINAL
{{PRECIO_FINAL}}
Audífonos inalámbricos
Sin calcular nada
(Espacio reservado para sticker: Link: wa.me/50661132863 «Escribinos»)

COMPOSICIÓN:
Versión historia de la PLANTILLA COMERCIAL: producto arriba al centro, precio grande en JetBrains Mono en el tercio medio, espacio libre abajo para el sticker de enlace.
```

### H-1016 · vie 16 oct · Historia: ¿Qué querés traer?

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: ¿Qué querés traer?

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
¿Qué te gustaría traer de Estados Unidos?
(Espacio reservado para sticker: Caja de preguntas)

COMPOSICIÓN:
Pregunta en Inter Black, flecha lineal cyan apuntando al espacio del sticker. Fondo con grilla sutil.
```

### H-1017 · sáb 17 oct · Historia: IA 24/7

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: IA 24/7

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
¿Nos escribís a las 2 a. m.?
La IA te responde 24/7 👇
(Espacio reservado para sticker: Link: wa.me/50661132863)

COMPOSICIÓN:
Fondo para compartir el post del feed: dejar libre un rectángulo central de 900×1125 donde Instagram coloca la vista previa del post. Texto arriba (fuera de los 250 px superiores) y CTA abajo (fuera de los 250 px inferiores).
```

### H-1019 · lun 19 oct · Historia: ¿Dónde está la bodega?

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: ¿Dónde está la bodega?

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
QUIZ
¿Dónde está la bodega de Nexo en Estados Unidos?
(Espacio reservado para sticker: Quiz: «Los Ángeles, California» ✅ / «Nueva York»)

COMPOSICIÓN:
Titular 'QUIZ' en JetBrains Mono cyan, pregunta en Inter Black. Silueta minimal de mapa de EE.UU. en línea Slate Gray con un punto cyan en la costa oeste (sin nombres de ciudad en el mapa para no regalar la respuesta).
```

### H-1020 · mar 20 oct · Historia: Video nuevo: prealerta

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Video nuevo: prealerta

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
VIDEO NUEVO
Cómo avisarnos de tu pedido 👇
Tip: primero guardá tu Dirección CR
(Espacio reservado para sticker: Link: nexocourier.com/pedidos)

COMPOSICIÓN:
Fondo para compartir el post del feed: dejar libre un rectángulo central de 900×1125 donde Instagram coloca la vista previa del post. Texto arriba (fuera de los 250 px superiores) y CTA abajo (fuera de los 250 px inferiores).
```

### H-1021 · mié 21 oct · Historia: ¿Dónde está el tracking?

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: ¿Dónde está el tracking?

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
¿Dónde encontrás el número de tracking de tu compra?
(Espacio reservado para sticker: Quiz: «En el correo de envío de la tienda» ✅ / «En la caja»)

COMPOSICIÓN:
Pregunta en Inter Black. Un número de tracking de ejemplo en JetBrains Mono cyan '1Z999AA10123456784' como elemento gráfico.
```

### H-1022 · jue 22 oct · Historia: Consola o videojuego a precio final

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Consola o videojuego a precio final

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
PRECIO FINAL
{{PRECIO_FINAL}}
{{PRODUCTO}}
(Espacio reservado para sticker: Link: wa.me/50661132863 «Lo quiero»)

COMPOSICIÓN:
Versión historia de la PLANTILLA COMERCIAL con acentos gamer sobrios.
```

### H-1023 · vie 23 oct · Historia: 2 kg = $28

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: 2 kg = $28

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
Un paquete de 2 kg
= $28 de envío
¿Cuánto creías que costaba?
(Espacio reservado para sticker: Encuesta: «Más» / «Menos»)

COMPOSICIÓN:
Cálculo estilo terminal en JetBrains Mono grande: '2 kg × $14 = $28'. Pregunta abajo con espacio para encuesta.
```

### H-1024 · sáb 24 oct · Historia: $14/kg sin letra pequeña

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: $14/kg sin letra pequeña

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
$14/kg
Sin letra pequeña 👇
(Espacio reservado para sticker: Link: nexocourier.com/cotizar «Cotizá»)

COMPOSICIÓN:
Fondo para compartir el post del feed: dejar libre un rectángulo central de 900×1125 donde Instagram coloca la vista previa del post. Texto arriba (fuera de los 250 px superiores) y CTA abajo (fuera de los 250 px inferiores).
```

### H-1026 · lun 26 oct · Historia: Alejandro: qué viene esta semana

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Alejandro: qué viene esta semana

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
Esta semana te enseño a seguir tu pedido 📍

COMPOSICIÓN:
Plantilla para video selfie de Alejandro: el video ocupa toda la pantalla; diseñar solo la capa superior: caja de texto con fondo #0A0E1A al 85% y esquinas 24 px, borde izquierdo cyan de 4 px.
```

### H-1027 · mar 27 oct · Historia: Video nuevo: seguí tu pedido

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Video nuevo: seguí tu pedido

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
VIDEO NUEVO
¿Dónde está mi paquete?
Cada cambio de estado = un correo
(Espacio reservado para sticker: Link: nexocourier.com/pedidos)

COMPOSICIÓN:
Fondo para compartir el post del feed: dejar libre un rectángulo central de 900×1125 donde Instagram coloca la vista previa del post. Texto arriba (fuera de los 250 px superiores) y CTA abajo (fuera de los 250 px inferiores).
```

### H-1028 · mié 28 oct · Historia: ¿Qué significa Bodega CR · Pagar?

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: ¿Qué significa Bodega CR · Pagar?

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
¿Qué significa «Bodega CR · Pagar»?
(Espacio reservado para sticker: Quiz: «Ya está en Costa Rica y podés pagar» ✅ / «Sigue en Estados Unidos»)

COMPOSICIÓN:
Chip de estado 'Bodega CR · Pagar' grande en naranja suave (como en la web) centrado; pregunta arriba.
```

### H-1029 · jue 29 oct · Historia: Taladro a precio final

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Taladro a precio final

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
PRECIO FINAL
{{PRECIO_FINAL}}
Taladro inalámbrico
(Espacio reservado para sticker: Link: wa.me/50661132863 «Lo quiero»)

COMPOSICIÓN:
Versión historia de la PLANTILLA COMERCIAL.
```

### H-1030 · vie 30 oct · Historia: Los 5 estados

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Los 5 estados

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
LOS 5 ESTADOS
En Ruta → En Aduana → Bodega CR · Pagar → Pago · Ruta Local → Entregado

COMPOSICIÓN:
Línea de tiempo vertical a pantalla completa, 5 nodos con etiqueta en JetBrains Mono y una línea corta de explicación en Slate Gray en cada uno.
```

### H-1031 · sáb 31 oct · Historia: Nexo Fiel

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Nexo Fiel

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
NEXO FIEL ✦
3% · 5% · 7% de descuento
¿Cuántos kg traés al año?
(Espacio reservado para sticker: Slider ✦)

COMPOSICIÓN:
Fondo para compartir el post del feed: dejar libre un rectángulo central de 900×1125 donde Instagram coloca la vista previa del post. Texto arriba (fuera de los 250 px superiores) y CTA abajo (fuera de los 250 px inferiores).
```

### H-1102 · lun 2 nov · Historia: Adelanto: cómo pagar

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Adelanto: cómo pagar

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
Mañana: cómo pagar con SINPE Móvil en 1 minuto 💸
(Espacio reservado para sticker: Recordatorio de historia (opcional))

COMPOSICIÓN:
Plantilla para video selfie de Alejandro: el video ocupa toda la pantalla; diseñar solo la capa superior: caja de texto con fondo #0A0E1A al 85% y esquinas 24 px, borde izquierdo cyan de 4 px.
```

### H-1103 · mar 3 nov · Historia: Video nuevo: pagar con SINPE

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Video nuevo: pagar con SINPE

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
VIDEO NUEVO
Pagá con SINPE Móvil 👇
🔒 Pagá solo a los datos que aparecen en tu cuenta
(Espacio reservado para sticker: Link: nexocourier.com/pedidos)

COMPOSICIÓN:
Fondo para compartir el post del feed: dejar libre un rectángulo central de 900×1125 donde Instagram coloca la vista previa del post. Texto arriba (fuera de los 250 px superiores) y CTA abajo (fuera de los 250 px inferiores).
```

### H-1104 · mié 4 nov · Historia: ¿Puedo pagar con tarjeta?

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: ¿Puedo pagar con tarjeta?

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
¿Puedo pagar con tarjeta?
Próximamente.
Hoy: SINPE Móvil desde tu cuenta.

COMPOSICIÓN:
Formato pregunta-respuesta: pregunta en Inter Black, respuesta en dos chips: 'TARJETA · PRÓXIMAMENTE' (Slate Gray) y 'SINPE MÓVIL · DISPONIBLE' (cyan).
```

### H-1105 · jue 5 nov · Historia: Guía de regalos 1

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Guía de regalos 1

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
GUÍA DE REGALOS #1
¿Para quién buscás regalo?
(Espacio reservado para sticker: Encuesta: «Pareja» / «Familia»)

COMPOSICIÓN:
Fondo para compartir el post del feed: dejar libre un rectángulo central de 900×1125 donde Instagram coloca la vista previa del post. Texto arriba (fuera de los 250 px superiores) y CTA abajo (fuera de los 250 px inferiores).
```

### H-1106 · vie 6 nov · Historia: Tipo de cambio BCCR

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Tipo de cambio BCCR

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
El tipo de cambio lo pone el BCCR, no nosotros.

COMPOSICIÓN:
Marco de teléfono con captura real del pie del modal de pago ('TC venta: ₡…/USD · fecha · Fuente: BCCR'), resaltado con subrayado cyan. Difuminar teléfono y nombre.
```

### H-1107 · sáb 7 nov · Historia: El tipo de cambio no lo inventamos

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: El tipo de cambio no lo inventamos

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
Transparencia es esto 👇

COMPOSICIÓN:
Fondo para compartir el post del feed: dejar libre un rectángulo central de 900×1125 donde Instagram coloca la vista previa del post. Texto arriba (fuera de los 250 px superiores) y CTA abajo (fuera de los 250 px inferiores).
```

### H-1109 · lun 9 nov · Historia: Faltan días para Black Friday

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Faltan días para Black Friday

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
BLACK FRIDAY
27 de noviembre
¿Ya tenés tu casillero?
(Espacio reservado para sticker: Cuenta regresiva «Black Friday Nexo» (27 nov) + link nexocourier.com/casillero)

COMPOSICIÓN:
Fondo negro con 'BLACK FRIDAY' en contorno cyan; espacio para sticker de cuenta regresiva.
```

### H-1110 · mar 10 nov · Historia: Video nuevo: peso, total y descuento

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Video nuevo: peso, total y descuento

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
VIDEO NUEVO
Peso, total y tu barra Nexo Fiel, todo en «Tus pedidos»
(Espacio reservado para sticker: Link: nexocourier.com/pedidos)

COMPOSICIÓN:
Fondo para compartir el post del feed: dejar libre un rectángulo central de 900×1125 donde Instagram coloca la vista previa del post. Texto arriba (fuera de los 250 px superiores) y CTA abajo (fuera de los 250 px inferiores).
```

### H-1111 · mié 11 nov · Historia: ¿Cuándo aparece el botón de pago?

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: ¿Cuándo aparece el botón de pago?

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
¿Cuándo te aparece el botón «Sinpe Movil»?
(Espacio reservado para sticker: Quiz: «En Bodega CR · Pagar» ✅ / «En Ruta»)

COMPOSICIÓN:
Botón grande estilo web 'Sinpe Movil' en cyan como elemento gráfico; pregunta arriba.
```

### H-1112 · jue 12 nov · Historia: Reloj inteligente a precio final

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Reloj inteligente a precio final

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
PRECIO FINAL
{{PRECIO_FINAL}}
Reloj inteligente
(Espacio reservado para sticker: Link: wa.me/50661132863 «Lo quiero»)

COMPOSICIÓN:
Versión historia de la PLANTILLA COMERCIAL.
```

### H-1113 · vie 13 nov · Historia: Preparando entregas en Guápiles

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Preparando entregas en Guápiles

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
Así preparo las entregas de hoy en Guápiles 📦

COMPOSICIÓN:
Plantilla para video selfie de Alejandro: el video ocupa toda la pantalla; diseñar solo la capa superior: caja de texto con fondo #0A0E1A al 85% y esquinas 24 px, borde izquierdo cyan de 4 px.
```

### H-1114 · sáb 14 nov · Historia: Detrás de Nexo hay una persona

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Detrás de Nexo hay una persona

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
Hola, soy Alejandro 👋

COMPOSICIÓN:
Fondo para compartir el post del feed: dejar libre un rectángulo central de 900×1125 donde Instagram coloca la vista previa del post. Texto arriba (fuera de los 250 px superiores) y CTA abajo (fuera de los 250 px inferiores).
```

### H-1116 · lun 16 nov · Historia: Preguntame lo que querás

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Preguntame lo que querás

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
Preguntame lo que querás sobre Nexo.
Respondo en video.
(Espacio reservado para sticker: Caja de preguntas)

COMPOSICIÓN:
Espacio circular para foto de Alejandro arriba; texto al centro; espacio para sticker.
```

### H-1117 · mar 17 nov · Historia: Video nuevo: cómo escribirnos

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Video nuevo: cómo escribirnos

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
VIDEO NUEVO
IA 24/7 + una persona cuando hace falta
(Espacio reservado para sticker: Link: wa.me/50661132863)

COMPOSICIÓN:
Fondo para compartir el post del feed: dejar libre un rectángulo central de 900×1125 donde Instagram coloca la vista previa del post. Texto arriba (fuera de los 250 px superiores) y CTA abajo (fuera de los 250 px inferiores).
```

### H-1118 · mié 18 nov · Historia: Respuestas a la caja de preguntas

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Respuestas a la caja de preguntas

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
Respondo sus preguntas 👇
«{{PREGUNTA}}»

COMPOSICIÓN:
Plantilla para video selfie de Alejandro: el video ocupa toda la pantalla; diseñar solo la capa superior: caja de texto con fondo #0A0E1A al 85% y esquinas 24 px, borde izquierdo cyan de 4 px. Incluir arriba una tarjeta que replica el sticker de pregunta con el texto de la pregunta real.
```

### H-1119 · jue 19 nov · Historia: Guía de regalos 2: gamers

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Guía de regalos 2: gamers

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
GUÍA DE REGALOS #2
¿Hay un gamer en tu casa?
(Espacio reservado para sticker: Encuesta: «Sí, yo» / «Sí, alguien más»)

COMPOSICIÓN:
Fondo para compartir el post del feed: dejar libre un rectángulo central de 900×1125 donde Instagram coloca la vista previa del post. Texto arriba (fuera de los 250 px superiores) y CTA abajo (fuera de los 250 px inferiores).
```

### H-1120 · vie 20 nov · Historia: Así funciona la atención

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Así funciona la atención

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
ASÍ TE ATENDEMOS
Vos escribís → la IA responde 24/7 → si hace falta, entra una persona

COMPOSICIÓN:
Diagrama vertical de 3 pasos con flechas cyan: burbuja de usuario, chip 'IA', chip 'EQUIPO NEXO'.
```

### H-1121 · sáb 21 nov · Historia: Reseñas reales

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Reseñas reales

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
Reseñas de verdad, de clientes de verdad ⭐
(Espacio reservado para sticker: Link: nexocourier.com/resenas)

COMPOSICIÓN:
Fondo para compartir el post del feed: dejar libre un rectángulo central de 900×1125 donde Instagram coloca la vista previa del post. Texto arriba (fuera de los 250 px superiores) y CTA abajo (fuera de los 250 px inferiores).
```

### H-1123 · lun 23 nov · Historia: Faltan 4 días

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Faltan 4 días

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
FALTAN 4 DÍAS
Cotizá tu envío antes de comprar
(Espacio reservado para sticker: Cuenta regresiva BF + link nexocourier.com/cotizar)

COMPOSICIÓN:
Número '4' gigante en JetBrains Mono cyan; texto abajo.
```

### H-1124 · mar 24 nov · Historia: Video nuevo: cotizá en 30 s

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Video nuevo: cotizá en 30 s

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
VIDEO NUEVO
Cotizá tu envío en 30 segundos
(Espacio reservado para sticker: Link: nexocourier.com/cotizar)

COMPOSICIÓN:
Fondo para compartir el post del feed: dejar libre un rectángulo central de 900×1125 donde Instagram coloca la vista previa del post. Texto arriba (fuera de los 250 px superiores) y CTA abajo (fuera de los 250 px inferiores).
```

### H-1125 · mié 25 nov · Historia: Checklist Black Friday

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Checklist Black Friday

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
CHECKLIST BLACK FRIDAY
☑ Casillero abierto
☑ Dirección CR guardada
☑ Nombre con «- NEXO»
☑ Cada tracking en «Tus pedidos»

COMPOSICIÓN:
Checklist estilo terminal con casillas cyan.
```

### H-1126 · jue 26 nov · Historia: Mañana: precios finales de Black Friday

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Mañana: precios finales de Black Friday

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
MAÑANA
Black Friday Nexo
Precios finales en colones
(Espacio reservado para sticker: Recordatorio de historia)

COMPOSICIÓN:
Producto misterioso en silueta con glow cyan; texto grande.
```

### H-1127 · vie 27 nov · Historia: Black Friday

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Black Friday

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
YA ESTÁ 🖤
Black Friday Nexo
Escribinos «BLACK»
(Espacio reservado para sticker: Link: wa.me/50661132863)

COMPOSICIÓN:
Fondo para compartir el post del feed: dejar libre un rectángulo central de 900×1125 donde Instagram coloca la vista previa del post. Texto arriba (fuera de los 250 px superiores) y CTA abajo (fuera de los 250 px inferiores).
```

### H-1128 · sáb 28 nov · Historia: ¿Compraste? Agregá el tracking

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: ¿Compraste? Agregá el tracking

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
¿Compraste ayer?
Agregá cada tracking hoy 👇
(Espacio reservado para sticker: Link: nexocourier.com/pedidos)

COMPOSICIÓN:
Fondo para compartir el post del feed: dejar libre un rectángulo central de 900×1125 donde Instagram coloca la vista previa del post. Texto arriba (fuera de los 250 px superiores) y CTA abajo (fuera de los 250 px inferiores).
```

### H-1130 · lun 30 nov · Historia: Cyber Monday

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Cyber Monday

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
CYBER MONDAY
Solo hoy ⚡
(Espacio reservado para sticker: Link: wa.me/50661132863 «CYBER»)

COMPOSICIÓN:
Fondo para compartir el post del feed: dejar libre un rectángulo central de 900×1125 donde Instagram coloca la vista previa del post. Texto arriba (fuera de los 250 px superiores) y CTA abajo (fuera de los 250 px inferiores).
```

### H-1201 · mar 1 dic · Historia: Video nuevo: mandanos el link

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Video nuevo: mandanos el link

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
VIDEO NUEVO
Mandanos el link y te cotizamos
(Espacio reservado para sticker: Link: nexocourier.com/asistente)

COMPOSICIÓN:
Fondo para compartir el post del feed: dejar libre un rectángulo central de 900×1125 donde Instagram coloca la vista previa del post. Texto arriba (fuera de los 250 px superiores) y CTA abajo (fuera de los 250 px inferiores).
```

### H-1202 · mié 2 dic · Historia: Fecha límite de Navidad

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Fecha límite de Navidad

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
FECHA LÍMITE
Para recibir antes de Navidad
{{FECHA_LIMITE_NAVIDAD}}
(Espacio reservado para sticker: Cuenta regresiva hasta {{FECHA_LIMITE_NAVIDAD}})

COMPOSICIÓN:
Fecha gigante en JetBrains Mono; espacio para la cuenta regresiva.
```

### H-1203 · jue 3 dic · Historia: Regalos listos para Navidad

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Regalos listos para Navidad

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
Regalos a precio final 🎄
(Espacio reservado para sticker: Link: wa.me/50661132863 «NAVIDAD»)

COMPOSICIÓN:
Fondo para compartir el post del feed: dejar libre un rectángulo central de 900×1125 donde Instagram coloca la vista previa del post. Texto arriba (fuera de los 250 px superiores) y CTA abajo (fuera de los 250 px inferiores).
```

### H-1204 · vie 4 dic · Historia: ¿Ya tenés los regalos?

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: ¿Ya tenés los regalos?

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
¿Ya tenés todos los regalos?
(Espacio reservado para sticker: Encuesta: «Sí, todos» / «Ni uno 😅»)

COMPOSICIÓN:
Pregunta en Inter Black con bokeh cyan suave de fondo.
```

### H-1205 · sáb 5 dic · Historia: Fecha límite

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Fecha límite

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
Anotá esta fecha 📅

COMPOSICIÓN:
Fondo para compartir el post del feed: dejar libre un rectángulo central de 900×1125 donde Instagram coloca la vista previa del post. Texto arriba (fuera de los 250 px superiores) y CTA abajo (fuera de los 250 px inferiores).
```

### H-1207 · lun 7 dic · Historia: Faltan días para la fecha límite

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Faltan días para la fecha límite

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
FALTAN {{DIAS_RESTANTES}} DÍAS
para la fecha límite de Navidad
(Espacio reservado para sticker: Link: nexocourier.com/casillero)

COMPOSICIÓN:
Número grande en JetBrains Mono cyan.
```

### H-1208 · mar 8 dic · Historia: Video nuevo: 3 errores

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Video nuevo: 3 errores

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
VIDEO NUEVO
3 errores que atrasan tu paquete

COMPOSICIÓN:
Fondo para compartir el post del feed: dejar libre un rectángulo central de 900×1125 donde Instagram coloca la vista previa del post. Texto arriba (fuera de los 250 px superiores) y CTA abajo (fuera de los 250 px inferiores).
```

### H-1209 · mié 9 dic · Historia: ¿Cómo va tu nombre?

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: ¿Cómo va tu nombre?

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
¿Cómo va tu nombre en la dirección?
(Espacio reservado para sticker: Quiz: «JUAN PÉREZ - NEXO» ✅ / «Juan Pérez»)

COMPOSICIÓN:
Dos tarjetas de dirección estilo web, una con '- NEXO' resaltado en cyan.
```

### H-1210 · jue 10 dic · Historia: Regalos de última semana

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Regalos de última semana

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
ÚLTIMA SEMANA
{{PRODUCTO}}
{{PRECIO_FINAL}}
(Espacio reservado para sticker: Link: wa.me/50661132863 «ÚLTIMO»)

COMPOSICIÓN:
Versión historia de la PLANTILLA COMERCIAL con chip de disponibilidad.
```

### H-1211 · vie 11 dic · Historia: Así se ve diciembre

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Así se ve diciembre

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
Así se ve diciembre en Nexo 📦📦📦

COMPOSICIÓN:
Plantilla para video selfie de Alejandro: el video ocupa toda la pantalla; diseñar solo la capa superior: caja de texto con fondo #0A0E1A al 85% y esquinas 24 px, borde izquierdo cyan de 4 px.
```

### H-1212 · sáb 12 dic · Historia: Cómo trabajamos en temporada alta

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Cómo trabajamos en temporada alta

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
Cómo trabajamos en diciembre 👇

COMPOSICIÓN:
Fondo para compartir el post del feed: dejar libre un rectángulo central de 900×1125 donde Instagram coloca la vista previa del post. Texto arriba (fuera de los 250 px superiores) y CTA abajo (fuera de los 250 px inferiores).
```

### H-1214 · lun 14 dic · Historia: Fecha límite

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Fecha límite

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
¿Ya llegó tu compra a la bodega en Los Ángeles?
Fecha límite: {{FECHA_LIMITE_NAVIDAD}}
(Espacio reservado para sticker: Cuenta regresiva)

COMPOSICIÓN:
Fecha en JetBrains Mono grande; espacio para sticker.
```

### H-1215 · mar 15 dic · Historia: Video nuevo: todo Nexo en 1 minuto

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Video nuevo: todo Nexo en 1 minuto

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
VIDEO NUEVO
Todo Nexo en 1 minuto
Mandáselo a alguien

COMPOSICIÓN:
Fondo para compartir el post del feed: dejar libre un rectángulo central de 900×1125 donde Instagram coloca la vista previa del post. Texto arriba (fuera de los 250 px superiores) y CTA abajo (fuera de los 250 px inferiores).
```

### H-1216 · mié 16 dic · Historia: Recordatorio fecha límite

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Recordatorio fecha límite

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
RECORDATORIO
Fecha límite para recibir antes de Navidad: {{FECHA_LIMITE_NAVIDAD}}

COMPOSICIÓN:
Texto tipográfico centrado; reloj lineal cyan.
```

### H-1217 · jue 17 dic · Historia: Último llamado

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Último llamado

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
ÚLTIMO LLAMADO 🚨
(Espacio reservado para sticker: Link: wa.me/50661132863 «NAVIDAD»)

COMPOSICIÓN:
Fondo para compartir el post del feed: dejar libre un rectángulo central de 900×1125 donde Instagram coloca la vista previa del post. Texto arriba (fuera de los 250 px superiores) y CTA abajo (fuera de los 250 px inferiores).
```

### H-1218 · vie 18 dic · Historia: ¿Qué regalo pediste?

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: ¿Qué regalo pediste?

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
¿Qué regalo pediste por Nexo este año?
(Espacio reservado para sticker: Caja de preguntas)

COMPOSICIÓN:
Moño minimal en línea cyan; pregunta en Inter Black.
```

### H-1219 · sáb 19 dic · Historia: Una semana de entregas

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Una semana de entregas

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
Gracias por confiar 🚚
(Espacio reservado para sticker: Mención @nexo.courier)

COMPOSICIÓN:
Fondo para compartir el post del feed: dejar libre un rectángulo central de 900×1125 donde Instagram coloca la vista previa del post. Texto arriba (fuera de los 250 px superiores) y CTA abajo (fuera de los 250 px inferiores).
```

### H-1221 · lun 21 dic · Historia: Entregas de la semana

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Entregas de la semana

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
Así les llegaron 📦
(con permiso de cada cliente)

COMPOSICIÓN:
Marco para repostear historias de clientes: borde cyan fino, etiqueta 'CLIENTE NEXO' en JetBrains Mono arriba.
```

### H-1222 · mar 22 dic · Historia: Video nuevo: dejá tu reseña

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Video nuevo: dejá tu reseña

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
VIDEO NUEVO
Dejá tu reseña ⭐
(Espacio reservado para sticker: Link: nexocourier.com/pedidos)

COMPOSICIÓN:
Fondo para compartir el post del feed: dejar libre un rectángulo central de 900×1125 donde Instagram coloca la vista previa del post. Texto arriba (fuera de los 250 px superiores) y CTA abajo (fuera de los 250 px inferiores).
```

### H-1223 · mié 23 dic · Historia: Horario de fin de año

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Horario de fin de año

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
HORARIO DE FIN DE AÑO
{{HORARIO_FESTIVO}}
La IA sigue respondiendo 24/7 en WhatsApp
(Espacio reservado para sticker: Link: wa.me/50661132863)

COMPOSICIÓN:
Lista de fechas y horarios en JetBrains Mono, alineada en tabla.
```

### H-1224 · jue 24 dic · Historia: Feliz Nochebuena

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Feliz Nochebuena

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
Feliz Nochebuena 🖤
¿Se te pasó un regalo? 👇

COMPOSICIÓN:
Fondo para compartir el post del feed: dejar libre un rectángulo central de 900×1125 donde Instagram coloca la vista previa del post. Texto arriba (fuera de los 250 px superiores) y CTA abajo (fuera de los 250 px inferiores).
```

### H-1225 · vie 25 dic · Historia: Feliz Navidad

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Feliz Navidad

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
Feliz Navidad de parte de Nexo 🎄

COMPOSICIÓN:
Plantilla para video selfie de Alejandro: el video ocupa toda la pantalla; diseñar solo la capa superior: caja de texto con fondo #0A0E1A al 85% y esquinas 24 px, borde izquierdo cyan de 4 px.
```

### H-1226 · sáb 26 dic · Historia: Gracias, 2026

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: Gracias, 2026

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
Gracias, 2026 🖤

COMPOSICIÓN:
Fondo para compartir el post del feed: dejar libre un rectángulo central de 900×1125 donde Instagram coloca la vista previa del post. Texto arriba (fuera de los 250 px superiores) y CTA abajo (fuera de los 250 px inferiores).
```

### H-1228 · lun 28 dic · Historia: ¿Qué mejoramos en 2027?

```text
Diseñá una pieza para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).
Tema: Historia: ¿Qué mejoramos en 2027?

FORMATO: historia 1080×1920 px (9:16). Dejar libres los 250 px superiores y los 250 px inferiores (zona de la interfaz de Instagram). Texto mínimo 48 px.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. No agregar otros colores salvo que este prompt lo indique.
- Tipografía: Inter Black para titulares; JetBrains Mono para datos, precios (₡), kg, números de tracking y estados.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6% de opacidad, glow cyan suave, esquinas redondeadas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» pequeño abajo, en Slate Gray.
- Idioma: español costarricense con voseo. Usar el texto en pantalla exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; la palabra «enredos»; estilo de anuncio de lanzamiento («hoy nace…»); mencionar Miami (la bodega es Los Ángeles); fotos de stock de personas.

TEXTO EN PANTALLA (exacto; los {{…}} son variables que reemplazo yo antes de exportar):
¿Qué querés que mejoremos en 2027?
(Espacio reservado para sticker: Caja de preguntas)

COMPOSICIÓN:
'2027' en contorno cyan gigante de fondo; pregunta al centro.
```
