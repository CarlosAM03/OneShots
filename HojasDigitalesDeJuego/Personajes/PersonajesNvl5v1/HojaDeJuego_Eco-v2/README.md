# Eco · La Voz Silenciosa — v2

Abre **index.html** con un navegador moderno. No necesita instalación, servidor, cuenta ni conexión a Internet. Conserva las carpetas css, js y assets junto al HTML.

1. Revisa en **Mesa y recursos** los PG y recursos reales. El prototipo comenzaba en 45/45 PG y recursos al máximo; los 45 PG eran estimados.
2. Introduce las flechas disponibles; la cantidad inicial es desconocida.
3. Usa las siete pestañas para consultar, planificar, administrar y registrar.
4. En el simulador indica distancia inicial, movimiento recorrido y parte que acerca al objetivo. El plan supone un objetivo y movimiento previo a las acciones.
5. **Aplicar gasto** pide confirmación. Elige cuántos impactos potencias realmente; cero no consume Ki condicional. No registra daño infligido.
6. Exporta el JSON de **Bitácora y respaldos** antes de cambiar de navegador, mover la carpeta o cerrar una sesión sin almacenamiento disponible.

## Datos anteriores

La v2 usa la clave exclusiva eco-apeiron-digital-v2. No modifica la clave del prototipo.

- **Migrar datos del prototipo** busca la clave antigua en el mismo origen del navegador.
- También puedes importar su JSON. El formato v1 no identifica al personaje; escribe ECO para confirmar que es suyo.
- Los respaldos v2 identifican personaje, campaña, edición y versión. Se rechazan otros personajes y esquemas incompatibles.
- Mover un archivo file:// puede cambiar su almacenamiento según el navegador. El JSON es el medio portátil de recuperación.

## Organización para mantener la hoja

- index.html: estructura, narrativa y documentación de procedencia.
- css/styles.css: presentación y adaptación a pantallas pequeñas.
- js/character.js: datos de Eco, ataques, magia, recursos y presets.
- js/rules.js: cálculos y validaciones sin efectos sobre la interfaz.
- js/state.js: esquema, validación, migración y persistencia.
- js/app.js: navegación y flujos de interacción.
- tests/: pruebas sin paquetes externos.
- INFORME.md: auditoría, alcance y pendientes.
- indexLegacy/index.html: fuente original conservada.

La clasificación de oficialidad es documental. Cambiar un texto allí no cambia el motor.

## Pruebas

Con Node.js instalado:

    node tests/run.cjs
    node tests/ui-smoke.cjs

Con Python 3 instalado:

    python tests/check_structure.py

Las pruebas de interfaz emplean un DOM mínimo en memoria. No verifican diseño ni compatibilidad de APIs en un navegador real.
