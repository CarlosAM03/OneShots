# OneShots — Documento de visión, requisitos funcionales y alcance

**Versión:** 0.1 — Registro inicial de visión del producto  
**Fecha:** 20 de octubre de 2026  
**Estado:** Propuesta conceptual, no arquitectura aprobada ni compromiso de desarrollo  
**Fuente primaria:** explicación completa del propietario sobre la evolución de OneShots, usando Deathsleep como prototipo  
**Objetivo:** preservar exhaustivamente la intención, los flujos, los casos especiales, las posibilidades y las preguntas aún no resueltas.

> **Convención de procedencia.** **[E] Expresado:** intención o requisito planteado directamente por el propietario; no significa implementado. **[X] Existente:** capacidad del prototipo local conocida en el proyecto. **[P] Posible:** alternativa o idea expresamente hipotética. **[D] Derivado:** consecuencia técnica propuesta para analizar, no decisión aprobada. **[A] Abierto:** sin resolución. La descripción no debe confundirse con un presupuesto, planificación o garantía técnica.

## 1. Visión ejecutiva

OneShots evolucionaría de un conjunto de herramientas locales de D&D a una **plataforma multi-tenant para Dungeon Masters y parties**, con creación y administración de one-shots y campañas, documentación de fuentes, dirección artística, generación de guías de aventura y herramientas del DM mediante inteligencia artificial, invitación de participantes, carga o solicitud de fichas y creación automatizada de **hojas digitales individuales y profundamente personalizadas**.

El diferenciador imaginado no es solo permitir jugar o gestionar una ficha: es **reproducir para cualquier DM el flujo creativo y operativo con el que se produjo Deathsleep**, sin exigirle que escriba manualmente prompts técnicos. Un arnés de instrucciones existente, complementado por configuración, archivos y directrices particulares, generaría artefactos narrativos y herramientas digitales. El jugador entraría por invitación, conocería su aventura mediante una presentación narrativa, entregaría o solicitaría su ficha, esperaría la preparación del personaje y accedería al selector y a su hoja.

La implementación puede evolucionar gradualmente. El propietario no ha aprobado todavía stack, hosting, base de datos, sincronización, proveedor de IA, precio ni arquitectura definitiva.

### 1.1. Problema y valor pretendido

- **[E]** Facilitar que un DM construya su aventura y prepare material completo sin repetir manualmente el proceso actual de prompts, PDFs, imágenes, escaleta, música y hojas.
- **[E]** Reducir esfuerzo de organización y dirección de sesiones, manteniendo control sobre detalles narrativos, mecánicos y artísticos.
- **[E]** Ofrecer a la party interfaces coherentes, individuales y utilizables desde el teléfono, con personalización según la ficha.
- **[E]** Soportar varias mesas y, en el futuro, diferentes one-shots/campañas y ediciones de reglas.
- **[P]** Posible oportunidad comercial; **no está verificada** la inexistencia de competidores ni la disposición del mercado a pagar.

## 2. Estado inicial y referencias de producto

### 2.1. Prototipo existente [X]

El repositorio OneShots contiene `El Dragon Verde/` con la aventura **Deathsleep** (volúmenes I y II, escaleta digital, banda sonora, visor de imágenes, dirección artística, escenas, encuentros y material complementario), y `HojasDigitalesDeJuego/` con el prompt generador, portal de inicio y hojas digitales independientes.

La experiencia del jugador comprende bienvenida, «Iniciar partida», selección mediante tarjetas, confirmación y apertura de la hoja. Las hojas trabajan en siete áreas: **Ficha principal; Lore y personaje; Compendio de reglas; Simulador de turnos; Mesa y recursos; Bitácora y respaldos; Oficialidad y Homebrew**. El guardado actual utiliza almacenamiento del navegador y exportación/importación de JSON. DM y jugadores disponen de herramientas/servidores locales separados; no hay login ni multi-tenancy reales en ese prototipo.

**[X, reportado por propietario]** Se probó desde un teléfono físico en la misma Wi-Fi y se utilizaron las hojas. Las primeras reacciones a videos enviados a los jugadores fueron positivas. **[A]** Falta observar una sesión real para medir dificultad de aprendizaje, rapidez y posible fricción de navegación. La prueba móvil no demuestra demanda comercial ni la plataforma futura.

### 2.2. Casos de personaje que definen la personalización

| Personaje | Función como ejemplo | Referencia de jugador en la explicación |
|---|---|---|
| **Eco** | Prototipo visual original de **Apeiron**; mucho trasfondo; Monje/Bardo con reglas propias de su mesa. Puede mostrarse en selector, pero no transforma Apeiron en canon de Deathsleep. | **Carlos Armenta** |
| **Onésimo** | Explorador con **Fogini**, compañero que exige recursos y comportamiento propio en la hoja. | **Emi** |
| **Elysara Velthaine** | Bruja con información y capacidades de mayor detalle relativo; distintas necesidades de presentación. | **Tania** |
| **Val Draven** | Bruja de características/pacto propios y una hoja con distinto grado de detalle. | **Diana** |
| **Elarion** | Personaje del DM con **tres variantes**: NPC, jefe final y forma jugable opcional/desbloqueable asociada a druida. Bloqueado para jugadores mientras así se determine. | No se indicó username |

Los nombres son **ejemplos exactos de la intención de rotular tarjetas**, no una asignación de identidad para producción. El ejemplo de Elarion se construyó a partir de varias hojas: el propietario recuerda aproximadamente **seis láminas**, dos para cada variante, sin fijar seis como número obligatorio.

## 3. Horizonte de alcance

### 3.1. Dos modalidades [E/A]

**Crear one-shot:** primera modalidad mejor definida, inicialmente basada en **D&D 5e 2014** y en el corpus de fuentes disponible. Debe conducir a documentos de guía/bestiario, presentación para participantes, escaleta, banda sonora y personajes.

**Crear campaña:** opción que el DM también verá. **[A]** Su tratamiento será más extenso; no se han definido continuidad por sesiones, arcos, progresión, mundo persistente, cronología, versiones o edición compartida. No inventar esas características como requisitos aprobados.

### 3.2. Módulos previstos

