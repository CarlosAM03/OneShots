# Cierre de integración · Deathsleep

Fecha: 20 de octubre de 2026. Proyecto actualizado en su ubicación original. Este informe complementa y **no reemplaza** `INFORME_RESPONSIVE.md` ni `qa-responsive`.

## 1. Alcance y línea base

Se integraron las ocho ilustraciones proporcionadas, se actualizaron los retratos de Elysara y Val, se añadió confirmación accesible de navegación y se implementó una distribución pública regenerable con servidor Windows. Las cinco aplicaciones permanecen independientes. Elarion se prueba en origen para el DM y se excluye del contenido público.

Antes de editar se inspeccionaron el árbol, el informe anterior, los scripts de QA, los recursos y el lanzador del DM. Se registraron hashes en `qa-cierre/baseline-hashes.json`. El portal encontrado ya tenía la tarjeta bloqueada **al final**, con nombre visible `...` y otra imagen. Se respetaron esas modificaciones locales; no se restauró la composición del informe anterior. Sigue identificado semánticamente como personaje secreto no disponible, con su ruta futura registrada.

Estrategia aplicada: cambios localizados de presentación; `<dialog>` nativo; optimización en derivados conservando fuentes; pruebas nuevas en `qa-cierre`; publicación por lista permitida en `.public-jugadores`; servidor sin instalar dependencias. No se modificaron escaleta, banda sonora, ZIP originales, archivos legacy ni respaldos de jugadores.

## 2. Inventario multimedia e integración

Las ocho imágenes se localizaron físicamente: tres Elysara y dos Onésimo ya tenían copia en sus assets; las tres de Val estaban únicamente en los recursos del One-Shot y se copiaron a sus assets. Se inspeccionó una hoja de contacto y las referencias originales. Los ocho PNG nuevos son **1254 × 1254**; la ilustración canónica principal de Onésimo es **1122 × 1402**.

| Archivo fuente | PNG, bytes | WebP, bytes | Uso final |
|---|---:|---:|---|
| ElarysaAvatar.png | 3315362 | 274902 | selector y encabezado |
| ElarysaLibro.png | 3229810 | 273564 | lore |
| ElarysaSpell.png | 3330437 | 281834 | referencias visuales existentes |
| ValDravenAvatar.png | 2514795 | 197518 | selector y encabezado |
| ValDravenMaleficio.png | 2839695 | 251090 | lore |
| ValDravenMoonLight.png | 2865435 | 235836 | lore |
| OnesimoAvatar1.png | 3057330 | 277098 | lore |
| OnesimoFight.png | 2919290 | 256738 | banner del simulador |
| OnesimoYFugini.png | 2884090 | conservado | Selector principal de Onésimo; sin sustitución |

Rutas, formatos, dimensiones, bytes, SHA-256, copias equivalentes y destinos: [`qa-cierre/inventario-multimedia.json`](qa-cierre/inventario-multimedia.json). Fuente común: `El Dragon Verde/IniciarOneShot/imagenes/Personajes y criaturas/PJs/`, subcarpetas Elysara, ValDraven y Onesimo. Los derivados WebP tienen 900 × 900, calidad 88, sin filtros de identidad. Los PNG fuente permanecen intactos en origen y en las copias locales existentes. No se generó arte nuevo.

- **Elysara:** Avatar en selector y encabezado, Libro en el panel de arte de Lore, Spell en la sección existente de materiales y referencias. Se conservaron las láminas anteriores.
- **Val:** Avatar en selector y encabezado; MoonLight y Maleficio complementan las tarjetas existentes de Lore. Las láminas y sus enlaces de consulta siguen disponibles.
- **Onésimo:** el selector conserva exactamente `assets/imagen/onesimo-y-fogini.png`. Avatar1 complementa la referencia visual en Lore y Fight utiliza el tercer argumento ya disponible del banner del simulador. No se alteraron Fogini ni sus reglas.
- Se añadieron dimensiones reservadas, carga diferida secundaria, textos alternativos y encuadres de identificación para Elysara/Val. La imagen de Elarion necesaria para el portal reside ahora en `assets/imagen/elarion-bloqueado.png`; su carpeta privada completa no necesita publicarse.

Los dos pendientes visuales del informe anterior quedan **resueltos**. No faltan archivos de las ocho ilustraciones solicitadas.

## 3. Selector y modal

