# Informe de entrega · Elysara Velthaine

Fecha de trabajo: 19 de octubre de 2026. Versión de aplicación y esquema: 1.

## 1. Personaje identificado

Elysara Velthaine, «La última flor del invierno». Eladrin, Brujo (Warlock) nivel 5, Gran Antiguo, Pacto del Tomo, trasfondo Charlatana, alineamiento Caótica Neutral. Patrón narrativo: La Entidad del Umbral. Base de edición 2014 explícita en la lámina 2. No se incorporan rasgos de clase 2024.

Valores transcritos: FUE 8 (−1), DES 14 (+2), CON 14 (+2), INT 12 (+1), SAB 10 (+0), CAR 18 (+4); CA 13 con cuero; PG máximos 38; velocidad 30 pies; iniciativa +2; competencia +3; percepción pasiva 10; salvaciones SAB +3 y CAR +7; ataque de conjuro +7 y CD 15; 5d8 máximos y dos espacios de pacto de nivel 3.

Los saldos actuales y PG temporales comienzan sin registrar. Los ataques de daga (+5, 1d4+2) y las salvaciones no competentes se identifican como calculados, sin atribuir a la imagen una transcripción inexistente.

## 2. Materiales efectivamente utilizados

- `01-ElysaraNvl-5.png`, aportada por el usuario: identidad, estadísticas, historia, equipo y capacidades. Su tabla de habilidades queda recortada.
- `02-ElysaraNvl-5.png`, aportada por el usuario: referencia de magia, rasgos, tácticas y leyenda de fuentes.
- Prompt maestro pegado, como especificación funcional y de entrega.
- Respuesta expresa del usuario durante el trabajo: Paso feérico registrado y Susurros disonantes con resolución oficial a nivel 3.
- [SRD 5.1 oficial de Wizards](https://media.wizards.com/2023/downloads/dnd/SRD_CC_v5.1.pdf).
- [Basic Rules 2014: Spellcasting](https://www.dndbeyond.com/sources/dnd/basic-rules-2014/spellcasting), para componentes, lanzamiento como acción adicional y concentración.
- [Basic Rules 2014: Combat](https://www.dndbeyond.com/sources/dnd/basic-rules-2014/combat), para acciones, movimiento y reacciones.
- [Warlock Legacy](https://www.dndbeyond.com/classes/7-warlock), para magia de pacto, invocaciones y Tomo.

No se utilizaron como fuente de Elysara otras hojas digitales del directorio, la imagen de nivel 1 ni material narrativo no aportado. Los resúmenes son redacción propia en español. No se atribuyen páginas de manuales no verificadas. Parte de las reglas se apoya en el SRD 5.1 de Wizards of the Coast LLC bajo [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

## 3. Funciones implementadas

Exactamente siete pestañas con navegación por ratón y teclado: ficha, lore, compendio, simulador, mesa, bitácora y oficialidad. Incluye resumen de estado, datos transcritos y calculados diferenciados, búsqueda y expansión de reglas, notas narrativas y de sesión persistentes, estados, posición, historial de los últimos 100 cambios, inventario editable y seguimiento del tiempo.

La bitácora permite fecha, sesión/capítulo, categoría, título, contenido y continuidad, con borrador persistente, búsqueda y eliminación confirmada. Exporta bitácora TXT y estado completo JSON, importa JSON validado, copia un resumen para compartir y permite reinicio confirmado. Los nombres de archivos incluyen Elysara y la campaña cuando el jugador la registra.

Persistencia exclusiva mediante `hoja-dnd:elysara-velthaine-warlock5-2014:v1`. Respaldo con identidad y esquema versionado. Los textos editables se escapan al renderizar. Imágenes, scripts, estilos e iconos son locales y usan referencias relativas. Sin dependencias, CDN, backend, autenticación ni peticiones de red para funcionar.

## 4. Capacidades configuradas en el simulador

- Descarga sobrenatural: dos ataques +7, 1d10+4 de fuerza por impacto; media 19 si ambos impactan. Explosión repelente opcional, hasta 10 pies por impacto.
- Maleficio nuevo o trasladado, +1d6 necrótico por impacto contra el objetivo maldito. Con dos rayos: media 26 condicionada a ambos impactos. Traslado exige concentración existente y confirmación de que el objetivo anterior llegó a 0 PG en un turno anterior.
- Daga cuerpo a cuerpo o arrojada: un ataque +5, 1d4+2 perforante; 5 pies o 20/60 pies. Sin Ataque Extra.
- Susurros disonantes: 5d6 psíquico a nivel 3, media 17,5 en salvación fallida; SAB CD 15; instantáneo sin concentración, conforme a la elección del usuario.
- Armadura de Agathys: un espacio, 15 temporales, una hora, sin concentración; se exige elegir reemplazo si ya existen PG temporales. Daño recibido comprueba represalia condicional sin gastar reacción.
- Detectar pensamientos y profundizar lectura; Invisibilidad propia; colocación de Hambre de Hadar y concentración. No se calcula daño de Hadar mientras persista la discrepancia documental.
- Los seis trucos reales: Descarga sobrenatural, Mano de mago, Ilusión menor, Guía, Prestidigitación, Taumaturgia. Los tres del Tomo exigen confirmar que se lleva el libro.
- Disfrazarse a voluntad mediante Máscara de muchos rostros, sin espacio, respetando que sigue siendo un conjuro de nivel 1.
- Paso feérico hasta 30 pies, acción adicional, un uso por descanso corto/largo confirmado por el usuario, destino visible/desocupado. No se añaden efectos estacionales.
- Correr, Destrabarse, Esquivar, Ayudar, Buscar y uso/interacción. Presets propios: Susurro y dos rayos; Un paso entre sombras; Manto de invierno; Abrir el vacío; Que la mente huya; Rostro prestado.

El motor valida presupuesto y coste de movimiento, terreno difícil, levantarse, alcance al actuar, orden del salto, componentes, Tomo, recursos, concentración, condiciones incapacitantes y restricción de magia de acción adicional de 2014. Un turno inválido no consume. Aplicar requiere confirmación y bloquea una segunda aplicación hasta el siguiente turno. No consume una reacción que solo se haya previsto, no tira dados ni resta PG enemigos.

## 5. Recursos y equipo

PG actuales/máximos, temporales con atribución a Agathys, 5d8 máximos, dos espacios nivel 3 y un uso de Paso feérico. Daño de fuentes independientes mantiene una cola de salvaciones de concentración con CON +2. Se controla vencimiento de concentración, Agathys y Disfrazarse. El resto de efectos menores y objetivos externos se anotan manualmente.

Descanso corto: recupera espacios y Paso feérico, sin curación automática ni recuperación de dados. Gasto de d8 con resultado real +2 CON. Descanso largo: PG al máximo, espacios, Paso y hasta dos dados gastados; si el saldo de dados previo es desconocido no se inventa. No retira condiciones persistentes automáticamente.

Equipo poseído inicial: cuero, daga, Tomo, componentes de conjuro, mochila de explorador, ropa discreta/elegante y símbolo personal de su corte. Cantidades no certificadas se dejan vacías. La mochila no se expande en posesiones asumidas. No hay monedas ni objetos mágicos inventados. Los artículos adicionales se pueden marcar Poseído, Ilustrativo o Referencia.

## 6. Personalización visual

Fondo oscuro, paleta violeta y lavanda con acentos plata, tipografía serif del sistema, sello lunar y detalles de grimorio. Retrato superior derecho usa una ventana CSS sobre la ilustración aportada; no se inventa un nuevo aspecto. Lore y referencias incorporan las imágenes originales. Ocho iconos SVG originales: luna y siete categorías de equipo. Las láminas completas se incluyen como material consultable.

## 7. Pruebas ejecutadas

- `node --check`: comprobación sintáctica de JavaScript.
- **28 pruebas mecánicas automatizadas** aprobadas en Node.js: fórmulas, economía de acciones, concentración, recursos, descansos, límites, alcance, movimiento, daño, condiciones, decisiones y validación de respaldos.
- **32 comprobaciones de navegador** aprobadas en Chromium headless, con apertura directa `file://`.
- Navegación real de siete pestañas; confirmaciones y cancelaciones; gasto de recursos y bloqueo de doble consumo; persistencia tras recarga; daño y cola de concentración; descansos y dados; borrador y bitácora; equipo editable; importación válida, inválida y cancelada; descargas JSON/TXT; copia con alternativa manual; protección de guardados corruptos; continuidad en memoria cuando `localStorage` está restringido; conservación de claves de otros personajes.
- Sin desbordamiento de documento en las siete pestañas a **320, 390 y 768 px**, y capturas de escritorio a 1440 px. Revisión visual de capturas de ficha y simulador.
- Sin excepciones JavaScript detectadas ni solicitudes HTTP externas durante el recorrido.

Resultados detallados: `qa/resultados-navegador.json`, scripts de pruebas y capturas en la misma carpeta. No se afirma prueba en Safari, Firefox, dispositivos físicos ni tecnologías de asistencia externas. La comprobación de etiquetas y teclado es básica; no equivale a una auditoría formal de accesibilidad.

## 8. Información pendiente y límites

Fuente exacta del eladrin y efectos estacionales; detalles de Trance; competencias/idiomas/herramientas/dotes de la tabla recortada; monedas y cantidades; saldos actuales y campaña. Mente despierta se distingue como subclase, no una cuarta invocación. Los dos efectos de Descarga se identifican por el texto documentado.

Maleficio conserva una hora al inicio pese al escalado oficial; la ampliación a ocho horas solo se activa mediante decisión expresa en Mesa. No se altera silenciosamente la hoja. Hambre de Hadar tiene tipos de daño contradictorios en los materiales: no se automatiza el daño del área. Invisibilidad se controla solo para Elysara y cualquier segundo objetivo se anota manualmente.

El movimiento se modela linealmente respecto de un objetivo; obstáculos, coberturas y rutas complejas se resuelven con el DM. Los puntos de golpe enemigos, salvaciones, críticos y daños reales se resuelven en mesa. El control de Mano de mago existente requiere confirmación manual de vigencia. Las condiciones anotadas son seguimiento básico, no un motor completo de todos sus efectos sobre terceros. A 0 PG se termina concentración y se bloquea el plan; muerte, inconsciencia y sus tiradas requieren resolución en mesa.

## 9. Uso y entrega

Extrae el ZIP completo y abre `index.html`. Consulta `LEEME.md` para el flujo de juego y respaldos. La carpeta completa es portable. No abras el HTML dentro de la vista previa del ZIP: extrae primero. Exporta un JSON al terminar cada sesión y conserva las imágenes junto al HTML.
