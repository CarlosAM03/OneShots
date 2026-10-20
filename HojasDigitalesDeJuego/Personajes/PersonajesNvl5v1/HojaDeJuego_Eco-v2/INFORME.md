# Informe de entrega — Eco v2

## Personaje y fuentes

Eco, La Voz Silenciosa; Apeiron / One-Shot; D&D 5e 2014; elfa alta de linaje semidivino; Monje 3 / Bardo 2; Camino de los Cuatro Elementos; nivel total 5; neutral buena.

Fuente íntegra: indexLegacy/index.html. Se utilizaron únicamente sus estadísticas, narrativa, equipo y capacidades, además de los 17 PNG locales suministrados. No se generaron imágenes ni se usaron hojas de otros personajes.

SHA-256 del legacy conservado: 8E7C89425E42A4CCAB0A442FE943A4AF16B394A31FBE66034F018BEF2E11085E.

Reglas generales cotejadas en fuentes primarias:

- Clases 2014: https://www.dndbeyond.com/sources/dnd/basic-rules-2014/classes
- Monje 2014: https://www.dndbeyond.com/classes/11-monk
- Descansos 2014: https://www.dndbeyond.com/sources/dnd/basic-rules-2014/adventuring
- Conjuros 2014: https://www.dndbeyond.com/sources/dnd/basic-rules-2014/spellcasting
- Multiclase 2014: https://www.dndbeyond.com/sources/dnd/basic-rules-2014/customization-options

Las referencias de páginas del PHB que aparecen en la sección heredada se conservan como transcripción, sin afirmar que se cotejaron con el ejemplar impreso. La disciplina de los Cuatro Elementos se mantiene según el perfil registrado y su propia nota comparativa.

## Datos preservados

Fue 8 (−1), Des 16 (+3), Con 10 (+0), Int 14 (+2), Sab 15 (+2), Car 12 (+1). CA 15, iniciativa +4, velocidad 40 pies, competencia +3, CD Ki 13, CD Bardo 12 y ataque mágico de Bardo +4. Salvaciones: Fue +2, Des +6, Con +0, Int +2, Sab +2 y Car +1. Percepción pasiva 15 y visión en oscuridad 60 pies.

Se conserva el estado inicial explícito del prototipo: 45 PG máximos estimados, 45 actuales, Ki 3, espacios de nivel 1: 3, inspiración: 1 y cinco dados d8. La interfaz advierte que el jugador debe verificarlo. Los dados d8 de ambas clases pueden agruparse porque su tamaño y modificador de Constitución son iguales. La cantidad de flechas comienza sin confirmar.

## Funciones implementadas

Se conservan las siete secciones: Ficha, Lore, Reglas, Simulador, Mesa, Bitácora y Oficialidad. Identidad, historia, retrato, ilustraciones e iconos mantienen la paleta violeta, cobre, fuego y azul del prototipo.

Navegación con ratón y teclado, etiquetas de formularios, estados accesibles, enfoque visible, avisos de guardado y CSS responsive. El HTML no contiene manejadores de eventos JavaScript incrustados.

Estado persistente: recursos, condiciones, agotamiento, reacción, concentración, posición, inventario libre, notas de mesa, lore editable y bitácora. Ajustes directos de recursos; daño que consume primero PG temporales; curación; dados de golpe con resultado manual; descansos con recuperación selectiva y confirmación de meditación; registro de reacciones y devolución de proyectiles.

Bitácora con fecha, sesión, tipo, título y texto; búsqueda; eliminación confirmada; exportación TXT. Respaldo JSON versionado, importación validada, migración v1 confirmada, copia de estado y restablecimiento confirmado. Portapapeles con alternativa de copia manual. No se ejecutan textos importados.

Guardado aislado de otros personajes, aviso si localStorage falla, conservación de datos corruptos y bloqueo de sobrescrituras si otra pestaña modificó la sesión. Los datos permanecen en memoria cuando falla el guardado; se pide exportar para conservarlos. Si hay conflicto, exporta esa sesión y recarga antes de continuar en una sola pestaña.

## Simulador

Armas registradas: desarmado, cimitarra ígnea, arco ligero y martillo a una o dos manos. Conserva impacto +6 y daños especiales de la fuente. Tabla y motor comparten configuración.

Conjuros registrados: Chill Touch, Sacred Flame, Fire Bolt, Spare the Dying, Vicious Mockery, Cure Wounds y Tasha's Hideous Laughter. Se muestran componentes, duración y alcance. La CD y atributo de conjuros de origen pendiente no se inventan. La curación solo tiene promedio completo al confirmar el origen Bardo para ese plan.