Las cuatro tarjetas disponibles son ahora botones completos con semántica de apertura de diálogo, compatibles con Enter y Espacio. No se conservó un href que permitiera saltarse la confirmación mediante clic central o modificado. Las rutas relativas originales permanecen en el catálogo; solo el botón de confirmación ejecuta la navegación.

El modal muestra retrato, nombre, clase documentada, nivel 5 y la pregunta de confirmación. Eco muestra Monje 3/Bardo 2; Elysara, Brujo/Gran Antiguo; Onésimo, Explorador/Elementalista comunitario; Val, Bruja/Infernal. No se infiere nivel o clase para la tarjeta bloqueada.

Se probaron Cancelar, cerrar, Escape, toque/clic de fondo sin arrastre, foco inicial en Cancelar, ciclo Tab/Shift+Tab contenido, restauración del foco, bloqueo del scroll del fondo, una sola apertura, navegación confirmada y retorno al selector. El diálogo tiene scroll propio y límite de altura dinámica. No escribe localStorage ni cambia recursos o bitácoras.

Se detectó durante QA que el ciclo nativo de Tab podía dejar el foco en el chrome del navegador; se añadió cierre explícito del ciclo entre el primer y último botón. No se implementó autenticación ni desbloqueo automático de Elarion.

Una comprobación adicional detectó que volver desde la hoja podía reconstruir la bienvenida cuando no había restauración de caché. El selector ahora registra `#personajes` al abrirse y lo retira al volver al inicio, de modo que Atrás reconstruye el selector incluso sin caché. Se probaron además Shift+Tab, doble confirmación sin navegación duplicada y retorno sin modal; evidencia en `qa-cierre/modal-tests/`.

## 4. UX/UI y responsive actuales

Se recorrieron las siete secciones de **las cinco hojas**, expandiendo detalles, y el portal inicial, selector y cuatro modales en **320, 360, 375, 390, 414, 430, 600, 650, 768, 800, 1024, 1100, 1440 px**, más **844 × 390** horizontal.

Resultado actual: **574 mediciones**, cero desbordamientos horizontales globales, cero errores JS no capturados y cero recursos faltantes detectados. Todas cumplen `document.documentElement.scrollWidth <= window.innerWidth`. El sondeo de botones, campos y summaries visibles a 320 px no encontró superficies menores de 44 px. Se verificaron campos de texto ≥16 px y desplazamiento de tablas dentro de sus contenedores.

El nuevo encuadre se limita a imágenes. No se eliminaron secciones, datos, tarjetas ni controles para hacerlos caber. Se conservaron paletas, ornamentación, tipografías y distribuciones de escritorio. No se necesitaron nuevas correcciones del motor responsive de las cinco hojas; se añadieron únicamente estilos de multimedia y del modal.

Evidencia nueva: `qa-cierre/after/`, con encabezados/fichas y simuladores a 390 y 1440 px; `qa-cierre/public-tests/`, con inicio, selector y modal reales desde ambos hosts. Se revisaron visualmente selector de escritorio, modal móvil, nuevos encabezados y referencias. La captura de 320 px con viewport móvil y escala 2 está en `qa-cierre/presentation/inicio-320.png`.

## 5. Regresión y funcionamiento

| Suite | Resultado documentado anterior | Ejecución de esta intervención | Evidencia nueva |
|---|---|---|---|
| Layout | 518 | **574 aprobadas**, 56 adicionales correspondientes a cuatro modales en 14 tamaños | `qa-cierre/after/results.json` |
| Funcional, cinco hojas y portal | 40 | **40 aprobadas**, adaptadas al paso de confirmación | `qa-cierre/functional/results.json` |
| Presentación | 7 | **7 aprobadas** | `qa-cierre/presentation/results.json` |
| Eco, reglas | 66 y matriz 882 combinaciones | **66 aprobadas**, misma matriz, más smoke del DOM | `qa-cierre/unit.txt` |
| Elarion, motor / navegador | 23 / 18 | **23 / 18 aprobadas**, tres perfiles y transformación incluidos | `qa-cierre/unit.txt`, `qa-cierre/regression/Elarion/resultados-navegador.json` |
| Elysara, motor / navegador | 28 / 32 | **28 / 32 aprobadas**, mismas aserciones históricas | `qa-cierre/unit.txt`, `qa-cierre/regression/ElysaraVelthaine-playwright/results.json` |
| Onésimo y Val, controles específicos del motor | No había suite histórica equivalente localizada | **12 nuevas aprobadas** | `qa-cierre/specific-results.json` |
| Distribución pública y modal en servidor nativo | No probado en el cierre anterior | **18 grupos aprobados**, localhost e IP privada | `qa-cierre/public-tests/results.json` |
| Foco inverso, doble navegación y retorno | Sin prueba específica localizada | **4 nuevas aprobadas** | `qa-cierre/modal-tests/results.json` |