Cuenta/panel DM; creación de aventura; fuentes; edición de reglas; configuración artística; generación IA de documentos; escaleta y banda sonora; parties; invitaciones; identidad de jugadores; presentación narrativa; carga/solicitud de fichas; generación de hojas; selector; personajes especiales y variantes; persistencia/exportación; futura nube/sincronización; eventual monetización. Un **dashboard conjunto de NPCs** es una **posibilidad secundaria**, no una función prioritaria.

## 4. Actores, roles y acceso

| Actor | Inicio | Capacidades pretendidas |
|---|---|---|
| **Dungeon Master (DM)** | **[E]** Crea su propia cuenta desde cero. | Crear y administrar aventuras, fuentes, dirección artística, parties, accesos, personajes normales/especiales, documentos y herramientas de dirección. |
| **Jugador** | **[E]** Primer acceso **exclusivamente mediante enlace de invitación de un DM a una party**. | Autenticarse, conocer la presentación pública de aventura, subir ficha o solicitarla, esperar generación, elegir personaje y usar su hoja. |
| **Agente integrado** | Proceso solicitado desde la plataforma. | Transformar configuración, fuentes y fichas en contenidos y herramientas; **no** sustituye autorización del DM. |

**[E]** El jugador no debe poder registrarse por su cuenta como participante desconectado de toda mesa. Debe pertenecer a una **party** y haber recibido un enlace de acceso del DM. **[A]** Falta definir si una persona puede ser simultáneamente DM en una mesa y jugador en otra, si existirán asistentes de DM, moderadores o administradores globales. **No confundir los roles humanos con NPCs o jefes**, que son objetos del juego.

### 4.1. Autenticación y 2FA

- **[E]** Inicio de sesión idealmente con **Google**; como alternativa, **correo electrónico**.
- **[E/P]** Interés en **autenticación de dos pasos** para el ingreso; mecanismo no elegido.
- **[A]** No se ha definido si 2FA es obligatorio, cuál es el segundo factor, cómo se vincula la invitación a la identidad, caducidad/revocación del enlace, recuperación de cuenta o gestión de múltiples parties.
- **[D]** Diferenciar autenticación («quién es») de autorización («a qué DM, party, personaje y documentos puede acceder»).

### 4.2. Multi-tenancy

**[E]** Diferentes DMs tendrán espacios y datos propios. Cada uno gestionará sus one-shots/campañas y groups/parties. **[A]** No está determinada la unidad exacta de tenant (DM, organización, workspace), ni el patrón de base de datos ni la política de delegación. No imponer una topología técnica antes de analizarla. **[D]** Es imprescindible aislar fuentes, documentos de DM, personajes, invitaciones y miembros entre tenants y parties.

## 5. Módulos funcionales — área del Dungeon Master

### DM-01. Inicio y panel

**[E]** El DM crea una cuenta propia. En el panel consulta sus proyectos y encuentra **«Crear campaña»**, **«Crear one-shot»** y el menú **«Parties»**. Las funciones precisas del dashboard y el número de submenús quedan abiertos.

### DM-02. Configuración del one-shot

**[E]** El DM selecciona la edición, inicialmente **D&D 5e 2014**. La plataforma permitirá en un futuro nuevas ediciones a medida que se incorporen sus fuentes, evitando mezclar reglas sin decisión explícita. Introduce parámetros manuales, agrega documentos y proporciona instrucciones narrativas o mecánicas para orientar al agente.

Debe poder **subir fuentes** y/o **consultar/seleccionar fuentes**. La colección de Drive ya conocida, abundante en materiales y suplementos 5e 2014, es una posible biblioteca documental; **no** se da por integrada técnicamente ni se asumen permisos de redistribución. El DM podría añadir comentarios libres para precisar qué quiere y qué necesita.

### DM-03. Dirección artística

**[E]** La dirección artística será **opcional** y ayudará a dar identidad propia a la aventura, su presentación y herramientas. **[P]** Se contemplan **presets** de estilo. **[A]** Paletas, géneros, efectos visuales, librería, herramientas de imágenes y derechos de arte no están definidos. «Banda sonora» no implica necesariamente IA generando música original.

### DM-04. Generación de documentos

**[E]** Al combinar fuentes, parámetros, edición, dirección artística y comentarios, el agente produce documentos equivalentes a:

- **Volumen I:** contexto, aventura, narrativa, estructura, escenas, guía integral para dirigir y referencias pertinentes.
- **Volumen II:** bestiario, criaturas, personajes, encuentros y desarrollo mecánico más profundo.
- **Documento específico de presentación** para participantes, sin spoilers: servirá de origen a una introducción visual y narrativa.

Estos tres artefactos proceden del ejemplo Deathsleep. **[A]** Formatos, plantillas, número definitivo de documentos, citas, reglas de edición y aprobación no están fijados. No atribuir a todas las campañas exactamente la misma cantidad de PDFs sin validación.

### DM-05. Escaleta digital y banda sonora

**[E]** El agente genera interfaces equivalentes a las herramientas ya usadas para Deathsleep:

1. **Escaleta digital:** momentos/actos, narración para dirigir, encuentros, referencias a criaturas, escenas, imágenes, diálogos, notas y enlaces a documentos fuente.
2. **Panel de banda sonora:** música de apoyo, organización y control según la aventura, en el estilo funcional del panel existente.

El DM podrá acceder a los documentos y fuentes aportados desde estas herramientas y podrá **pedir más detalle** en aspectos narrativos, mecánicos o de diálogo mediante comentarios. **[A]** Vinculación en vivo entre escenas/música, elección de proveedores de audio, generación de audio original, permisos de reproducción y nivel de edición manual posterior.

### DM-06. Parties

**[E]** Menú **«Parties»** con todos los grupos o mesas del DM y sus participantes. Al entrar a una party específica, el DM podrá indicar el **número de personajes previsto**, gestionar sus jugadores, generar invitaciones, introducir hojas y atender solicitudes de creación. Debe ser claro **a qué party pertenece cada hoja** y dónde se administra.

**[A]** Relación exacta party–one-shot/campaña, cupos, invitaciones múltiples, reutilización de personajes y cambios de integrantes.

### DM-07. Creación de personajes para jugadores

**[E]** Desde la party, el DM podrá **adjuntar la ficha de un jugador** y activar la generación de su hoja digital. También recibirá solicitudes de quienes todavía no tienen ficha; podrá leer el mensaje que enviaron, diseñar o conseguir ese personaje y añadir la ficha a su espacio. Los personajes no deben quedar en una party equivocada.

