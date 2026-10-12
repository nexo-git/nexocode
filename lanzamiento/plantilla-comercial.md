# Plantilla del post comercial (reventa a precio final)

Sirve para todos los posts de producto: los jueves, las guías de regalos, Black Friday, Cyber Monday y Navidad.

**Regla de oro:** el cliente ve **un solo precio en colones** que ya incluye el producto, el peso, la traída y los impuestos. Nunca se muestra ni se menciona dónde se compró: ni logos, ni cajas con marca de la tienda, ni capturas de la página de la tienda.

---

## 1. Ficha del producto (llenala antes de pedir el diseño)

| Campo | Ejemplo | Notas |
|---|---|---|
| `{{PRODUCTO}}` | Audífonos inalámbricos con cancelación de ruido | Nombre genérico y claro |
| `{{MODELO}}` | (modelo exacto) | La marca del producto sí se puede nombrar; la tienda no |
| `{{BENEFICIO}}` | Hasta 30 h de batería | Un solo beneficio, verificable en la ficha del fabricante |
| `{{PRECIO_FINAL}}` | ₡49 900 | Sale de `precio-final.xlsx`, columna **N** |
| `{{UNIDADES}}` | 3 | Si es por encargo, poné «por encargo» |
| `{{DISPONIBILIDAD}}` | En stock en Guápiles / Por encargo | — |
| `{{DIAS_ENTREGA}}` | 5–8 días hábiles | Si es por encargo, usá el mismo rango del cotizador |
| Palabra clave | AUDÍFONOS | La que escriben por WhatsApp |
| Foto | Producto recortado, fondo transparente | Foto propia o del fabricante, sin la caja de la tienda |

## 2. Copy base

```text
{{EMOJI}} {{PRODUCTO}}
{{MODELO}}

Precio final: {{PRECIO_FINAL}}
Ya incluye el producto, el peso, la traída y los impuestos. Pagás eso y nada más: no tenés que calcular nada.

✔️ {{BENEFICIO}}
✔️ Nuevo y original, traído de Estados Unidos
✔️ Entrega gratis en Guápiles Centro (al resto del país, por mensajería)
✔️ {{DISPONIBILIDAD}} · Llega en {{DIAS_ENTREGA}}

Escribinos «{{PALABRA_CLAVE}}» al WhatsApp +506 6113-2863 y te lo apartamos.

#NexoCourier #CasilleroCR #ComprasUSA #CourierCostaRica #Guápiles #RegalosCR #PrecioFinal
```

## 3. Prompt de Claude Design (plantilla)