Las suites se ejecutaron de nuevo; no se reutilizaron cifras históricas como resultados actuales. Elysara utiliza el adaptador Playwright del cierre anterior. Durante esta ejecución una espera fija del adaptador quedó corta al importar archivos; se sustituyó por esperar el diálogo o el fin efectivo de la lectura. No se cambió la validación de la aplicación para pasar la prueba.

Cobertura funcional: inicialización, siete pestañas, teclado y tacto, planes válidos/inválidos, aplicación confirmada y bloqueo de doble consumo, recursos, condiciones/concentración, descansos, notas largas, inventario editable, bitácora, JSON/TXT, rechazo de respaldo ajeno, importación válida y persistencia tras recarga. Los contextos de navegador son nuevos y sus respaldos están bajo `qa-cierre`; no se usaron guardados reales.

Las 12 pruebas específicas verifican: dos flechas/17 de media; Marca/24; Fogini/9 sin recibir Marca, orden explícita e invocación sin mordida automática; límites de munición y economía de conjuros; Luto/13 y con Hex/20; Descarga con Hex/26; Agathys/15 temporales y represalia/15; concentración pendiente; descansos y rechazo de JSON ajeno. Los promedios siguen siendo teóricos, condicionados a impactos y sin modificar las fórmulas existentes.

## 6. Auditoría documental sin cambios mecánicos

### Fuentes y metodología

- **EC:** `HojaDeJuego_Eco-v2/indexLegacy/index.html`, prototipo de Apeiron; configuración y estado actuales. El retrato de Eco no se trató como fuente de estadísticas.
- **EL1/EL2:** láminas 01/02 de Elysara nivel 5, en sus assets y en PJs/Elysara. Ambas se inspeccionaron visualmente; la tabla lateral recortada se considera ilegible, no un dato inferido.
- **VA1/VA2:** `val-draven-ficha.png` y `val-draven-referencia.png`, equivalentes a 01/02 de PJs/ValDraven. Ambas se inspeccionaron.
- **ON1/ON2/FO:** `onesimo-ficha.png`, `onesimo-reglas.png` y `fogini-ficha.png`; se inspeccionaron las tres. El nombre de archivo «Fugini» no cambia la grafía canónica Fogini.
- **EA:** láminas de `HojaDeJuego_Elarion/assets/imagen/HojasVariantes/`; se contrastaron PJ, aliado narrativo y jefe, diferenciando sus variantes.
- **V1/V2:** volúmenes revisados de Deathsleep del directorio `00-Volumenes`. V2, páginas 14–17, distingue PNJ, PJ multiclase, forma dracónica y jefe restringido. V1 se utilizó para identidad narrativa y continuidad, no para inventar mecánicas.
- **PHB:** `00-Fuentes/MANUALES-20261020T081423Z-1-001.zip`, miembro `MANUALES/D&D 5e - Manual del Jugador.pdf`, consultado localmente. Referencias por página del PDF: 59–61 brujo/pacto; 76 Círculo de la Tierra/Recuperación Natural; 105–107 monje; 166 multiclase; 188 descansos; 218 Agathys; 259 Maleficio. Se revisó también el render de PDF 60 (impresa 58) y PDF 76 (impresa 74). Hay artefactos de OCR en el texto extraído: para atribuir un valor se prioriza la lámina/render legible.

No se hizo una nueva consulta íntegra de suplementos de eladrin ni de la subclase comunitaria Elementalista, que no estaba aportada. Esos puntos se conservan como no verificables. Las fuentes de reglas se usan para distinguir procedencia; no invalidan decisiones expresas de mesa.

### Matriz de consistencia

«Coincide» significa correspondencia con la fuente indicada, no aprobación nueva de una construcción. Severidad: **—** sin incidencia; **Info** registro de una excepción o falta de dato; **Media** discrepancia a resolver antes de automatizar o cambiar esa regla. Todas las observaciones siguientes permanecen sin cambios mecánicos.