### DM-08. «Crear personaje del DM» y perfiles especiales

**[E]** Herramienta exclusiva del DM con mayor libertad de instrucciones y adjuntos, capaz de generar un mismo proyecto desde **varias fichas de un mismo personaje**. Caso Elarion: tres contextos **NPC**, **jefe final** y **jugable opcional/desbloqueable**. En el ejemplo se crearon aproximadamente **seis páginas** (ficha y explicación por perfil), pero la cantidad es ilustrativa. El DM escribirá indicaciones específicas sobre cómo combinarlas, qué capacidad corresponde a cada versión y cuál está bloqueada.

**[P]** Poder crear un dashboard con **todos los NPCs** de la aventura. El propietario no lo considera imprescindible por ahora: la escaleta puede ser suficiente. **[A]** No está fijada la forma de desbloqueo, permisos del DM, conservación de distintas estadísticas ni cómo se manejan otros tipos de personajes especiales.

### DM-09. Instrucciones y retroalimentación sobre IA

**[E]** El DM no introduce manualmente el prompt técnico original; usa un **arnés maestro estructurado ya suministrado por la plataforma**. Puede enriquecerlo con archivos, parámetros y un **prompt complementario** para una creación particular: pedir más profundidad, dar tratamiento diferente a diálogos/mecánicas o especificar que la ficha digital combine múltiples variantes.

**[A]** Historial de revisiones, regeneración parcial, comparación de cambios y forma de preservar correcciones humanas.

## 6. Módulos funcionales — área del jugador

### PLAYER-01. Invitación y autenticación

**[E]** El DM envía un **enlace de acceso**. Ese enlace habilita la primera incorporación del jugador a la plataforma y a la party específica; sin él no podrá entrar como jugador nuevo. Idealmente se autentica con **cuenta de Google**, alternativamente con **correo electrónico**, y se estudia **2FA**. Una cuenta por sí sola no autoriza entrar en cualquier mesa.

### PLAYER-02. Presentación narrativa previa

**[E]** Tras acceder, el jugador ve nombre y una breve descripción de su **one-shot o campaña**, **sin spoilers**. El DM habrá preparado un documento de presentación; el agente lo convierte en una **introducción tipo cinemática, no necesariamente video**, con despliegue progresivo de texto/escenas y transiciones. El objetivo es contextualizar el universo, tono e historia **antes de que el jugador presente o cree su personaje**.

La experiencia conceptual conserva la invitación narrativa de Deathsleep («las historias comienzan con una elección», «cruza el umbral y reclama el destino de tu personaje»). No se especificó video obligatorio. **[A]** Duración, posibilidad de omitir/repetir, efectos, accesibilidad y secuencia exacta de pantallas.

### PLAYER-03. Dos opciones para aportar personaje

Una vez presentada la aventura se muestran dos alternativas:

**A. «Sube tu hoja de personaje».** El jugador aporta una ficha existente, que alimentará el generador de hoja digital. **[A]** Formatos, fuentes opcionales, revisión por DM, tamaño máximo y resolución de conflictos de reglas.

**B. «Solicita una hoja de personaje a tu DM».** El jugador no tiene ficha, o desea que el DM la prepare. Puede añadir **un mensaje de texto libre** con su concepto, ideas, preferencias, antecedentes u otra información que quiera comunicar. La solicitud aparece en la party del DM. El DM trabaja el personaje y después **adjunta la ficha en el menú de creación de hojas para ese jugador**.

**[A]** Pantalla de espera mientras actúa el DM, notificaciones, posibilidad de editar solicitud y tiempos previstos.

### PLAYER-04. Generación y espera

**[E]** Una vez existe la ficha, la plataforma procesa la hoja digital. El jugador será redirigido al entorno de **«Iniciar partida»**, pero **el botón estará inactivo/ausente hasta que finalice**. Debe mostrarse un **indicador/animación de carga** del personaje que comunique que la herramienta se está preparando. Al concluir correctamente, aparece/habilita **«Iniciar partida»**.

**[D]** La generación debe tener estados observables y manejar errores; el propietario no eligió colas, proveedores ni backend. Posibles estados a estudiar: pendiente de ficha, esperando DM, en cola, generando, requiere aclaración, lista, fallida. **No se consideran aún nombres oficiales de estado**.

### PLAYER-05. Selector de party

**[E]** Después de «Iniciar partida», se abre el menú visual ya conocido con los personajes de la mesa. **Debajo de cada personaje aparece el username o nombre visible de su jugador**:

| Personaje | Etiqueta ejemplificada |
|---|---|
| Eco | Carlos Armenta |
| Elysara Velthaine | Tania |
| Onésimo | Emi |
| Val Draven | Diana |

Los personajes especiales bloqueados conservan su estado. Se preservan las ideas del selector existente: tarjeta completa seleccionable para personajes habilitados y **confirmación** antes de abrir la ficha.

**[A]** La presencia visual de todo el grupo **no determina** quién puede controlar una ficha ajena: hacen falta reglas de consulta, edición, asignación, cambio de jugador y visibilidad.

### PLAYER-06. Uso de hoja digital personalizada

**[E]** El generador debe reproducir capacidades y experiencia equivalentes a los dashboards actuales, con una **distribución/estructura funcional común** y personalización narrativa, estética y mecánica. No se trata de reemplazar solo el nombre de una plantilla.

**Contrato funcional de referencia (siete secciones):** ficha principal; lore y personaje; compendio de reglas; simulador de turnos; mesa y recursos; bitácora y respaldos; oficialidad y Homebrew. La extensión según contexto deberá admitir compañeros como **Fogini**, habilidades y magia profundas como **Elysara**, gran trasfondo como **Eco**, configuraciones particulares como **Val** y múltiples variantes DM como **Elarion**.

**[A]** No se ha decidido si el SaaS generará código HTML/CSS/JS por personaje, un motor común con componentes variables o una solución híbrida. Reutilizar la **experiencia** no obliga a reproducir exactamente la arquitectura de archivos de los prototipos.

## 7. Flujos integrales de usuarios

### FL-DM-01. Crear y preparar one-shot

