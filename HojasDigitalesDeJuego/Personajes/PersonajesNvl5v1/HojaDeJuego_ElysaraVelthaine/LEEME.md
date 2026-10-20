# El libro del Umbral · Elysara Velthaine

Hoja digital individual para Elysara, eladrin Brujo 5 del Gran Antiguo, Pacto del Tomo, D&D 5e 2014. Aplicación local en español, sin instalación, cuentas ni conexión.

## Abrir y empezar

1. Extrae el ZIP completo. Conserva juntos `index.html`, los tres archivos JavaScript, `style.css` y la carpeta `assets`.
2. Abre `index.html` con un navegador moderno. Se ha comprobado su ejecución directa mediante `file://` en Chromium.
3. Ve a **Mesa y recursos**. Introduce los recursos que realmente tengas. Los saldos iniciales están vacíos porque las láminas no certifican el estado actual. Si vas a comenzar con todo recuperado, pulsa **Confirmar recursos completos** y confirma.
4. Para planificar, abre **Simulador de turnos**, elige un preset o una combinación, introduce distancia y movimiento y confirma los requisitos que se cumplen en mesa. Aplica el turno únicamente después de revisar el resultado. El botón pide confirmación y gasta solo recursos propios.
5. Al volver a comenzar tu turno, pulsa **Iniciar siguiente turno** en Mesa. Esto renueva acción, acción adicional y reacción, sin recuperar espacios ni Paso feérico.
6. Registra daños, curaciones, concentración y descansos en Mesa. Introduce los resultados reales de los dados. El daño se introduce después de los ajustes del DM.
7. Guarda entradas en **Bitácora y respaldos** y exporta un JSON al final de cada sesión. El JSON incluye recursos, equipo, notas, decisiones, bitácora y borrador.

## Las siete pestañas

- **Ficha principal:** características, ataques, recursos y catálogo de trucos/conjuros.
- **Lore y personaje:** historia y rasgos de las láminas, apariencia y notas narrativas editables.
- **Compendio de reglas:** buscador y explicaciones expandibles de acciones, rasgos, invocaciones y magia.
- **Simulador de turnos:** economía de acciones, alcance, movimiento, recursos, concentración y presets de Elysara.
- **Mesa y recursos:** PG, temporales, dados, espacios, Paso feérico, descansos, estados, equipo y seguimiento.
- **Bitácora y respaldos:** historial, búsqueda, exportación TXT/JSON, importación, copia de estado y reinicio.
- **Oficialidad y Homebrew:** procedencia, decisiones, diferencias y ambas láminas originales.

## Decisiones confirmadas por el usuario

- **Paso feérico:** 1 uso por descanso corto o largo, acción adicional, hasta 30 pies a un lugar visible y desocupado. Sin efectos estacionales añadidos.
- **Susurros disonantes:** 5d6 psíquico con espacio de nivel 3, instantáneo y sin concentración; SAB CD 15, mitad al salvar. La huida usa la reacción disponible del objetivo.

## Pendientes que no impiden jugar

- La fuente racial exacta del eladrin y sus efectos estacionales siguen pendientes; no se otorgan capacidades no confirmadas.
- La tabla de habilidades está recortada. No se atribuyen competencias de habilidades, herramientas, idiomas ni dotes ilegibles.
- **Maleficio** conserva la hora registrada. Puedes confirmar expresamente la ampliación a 8 horas para nuevos lanzamientos en Mesa. No modifica efectos activos retroactivamente.
- **Hambre de Hadar** conserva colocación, concentración y duración. Las láminas discrepan en el tipo de daño: no se automatiza su daño por criatura. Consulta la resolución completa de 2014 con el DM.
- Cantidades de artículos, monedas, contenido de mochila, saldos iniciales y nombre de campaña no están confirmados. Los campos correspondientes empiezan sin registrar.

## Guardado y portabilidad

Los datos se guardan en `localStorage` con una clave exclusiva de Elysara y versión de esquema 1. No se usan claves de otros personajes. Mover la carpeta, cambiar de navegador o borrar datos del navegador puede cambiar el acceso al guardado: conserva tu JSON.

Al importar se validan identidad, versión, tipos, límites y estructura, y se pide confirmación. Antes de reemplazar o reiniciar se inicia una descarga del estado actual. Comprueba que el navegador haya guardado el archivo; algunos navegadores requieren permitir descargas. Un guardado corrupto se conserva intacto y puede descargarse como texto. Si el guardado local está restringido, aparece un aviso: puedes seguir en memoria y exportar JSON, pero debes respaldarlo antes de cerrar.

El ZIP contiene las imágenes; el JSON contiene el progreso. Para trasladar todo, conserva ambos. El contenido editable se trata como texto y no se ejecuta como HTML o JavaScript.

## Límites del asistente de mesa

El simulador calcula daño medio condicionado a impactos normales o a la salvación fallida indicada. No calcula probabilidades de impacto ni descuenta PG enemigos. Los dados, críticos, cobertura, visión, resistencias, interpretaciones y efectos sobre otras criaturas los resuelve la mesa.

Solo se sigue la Invisibilidad de Elysara; anota un segundo objetivo externo en Información de combate. Los movimientos se modelan en línea recta respecto de un objetivo: el tramo a pie ocurre primero, y Paso feérico puede ir antes o después de la acción. La reacción solo se gasta al confirmar que ocurrió. Controlar una Mano de mago previa requiere confirmar manualmente que existe y sigue vigente.

El descanso largo debe estar validado por el DM. Se avanza el reloj de efectos 8 horas de forma conservadora; la variante precisa de Trance sigue pendiente. El descanso largo recupera como máximo dos dados gastados, no los cinco, y no elimina condiciones persistentes indiscriminadamente.

## Archivos y comprobaciones

`engine.js` contiene el modelo y la validación; `data.js`, la transcripción y auditoría; `app.js`, los controles y persistencia; `style.css`, el diseño responsive. `assets/imagen` contiene las dos láminas aportadas. `assets/icono` contiene ocho SVG originales creados para la interfaz.

`INFORME.md` describe fuentes, implementación y pruebas ejecutadas. `qa` incluye scripts de comprobación, resultados y capturas. Los scripts de pruebas requieren Node.js; el de navegador usa una ruta local de Chromium que puede adaptarse. No necesitas Node.js para utilizar la hoja.