| Personaje / dato implementado | Fuente y evidencia contrastada | Coincidencia o diferencia / clasificación | Estado; severidad |
|---|---|---|---|
| Eco: nombre, elfa de linaje semidivino, Monje 3/Bardo 2, nivel total 5, Apeiron | EC: encabezado y snapshot del prototipo | Conservado; construcción particular de su mesa, no PJ normalizado a Deathsleep | Conforme; Info |
| Eco: FUE 8/−1, DES 16/+3, CON 10/+0, INT 14/+2, SAB 15/+2, CAR 12/+1; competencia +3 | EC y `character.js` | Coinciden puntuaciones y modificadores derivados | Conforme; — |
| Eco: PG 45 editables, CA 15, iniciativa +4, velocidad 40 | EC: snapshot; `state.js` y `config.character` | Valores conservados. Iniciativa no se redujo a DES +3; PG se documenta como estimación pendiente | Conforme con observaciones; Info |
| Eco: Ki 3, espacios N1 3, inspiración 1, dados 5; CD Ki 13, CD bardo 12, ataque +4 | EC y suites 66/matriz 882 | Límites y cálculos existentes preservados; rasgos oficiales y excepciones autorizadas diferenciados | Conforme; — |
| Eco: desarmado +6/1d4+3; cimitarra +6/1d8+4+1d4 fuego; arco +6/1d8+4; martillo +6/1d8+4 o 1d10+4; Colmillos, Artes Marciales/Ráfaga y conjuros de su configuración | EC, `character.js` y `rules.js`/tests | Se mantienen reglas híbridas, dados y condiciones de activación del prototipo; no se impuso otra campaña | Conforme con observaciones; Info |
| Eco: equipo inicial, inventario de texto, lore y notas | EC, HTML actual y prueba de recarga/JSON | No se agregaron objetos por las ilustraciones ni narrativa nueva | Conforme; — |
| Elarion PJ: dragón verde bajo forma humanoide; Druida 6/Mago 3, total 9 | EA y V2 pp.14–16 | Coinciden identidad y perfiles; contenido privado del DM | Conforme; — |
| Elarion PJ: 10/14/14/16/18/17; mods 0/+2/+2/+3/+4/+3; competencia +4 | V2 p.15, `ficha()` y motor | Valores coincidentes; competencias y salvaciones se muestran con procedencia/pendientes | Conforme con observaciones; Info |
| Elarion PJ/PNJ: PG 78, CA 16, iniciativa +2, velocidad 30 | V2 p.14–15, EA, `profiles` y `quick()` | PG/CA son configuración casera documentada, no armadura inferida | Conforme; — |
| Elarion PJ: espacios 4/3/3/3/1, ataque druida +8/CD16, mago +7/CD15; Fire Bolt 2d10 y Poison Spray 2d12 | V2 p.15, PHB multiclase, motor | Coinciden con revisión de fuentes. Tener espacios N4/N5 no concede conocer conjuros inaccesibles | Conforme; — |
| Elarion: Recuperación Natural hasta 3 niveles, Arcana hasta 2, Forma Salvaje separada | PHB PDF76 y contenidos actuales | La lámina simplifica Natural como PG; la app y V2 la distinguen de curación. Diferencia ya señalada en Oficialidad | Conforme con observaciones; Media |
| Elarion PNJ: una ayuda/encuentro, Curar 1d8+4, bastón +4/1d6 | V2 p.14 y EA aliado | Coinciden; no se habilita rotación ofensiva de PJ para el aliado | Conforme; — |
| Elarion: dragón PJ CA18, +60 temporales, tres turnos, una transformación/largo; jefe CA15/65 PG, aliento4d6 | V2 p.16–17 y motor | Diferenciación deliberada respecto de la lámina de dragón más potente. Los poderes caseros requieren acuerdo en la propia hoja | Conforme con observaciones; Info |
| Elarion: bastón, foco druídico, grimorio, capa, componentes, medallón y útiles de herboristería; historia, decisiones y rasgos de definición pendiente | EA, V1/V2 y sección Oficialidad | Los siete artículos coinciden con la lámina PJ. Se conserva lo documentado; no se completan regeneración/mirada por inferencia. Ninguno de estos archivos se sirve a jugadores | Conforme con observaciones; Info |
| Elysara: eladrin, Brujo5/Gran Antiguo, Charlatana, Caótica neutral | EL1/EL2 y `data.js` | Identidad coincidente; historia feérica y Entidad del Umbral son narrativa | Conforme; — |
| Elysara: 8/14/14/12/10/18; mods −1/+2/+2/+1/0/+4; competencia+3 | EL1, reglas derivadas y motor | Coinciden; SAB+3 y CAR+7. Habilidades/lenguas de tabla recortada no se inventan | Conforme con observaciones; Info |
| Elysara: PG38, CA13, iniciativa+2, velocidad30, 5d8 | EL1 y `CONFIG` | Coinciden con la lámina; saldos actuales inicialmente sin registrar | Conforme; — |
| Elysara: ataque+7/CD15, dos espacios N3, descanso corto/largo, tres invocaciones inferidas de efectos escritos | EL1/EL2 y PHB PDF60 | Coinciden. Mente despierta se clasifica como subclase y no cuarta invocación | Conforme con observaciones; Info |
| Elysara: seis trucos contando Tomo y seis conocidos; Descarga 2×(1d10+4), daga +5/1d4+2 | EL1/EL2 y motor | Coinciden las listas; daga derivada de posesión y DES, sin Ataque Extra | Conforme; — |
| Elysara: Susurros 5d6 al lanzar con espacio N3 | EL1/EL2 dicen 3d6; decisión inicial registrada en `engine.js`/`initial()` y tests | Diferencia preexistente explícita y decisión confirmada en la configuración. No se cambió a 3d6 ni se trató como regresión | Conforme con observaciones; Info |
| Elysara: Paso feérico 1/corto o largo; Trance; fuente eladrin | EL2 atribuye MotM2022; láminas y configuración conservan otra recuperación | Fuente racial exacta y detalles estacionales no verificables con el material aportado; no se mezclan variantes | Conforme con observaciones; Media |
| Elysara: Maleficio 1h configurable expresamente; Hadar con daño de área sin automatizar; Agathys15 | EL1/EL2, PHB y sección Oficialidad | Diferencias de duración/tipo de daño de las láminas ya documentadas; no se automatiza lo ambiguo | Conforme con observaciones; Media |
| Elysara: siete artículos, cantidades desconocidas; historia de corte, reliquia y lore editable | EL1, `initial()`/data y pruebas JSON | Se conserva; cuervo y cristales del arte no conceden posesiones o rasgos | Conforme; — |
| Onésimo: elfo de los bosques, Explorador5, Elementalista comunitario | ON1/ON2 y data | Coincide; no se inventa trasfondo, alineamiento o autor de la subclase | Conforme con observaciones; Info |
| Onésimo: 10/18/14/8/16/10; mods0/+4/+2/−1/+3/0; competencia+3 | ON1 y data | Coinciden; salvaciones FUE+3, DES+7, CON+2, INT−1, SAB+3, CAR0; habilidades enumeradas concordantes | Conforme; — |
| Onésimo: PG44, CA15, iniciativa+4, velocidad35, pasiva16, 5d10 | ON1 y motor | Coinciden; no se asigna cantidad de flechas a partir del carcaj | Conforme; — |
| Onésimo: arco+9/1d8+4, espada+7/1d6+4, dos ataques; ataque mágico+6/CD14 | ON1/ON2 y pruebas específicas | Coinciden; Arquería y Ataque Extra diferenciados de orden a Fogini | Conforme; — |
| Onésimo: espacios4/2, Marca/Curar/Hablar/Pasar; concentración única | ON2 y motor | Coinciden; Marca compite con Fogini por la acción adicional; no se combina con otro conjuro incompatible | Conforme; — |
| Fogini: CA12, PG19, iniciativa+2, mover/trepar30, mordida+4 1d8+2+1d4, inmunidad fuego | FO/ON2 y motor | Coinciden; no recibe el dado de Marca de Onésimo | Conforme; — |
| Fogini: tres invocaciones/largo, una hora, desaparece a 0PG; orden bonus; vínculo/resistencia | FO/ON2 y clasificación registrada | Homebrew de campaña, no defecto por diferir de una subclase oficial. Aparición, curación, alcance de orden y secuencia temporal requieren DM | Conforme con observaciones; Media |
| Onésimo: inventario, equipo y narrativa limitada al vínculo | ON1/ON2/FO y data | Cantidades/trasfondo ausentes se mantienen pendientes; las poses nuevas no añaden mecánicas | Conforme con observaciones; Info |
| Val: tiefling, Bruja5/Infernal, Charlatana/Caótica neutral | VA1/VA2 y data | Identidad, personalidad, pérdida y amuleto coincidentes; no se inventa nombre del patrono | Conforme; — |
| Val: 8/14/14/10/12/18; mods−1/+2/+2/0/+1/+4; competencia+3 | VA1 y data | Coinciden; salvaciones −1/+2/+2/0/+4/+7. Competencias adicionales siguen su lámina, sin atribuir origen no documentado | Conforme con observaciones; Info |
| Val: PG38, CA13, iniciativa+2, velocidad30, pasiva11, 5d8 | VA1 y motor | Coinciden; máximo registrado editable si el DM precisa otro significado de PG38 | Conforme con observaciones; Info |
| Val: Luto+5/1d8+2 y dos ataques; daga+5/1d4+2; Descarga+7 2×(1d10+4), CD15 | VA1/VA2 y específicas | Coinciden. Usa DES para Luto; no se convierte en Hexblade ni se agrega +1 mágico | Conforme; — |
| Val: dos espaciosN3; seis conocidos, tres trucos; Hoja sedienta/Agonizante/Máscara | VA1/VA2 y PHB PDF60–61 | Coinciden; pactos/invocaciones son elecciones de construcción oficiales, no poderes nuevos del retrato | Conforme; — |
| Val: Hex/Oscuridad exclusivos en concentración, Agathys15, Bendición9 temporales | VA1/VA2 y motor/tests | Coinciden; temporales no se acumulan y se mantiene requisito de desencadenante | Conforme; — |
| Val: tiefling, sentidos agudizados, magia racial; dos habilidades no legibles | VA1 y Oficialidad | Fuente/variante racial y origen de algunos rasgos no aportados. No se activaron conjuros o competencias nuevas | Conforme con observaciones; Info |
| Val: ocho objetos iniciales, dos dagas y Luto; narrativa y notas | VA1, data y exportación/importación | Coinciden; nuevas ilustraciones solo complementan la presentación | Conforme; — |