1. DM registra su cuenta desde cero.
2. Entra al panel y selecciona **Crear one-shot** (también existe Crear campaña, aún indefinido).
3. Elige **D&D 5e 2014** inicialmente.
4. Define parámetros de la aventura.
5. Sube documentos y/o selecciona fuentes consultables autorizadas.
6. Opcionalmente elige dirección artística o preset.
7. Añade instrucciones libres para tono, escenas, diálogos, mecánicas y decisiones narrativas.
8. El agente utiliza arnés + configuración + fuentes.
9. Genera guía Volumen I, bestiario Volumen II y documento de presentación para jugadores.
10. Genera escaleta digital y panel de banda sonora con vínculos a materiales de referencia.
11. El DM consulta y utiliza documentos/herramientas, y podrá solicitar refinamientos.
12. **[A]** Falta definir el punto de aprobación, edición y publicación de cada documento.

### FL-DM-02. Crear y operar party

1. Entra a **Parties** y ve sus mesas y jugadores.
2. Crea/abre party, asignada a la aventura según la relación que se defina.
3. Indica número de personajes previsto.
4. Genera enlaces de invitación y los distribuye a participantes.
5. Administra incorporaciones, fichas recibidas y solicitudes pendientes.
6. Aporta fichas a los jugadores que pidieron asistencia.
7. Revisa/prepara personajes digitales y puede añadir personajes propios del DM.
8. Conserva la decisión de cuáles personajes especiales se pueden mostrar o desbloquear.

### FL-PLAYER-01. Jugador con hoja existente

1. Recibe enlace del DM.
2. Se autentica con Google/correo según configuración futura, cumpliendo condiciones de invitación.
3. Queda autorizado en una party específica.
4. Ve portada, título, presentación del one-shot y una introducción textual/visual con transiciones, sin spoilers.
5. Selecciona **Subir hoja de personaje**.
6. Carga la ficha, que se combina con contexto/fuentes permitidas del DM.
7. La plataforma muestra espera y carga; **«Iniciar partida» no está aún habilitado**.
8. Se genera el dashboard individual y al finalizar se habilita el botón.
9. Entra al selector, reconoce las tarjetas y usernames, elige personaje y confirma.
10. Utiliza la hoja durante la partida y conserva/exporta progreso según la modalidad implementada.

### FL-PLAYER-02. Jugador sin hoja

1. Realiza invitación, login y presentación inicial.
2. Elige **Solicitar hoja al DM**.
3. Opcionalmente escribe texto libre con la idea del personaje.
4. La solicitud aparece en la administración de party.
5. El DM prepara la hoja de personaje y la adjunta al jugador.
6. Comienza la generación y espera de la hoja digital.
7. Se habilita **Iniciar partida**, selector, confirmación y uso normal.
8. **[A]** Mientras espera la intervención humana del DM, la UX y los estados no están definidos.

### FL-DM-03. Personaje especial multivariante

1. DM elige **Crear personaje del DM**.
2. Adjunta varias fichas del mismo personaje (ejemplo: láminas de Elarion).
3. Explica con instrucciones qué constituye NPC, jefe final o variante jugable opcional.
4. El agente genera un proyecto que pueda separar y usar perfiles distintos.
5. El DM conserva privados los perfiles de escena/jefe según permisos.
6. Si procede, desbloquea una variante jugable sin exponer automáticamente todo el contenido reservado.
7. **[A]** Cambios entre variantes, criterios de desbloqueo, persistencia y transferencia de control.

### FL-SESSION-01. Dirigir y jugar

1. El DM consulta escaleta, documentación y música.
2. La party utiliza sus hojas en dispositivos, principalmente teléfonos.
3. Cada jugador consulta y administra sus recursos, turnos, inventario y bitácora.
4. El estado puede seguir **local** inicialmente.
5. Al terminar, el jugador podrá **exportar**, y en una evolución futura **importar a la nube/base de datos o sincronizar** según las decisiones de persistencia.
6. La sesión presencial deberá confirmar si la interfaz realmente hace cómodo o tedioso jugar.

## 8. Catálogo de requisitos funcionales

Los IDs formalizan la visión; **no son todos compromisos de MVP**. E = expresado; A = abierto/condicional; D = derivado para análisis.

| ID | Requisito | Estado |
|---|---|---|
| RF-001 | Alta directa de cuenta DM. | E |
| RF-002 | Panel DM con aventuras, herramientas y parties. | E |
| RF-003 | Acciones diferenciadas Crear campaña y Crear one-shot. | E |
| RF-004 | Selección inicial D&D 5e 2014 y futura ampliación de ediciones. | E |
| RF-005 | Parámetros manuales del one-shot. | E |
| RF-006 | Adjuntar documentos fuente. | E |
| RF-007 | Consultar/seleccionar fuentes permitidas, posible Drive. | E/A |
| RF-008 | Complementar el arnés con texto libre del DM. | E |
| RF-009 | Configurar dirección artística opcional. | E |
| RF-010 | Ofrecer posibles presets de estilo. | A |
| RF-011 | Crear documento narrativo tipo Volumen I. | E |
| RF-012 | Crear bestiario/encuentros tipo Volumen II. | E |
| RF-013 | Crear presentación de aventura sin spoilers. | E |
| RF-014 | Generar escaleta digital con escenas y enlaces. | E |
| RF-015 | Generar panel de banda sonora asociado a la aventura. | E |
| RF-016 | Acceder desde las herramientas DM a fuentes/documentos pertinentes. | E |
| RF-017 | Ajustar detalle de escenas, diálogos y mecánicas mediante instrucciones. | E |
| RF-018 | Crear/ver/gestionar múltiples parties. | E |
| RF-019 | Establecer número previsto de personajes por party. | E |
| RF-020 | Generar invitaciones y distribuir enlaces de entrada. | E |
| RF-021 | Exigir invitación/party para primer acceso de jugador. | E |
| RF-022 | Login ideal con Google o alternativamente correo. | E/A |
| RF-023 | Considerar autenticación de dos pasos. | E/A |
| RF-024 | Presentar título y premisa aptos para party, sin spoilers. | E |
| RF-025 | Reproducir introducción tipo cinemática sin video obligatorio. | E |
| RF-026 | Permitir al jugador subir su ficha. | E |
| RF-027 | Permitir solicitar ficha al DM. | E |
| RF-028 | Permitir texto libre de contexto en solicitud. | E |
| RF-029 | Mostrar solicitud al DM y permitir adjuntar ficha al miembro correspondiente. | E |
| RF-030 | Generar hoja digital desde ficha, arnés, fuentes, reglas y contexto. | E |
| RF-031 | Mostrar carga y deshabilitar Inicio hasta que el personaje esté listo. | E |
| RF-032 | Habilitar «Iniciar partida» cuando la hoja termine de generarse. | E |
| RF-033 | Mostrar selector de personajes pertenecientes a la party. | E |
| RF-034 | Mostrar username/nombre visible debajo del personaje. | E |
| RF-035 | Conservar confirmación previa a la entrada en la hoja. | E / referencia UX |
| RF-036 | Conservar siete áreas principales de hoja y personalización visual. | E |
| RF-037 | Adaptar funcionalidad particular: mascotas, magia, trasfondo, etc. | E |
| RF-038 | Crear personaje del DM con múltiples fichas/documentos. | E |
| RF-039 | Gestionar múltiples variantes NPC/jefe/jugable de un personaje. | E |
| RF-040 | Mantener bloqueados/desbloquear personajes especiales según DM. | E |
| RF-041 | Posible dashboard único de NPCs. | A |
| RF-042 | Mantener estado de hoja local durante una etapa inicial. | E/A |
| RF-043 | Exportar estado y contemplar posterior importación a base de datos/nube. | E/A |
| RF-044 | Considerar sincronización/remoto en fases posteriores. | A |
| RF-045 | Separar contextos de diferentes DMs mediante multi-tenancy. | E; técnica A |
| RF-046 | Diseñar estados/reintentos/errores verificables para generación. | D |
| RF-047 | Aplicar control real de acceso a party/DM/personaje/fuentes. | D |
| RF-048 | Gestionar versiones, revisiones y procedencia de generado. | D |
| RF-049 | Medir consumo/costos para comercialización futura. | D |