```text
Diseñá un post de producto para el Instagram de Nexo Courier (paquetería Estados Unidos → Costa Rica, con base en Guápiles).

FORMATO: post de feed 1080×1350 px (4:5 vertical, nunca cuadrado). Para la versión de historia: 1080×1920 con los 250 px superiores e inferiores libres.

MARCA NEXO COURIER (obligatorio)
- Colores: fondo Deep Space Black #0A0E1A; acento Electric Cyan #00D4FF; texto Ghost White #F4F7FC; secundario Slate Gray #8A95A8. Verde #00E5A0 solo para el chip «EN STOCK».
- Tipografía: Inter Black para titulares; JetBrains Mono para el precio en colones, etiquetas y datos.
- Estética: dark mode premium, mucho espacio negativo, grilla sutil cyan al 6%, glow cyan suave detrás del producto, esquinas de 24 px.
- Wordmark «nexo» en minúscula arriba a la izquierda; «@nexo.courier» abajo en Slate Gray.
- Español costarricense con voseo. Usar el texto exactamente como está.
- Prohibido: logos, nombres o cajas de tiendas; capturas de páginas de tiendas; la palabra «enredos»; estilo anuncio de lanzamiento; mencionar Miami.

TEXTO EN PANTALLA (exacto):
- Etiqueta superior (opcional, para campañas): {{BANDA}}   ← ej. «BLACK FRIDAY», «ÚLTIMO LLAMADO»; si está vacío, omitir la banda
- Nombre: {{PRODUCTO}}
- Beneficio: {{BENEFICIO}}
- Etiqueta: PRECIO FINAL
- Precio: {{PRECIO_FINAL}}
- Línea de confianza: Incluye producto, peso, traída e impuestos
- Chip de disponibilidad: {{DISPONIBILIDAD}}
- Pie: Escribinos «{{PALABRA_CLAVE}}» · +506 6113-2863

COMPOSICIÓN (de arriba hacia abajo):
1. Franja superior de 120 px: wordmark a la izquierda; banda de campaña a la derecha en JetBrains Mono cyan, si existe.
2. Zona de producto (≈55% de la altura): foto del producto recortada, centrada, sobre un círculo de glow cyan al 20% con un reflejo sutil en el piso.
3. Bloque de texto alineado a la izquierda con margen de 80 px: nombre en Inter Black de 64 px; beneficio en Inter Regular de 32 px en Slate Gray.
4. Bloque de precio: etiqueta «PRECIO FINAL» en JetBrains Mono de 28 px en cyan con tracking amplio; precio en JetBrains Mono Bold de 120 px en Ghost White; debajo, la línea de confianza en 26 px en Slate Gray.
5. Chip de disponibilidad a la derecha del precio (pill con borde de 1 px).
6. Pie: línea fina cyan al 30% y el CTA centrado en 28 px.
No usar precios tachados salvo que se indique un precio anterior real.
```

---

## 4. Fórmula del precio final en colones

La hoja [precio-final.xlsx](precio-final.xlsx) lo calcula sola: abrila en Excel o subila a Google Sheets. Llenás las columnas A a J y la **columna N** es el precio que publicás.

**Datos del repo**
- Tarifa: **$14 por kg de peso real, sin mínimo** (`src/lib/pricing.ts`).
- Tipo de cambio: **venta del BCCR** (indicador 318), el mismo que usa la web al cobrar (`src/app/api/tipo-cambio/route.ts`).

**Lo que ponés vos**
- Impuestos en ₡ (los calculás a mano).
- Margen %.
- Colchón de tipo de cambio %.

```
Peso cobrado   = peso redondeado hacia arriba al 0,1 kg
Costo ₡        = (precio USD + envío interno USD + peso cobrado × 14) × TC venta × (1 + colchón TC) + impuestos ₡
Precio ₡       = Costo ₡ × (1 + margen %)
PRECIO FINAL ₡ = Precio ₡ redondeado hacia arriba al múltiplo de ₡500, menos ₡100   → termina en …400 o …900
Ganancia ₡     = Precio final − Costo ₡
```

**Ejemplo de prueba.** Los datos son inventados, solo para verificar la hoja.

| Concepto | Valor |
|---|---|
| Producto | $50 |
| Envío interno | $0 |
| Peso | 1,2 kg |
| Tipo de cambio | ₡510 |
| Colchón | 2% |
| Impuestos | ₡5 000 |
| Margen | 25% |

Cálculo paso a paso:
1. Envío: 1,2 × 14 = $16,80 → subtotal $66,80.
2. 66,80 × 510 × 1,02 = ₡34 749 → + ₡5 000 de impuestos = **costo ₡39 749**.
3. × 1,25 = ₡49 687 → **precio final ₡49 900**.
4. Ganancia ≈ ₡10 151 (margen real ≈ 20% sobre el precio).

**Recomendaciones**
- Recalculá el día que publicás. Si el tipo de cambio sube más que el colchón entre la publicación y la compra, la diferencia sale de tu margen.
- Pesá con empaque. Si no tenés el peso, usá el peso de envío de la ficha del fabricante más un 15%.
- El copy dice «impuestos incluidos», así que la celda de impuestos nunca puede quedar en 0 por olvido.
