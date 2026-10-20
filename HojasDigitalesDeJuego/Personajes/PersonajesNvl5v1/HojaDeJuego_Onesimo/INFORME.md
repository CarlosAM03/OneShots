# Informe de entrega · Onésimo y Fogini

## 1. Configuración identificada

**Onésimo**, elfo de los bosques, **Explorador nivel 5**, estilo **Arquería**, subclase **Elementalista de la comunidad**, campaña **Deathsleep**, reglas **D&D 5e 2014**. Trasfondo y alineamiento no documentados.

| Dato | Valor conservado | Procedencia |
|---|---|---|
| FUE / DES / CON / INT / SAB / CAR | 10 / 18 / 14 / 8 / 16 / 10 | Imagen 01 |
| Modificadores | +0 / +4 / +2 / −1 / +3 / +0 | Derivados de las puntuaciones |
| CA / iniciativa / velocidad | 15 / +4 / 35 pies | Imagen 01 |
| PG / dados de golpe | 44 registrados / 5d10 | Imagen 01 |
| Competencia / Percepción pasiva | +3 / 16 | Imagen 01 |
| Salvaciones FUE / DES / CON / INT / SAB / CAR | +3 / +7 / +2 / −1 / +3 / +0 | Imagen 01 |
| Atletismo | +3 | Imagen 01 |
| Trato con animales / Perspicacia / Percepción / Supervivencia | +6 cada una | Imagen 01 |
| Sigilo | +7 | Imagen 01 |
| Ataque de conjuro / CD | +6 / 14 | Ambas hojas; fórmula coherente en imagen 02 |
| Espacios máximos | 4 de nivel 1 y 2 de nivel 2 | Imágenes y progresión de explorador 5 |

Los PG actuales, dados restantes, espacios actuales y munición no se presuponen completos. Se usa 44 como máximo de referencia editable porque la imagen no separa inequívocamente actuales y máximos.

**Fogini**: compañero elemental Grande, CA 12, 19 PG de referencia, movimiento 30 pies, trepar 30 pies, iniciativa +2. Mordida a +4 y alcance 5 pies: 1d8 + 2 perforante + 1d4 fuego. Inmune al fuego. Tres invocaciones por descanso largo, una hora de duración, desaparición a 0 PG.

## 2. Materiales utilizados

- `01-OnesimoNvl-5.png`: características, salvaciones, seis habilidades, ataques, economía de acciones y rasgos de explorador.
- `02-OnesimoNvl-5.png`: magia de explorador, conjuros, Fogini, vínculo elemental y clasificación de fuentes.
- `Fugini.png`: estadísticas individuales, iniciativa, apariencia, personalidad y rutina de Fogini. Se conserva en la interfaz el nombre **Fogini**, escrito en las hojas, aunque los archivos lleven otra grafía.
- `OnesimoYFugini.png`: ilustración limpia de ambos personajes para retrato, lore y cabeceras.
- `BORRADORES/HojaDeJuego_Eco/index.html`: autoridad de estructura y lenguaje visual. Se conservaron contenedor, cabecera, retrato superior derecho, navegación, cuadrícula, tarjetas, tablas, barras, controles y paneles expandibles, adaptando la paleta e identidad.
- Prompt maestro de esta solicitud y aclaraciones del usuario.

Las cuatro imágenes están incluidas, sin modificar sus archivos originales, con nombres relativos dentro de `assets/imagen`. No se usaron estadísticas, historia, recursos, conjuros, armas ni ilustraciones de Eco para configurar a Onésimo. No se recibió una fuente completa de la subclase.

**Aclaraciones confirmadas en esta conversación:** invocar a Fogini consume acción adicional; la mesa usa las reglas de la subclase comunitaria; el usuario no dispone de fuentes y pidió dejar pendientes los detalles no especificados en las hojas.

Fuentes oficiales verificadas:

- [Basic Rules 2014 · clases, explorador](https://www.dndbeyond.com/sources/dnd/basic-rules-2014/classes): Arquería, Ataque Extra, espacios, Enemigo predilecto, Explorador nato y Sentidos primigenios.
- [Basic Rules 2014 · especies](https://www.dndbeyond.com/sources/dnd/basic-rules-2014/races): elfo y elfo de los bosques.
- [Basic Rules 2014 · conjuros](https://www.dndbeyond.com/sources/dnd/basic-rules-2014/spells): los cuatro conjuros de Onésimo.
- [Lanzamiento de conjuros](https://www.dndbeyond.com/sources/dnd/basic-rules-2014/spellcasting), [combate](https://www.dndbeyond.com/sources/dnd/basic-rules-2014/combat), [equipo](https://www.dndbeyond.com/sources/dnd/basic-rules-2014/equipment) y [descansos](https://www.dndbeyond.com/sources/dnd/basic-rules-2014/adventuring).
- [SRD 5.1 · edición Creative Commons](https://media.wizards.com/2023/downloads/dnd/SRD_CC_v5.1.pdf).

Las reglas se presentan mediante resúmenes en español. Los enlaces son de consulta opcional; su contenido necesario ya está incorporado localmente. Las reglas de Fogini no se atribuyen a fuentes oficiales ni a una versión comunitaria no identificada.

## 3. Características implementadas

Exactamente siete pestañas, con el alcance solicitado:

1. **Ficha principal**: identidad, características, combate, salvaciones, seis habilidades registradas, armas, recursos actuales, conjuros y resumen de Fogini.
2. **Lore y personaje**: frases y vínculo documentados, apariencia observada, personalidad del compañero, ausencias narrativas identificadas y notas editables.
3. **Compendio de reglas**: buscador, paneles expandibles, cuatro conjuros y dieciocho apartados de reglas adaptados al personaje. Diferencia reglas oficiales de elecciones y capacidades pendientes.
4. **Simulador de turnos**: acciones, adicional, movimiento, reacción, recursos, distancias, condiciones, resultados calculados, cinco presets y aplicación con confirmación.
5. **Mesa y recursos**: PG y temporales, dados d10, espacios por nivel, flechas, reacción, concentración, condiciones, agotamiento, posiciones, elecciones de explorador, daño, curación, descansos, muerte, inventario y notas.
6. **Bitácora y respaldos**: registros con fecha, sesión, tipo, título, contenido y continuidad; borrador persistente, búsqueda, eliminación confirmada, TXT, JSON, importación, copia y restablecimiento.
7. **Oficialidad y Homebrew**: leyenda, auditoría A–F, discrepancias, decisiones del usuario, fuentes y las cuatro imágenes originales ampliables. Es informativa y no cambia cálculos o recursos.

El estado usa `characterId: onesimo-ranger5-deathsleep-2014` y `schemaVersion: 1`, con una clave de almacenamiento exclusiva. Todos los datos son locales y los textos editables se escapan antes de mostrarlos como HTML.

## 4. Simulador personalizado

**Acción:** arco largo, espada corta, Curar heridas, Pasar sin dejar rastro, Hablar con los animales, Sentidos primigenios, Esquivar, Correr, Retirarse, Esconderse, Ayudar en un ataque, Preparar acción no mágica o no actuar.

**Acción adicional:** lanzar Marca del cazador, trasladar una Marca activa, ordenar mordida a Fogini, invocar a Fogini o ninguna. Es una selección única; no permite sumar dos opciones.

**Reacción:** ninguna, reservar oportunidad sin gasto o ejecutar una oportunidad con espada con desencadenante confirmado. La reacción se muestra y calcula por separado. Su reserva no gasta disponibilidad ni recursos.

Se validan alcances, trayectoria, visión, manos, componentes, estado del arma, flechas, espacios de ambos niveles, usos de invocación, condiciones, movimiento y terreno, concentración, restricciones de acción adicional de 2014 y requisitos de Fogini. La acción de invocar no se inventa como un conjuro ni consume espacios; usa la acción adicional confirmada por el usuario y un uso documentado.

| Caso | Daño o curación teóricos |
|---|---|
| Dos flechas | 2 × (1d8 + 4): media 17 |
| Dos flechas con Marca | 2 × (1d8 + 4 + 1d6): media 24 |
| Dos ataques de espada | 2 × (1d6 + 4): media 15 |
| Espada con Marca, dos impactos | Media 22 |
| Mordida de Fogini ordenada | 1d8 + 2 perforante + 1d4 fuego: media 9 |
| Marca existente + dos flechas + orden | Media propia 24; compañero 9; total condicionado 33 |
| Curar heridas, nivel 1 / 2 | 1d8 + 3 / 2d8 + 3: medias 7,5 / 12; no se aplican como curación real |

Marca es daño adicional de los ataques de arma de Onésimo, no un bono para Fogini. Lanzarla o moverla excluye ordenar la mordida en ese mismo turno. Sentidos primigenios es una capacidad, no un conjuro; se contabiliza su espacio sin inventarle una concentración.

**Presets:** La primera huella, Flecha y colmillo, Fuego a mi lado, Huellas que se apagan y Proteger al guardián. Cada uno requiere revisar objetivos y supuestos antes de aplicarlo.

Un turno inválido no consume recursos; uno aplicado no se repite hasta comenzar el siguiente turno mediante confirmación. Las medias no incluyen probabilidad de impacto, críticos, resistencias del enemigo, daños de reacción ni daño realmente infligido. El instante en que Fogini actúa tras recibir una orden se confirma con el DM; no se impone una sincronización de iniciativa que no esté documentada.

## 5. Recursos e inventario

Onésimo: PG máximos de referencia 44, PG actuales y temporales, cinco dados d10 máximos, espacios 4/2, flechas y reacción. Fogini: PG hasta 19, estado, tres usos máximos, minutos de duración, vínculo, condiciones y posición.

El inventario inicial se limita a **arco largo, espada corta y armadura de cuero**. La munición se cuenta aparte y empieza pendiente. No se añaden monedas, pociones, mochila, herramientas, focos o propiedades mágicas no registradas. La galería contiene iconos de categoría; una referencia no se convierte en una posesión.

El descanso corto permite gastar d10 reales con CON +2 y no recupera espacios o invocaciones. El largo recupera PG, espacios 4/2, hasta dos dados gastados y los tres usos documentados. No cura automáticamente a Fogini ni recupera flechas. El vínculo se conserva como registro independiente hasta que se confirme su final; la aplicación no decide una regla que las fuentes no especifican.

## 6. Personalización visual

Se conserva la estructura de Eco con identidad propia: verdes de bosque, carbón, oro envejecido y naranja de brasa. Retrato de Onésimo arriba a la derecha, cabeceras con arte de ambos, ficha visual de Fogini y galería de fuentes. Las cuatro imágenes se usan realmente. El retrato es un encuadre CSS del arte limpio, sin generar una apariencia alternativa.

Se crearon cinco iconos de equipo en SVG (arco, espada, cuero, flechas y equipo genérico) y un sello vegetal/ígneo. No son ilustraciones oficiales descargadas ni añaden equipo. Tipografías del sistema, sin fuentes remotas, CDN o bibliotecas externas.

## 7. Pruebas realizadas

- **98 pruebas automatizadas de mecánicas y validación: aprobadas.** Ataques y medias, Marca y traslados, competencia/Arquería, munición, ambas reservas de espacios, curación sin aplicación automática, Sentidos, concentración, movimiento, condiciones, reacciones, invocación bonus, usos, PG de aparición, inmunidad, vínculo independiente, descansos y esquemas inválidos.
- **30 comprobaciones integrales en Chromium headless: aprobadas.** Apertura directa de `index.html` por `file://`, siete pestañas, inicialización pendiente, registro de recursos y Fogini, Marca y orden, invocación, consumo de flechas, persistencia al recargar, daño e inmunidad, concentración pendiente, descansos, d10, lore, notas, borrador, bitácora, inventario, exportación JSON/TXT, importación válida y de otro personaje, cancelación, condiciones, búsqueda, teclado, guardados corruptos, restablecimiento y almacenamiento bloqueado.
- Se comprobó que los archivos exportados contienen los datos y llevan el nombre de campaña. La importación restaura también los datos de Fogini.
- Se probaron textos con etiquetas HTML y manejadores de eventos: se conservaron como texto y no se ejecutaron.
- El almacenamiento de otro personaje quedó intacto al restablecer el de Onésimo en el perfil de prueba.
- **1440 × 1100**, **320 × 844**, **390 × 844** y **768 × 844**: paneles sin desbordamiento horizontal del documento. Las tablas y la navegación tienen desplazamiento interno cuando corresponde.
- Se inspeccionaron visualmente capturas de ficha, simulador y móvil, con ajuste final del encuadre del retrato.
- Ninguna excepción de JavaScript durante las pruebas integrales y ninguna petición HTTP externa de la aplicación. Se verificaron en disco todas las rutas de imágenes.
- Comprobación sintáctica de los tres JavaScript y verificación del contenido del ZIP.

No se probaron dispositivos físicos de iOS/Android ni todas las versiones de Safari/Firefox. Los resultados de Chromium no se presentan como certificación universal. Las duraciones de ficción, geometría avanzada y resoluciones del DM se llevan manualmente.

## 8. Pendientes y contradicciones conservadas

1. **Fórmula de magia de la imagen 01:** imprime Destreza y una resta de Inteligencia para llegar a +6 / CD 14. La imagen 02 usa la fórmula coherente de Sabiduría +3 y competencia +3. Se conservan los resultados registrados +6 y 14 y se documenta el conflicto; el original permanece accesible.
2. **Subclase comunitaria:** sin autor, enlace o texto completo. Por instrucción del usuario, no se completaron otras capacidades.
3. **Aparición de Fogini:** PG al aparecer o reinvocarse, recuperación y curación, detalles de colocación, alcance de la orden y secuencia exacta de iniciativa pendientes. El usuario confirmó únicamente el coste de acción adicional de invocarlo.
4. **Vínculo y desaparición:** las imágenes no determinan si el vínculo continúa cuando Fogini desaparece. Se conserva el registro manual y se pide revisarlo con el DM. No se infiere una resistencia permanente de Onésimo ni un final automático por una regla inventada.
5. **Autorización:** la imagen 02 clasifica las adaptaciones como autorizadas por el DM; la ficha individual recuerda que se requiere aprobación. Se muestran ambas procedencias, junto a la aclaración del usuario, sin ocultar el aviso original.
6. **Elecciones de explorador:** enemigo y terreno concretos no registrados. Bosque aparece solo como sugerencia. Se pueden registrar elecciones confirmadas en Mesa.
7. **Estado inicial:** PG actuales, temporales, dados, espacios, flechas, estado/PG/usos de Fogini, vínculo, duraciones y condiciones por registrar.
8. **Datos narrativos o de equipo ausentes:** trasfondo, alineamiento, edad, origen, familia, otros vínculos, monedas, herramientas y cantidades. No se fabricaron.

No se hicieron preguntas adicionales por esos datos no esenciales. Tras la aclaración del usuario, la hoja se completó con los controles manuales y límites indicados.

## 9. Abrir, usar y conservar

Extrae el ZIP completo y abre `HojaDeJuego_Onesimo/index.html`. Registra los recursos en Mesa, usa el simulador para planificar/aplicar consumos y exporta un JSON al terminar. Conserva todos los archivos y `assets` juntos. `LEEME.md` contiene instrucciones operativas detalladas.

La configuración corresponde a nivel 5. Las notas, inventario y bitácora permiten conservar evolución narrativa y material; no hay subida de nivel automática. No necesita la hoja de Eco para ejecutarse, backend, cuentas, servidor o conexión.

## Atribución SRD

This work includes material taken from the System Reference Document 5.1 (“SRD 5.1”) by Wizards of the Coast LLC and available at https://dnd.wizards.com/resources/systems-reference-document. The SRD 5.1 is licensed under the Creative Commons Attribution 4.0 International License available at https://creativecommons.org/licenses/by/4.0/legalcode.

Adaptaciones: resúmenes y traducción al español, interfaz y cálculos para Onésimo. Las imágenes fueron proporcionadas por el usuario y no se atribuyen al SRD ni se declaran de libre distribución.
