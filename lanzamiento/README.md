# Lanzamiento · Instagram @nexo.courier · 13 oct – 28 dic 2026

Plan de contenido para llegar fuerte a diciembre. Todo está basado en los flujos reales de nexocourier.com: cada botón y cada ruta que aparecen en los guiones existen en el código.

## Qué hay en esta carpeta

| Archivo | Para qué |
|---|---|
| [calendario.md](calendario.md) | Las 11 semanas de un vistazo: feed + historias día a día |
| [calendario.csv](calendario.csv) | Lo mismo en hoja (100 filas: 34 posts de feed + 66 historias), con fecha, día, fase, pilar, formato, tema, copy, hashtags e ID del prompt. Abrilo en Sheets o Excel |
| [guiones.md](guiones.md) | Los 11 tutoriales: gancho, lo que decís, qué pantalla entra y cuándo, CTA y duración. Al final, la preparación de la cuenta de prueba y la lista de grabaciones de pantalla (G01–G21) |
| [copys.md](copys.md) | El copy de cada post de feed, listo para pegar |
| [prompts-claude-design.md](prompts-claude-design.md) | Un prompt autocontenido para Claude Design por cada post (34) y cada historia (66) |
| [plantilla-comercial.md](plantilla-comercial.md) | Plantilla reutilizable del post de producto (ficha, copy y prompt) y la fórmula del precio final |
| [precio-final.xlsx](precio-final.xlsx) | Calculadora de precio final en colones (USD + peso → ₡), con tu margen |
| [pendientes-del-sitio.md](pendientes-del-sitio.md) | Lo que falta o conviene corregir en la web (los 3 que bloqueaban ya están corregidos en el código; falta el deploy) |

## Cómo funciona la semana

| Día | Feed | Historias |
|---|---|---|
| Martes | **Educativo**: tutorial a cámara (reel) | Compartir el reel |
| Miércoles | — | Quiz, encuesta o FAQ del tutorial |
| Jueves | **Comercial**: producto a precio final o promo | Producto en versión historia |
| Viernes | — | Dato, detrás de cámara o adelanto |
| Sábado | **Confianza**: por qué Nexo | Compartir el post |
| Lunes | — | Comunidad, selfie a cámara o cuenta regresiva |

Excepciones:
- **Semana 7:** Black Friday el viernes 27 y Cyber Monday el lunes 30 (4 posts).
- **Semana 11:** Nochebuena y Navidad.

## Fases
1. **Educación base (13 oct – 2 nov):** casillero, prealerta y seguimiento del pedido · audífonos, consola y taladro · IA 24/7, $14/kg y Nexo Fiel.
2. **Regalos y Black Friday (3 – 30 nov):** pagar con SINPE, ver el peso y el total, cómo escribirnos (IA + persona) y cotizar · guías de regalos, Black Friday y Cyber Monday.
3. **Temporada alta (1 – 28 dic):** el link del Asistente, los 3 errores, el recap en 1 minuto y las reseñas · regalos, último llamado y Año Nuevo · fecha límite y cierre de año.

## Decisiones que tomamos (y por qué)
- **Rastreo:** no decimos «tiempo real». Decimos «estado actualizado en tu cuenta + correo en cada etapa», porque eso es lo que la web hace hoy.
- **IA:** el bot está en WhatsApp, 24/7, y responde dudas. Si hace falta, entra una persona en el mismo chat. Nunca decimos que consulta pedidos.
- **Nexo Fiel:** comunicamos la regla de la web (descuento al pedido que alcanza el hito; reinicio después de Oro). El backend ya está alineado en el código ([pendiente #3](pendientes-del-sitio.md)).
- **Impuestos de la reventa:** los calculás vos a mano; la hoja tiene una celda para eso.
- **Tiempo de entrega:** 5–8 días hábiles, lo que dice el cotizador.

## Variables por confirmar
Estas son las que aparecen como `{{…}}` en copys, prompts y calendario. No inventé ningún precio ni ninguna fecha.

| Variable | Dónde aparece | Qué necesito |
|---|---|---|
| `{{FECHA_LIMITE_NAVIDAD}}` | S8-EDU, S8-CONF, historias de diciembre | Último día en que un paquete puede llegar a la bodega de Los Ángeles para entregarse antes del 24 |
| `{{FECHA_LIMITE_REVENTA}}` | S8-COM | Último día para apartar productos de reventa y entregarlos antes del 24 |
| `{{PRECIO_FINAL}}` / `{{PRECIO_FINAL_n}}` | Todos los comerciales | Sale de `precio-final.xlsx` |
| `{{PRODUCTO}}`, `{{MODELO}}`, `{{UNIDADES}}`, `{{DISPONIBILIDAD}}`, `{{DIAS_ENTREGA}}` | Comerciales | Producto concreto de cada semana |
| `{{FIN_PROMO_BF}}` | S7-BF | Hasta cuándo valen los precios de Black Friday |
| `{{HORARIO_FESTIVO}}` | Historia del 23 dic | Horario de entregas del 24 al 1 de enero |
| `{{DIAS_RESTANTES}}` | Historia del 7 dic | Se calcula con la fecha límite |
| `{{RESEÑA_n}}`, `{{NOMBRE_n}}`, `{{LUGAR_n}}` | S6-CONF | Reseñas reales de /resenas, con permiso del cliente |
| `{{PREGUNTA}}` | Historia del 18 nov | Pregunta real de la caja de preguntas del 16 nov |
| `{{NOVEDADES_2027}}`, `{{DATO_REAL_2026}}` | S11-CONF | Lo que de verdad viene en 2027 (por ejemplo, pago con tarjeta o rastreo con línea de tiempo, si se hacen) y un dato real del año, si querés compartirlo |

## Reglas de marca (aplican a todo)
- **Colores:** fondo `#0A0E1A`, acento `#00D4FF`, texto `#F4F7FC`, secundario `#8A95A8`.
- **Tipografía:** Inter Black (titulares) y JetBrains Mono (datos, precios, estados). Estética dark mode premium.
- **Formatos:** feed 1080×1350 (nunca cuadrado); historias y reels 1080×1920.
- **Tono:** español costarricense con voseo, directo y cercano.
- **Prohibido:**
  - tiendas y sus logos (Amazon incluida), también en las grabaciones de la web;
  - el estilo «hoy nace Nexo»;
  - la palabra «enredos»;
  - Miami (la bodega es **Los Ángeles**).
- **Contacto:** WhatsApp +506 6113-2863 · soporte@nexocourier.com · entrega gratis en Guápiles Centro.

## Antes de arrancar (esta semana)
1. Hacer el deploy de la web y del backend con las correcciones de [pendientes #1, #2 y #3](pendientes-del-sitio.md): Miami, el monto del SINPE y la regla de Nexo Fiel.
2. Preparar la [cuenta de prueba](guiones.md#preparación-cuenta-de-prueba) y grabar G01–G04 para el tutorial del martes 13.
3. Elegir el modelo de audífonos del jueves 15 y calcular su precio en `precio-final.xlsx`.