## 9. Requisitos de calidad y límites de la solución

Los siguientes son objetivos o consecuencias del planteamiento, no decisiones de stack ni conformidades ya certificadas.

| ID | Objetivo | Origen |
|---|---|---|
| RNF-001 | **Mobile first**, lectura cómoda y controles táctiles en teléfonos. | [E], prototipo |
| RNF-002 | Personalización visual y funcional de calidad comparable a Eco, Onésimo, Elysara y Val. | [E] |
| RNF-003 | Mantener UX común sin impedir extensiones por ficha. | [E] |
| RNF-004 | Separar contenido DM reservado de lo apto para jugadores. | [X]/[E] |
| RNF-005 | Evitar cruces de datos entre tenants, parties y fichas sin permisos. | [D] |
| RNF-006 | Proteger cuentas, fichas, notas, recursos y documentos subidos. | [D] |
| RNF-007 | No inventar estadísticas, conjuros, fuentes ni permisos del DM. | Prompt existente [X] |
| RNF-008 | Mostrar estados reales de generación y errores, no un spinner eterno. | [D] desde flujo [E] |
| RNF-009 | Mantener trazabilidad de archivos, edición, variante, artefacto generado y decisiones DM. | [D] |
| RNF-010 | Preservar o exportar el estado cuando cambie dispositivo/origen, según modalidad habilitada. | [X]/[E] |
| RNF-011 | No permitir que el costo de IA sea ilimitado o indetectable. | [D] desde negocio [P] |
| RNF-012 | Examinar licencias y permisos antes de alojar/redistribuir manuales, suplementos, arte, música o textos de terceros. | [D] |
| RNF-013 | Contemplar accesibilidad y reducción de movimiento en la presentación cinemática. | [D] |
| RNF-014 | Poder incorporar nuevos one-shots y personajes sin romper los anteriores. | [E] |

## 10. Modelo conceptual del dominio — propuesta para futura arquitectura

**No son tablas aprobadas ni un esquema Prisma/SQL decidido.** Se enumeran las entidades que permitirían expresar los conceptos sin confundirlos:

| Concepto | Responsabilidad potencial | Decisiones pendientes |
|---|---|---|
| **Cuenta/Usuario** | Identidad autenticable, correo, proveedor, método de acceso. | Google, correo, 2FA, rol múltiple. |
| **Tenant/Workspace** | Límite de administración y datos propios del DM. | Unidad exacta de tenant y membresía. |
| **Aventura** | Contenido de un one-shot o campaña. | Tipo de aventura, versión, reutilización. |
| **Edición/Fuentes de reglas** | 5e 2014 inicialmente, suplementos y corpus. | Compatibilidad y derechos de consulta. |
| **Documento fuente** | Archivos aportados/seleccionados con procedencia. | Drive, permisos, formatos, indexación. |
| **Configuración artística** | Estilo, referencias y presets opcionales. | Reutilización, procedencia de arte. |
| **Instrucciones adicionales** | Texto/prompt particular del DM. | Versión, alcance, herencia y prioridad. |
| **Artefacto generado** | Volumen, presentación, escaleta, panel, multimedia. | Formato, versionado, edición. |
| **Party** | Grupo/mesa gestionada por DM. | Aventuras asociadas, cupos. |
| **Miembro de party** | Vincula cuenta, mesa y permisos. | Cambios de party y propiedad del personaje. |
| **Invitación** | Enlace emitido por DM. | Caducidad, revocación, uso único. |
| **Solicitud de ficha** | Petición sin ficha y mensaje libre. | Estados, aviso al DM. |
| **Ficha fuente** | Documento original del personaje. | Aprobación, actualizaciones, legibilidad. |
| **Personaje** | Identidad del PJ/NPC y pertenencia. | Dueño, reutilización, historial. |
| **Variante de personaje** | NPC, jefe final, jugable, forma especial. | Visibilidad, reglas y desbloqueo. |
| **Hoja digital** | Dashboard específico del personaje. | Código generado vs motor configurado. |
| **Trabajo IA** | Generación en curso con resultado. | Estados, cola, reintentos y costo. |
| **Estado de juego** | Recursos, bitácora, avances y exportaciones. | Local, remoto, híbrido y conflictos. |
| **Métrica de consumo** | Generaciones, uso IA, almacenamiento. | Facturación y presupuestos. |
| **Suscripción/Plan** | Membresía potencial del DM. | Cobro por party/jugador/personaje. |

