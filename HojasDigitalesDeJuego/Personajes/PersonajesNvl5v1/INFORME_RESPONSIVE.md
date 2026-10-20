# Informe responsive · Deathsleep

Fecha: 20 de octubre de 2026. Intervención sobre el portal existente y sus cinco hojas independientes.

## A. Portal

- Eco, Elysara Velthaine, Onésimo y Val Draven son enlaces HTML que abarcan toda su tarjeta. Retrato, texto y espacio interior navegan mediante las rutas relativas originales. No hay controles interactivos anidados. Se conservan hover, active y foco visible, Enter y tacto.
- Elarion conserva su posición y retrato, oscurecido y desaturado, con candado SVG local y marco oscuro. Muestra **Elarion**, **NO DISPONIBLE**, **Desbloqueable al terminar el One-Shot** y «Personaje secreto». Es un artículo con `aria-disabled`, nombre y descripción accesibles: no tiene href, enlace oculto, tabindex ni evento de navegación. Su ruta sigue registrada en el catálogo. No se implementó un desbloqueo automático.
- Onésimo utiliza `assets/imagen/onesimo-y-fogini.png`, copia exacta de `El Dragon Verde/IniciarOneShot/imagenes/Personajes y criaturas/PJs/Onesimo/OnesimoYFugini.png`. Se inspeccionó la ilustración conjunta; no es una lámina de estadísticas. `object-fit:contain` y posición central permiten ver a ambos sin deformación. Original y copia tienen SHA-256 `6b706db1c77b595284364c4e0a33e03673ae103fddf202db1d54529ae0e3e25f`.
- Eco conserva su imagen. Elysara y Val conservan sus rutas e imágenes originales; la futura sustitución queda localizada en `portrait` de cada entrada del catálogo.
- El título de inicio y el mínimo intrínseco de la cuadrícula provocaban desbordamiento a 320–430 px, incluso con `overflow-x:hidden`. Se corrigieron el ancho mínimo, tamaño/espaciado del título y adornos. Se eliminó esa ocultación global; la medición verifica el ancho real.

## B. Cambios por personaje

Solo se modificó la hoja de estilos de cada aplicación; sus HTML, JavaScript, motores y datos permanecen intactos.

| Hoja / archivo modificado | Problemas de uso móvil identificados | Solución |
|---|---|---|
| Eco · `HojaDeJuego_Eco-v2/css/styles.css` | Botones y pestañas pequeños; controles de recursos apretados; campo de potenciaciones dentro de una etiqueta flexible; tablas densas. | Superficies de al menos 44 px para botones, summaries y etiquetas de casillas; filas de recursos apiladas en móvil; campo numérico con ancho completo; tablas con scroll interno; campos a 16 px y ayudas más legibles. |
| Elarion · `HojaDeJuego_Elarion/style.css` | Formularios e inventario en columnas estrechas; botones de eliminar pequeños; perfil y recursos con letra reducida. | Formularios e inventario en una columna a ≤600 px, controles de 44 px y texto de entrada a 16 px; títulos que admiten ajuste de línea; tablas dentro de su contenedor. Se conservan los tres perfiles y las formas especiales. |
| Elysara · `HojaDeJuego_ElysaraVelthaine/style.css` | Chips con ancho fijo; inventario/formularios densos; controles pequeños y encabezados rígidos. | Chips con ancho flexible; formularios e inventario en una columna; retrato y nombre ajustados al espacio; encabezados flexibles; 44 px táctiles, campos a 16 px y tablas con scroll interno. |
| Onésimo · `HojaDeJuego_Onesimo/style.css` | Inventario con columnas angostas; texto editable pequeño, incluidas tres descripciones; encabezado comprimido; formularios de turno en dos columnas. | Encabezado flexible con retrato proporcional; inventario y formularios en una columna en móvil; inputs, selects y textareas de inventario a 16 px; controles de 44 px y tablas con scroll interno. Fogini mantiene todos sus controles y reglas. |
| Val Draven · `HojaDeJuego_ValDraven/style.css` | Inventario/formularios estrechos; letra pequeña en campos y ayudas; encabezados y grupos de controles rígidos. | Formularios e inventario en una columna; nombre y retrato adaptados; grupos que admiten varias filas; campos a 16 px, ayudas más legibles, controles de 44 px y tablas con scroll interno. |

Las cinco hojas también limitan la altura de sus diálogos al viewport dinámico, con desplazamiento vertical propio, para mantener accesibles confirmación y cancelación en horizontal. Las reglas añadidas se limitan a pantalla y aprovechan las paletas, tipografías, tarjetas y puntos de corte existentes. No se sustituyó la composición de escritorio.

### Resoluciones y resultado por hoja

En **cada una de las cinco hojas**, se recorrieron las siete pestañas, expandiendo los detalles, a **320, 360, 375, 390, 414, 430, 600, 650, 768, 800, 1024, 1100 y 1440 px**, más **844 × 390 px** en horizontal. El portal se midió en inicio y selector en las mismas dimensiones.

Resultado: `document.documentElement.scrollWidth <= window.innerWidth` en todas las mediciones finales. No se eliminaron secciones, columnas de datos ni funciones. Las tablas se desplazan dentro de sus contenedores. Los resultados del simulador quedan después de su constructor en las distribuciones móviles existentes.

## C. Pruebas y evidencia

### Ejecutado realmente

