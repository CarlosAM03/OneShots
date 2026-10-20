# Onésimo y Fogini · Hoja digital

Aplicación local en español para **Onésimo**, elfo de los bosques, **Explorador 5 / Elementalista comunitario**, en **Deathsleep**, con reglas de **D&D 5e 2014** y las adaptaciones de Fogini documentadas en las imágenes.

## Abrir y empezar

1. Extrae **toda** la carpeta `HojaDeJuego_Onesimo` del ZIP. No abras el HTML dentro del archivo comprimido.
2. Abre `index.html` en un navegador moderno. No necesitas instalar nada, iniciar un servidor ni conectarte a Internet.
3. En **Mesa y recursos**, registra los recursos actuales, la cantidad real de flechas y el estado de Fogini. El botón **Confirmar recursos completos** requiere confirmación y deja pendientes la munición y los PG/estado del compañero.
4. Consulta las siete pestañas. En móvil puedes desplazar horizontalmente la navegación. Con el foco en una pestaña, las flechas del teclado cambian de sección.
5. Al terminar, ve a **Bitácora y respaldos** y exporta un JSON. Conserva la carpeta completa y el JSON.

Los valores actuales empiezan pendientes: las imágenes muestran estadísticas y capacidades, pero no confirman el estado real de una sesión.

## Un turno de Onésimo

- El **Simulador** permite elegir uno o dos ataques con arco largo o espada corta, conjuros, Sentidos primigenios y acciones comunes. Cada selección de Atacar usa una sola arma; cambios entre armas o geometrías más complejas se resuelven con el DM.
- **Lanzar Marca**, **trasladar Marca**, **ordenar atacar a Fogini** e **invocar a Fogini** compiten por una única acción adicional. La invocación como acción adicional fue confirmada por el usuario.
- Dos flechas con Marca tienen media teórica 24 si ambas impactan. Con una Marca ya activa, dos flechas más una orden de mordida tienen media 24 de Onésimo + 9 de Fogini. Marca no beneficia al ataque del compañero.
- Estos promedios suponen impactos normales, sin críticos, probabilidad de impacto, resistencias del objetivo o daño real. Las reacciones se muestran por separado; no se suman al promedio de la acción.
- Los dos ataques del modelo se dirigen al objetivo y distancia elegidos. Para varios objetivos, movimientos intercalados o ventajas particulares, utiliza las fórmulas individuales y resuélvelas en mesa.
- La aplicación valida recursos, munición, alcances, concentración, componentes y las restricciones de acciones de 2014. Las casillas describen los supuestos de planificación que debe confirmar el jugador.
- **Aplicar turno y consumo** pide confirmación y solo funciona en combinaciones válidas. Resta flechas por disparo, no por impacto. No resta daño al enemigo ni aplica curación media como si fuera una tirada real.
- Una vez aplicado, el turno queda bloqueado hasta que confirmes **Comenzar siguiente turno** cuando realmente empiece tu turno en combate. Este control también recupera tu reacción.
- Una oportunidad requiere espada disponible, visión, salida voluntaria del alcance y reacción disponible. Si elegiste arco en la acción, también debes confirmar que el cambio de arma pudo resolverse antes de la reacción. Solo se hace un ataque de oportunidad.
- Reservar una reacción no la consume. Si se produce después de aplicar el turno, resuelve el ataque según el compendio y registra la reacción gastada en **Estado de Onésimo**. No comiences un turno ficticio para recuperar una reacción que no corresponde.

## Fogini

- Estadísticas registradas: Grande, CA 12, 19 PG de referencia, movimiento y trepar 30 pies, iniciativa +2. Mordida: +4; 1d8 + 2 perforante + 1d4 fuego; alcance 5 pies. Inmunidad al fuego.
- Tres invocaciones por descanso largo, de una hora cada una. A 0 PG desaparece. Sin la orden de ataque puede moverse y protegerse, pero no atacar.
- Para invocarlo en el simulador, introduce los **PG de aparición confirmados con el DM**, marca que los detalles de aparición se resolvieron y decide si el vínculo estará activo. La hoja no especifica si reaparece con todos los PG; la app no lo supone.
- Invocarlo usa la acción adicional y un uso. No incorpora otra acción adicional para darle una orden de mordida en ese turno.
- Para ordenar la mordida, registra primero a Fogini activo con PG, indica su distancia/movimiento hacia el objetivo y confirma que puede recibir la orden y actuar en el momento válido según el DM. No se impone una iniciativa sincronizada que las imágenes no describen.
- El formulario **Fogini · estado y vínculo** registra un estado que ya se resolvió en mesa; no invoca ni consume un uso. Evita usarlo para eludir el consumo de una invocación nueva.
- Su daño de fuego se reduce a cero por inmunidad. El resto del daño se registra normalmente. La app no cura al compañero al descansar.
- **El vínculo se registra por separado.** Las imágenes no especifican si termina al desaparecer Fogini. Por eso la aplicación conserva el valor registrado y avisa para revisarlo con el DM, sin elegir esa regla automáticamente. Después de una desaparición o descanso, comprueba el vínculo antes de aplicar resistencia al fuego a Onésimo.
- **Finalizar invocación y vínculo** pide confirmación y termina ambos registros expresamente. No devuelve usos ni restaura PG.
- La subclase completa no fue proporcionada. El usuario indicó dejar pendiente lo que no se especifique en las hojas. No se añadieron rasgos de una versión externa por compartir el nombre Elementalista.