**Separaciones fundamentales:** aventura ≠ party; personaje ≠ ficha PDF; personaje ≠ variante; fuente privada DM ≠ presentación pública; tarjeta visible ≠ permiso de edición; rol humano ≠ NPC. Un mismo personaje puede venir de **varias fuentes** y poseer **varios perfiles**.

## 11. Decisiones de arquitectura: qué se sabe y qué no

### 11.1. Decisiones ya materializadas solo en el prototipo [X]

- Aplicaciones independientes de personaje, realizadas con HTML/CSS/JavaScript y multimedia local.
- Estructura común de experiencia y siete secciones; diseño particular por personaje.
- Portal de inicio, tarjetas, bloqueo/confirmación y rutas a hojas.
- Escaleta y panel de banda sonora del DM en herramientas propias.
- Ejecución en red privada/local con servidores separados para DM y jugadores.
- Persistencia local del navegador y respaldos de archivo.

Esto **no** determina automáticamente la arquitectura SaaS.

### 11.2. Dirección futura expresada [E]

- Plataforma **multi-tenant** con login/roles DM–jugador.
- DM crea aventuras, parties y materiales mediante **agente IA**.
- Jugadores entran mediante **invitaciones** y ven introducción narrativa.
- Hojas se generan tras carga/solicitud; existe **espera hasta que estén listas**.
- Primera edición soportada: **D&D 5e 2014**, otras posteriores.
- Integración de arnés general de hojas con configuración, fuentes e instrucciones del DM.
- Posible fase inicial **local-first** para la hoja; nube y centralización más adelante.

### 11.3. Pendientes; no decidir unilateralmente [A]

- Backend, frontend, proveedores/servicios, base de datos, esquema multi-tenant.
- Plataforma y proveedor de autenticación, 2FA, invitaciones y sesiones.
- API de IA, modelos, modelos de generación, costos y límites.
- Corpus/Drive: ingestión, indexación, consulta, licencias y versionado.
- Servicio de almacenamiento de documentos e imágenes, CDN u opción local.
- Colas, workers, progreso, reintentos y generación simultánea.
- Método de generación de herramientas: HTML individual, motor con componentes, o híbrido.
- Política de revisión/aprobación y publicación de artefactos.
- Persistencia centralizada, exportación, propiedad de progreso, sincronización.
- Arquitectura para campañas largas, otras ediciones y planes comerciales.

### 11.4. Alternativas técnicas que merecen evaluación [D]

**A. Código personalizado por personaje:** puede preservar la gran flexibilidad de los prototipos, pero requiere fuertes controles de validación, ejecución, actualización y aislamiento del generado.

**B. Motor parametrizable:** una base estructural común podría simplificar mantenimiento, pero no debe sacrificar funciones especializadas como Fogini o Elarion.

**C. Híbrido:** contrato visual/funcional compartido, datos por personaje y extensiones de comportamiento configuradas. No se aprueba aún, pero debe compararse con los cinco casos de referencia.

Para documentación de aventura: arnés especializado de contenido DM diferente del prompt maestro de hojas, aunque ambos formen un flujo integrado. **El prompt actual de hojas no debe confundirse con un generador ya definido de Volumen I, Volumen II, escaleta y música.**

## 12. Inteligencia artificial y autoridad documental

El **arnés** recibe y combina: prompt maestro reutilizable; configuración de aventura y edición; fuentes; hoja de personaje específica; anotaciones narrativas/mecánicas del DM; dirección artística; permisos; variantes especiales. El usuario interactúa con campos y comentarios, no con la implementación interna del prompt.

El DM puede enriquecer la salida con instrucciones especiales: «haz este personaje a partir de varias fichas», «detalla más los diálogos», «añade información de mecánicas por escena», «distingue NPC/jefe/jugable». En la modalidad de creación de one-shot, el agente debe producir documentación y herramientas del DM. En la modalidad de hoja, debe producir una experiencia de personaje comparable a los ejemplos.

**[A/D]** Deberá definirse una jerarquía para discrepancias (manual, suplemento, hoja, autorización DM), calidad de extracción y citas, información ilegible, contenido inventado por IA, control de versiones, revisiones y publicación. La IA **no puede atribuirse autoridad automática de reglas oficiales o aprobaciones** por generar un resultado.

### 12.1. Drive como fuente

Se cuenta con una carpeta de Drive que el propietario considera una de las fuentes más amplias de documentos de D&D, especialmente 5e 2014: <https://drive.google.com/drive/folders/1axAq7-7En4m3KBcaWCy3UgTxEDW_HnEj>. Este enlace es una **referencia de origen previamente proporcionada**, no evidencia de que el futuro SaaS tenga permisos para leer su contenido. Puede consultarse como **fuente candidata de una biblioteca**. Aún deben examinarse permisos técnicos, condiciones de uso/redistribución, acceso autorizado, búsqueda por documento, edición y versiones. No confundir «tenemos los archivos» con «se pueden distribuir libremente a todos los usuarios».

## 13. Modo de persistencia y seguridad

**[E/P]** El estado de personaje podría conservarse localmente al inicio y exportarse al acabar. Una evolución permitiría importarlo a una base de datos o nube; la sincronización plena entre dispositivos y desde DM no está definida. No prometer tiempo real sin diseñarlo.

**[D]** Al haber cuentas, multi-tenancy y fuentes privadas, el sistema deberá comprobar permisos en el servidor, no solo esconder botones. Se deberán separar documentos internos del DM de la introducción sin spoilers, proteger variantes secretas, controlar quién puede subir/editar una hoja, validar archivos y ejecutar de manera segura cualquier artefacto generado. El control de Elarion en el prototipo muestra la distinción entre **bloquear una tarjeta** y **evitar entregar el contenido**.

## 14. Modelo comercial — registro íntegro de hipótesis

### 14.1. Intención y cliente que paga

**[P]** Cobro principalmente al **DM**, quizá mediante **membresía por party**, por jugador, por número de personajes o por generaciones incluidas. El propietario quiere evitar que usarlo sea demasiado caro. Una opción explorada es permitir **cierta cantidad de pruebas gratuitas**; no hay política definida.

### 14.2. Escenarios numéricos hipotéticos expresados