Adicionales: Artes Marciales, Ráfaga, Defensa Paciente, Paso del Viento e Inspiración. Incluye acciones tácticas del prototipo y Armonía con los Elementos. Presets de arquera, cimitarra, ráfaga, Colmillos, máximo ígneo, retirada, curación y control.

Valida economía de acciones, ausencia de Ataque Extra, alcance normal/largo, alcance de toque, acercamiento, presupuesto de movimiento, terreno difícil, arrastrarse, levantarse, velocidad cero, agotamiento, incapacitación, componentes, audición, inteligencia para Tasha, recursos y munición.

Las medias se calculan desde las fórmulas de dados. Curación y control no se suman al daño. Se presenta daño teórico con todos los impactos/salvaciones relevantes, sin confundirlo con daño esperado o infligido.

Aplicar vuelve a validar los recursos. El Ki condicional se descuenta por impactos confirmados; las reacciones previstas no se consumen hasta registrarlas. La concentración se registra según la resolución seleccionada y se advierte si reemplaza otra.

## Decisiones y pendientes

1. **Colmillos:** el legacy se contradice: describe la regla durante el resto del turno, pero ejecuta adicionales de 5 pies y contundentes. Se conserva ese perfil restrictivo y se etiqueta como pendiente. No se amplió silenciosamente su poder. En este perfil hay un único golpe de acción que puede potenciarse.
2. **Cimitarra:** se conserva como arma de monje de Eco; la excepción no está justificada en detalle.
3. **Multiclase:** Carisma 12 registrado no alcanza el requisito ordinario de 13 para Bardo en 2014. Se conserva Monje 3 / Bardo 2 y se pide documentar la explicación o excepción.
4. **Armas:** +4 al daño, dados y arco ligero 1d8 con alcance 80/320 se preservan como configuración registrada; equivalente y autorizaciones detalladas pendientes.
5. **Magia:** falta confirmar fuente y atributo de varios trucos, así como lista completa de conjuros de Bardo. Tener un conjuro en la ficha no prueba su acceso ordinario por clase.
6. **PG y recursos:** 45 PG eran estimados; se requiere ajustar estado real, máximo definitivo y flechas.
7. **Competencias y equipo:** no constan todas las habilidades, idiomas, herramientas, monedas o cantidades. No se inventaron. La galería no agrega posesiones.
8. **Linaje y Depredador:** no conceden efectos mecánicos adicionales.
9. **Referencias impresas:** páginas del PHB heredadas pendientes de cotejo.

Estas cuestiones no bloquean el uso de los valores documentados y no requieren inventar datos para completar la aplicación.

## Alcance práctico

Plan de un objetivo con movimiento antes de las acciones. No simula un tablero, trayectorias, múltiples objetivos ni movimiento entre ataques. Supone la velocidad sin armadura/escudo registrada en Eco. Para golpes que usan Artes Marciales debe confirmarse equipo compatible.

Tiradas, resultados de salvaciones, críticos, inmunidades, resistencias, línea de visión, cobertura, provocación de oportunidad, reacciones enemigas, daño realmente infligido, muerte instantánea y salvaciones de concentración se resuelven en mesa. No se atribuyen resultados automáticos.

El descanso largo pide confirmar su duración y límite diario; el seguimiento del tiempo lo lleva la mesa. Agotamiento se reduce solo al confirmar alimento y bebida. Si el máximo efectivo de PG cambia por agotamiento, se ajusta manualmente. El descanso no elimina indiscriminadamente las condiciones.

## Validación ejecutada

- 66 pruebas de motor, estado, respaldo y migración; incluyen una matriz de 882 combinaciones.
- Pruebas de arranque de los cuatro scripts y flujos de interfaz en DOM simulado: siete pestañas, tablas, inventario/lore, bitácora escapada, recursos, confirmación/cancelación y persistencia.
- Comprobación estructural: HTML balanceado, siete pestañas, IDs únicos, controles definidos y rutas locales existentes.
- Comprobación de sintaxis de los cuatro scripts con Node.js.
- SHA-256 del legacy comprobado sin editarlo.
- Inspección de contenido del ZIP para comprobar que incluye entrada, código y recursos.

**Pendiente visual:** la herramienta de navegador bloqueó la apertura de file:// por su política de seguridad. No se eludió el bloqueo. No se afirma haber verificado visualmente el diseño móvil, desbordamientos, diálogos nativos, descargas ni compatibilidad de localStorage/portapapeles en un navegador real. El CSS responsive y las alternativas están implementados; esta revisión sigue pendiente.

## Uso y entrega

Abre index.html directamente. Para transportar la hoja, extrae el ZIP completo y conserva juntas sus carpetas. Exporta JSON para trasladar el progreso; el ZIP contiene la aplicación, no la sesión privada almacenada en tu navegador.

No se necesita indexLegacy para ejecutar la v2. Se incluye únicamente como fuente histórica.