### Hallazgos anteriores y nuevos

**Anteriores:** estimación de PG/excepciones de Eco; discrepancias de láminas frente a revisión de Elarion; fuente racial, Hadar y Susurros de Elysara; texto completo de Elementalista y detalles de Fogini; competencias/variante racial de Val. Ya estaban reflejados en la configuración o en Oficialidad. No se corrigieron valores para hacer pasar tests.

**Nuevos de esta fase:** riesgo de acceso directo a Elarion en un servidor sin staging (resuelto por exclusión); fuente de imagen privada del selector (desacoplada); ciclo Tab del modal y retorno sin caché (corregidos); cuerpo HTTP de respuesta 405 inicialmente incompleto (corregido y vuelto a probar); espera insuficiente de QA al importar (corregida solo en el guion). No se detectó una nueva alteración de reglas causada por multimedia o modal.

## 7. Servidor, publicación y LAN

- `Iniciar_HojasDigitales.cmd` inicia Windows PowerShell y `Servidor_HojasDigitales.ps1`. Puerto estable **8000**; abre el portal y permanece activo hasta Ctrl+C. Se ejecutó también el .cmd completo, sin `-NoBrowser`, para comprobar la ruta de inicio y la invocación del navegador. Existe modo `-NoBrowser`, `-LocalOnly`, elección de interfaz y puerto explícito.
- La distribución se regenera desde una lista permitida mediante `Preparar_Publicacion.ps1`. El servidor del DM continúa separado en **127.0.0.1:8765**, sin modificaciones.
- El servidor nativo solo escucha en loopback y la IPv4 privada elegida, rechaza clientes IPv4 públicos, valida rutas, no lista directorios y sirve GET/HEAD. La construcción rechaza enlaces y no borra un staging ajeno sin su marcador.
- Se probaron **localhost:8000** e **IP real 192.168.100.2:8000 desde el propio anfitrión**, incluidas imágenes, siete secciones, persistencia, modal, navegación, HEAD/405, rutas privadas y traversal simple/codificado/doblemente codificado. Elarion HTML, motor y assets privados dan 404; informes, QA, lanzadores y volúmenes no se publican.
- Se probó puerto ocupado: el segundo inicio falla con código 1 y mensaje, sin cambiar puerto o matar el primero. Se comprobó cierre Ctrl+C y liberación de listeners.
- La interfaz observada es **Wi-Fi, IPv4 192.168.100.2, perfil Windows Público**. Se mostró el aviso correspondiente. No se modificaron perfiles, firewall, router ni port forwarding. El README explica el cambio manual de una red de confianza a Privada y una excepción mínima opcional limitada a Private/LocalSubnet/programa.
- **No hubo prueba desde teléfono físico u otro equipo.** Acceder por la IP privada desde el anfitrión no demuestra que el firewall permita clientes externos. Esta validación queda expresamente no verificable, para comprobar antes de la sesión.