- Generar una hoja digital podría consumir, **por decir algo**, **$50 MXN o $100 MXN en créditos** de IA. No existe una medición real.
- Se dio como ejemplo **$500 MXN mensuales** para generar **8 personajes**. No es tarifa aprobada ni margen validado.
- En otro supuesto, una hoja podría costar **$10 MXN** de generación, además de un costo de alojamiento/mantenimiento que se ejemplificó en **$50 MXN mensuales**. Tampoco está medido.
- Se considera una cuota por cada jugador, por party o una membresía dependiente de su capacidad; no se ha seleccionado modelo.

Estas cifras son **ejemplos exploratorios independientes**, no deben combinarse para calcular rentabilidad sin mediciones ni supuestos compatibles.

### 14.3. Dudas explícitas

El propietario desconoce el consumo real en créditos/tokens y la diferencia económica/operativa entre **ChatGPT Plus**, **Codex** y usar la **API** para integrar un agente en una plataforma. Se requiere investigación posterior antes de evaluar costos, precios y límites de uso. **No se presume que una suscripción de usuario equivalga al costo de integrar la API.**

### 14.4. Análisis posterior necesario [D]

Medir generación de PDFs, extracción de fichas, creación/iteración de dashboards, generación de arte, uso de modelos, almacenamiento de documentos, ancho de banda, número de sesiones, costos de infraestructura y soporte. Después realizar **benchmark** competitivo y pruebas de disposición a pagar. El posible potencial comercial es una hipótesis, no un hallazgo de mercado.

## 15. Alcance escalonado propuesto — no es roadmap aprobado

Se expresa un horizonte amplio, pero **no existe decisión del propietario sobre MVP, orden de sprints, cronograma o fecha comercial**. Esta tabla es una posible forma de separar el trabajo futuro, no una reducción del alcance documentado:

| Bloque para análisis | Capacidad | Estatus |
|---|---|---|
| **Base local actual** | Deathsleep DM + portal + cinco hojas + LAN + respaldos. | Prototipo de referencia; aprovechar pruebas en sesión real. |
| **Acceso y party** | DM registrado, identidad de jugador, invitaciones, parties, permisos, fuentes y fichas. | Requiere plataforma/backend, aún sin diseño. |
| **Automatización de hojas** | Subir/solicitar hoja, generación IA, espera, selector con dueño, dashboards específicos. | Producto deseado, necesidad de arnés y generación confiable. |
| **Generador de one-shots** | Configuración 5e 2014, documentos, dirección artística, escaleta, música y presentación. | Diferenciador central, alcance funcional ya descrito. |
| **Variantes/DM avanzado** | Elarion, múltiples fichas, perfiles de NPC/jefe/jugable y desbloqueos. | Deseado, requiere diseño de autorización. |
| **Expansión** | Campañas largas, otras ediciones, nube/sincronización, comercialización, quizá NPC dashboard. | Opciones futuras o menos definidas. |

**[D]** Se deberán decidir dependencias entre los bloques antes de ordenar el desarrollo. Sería incorrecto declarar el modo campaña completo o el motor comercial «listo» solo por existir los prototipos actuales.

## 16. Registro de decisiones arquitectónicas y de producto

**Pendientes de decisión, no elecciones tomadas:**

| ID | Tema que debe decidirse | Pregunta concreta |
|---|---|---|
| DEC-001 | Primer MVP | ¿Primero portal multiusuario + fichas, primero generador de one-shots, o piloto combinado? |
| DEC-002 | Tenant | ¿El tenant es un DM, organización o workspace? ¿Un usuario puede pertenecer a varios? |
| DEC-003 | Roles | ¿DM + jugador son suficientes? ¿Asistente DM o administrador global? |
| DEC-004 | Autenticación | ¿Google, correo o ambos? ¿Qué 2FA, obligatoriedad y recuperación de cuenta? |
| DEC-005 | Invitaciones | ¿Caducidad, revocación, uso único y asignación de cupos? |
| DEC-006 | Relación aventura–party | ¿Una party juega una o varias aventuras? ¿Se reutilizan grupos? |
| DEC-007 | Edición D&D | ¿Cómo catalogar 2014, suplementos y futuras ediciones sin mezclar reglas? |
| DEC-008 | Fuentes documentales | ¿Carga local, Drive, biblioteca, búsqueda, indexación y permisos de uso? |
| DEC-009 | Configuración creativa | ¿Qué parámetros son obligatorios y qué presets se ofrecerán? |
| DEC-010 | Generación IA | ¿Proveedor, modelos, arneses, revisión, citas, limitaciones, presupuesto y reintentos? |
| DEC-011 | Generador de UI | ¿Código autónomo por hoja, componente común o arquitectura híbrida? |
| DEC-012 | Jobs asíncronos | ¿Qué estados, cola, avisos, tiempos y tratamiento de fallos? |
| DEC-013 | Flujo DM sobre fichas | ¿El DM debe aprobar todas las fichas del jugador y todos los resultados del agente? |
| DEC-014 | Control de fichas | ¿Quién puede ver, editar o usar personajes del selector? |
| DEC-015 | Personaje especial | ¿Cómo se administran perfiles, privacidad, desbloqueos y cambios de estado? |
| DEC-016 | Cinemática | ¿Duración, saltar/repetir, transiciones, accesibilidad y fuentes públicas? |
| DEC-017 | Estado local/nube | ¿Exportación, importación, conflictos, dueño y sincronización de estado? |
| DEC-018 | Modo campaña | ¿Arcos, múltiples sesiones, continuidad, progresión y herramientas adicionales? |
| DEC-019 | Escaleta y banda sonora | ¿Unificación, vinculación, reproducción, fuentes de audio, edición? |
| DEC-020 | NPC dashboard | ¿Será funcionalidad real o se seguirá usando solo la escaleta? |
| DEC-021 | Stack e infraestructura | ¿Backend, frontend, almacenamiento, base de datos, workers, despliegue? |
| DEC-022 | Derechos y distribución | ¿Qué manuales, ilustraciones, extractos y música pueden alojarse o redistribuirse? |
| DEC-023 | Precios | ¿Party, jugador, personaje, membresía, créditos, suscripción y pruebas gratuitas? |
| DEC-024 | Costos API | ¿Costo real por generación, regeneración, modelos, imágenes, almacenamiento y ejecución? |
| DEC-025 | Validación mercado | ¿Productos comparables, perfil de cliente DM y disposición a pagar? |
| DEC-026 | Calidad producto | ¿QA mínima, privacidad, rendimiento mobile first, coherencia de reglas, revisión humana? |
| DEC-027 | Identificación de usuario | ¿Username público, alias por party, nombres reales, propiedad y privacidad? |
| DEC-028 | Versionado documental | ¿Cómo actualizar un volumen, escena, hoja o fuente sin perder correcciones previas? |