## Daño, curación y concentración

- En Mesa, selecciona receptor y tipo de daño e introduce el resultado real antes de aplicar la resistencia gestionada por la app. Onésimo resiste fuego solo con vínculo registrado activo; Fogini es inmune. Petrificado aporta resistencia a todo daño; no se acumula dos veces una resistencia.
- Si hay otras reducciones, vulnerabilidades o reglas especiales, resuélvelas con el DM y evita aplicar dos veces la misma modificación.
- Los PG temporales absorben primero. El daño recibido puede requerir salvación de concentración aunque lo hayan absorbido por completo.
- Una salvación pendiente se guarda incluso al recargar. Introduce el d20 real y su CD antes de registrar otra fuente de daño o aplicar otro turno. Se usa Constitución +2; el agotamiento puede imponer desventaja.
- Curar heridas consume el espacio en el simulador, pero la curación se aplica en Mesa con el resultado real de 1d8 + 3 o 2d8 + 3. No se asigna curación a Fogini sin confirmar cómo funciona su recuperación en vuestra subclase.
- A 0 PG Onésimo se considera inconsciente para el simulador. Puedes registrar salvaciones de muerte o confirmar un 20 natural. Las condiciones marcadas manualmente conservan su causa hasta que las retires.

## Descansos y flechas

- **Corto:** confirma una hora de descanso válido. No recupera espacios ni invocaciones. Puedes gastar dados de golpe de uno en uno, introduciendo el d10 real; cada uno cura d10 + 2, sin superar el máximo.
- **Largo:** confirma los requisitos y el tiempo de ficción con el DM. Recupera PG, espacios 4/2, hasta **dos** dados de golpe gastados y tres usos de Fogini. No recupera flechas ni cura al compañero. La invocación de una hora ya habrá terminado durante el descanso; el vínculo se conserva como registro manual hasta confirmar su final.
- La reducción de un nivel de agotamiento depende de confirmar comida y bebida suficientes. No se borran todas las condiciones.
- La fecha del último descanso no es un temporizador de 24 horas del mundo de juego.
- Las flechas se descuentan por disparo. Las que se recuperen en la ficción se vuelven a registrar manualmente; no se suman automáticamente al descansar.

## Guardado, bitácora y respaldos

- El guardado usa una clave exclusiva de Onésimo y un esquema JSON versionado. No sobrescribe otros personajes.
- Lore, notas, posiciones, inventario, condiciones, recursos y borrador de bitácora se guardan al editar. El formulario de estado requiere pulsar **Registrar estado**.
- El historial permite buscar y eliminar entradas con confirmación. Puedes exportarlo como TXT, copiar un resumen del estado o exportar todo como JSON.
- Al importar, se validan identidad, versión, tipos, límites, fechas, objetos y estado de Fogini. Se pide confirmación y se descarga una copia del estado anterior antes de reemplazarlo. Si el navegador bloquea descargas, exporta y verifica primero tu respaldo manual.
- Si el portapapeles no está disponible, aparece texto seleccionable para copiar con Ctrl+C.
- Un guardado corrupto queda intacto y se ofrece descargar el original. Si otra ventana modifica la hoja, se detiene la escritura para evitar sobrescribirla.
- Si el navegador impide `localStorage`, aparece un aviso y puedes continuar en memoria; exporta antes de cerrar.
- Otra ruta, copia de la carpeta, navegador o equipo puede tener otro almacenamiento. Usa JSON para trasladar la sesión.

## Archivos

Mantén juntos `index.html`, `style.css`, `data.js`, `engine.js`, `app.js` y `assets`. Las cuatro imágenes originales están incluidas y se amplían en Oficialidad. El retrato se encuadra con CSS, sin modificar los PNG. Los iconos SVG de equipo son ilustraciones de categoría, no posesiones adicionales.

`INFORME.md` detalla fuentes, auditoría, capacidades, pruebas y pendientes. La configuración mecánica corresponde a nivel 5; inventario, notas y bitácora permiten registrar su evolución. No hay asistente automático para subir de nivel.