## 8. Docker

Alternativa opcional de un contenedor Nginx/puerto, raíz pública aislada, sin backend ni volúmenes privados. `.dockerignore` restringe también el contexto de construcción. Por defecto enlaza solo localhost; LAN requiere IP privada explícita. Configuración validada con `docker compose config --quiet`, código 0.

El ejecutable Docker existe, pero su daemon no estaba activo. **No se construyó ni ejecutó la imagen, ni se descargó software.** El lanzador Windows sigue siendo la opción principal. Comparación operativa y comandos en `README_SERVIDOR_LOCAL.md`.

## 9. Matriz final de cumplimiento

| Dimensión / criterios | Resultado | Evidencia | Hallazgos o límites |
|---|---|---|---|
| Multimedia CA01–05 | Conforme | Inventario, hashes, WebP, capturas | Ocho imágenes presentes; dos pendientes anteriores resueltos; fuente de Onésimo conservada |
| Funcionalidad CA06–09,12–15 | Conforme | 40 funcionales; suites originales; 12 específicas; pruebas públicas | Elarion se prueba privadamente y permanece bloqueado para jugadores |
| Responsive CA10–11 | Conforme | 574 mediciones, 14 tamaños; 7 presentación | Chromium/tacto emulado; no Safari ni teléfonos físicos |
| Documentación CA16,23 | Conforme con observaciones | Matriz por personaje, láminas, fuentes locales | Decisiones y variantes pendientes del DM identificadas; no se alteran mecánicas |
| Arquitectura CA14–15,22 | Conforme | Comparación de hashes; staging por lista; claves intactas | Sin backend, sincronización o dependencias nuevas de runtime; Nginx solo alternativa |
| Operación HTTP CA17–21 | Conforme | PS5.1, localhost/IP del anfitrión, traversal y puerto ocupado | Red observada Pública; ningún ajuste de firewall automático |
| Acceso LAN desde otro dispositivo | No verificable | No hay teléfono físico o segunda máquina disponible | Prueba necesaria en la Wi-Fi real; no se sustituye por localhost/IP del mismo host |
| Docker ejecutado | No verificable | Daemon no disponible; sintaxis Compose válida | Alternativa opcional sin prueba de contenedor |