## 17. Criterios de aceptación conceptuales para diseñar futuros tests

Estos ejemplos **no son verificaciones ejecutadas ni promesas de la versión local**. Sirven para convertir los recorridos en pruebas cuando se defina una implementación:

| ID | Escenario esperado |
|---|---|
| EA-01 | Un DM crea cuenta y un one-shot 5e 2014 sin escribir el prompt interno. |
| EA-02 | Adjunta fuentes, configura estilo e indica necesidades particulares. |
| EA-03 | El generador produce documentos narrativos/mecánicos y herramientas DM con procedencia. |
| EA-04 | El DM crea party, define cupos y emite una invitación. |
| EA-05 | Un jugador sin invitación no puede incorporarse a una party reservada. |
| EA-06 | Un jugador invitado entra, se autentica y ve solo la introducción apta para participantes. |
| EA-07 | El jugador sube ficha y ve la generación; «Iniciar partida» continúa deshabilitado hasta terminar. |
| EA-08 | Otro jugador solicita hoja con mensaje libre; el DM recibe la solicitud y adjunta ficha. |
| EA-09 | La hoja generada respeta las siete áreas y trata correctamente un compañero como Fogini. |
| EA-10 | El selector muestra nombre de personaje y username; la confirmación abre la hoja correcta. |
| EA-11 | Un personaje especial producido desde múltiples fichas mantiene separados NPC, jefe y jugable. |
| EA-12 | El jugador no accede al material privado del DM por una URL directa. |
| EA-13 | La herramienta permite exportar estado local sin afirmar sincronización remota inexistente. |
| EA-14 | Ante error de generación hay estado claro, sin habilitar una hoja incompleta como lista. |
| EA-15 | Revisión de resultados por DM y procedencia de fuentes se comportan según las políticas que se aprueben. |

## 18. Riesgos y validaciones pendientes

### 18.1. Usabilidad real en mesa

El propietario considera cómoda la experiencia para sí mismo como DM. Las personas que vieron los videos expresaron impresiones iniciales positivas. **Todavía necesita verificar en partida** si los jugadores aprenden la interfaz, si consultan el compendio de manera ágil o si la navegación les resulta tediosa.

Preguntas para observación: tiempo para abrir un turno, dificultad para encontrar acciones, interacción con hechizos/compañero, comprensión de los recursos, facilidad de importar/exportar, necesidad de ayuda del DM y comportamiento del teléfono durante sesiones largas.

### 18.2. Riesgo de automatización

Las hojas actuales se construyeron con abundante contexto, iteración y auditorías. La promesa de producirlas automáticamente en un SaaS requiere probar que un agente alcance consistentemente la calidad funcional, artística y documental de **Eco, Elysara, Val, Onésimo/Fogini y Elarion** sin inventar reglas ni exponer contenidos. No basta con que un resultado visual sea atractivo.

### 18.3. Separación narrativa y permisos

La introducción de la party y su selector no deben incluir spoilers. Los documentos de Volumen II, variantes de jefe y comentarios DM deben obedecer autorización real al migrar al modelo en línea. Un enlace de invitación no sustituye el aislamiento de tenants y parties.

### 18.4. Costo y escala

No hay datos de costo de generación. El proyecto no debe fijar un precio a partir de los ejemplos hipotéticos; requiere mediciones reales del agente, iteraciones, consultas documentales, multimedia, infraestructura y mantenimiento. La economía será estudiada después de determinar viabilidad y demanda.

### 18.5. Derechos de fuentes

El corpus de 5e 2014 y sus suplementos puede servir como referencia autorizada conforme a las condiciones aplicables, pero el acceso a archivos no demuestra permiso de redistribuirlos comercialmente. La cuestión requiere revisión independiente antes del lanzamiento de un servicio compartido.

## 19. Restricciones explícitas de este documento

Esta versión **no** define: arquitectura física, componentes concretos, endpoints, base de datos, wireframes finales, stack, contratos de IA, precios, cálculo de márgenes, cronograma, obligaciones de licencia o responsabilidades legales. Tampoco incorpora como hechos elementos no dichos por el propietario. Las entidades, RNF derivados y criterios de prueba son **formalizaciones propuestas**, separadas de la visión original.

La alternativa **Crear campaña** está intencionalmente incompleta; el flujo de **Crear one-shot** tiene mayor definición. La posibilidad de un **dashboard conjunto de NPCs** queda como posibilidad, no compromiso. El **modo local y la exportación** pueden mantenerse incluso si otros módulos evolucionan a una plataforma alojada. La fuente de cada variante de personaje y decisión especial debe conservarse.

## 20. Próxima actividad recomendada

Conservar esta versión como **baseline de producto**, sin convertir inmediatamente cada elemento en una historia de sprint. Luego trabajar por separado:

1. **Priorización de MVP y fases:** decidir qué flujo mínimo permite comprobar generación de calidad y experiencia real de DM/jugador.
2. **Modelo de actores/permisos:** DM, party, invitación, propiedad y secretos narrativos.
3. **Arnés y fuentes:** separar generación de aventuras, materiales DM y hojas, con procedencia y evaluación.
4. **Comparación de arquitecturas de hoja:** código individual, motor configurable o híbrido, con casos reales de prueba.
5. **Medición de IA y costos:** solo después de instrumentar la generación real y conocer proveedores.
6. **Validación del juego:** observar la sesión de Deathsleep y recopilar fricciones de navegación desde los teléfonos.

**Síntesis de visión:** OneShots se concibe como un **entorno integrado de creación y dirección de aventuras asistido por IA y administración de parties**, no únicamente como generador de hojas digitales. La plataforma busca que distintos DMs dispongan de los mismos instrumentos que el propietario creó manualmente para Deathsleep, mientras cada jugador recibe una experiencia narrativa y mecánicamente propia. La visión está recogida aquí en su máximo alcance actual; su viabilidad, arquitectura, etapas y monetización permanecen abiertos.
