# Entrega · Elarion / Deathsleep

Fecha: 18 de octubre de 2026. Edición identificada: D&D 5e 2014.

## Personaje y perfiles

**Elarion jugable:** dragón verde con apariencia humanoide, druida 6 del Círculo de la Tierra (Bosque) / mago 3 de Encantamiento, nivel total 9. Trasfondo ermitaño y alineamiento «neutral ambiguo» según lámina. FUE 10, DES 14, CON 14, INT 16, SAB 18, CAR 17; CA 16 y 78 PG máximos de campaña. Competencia +4; magia de druida +8/CD 16 y mago +7/CD 15. Los perfiles adicionales son Elarion PNJ de apoyo y Deathsleep como manifestación restringida del santuario.

El archivo `01-ElarionDuida3Mago3.png` contiene en realidad druida 6/mago 3. Se usa el contenido coincidente con el PDF y no se altera el archivo original.

## Materiales utilizados

- Prompt maestro pegado por el usuario: requisitos funcionales y criterios de entrega.
- `Deathsleep_Volumen_I_Revision_Fuentes_2014.pdf`, 18 páginas: aventura, identidad, relaciones y continuidad.
- `Deathsleep_Volumen_II_Revision_Fuentes_2014.pdf`, 23 páginas: PNJ (14), PJ (15), transformación (16), jefe y anclas (17–18), Irin (19) y magia (22).
- `LEEME.txt` adjunto: edición 2014 y naturaleza adaptada de los bloques.
- Ocho láminas locales de `assets/imagen/HojasVariantes`, inspeccionadas visualmente y conservadas.
- Siete ilustraciones locales: `1.png` a `5.png` y manifestaciones `8`/`9`, inspeccionadas e integradas en encabezado, tarjetas y galería.
- [Manual del Jugador de la biblioteca Drive](https://drive.google.com/file/d/1xTe8tATxswV1smIgB1w4i8uaRZfQz_GQ/view?usp=drivesdk): consulta textual del manual, con contraste de druida, mago, recuperación, mirada hipnótica y conjuros. No se incorporó el libro completo a la entrega.
- [Carpeta Drive aportada](https://drive.google.com/drive/folders/1axAq7-7En4m3KBcaWCy3UgTxEDW_HnEj): inventario de manuales y suplementos. No se atribuyen poderes a suplementos que solo se inventariaron.

Se extrajo el texto completo de ambos volúmenes para auditoría local en `fuentes/`. También se renderizaron e inspeccionaron visualmente las páginas 15–18 del Volumen II; las imágenes de comprobación están en `qa/`.

## Funcionalidad implementada

Exactamente siete pestañas: ficha, lore, compendio, simulador, mesa/recursos, bitácora/respaldos y oficialidad/homebrew. Navegación con ratón o teclado, diseño responsive, contraste oscuro de bosque, dorados, retrato superior derecho, tarjetas e ilustraciones locales. No hay CDNs, dependencias remotas, backend ni autenticación.

Persistencia de tres perfiles independientes, recursos, concentración, condiciones, agotamiento, posición, notas de sesión y lore. Inventario editable con alta y eliminación confirmada. Bitácora con fecha, sesión, tipo, título y contenido; búsqueda, eliminación confirmada y exportación TXT. Respaldo JSON versionado con validación de personaje, límites y estructura, importación confirmada y copia del estado. Restablecimiento solo de Elarion con confirmación. Texto editable escapado antes de mostrarlo en HTML.

El estado inicial NO supone que los recursos estén completos. PG actuales/temporales, espacios, dados y usos no documentados se presentan pendientes. El control de reservas completas es una declaración explícita del usuario.

## Simulador y recursos

**PJ:** bastón defensivo documentado; Rayo de fuego, Rociada venenosa, Guía y Saber druídico; Enmarañar, Curar heridas, Detectar venenos/enfermedades, Crecimiento espinoso, Pasar sin rastro, Piel robliza, Trepar cual arácnido, Llamar al relámpago, Crecimiento vegetal y Detectar magia. Nuevo rayo de Llamar al relámpago sin otro espacio mientras continúe la concentración. Escudo como reacción reservada o resuelta, incluso después de aplicar la acción. Rituales de los conjuros documentados con etiqueta ritual, fuera de combate y sin gastar espacio.

Mirada hipnótica a 5 pies y CD 15, restricción por objetivo y control de mantenimiento. Forma Salvaje registra uso y retorno, con advertencia de que faltan bloques de bestias; sus estadísticas no se inventan. Transformación dracónica homebrew habilitada únicamente mediante registro explícito del acuerdo. Control de tres turnos, 60 PG temporales, agotamiento al finalizar, mordida/garra/aliento alternativos y recarga real de d6 una vez al inicio de turno posterior al gasto.

**PNJ:** una intervención de curación, pista o bloqueo por encuentro; bastón defensivo excepcional. No accede a la lista completa de acciones del PJ.

**Jefe:** CA 15 y 65 PG máximos, variante 55, mordida/garra +6 y aliento 4d6 una vez por combate anunciado en ronda previa. Revelación inicial sin daño, anclas y umbrales de negociación. No multiataque, regeneración, inmunidad especial ni acciones legendarias.

Validación de economía de acciones, distancia final, movimiento, vuelo, terreno, componentes, requisitos de nube y plantas, preparación, espacios compartidos, condición incapacitante, restricciones de encanto/miedo, concentración y doble aplicación. Los promedios se calculan desde las fórmulas; no estiman probabilidad de impacto ni aplican daño real al objetivo. La curación se registra en su receptor después de tirar los dados.

Dados de golpe 6d8+3d6, espacios 4/3/3/3/1, Forma Salvaje, transformación y recuperación de espacios tienen controles propios. Descanso corto con selección de dados y suma real; Recuperación Natural con presupuesto 3 y Arcana con presupuesto 2, control independiente y día de ficción. Largo con confirmación de elegibilidad y selección de hasta cuatro dados recuperados. No borra condiciones externas indiscriminadamente.

El inventario inicial contiene únicamente los objetos singulares de la lámina: bastón arcano, foco druídico, grimorio, capa verde, medallón y útiles de herboristería; componentes con cantidad pendiente. No se añadieron monedas, pociones, armaduras ni objetos mágicos por su aparición en una ilustración.

## Diferencias y decisiones pendientes

- La lámina PJ II describe Recuperación Natural como curación y sitúa mal algunos niveles. La implementación usa la regla verificada de recuperación de espacios y Paso de la Tierra a druida 6; la discrepancia se explica en la auditoría.
- Naturaleza +8 se conserva como dato registrado; con INT +3 y competencia +4 el cálculo común sería +7. No se cambia silenciosamente.
- Los valores registrados de CA 16 y PG 78 son caseros según el volumen. No se inventa una armadura para justificarlos.
- Poison Spray se etiqueta como mago en una lámina y los trucos del PNJ II tienen dados de nivel 1. El PJ nivel 9 usa druida/CON CD 16/2d12 y mago/+7/2d10; el PNJ sigue su límite narrativo.
- `02-DeathSleep.png` contradice el jefe restringido: ataques +8, aliento 12d6 y regeneración/efectos de anclas. Queda como referencia íntegra. El bloque activo sigue Vol. II pp. 17–18 y lámina 01.
- Counterspell y Blight no son preparables por mago 3/druida 6. Sin costes y usos de excepción autorizados, no se activan.
- Faltan repertorio completo del libro, preparados completos, trucos adicionales, competencias completas, raza jugable acordada, idiomas completos y explicación de Naturaleza +8. Se señalan sin rellenarlos artificialmente.
- El PDF no fija alcance cuerpo a cuerpo del jefe: el simulador exige confirmación de alcance acordado con el DM.
- Presencia aterradora jugable, Mirada del Dragón y Regeneración Latente tienen activación, alcance o momento insuficientemente acordados. Se documentan y pueden anotarse manualmente; no reciben botones de activación automática.
- Los PG temporales de la forma dracónica no tienen caducidad explícita al volver. Se conservan hasta resolver la duración con la mesa o descanso largo, en vez de borrarlos sin acuerdo.

## Verificación ejecutada

**23 pruebas mecánicas automatizadas** en Node: valores iniciales, trucos, potenciación de curación, costes compartidos, reserva de reacción, doble turno, concentración, requisitos, daño temporal, condiciones/movimiento, mirada por objetivo, PNJ, transformación, jefe telegráfico, descansos, límites de dados y espacios, respaldos, Escudo, recarga, rituales y plantas.

**18 verificaciones de navegador** en Chromium: apertura directa `file://`, siete pestañas, recursos locales, cero peticiones remotas, confirmaciones, persistencia tras recarga, simulación y consumo, daño/concentración, escape de texto, inventario, bitácora/búsqueda/eliminación, importación/exportación JSON y TXT, aislamiento de perfiles, Escudo, descansos, transformación, restablecimiento y almacenamiento restringido. Vistas de escritorio 1440 px y móvil 390 px; sin desbordamiento horizontal en las siete secciones y sin errores JavaScript.

Resultados y capturas en `qa/`. La aplicación no requiere Node, Python o Playwright para jugar; se usaron exclusivamente para desarrollo y verificación. No se probó en Safari/iOS, Firefox ni dispositivos físicos.

## Abrir y transportar

Extrae el ZIP completo y abre `HojaDeJuego_Elarion/index.html`. Antes de jugar registra tu estado real en Mesa. Antes de trasladar la carpeta o cambiar de navegador, exporta el JSON e impórtalo en el nuevo entorno. Mantén una sola ventana de edición y conserva respaldos periódicos.
