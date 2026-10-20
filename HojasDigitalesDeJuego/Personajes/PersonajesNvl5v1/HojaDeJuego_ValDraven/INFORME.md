# Informe de entrega · Val Draven

## 1. Personaje identificado

Val Draven: tiefling, bruja (Warlock) de nivel 5, El Infernal, Pacto de la Hoja, trasfondo Charlatana, alineamiento caótica neutral, tamaño Mediano. La segunda imagen identifica explícitamente las reglas como **D&D 5e 2014**.

| Dato | Configuración | Procedencia |
|---|---|---|
| FUE / DES / CON / INT / SAB / CAR | 8 / 14 / 14 / 10 / 12 / 18 | Hoja 01 |
| Modificadores | −1 / +2 / +2 / +0 / +1 / +4 | Derivados de las puntuaciones |
| CA / iniciativa / velocidad | 13 / +2 / 30 pies | Hoja 01 |
| PG / dados | 38 registrados / 5d8 máximos | Hoja 01; actuales por registrar |
| Competencia | +3 | Hoja 01 y progresión de nivel 5 |
| Salvaciones FUE / DES / CON / INT / SAB / CAR | −1 / +2 / +2 / +0 / +4 / +7 | Hoja 01 |
| Ataque de conjuro / CD | +7 / 15 | Hojas y cálculo CAR + competencia |
| Percepción pasiva | 11 | Hoja 01 |
| Espacios | 2 de nivel 3 | Ambas hojas; restantes por registrar |

Las habilidades se transcriben sin normalizar sus bonificadores. El máximo de referencia de 38 PG es editable porque la hoja no separa inequívocamente PG actuales y máximos. No se presupone que los recursos actuales estén completos.

## 2. Materiales utilizados

- `01-ValDravenNvl-5.png`: identidad, características, salvaciones, habilidades, equipo, rasgos y narrativa.
- `02-ValDravenNvl-5.png`: edición, magia, conjuros, invocaciones, condiciones de combate y clasificación de fuentes.
- Prompt maestro: requisitos funcionales, estructura de siete secciones, portabilidad, persistencia y alcance.
- No se recibió HTML de referencia ni otro trasfondo narrativo.

Las copias locales se llaman `assets/imagen/val-draven-ficha.png` y `assets/imagen/val-draven-referencia.png`. Los originales no fueron modificados; el encuadre del retrato se realiza mediante CSS.

Fuentes oficiales consultadas:

- [SRD 5.1, edición CC BY 4.0](https://media.wizards.com/2023/downloads/dnd/SRD_CC_v5.1.pdf): clase, rasgos, equipo y reglas generales.
- [Basic Rules 2014: clases](https://www.dndbeyond.com/sources/dnd/basic-rules-2014/classes), [combate](https://www.dndbeyond.com/sources/dnd/basic-rules-2014/combat), [lanzamiento de conjuros](https://www.dndbeyond.com/sources/dnd/basic-rules-2014/spellcasting), [aventuras y descansos](https://www.dndbeyond.com/sources/dnd/basic-rules-2014/adventuring) y [conjuros SRD](https://www.dndbeyond.com/sources/dnd/basic-rules-2014/spells).
- [Princes of the Apocalypse, Online Supplement](https://media.wizards.com/2015/downloads/dnd/PrincesApocalypse_AdvSupplementv1.0_PrinterFriendly.pdf): entradas **Armor of Agathys** y **Hex**, verificadas en las páginas numeradas 40 y 49 del propio suplemento. Se trata de una fuente oficial que reproduce estos conjuros, no de una afirmación de que se originaran en ese suplemento.
- [Sage Advice Compendium de 2014](https://www.dndbeyond.com/sources/dnd/sac/sage-advice-compendium): interacción entre los PG temporales de Agathys y Bendición del Oscuro.

Los textos explicativos son resúmenes en español. No se distribuyen manuales completos ni ilustraciones oficiales descargadas.

## 3. Características implementadas

Exactamente siete pestañas:

1. **Ficha principal:** identidad, estadísticas, recursos en vivo, características, salvaciones, habilidades, armas y magia.
2. **Lore y personaje:** personalidad, ideal, vínculo, defecto, observaciones de las imágenes y notas narrativas editables.
3. **Compendio de reglas:** buscador, diez tarjetas de magia (incluida la invocación Disfrazarse) y reglas expandibles adaptadas a Val.
4. **Simulador de turnos:** entradas de distancia, movimiento, acciones, reacción, objetivos y condiciones; resultado calculado; presets; validación y aplicación confirmada.
5. **Mesa y recursos:** PG, temporales y su fuente, dados, espacios, reacción, descansos, condiciones, agotamiento, concentración, posición, muerte, inventario y notas.
6. **Bitácora y respaldos:** fecha, sesión, tipo, título, contenido y continuidad; historial, búsqueda, eliminación confirmada, TXT, JSON, importación, copia y restablecimiento.
7. **Oficialidad y Homebrew:** auditoría A–F, procedencia, dudas, fuentes y ambas imágenes originales ampliables. Es informativa y no altera cálculos.

Guardado versionado con `characterId: val-draven-5e2014-level5` y `schemaVersion: 1`. El almacenamiento es independiente de otros personajes. Se conserva una prueba pendiente de concentración incluso después de recargar.

## 4. Simulador configurado

Acciones: Luto, daga cuerpo a cuerpo o arrojada, Descarga sobrenatural, Bola de fuego, Oscuridad, Armadura de Agathys, Disfrazarse por invocación, Prestidigitación, Mano de mago, invocar Luto, Esquivar, Correr, Retirarse, Ayudar, Esconderse, Preparar una acción no mágica y no actuar.

Acción adicional: lanzar Maleficio, trasladar Maleficio, Paso brumoso, segunda daga cuerpo a cuerpo o arrojada y ninguna. Reacciones: reserva de Contrahechizo, Contrahechizo con desencadenante confirmado, oportunidad con Luto confirmada o ninguna.

Presets personales: **El filo de Luto**, **Dos sentencias**, **Entre la niebla**, **Apagar el campo** y **Juicio de fuego**.

| Caso | Fórmula / promedio condicionado |
|---|---|
| Luto | 2 × (1d8 + 2 perforante): 13 |
| Luto y Maleficio | anterior + 1d6 necrótico por impacto: 20 |
| Descarga | 2 × (1d10 + 4 fuerza): 19 |
| Descarga y Maleficio | anterior + 1d6 necrótico por impacto: 26 |
| Dos dagas | 1d4 + 2, después 1d4: 7 |
| Dos dagas y Maleficio ya activo | anterior + 1d6 por impacto: 14 |
| Bola de fuego | 8d6 fuego: 28 por criatura que falla DES CD 15 |

Se verifican economía de acciones de 2014, recursos, alcance, movimiento y terreno, componentes, visión, arma disponible, límites de dos armas, concentración, incapacidad y condiciones que requieren confirmar contexto con el DM. Hoja sedienta no se aplica a las dagas ni a oportunidades. No se aplica daño real automáticamente ni se asigna ventaja automática por Oscuridad.

## 5. Recursos e inventario

PG actuales y máximos de referencia, PG temporales con origen, cinco dados de golpe de d8, dos espacios de pacto de nivel 3 y disponibilidad de reacción. Sin contadores ficticios para invocaciones a voluntad o Bendición del Oscuro.

Inventario inicial: armadura de cuero, Luto, dos dagas, foco arcano, ropa oscura de viaje, libro de conjuros y notas, bolsa con componentes y objetos personales y amuleto. Solo la cantidad dos de las dagas y la presencia de los demás objetos están registradas; las unidades individuales corresponden a los objetos singulares enumerados. No se inventan monedas, pociones, objetos mágicos o pesos.

El inventario distingue objetos registrados, añadidos, personalizados y referencias no poseídas. La galería solo representa categorías de equipo. Armas arrojadas se descuentan del equipo disponible; su recuperación se registra manualmente.

## 6. Personalización visual

Fondo carbón, carmesí, marfil y metal envejecido; tipografía editorial con fuentes del sistema; sello del pacto; retrato arriba a la derecha; siete pestañas horizontales; tarjetas, barras y controles compactos; ilustraciones originales del usuario. Siete iconos de inventario y un sello en SVG originales. Diseño adaptable sin fuentes remotas, CDN ni dependencias.

## 7. Pruebas realizadas

- **93 pruebas automatizadas de mecánicas y esquema:** aprobadas. Incluyen valores de daño y ataques, incompatibilidades, traslado de Maleficio, espacios y reservas, componentes, visión, movimiento, dos armas, Agathys, resistencia, concentración, descansos, límites y rechazo de respaldos inválidos.
- **28 comprobaciones integrales en Chromium headless:** aprobadas. Se abrió directamente `index.html` por `file://`. Navegación, recursos iniciales explícitos, aplicación única de turno, guardado/recarga, daño y concentración pendiente, lore, inventario, bitácora, archivos JSON/TXT, importación válida, rechazo de otro personaje, cancelación, descansos, dados, Bendición, incapacidad, restablecimiento y recuperación de guardado corrupto.
- Se simuló almacenamiento del navegador no disponible: aviso visible y funcionamiento en memoria comprobados.
- Se comprobó escape de contenido editable con etiquetas HTML y manejadores de eventos: no se ejecutaron.
- Vista de escritorio **1440 × 1100**, móvil **390 × 844**, móvil estrecho **320 px** y tableta **768 px**: siete paneles sin desbordamiento horizontal del documento. Las tablas anchas y pestañas tienen desplazamiento propio.
- Inspección visual de capturas de escritorio, simulador y móvil; retrato encuadrado sin alterar los PNG originales.
- Navegación de pestañas con teclado y etiquetas de campos comprobadas.
- Cero excepciones de JavaScript durante la batería de navegador; ninguna petición HTTP externa de la aplicación. Referencias de imágenes verificadas en disco y recursos principales cargados.
- Comprobación sintáctica de los tres JavaScript y revisión del empaquetado.

No se probaron navegadores físicos de iOS/Android ni todas las versiones de Safari/Firefox. No se presenta esta prueba de Chromium como certificación universal. El portapapeles tiene una alternativa de copia manual para contextos restringidos.

## 8. Información pendiente

- PG actuales y máximos inequívocos; recursos restantes y efectos de la sesión.
- Origen de ocho habilidades con bonificadores compatibles con competencia, frente a las cuatro que explicarían por sí solas clase y trasfondo. Los bonos se conservan, sin declarar una autorización del DM inexistente.
- Significado mecánico de «Sentidos agudizados».
- Subraza o variante tiefling y Legado infernal: no se añadieron Taumaturgia, Reprensión infernal ni un uso racial gratuito de Oscuridad sin estar registrados.
- Maleficio aparece con 1 hora en la imagen; su regla oficial permite hasta 8 horas al usar espacio de nivel 3. Se muestran ambos datos y se registra la duración manualmente. Ningún temporizador impone una opción de campaña.
- Idiomas concretos, monedas, herramientas y otras cantidades no especificadas.
- Perspicacia y Trato con Animales no aparecen en las imágenes: se muestran pendientes.
- Nombre confirmado de campaña, nombre del patrono, historia ampliada y relaciones concretas.

No se implementaron excepciones de campaña no autorizadas como reglas activas. La pestaña de oficialidad documenta estos puntos y la bitácora permite registrar futuras decisiones del DM.

## 9. Uso y entrega

Extrae el ZIP completo, abre `HojaDeJuego_ValDraven/index.html` y registra los recursos actuales en Mesa. Mantén juntos HTML, CSS, JavaScript y `assets`. Guarda el JSON al terminar cada sesión y antes de trasladar la carpeta. Las instrucciones completas están en `LEEME.md`.

No hay backend, registro, autenticación, instalación, compilación o publicación. Los enlaces de consulta son opcionales y la hoja funciona sin conexión. La aplicación mantiene la configuración mecánica de nivel 5; las notas, el inventario y la bitácora permiten conservar su evolución narrativa y material.

## Atribución SRD

This work includes material taken from the System Reference Document 5.1 (“SRD 5.1”) by Wizards of the Coast LLC and available at https://dnd.wizards.com/resources/systems-reference-document. The SRD 5.1 is licensed under the Creative Commons Attribution 4.0 International License available at https://creativecommons.org/licenses/by/4.0/legalcode.

Adaptaciones: resúmenes y traducción al español, configuración de Val, interfaz y cálculos. Las imágenes del personaje fueron proporcionadas por el usuario; no se atribuyen al SRD ni se declaran de libre distribución.