No se asignan porcentajes. «Conforme» refleja las comprobaciones enumeradas, no una certificación de plataformas o redes no probadas.

## 10. Archivos y reproducción

Modificados: `index.html`; `HojaDeJuego_ElysaraVelthaine/app.js` y `style.css`; `HojaDeJuego_ValDraven/index.html`, `app.js` y `style.css`; `HojaDeJuego_Onesimo/app.js`. Los cambios de esos app.js se limitan a referencias de imágenes/HTML y una aclaración de procedencia visual. Motores, datos, persistencia, fórmulas, validaciones y esquemas de respaldo no cambian.

Añadidos: ocho WebP; copias PNG faltantes de Val y retrato público del bloqueado; lanzador, generador, servidor, configuración Docker y documentos de cierre; guiones/resultados en `qa-cierre`; distribución generada y manifiesto. Los PNG/ZIP originales, archivos del DM, informe previo y QA histórica se conservan.

Pruebas reproducibles desde esta carpeta:

```powershell
node qa-cierre/audit.cjs
node qa-cierre/functional.cjs
node qa-cierre/presentation.cjs
node qa-cierre/run-elarion.cjs
node qa-cierre/run-elysara.cjs
node qa-cierre/specific.cjs
node qa-cierre/modal.cjs
# Con el servidor real iniciado:
node qa-cierre/portal-lan.cjs http://TU_IP_PRIVADA:8000
```

Los scripts QA reutilizan el runtime Playwright/Chromium instalado en este equipo; esa ruta es solo para pruebas y no una dependencia del portal ni del lanzador portable. No ejecutes de nuevo los guiones de integración de una sola intervención como parte del inicio normal.