- **Antes de editar:** 370 mediciones de layout en Chromium; seis fallos de ancho en el inicio del portal y numerosos controles pequeños. Sin excepciones JS ni HTTP 404 detectados. Evidencia en `qa-responsive/before/`.
- **Antes y después:** Eco, 66 pruebas de reglas, incluida una matriz de 882 combinaciones, más su smoke de interfaz con DOM simulado; Elarion, 23 pruebas del motor; Elysara, 28 pruebas mecánicas. Todas aprobadas. Logs: `qa-responsive/before-unit.txt` y `qa-responsive/after-unit.txt`.
- **Auditoría final:** 518 mediciones de layout: inicio/selector y siete secciones de cada hoja en 14 tamaños. **Cero desbordamientos globales, excepciones JavaScript, recursos HTTP faltantes o botones/campos/summaries visibles menores de 44 px en el sondeo de 320 px.** Las casillas de 20 px tienen etiquetas táctiles de al menos 44 px. Resultado detallado: [`qa-responsive/after/results.json`](qa-responsive/after/results.json).
- **40 comprobaciones funcionales aprobadas** en contextos nuevos, servidos por HTTP local: transición/retorno del portal; bloqueo de Elarion; navegación por retrato, texto y espacio interior de las cuatro tarjetas; Enter; siete pestañas por tacto y teclado; cancelación y confirmación de recursos; simulaciones válidas e inválidas y aplicación confirmada en las cinco hojas; edición y persistencia tras recarga; creación de bitácora; exportación JSON/TXT; rechazo de JSON ajeno e importación válida; diálogos en horizontal. Resultado: [`qa-responsive/functional/results.json`](qa-responsive/functional/results.json).
- **18 regresiones históricas de navegador de Elarion aprobadas**, incluidas formas/perfiles, recursos separados, transformación, descansos y respaldos. Se redirigieron las salidas a `qa-responsive/regression/Elarion/` para conservar la evidencia histórica.
- **32 aserciones históricas de Elysara aprobadas** con un adaptador de Playwright, incluidas concentración, Paso feérico, Agathys, economía de conjuros, descansos, inventario, bitácora, respaldos, guardado corrupto y almacenamiento restringido. El guion CDP original se intentó y se detuvo en las interacciones de confirmación; sus aserciones se ejecutaron después con acciones y esperas reales de Playwright, sin modificar el archivo histórico. Resultado: [`qa-responsive/regression/ElysaraVelthaine-playwright/results.json`](qa-responsive/regression/ElysaraVelthaine-playwright/results.json).
- **7 comprobaciones adicionales de presentación aprobadas:** mouse con hover/active/click; inicio y selector con viewport móvil emulado de 320 px y escala 2; carga explícita de todas las imágenes de las siete secciones, campos de texto de al menos 16 px y desplazamiento interno de tablas en cada hoja. Resultado: [`qa-responsive/presentation/results.json`](qa-responsive/presentation/results.json).
- Capturas finales de portal y cinco hojas a **390 y 1440 px**, ficha y simulador, completas y de viewport: `qa-responsive/after/`. Se revisaron visualmente las doce capturas de encabezado móvil/escritorio y los cinco simuladores móviles. Inicio a 320 px: `qa-responsive/presentation/inicio-320.png`.
- Comparación SHA-256 de los archivos existentes: **solo cambian el HTML del portal y los cinco CSS**. Motores, datos, narrativa, scripts de aplicación, HTML de personajes, pruebas históricas, documentación previa y archivos legacy mantienen sus hashes. Inventario de control en `qa-responsive/original-hashes.json` y `qa-responsive/changed-files.json`.

### Límites de la validación

Chromium headless instalado localmente, con viewport, tacto y teclado emulados, tanto HTTP local como `file://`. No se probaron teléfonos físicos, Safari/iOS, Firefox, conexión Wi-Fi de otros dispositivos ni el servidor LAN futuro. No se afirma compatibilidad física verificada en esos entornos. No se alteró el despliegue ni se dejaron servidores de prueba activos.

Las sesiones de prueba usan contextos nuevos y archivos de prueba dentro de `qa-responsive`; no leen ni reemplazan guardados reales. No se cambiaron claves de localStorage, esquemas JSON, estadísticas, fórmulas, restricciones ni mecánicas. Las pruebas y Playwright son herramientas de QA: **no hay dependencias nuevas de ejecución ni recursos remotos nuevos en las aplicaciones**.

### Repetir las pruebas de navegador

Desde `PersonajesNvl5v1`, con el runtime local de Playwright/Chromium indicado en los scripts:

```powershell
node qa-responsive/audit.cjs after
node qa-responsive/functional.cjs
node qa-responsive/presentation.cjs
node qa-responsive/run-elarion.cjs
node qa-responsive/run-elysara.cjs
```

### Archivos de entrega

- Modificados: `index.html` y los cinco CSS enumerados en B.
- Añadidos: `assets/imagen/onesimo-y-fogini.png`, este informe y `qa-responsive/` con guiones, logs, estados de prueba y capturas. No se generaron ZIP ni aplicaciones nuevas.

## D. Pendientes visuales autorizados

- **PENDIENTE VISUAL — Sustituir retrato del selector de Elysara Velthaine.**
- **PENDIENTE VISUAL — Sustituir retrato del selector de Val Draven.**

Son los únicos dos cambios de retrato deliberadamente pendientes. La adaptación responsive de ambas hojas está implementada y probada.
