# Elarion · hoja digital de Deathsleep

Abre `index.html` con doble clic en un navegador moderno. No necesitas instalar paquetes, iniciar un servidor ni tener conexión. Conserva juntos HTML, JavaScript, CSS y la carpeta `assets`.

1. Elige el perfil en el encabezado: **personaje druida 6/mago 3**, **aliado narrativo** o **jefe Deathsleep restringido**. Cada perfil conserva sus propios recursos.
2. En **Mesa y recursos**, registra los PG, espacios y usos que realmente tienes. Un campo vacío significa pendiente. Usa **Registrar reservas completas** solo si ese es tu estado real.
3. En **Simulador**, elige una acción o preset, distancia final y movimiento. Confirma las condiciones pertinentes. **Aplicar consumo** pide confirmación y rechaza combinaciones inválidas. Resuelve dados y daño real en la mesa.
4. **Siguiente turno** recupera la reacción y avanza la duración dracónica. Para Escudo después de tu acción, usa **Resolver Escudo** en Mesa. La concentración y sus pruebas se administran allí.
5. Escribe acontecimientos en **Bitácora y respaldos** y exporta JSON regularmente. Para llevar la hoja a otro equipo, copia la carpeta y luego importa tu respaldo. El guardado del navegador no viaja dentro del ZIP.

La transformación dracónica jugable requiere marcar la aprobación de tu campaña y escribir su referencia en Mesa. Sus poderes con definición incompleta se muestran como consulta, sin activación automática.

La ficha del jefe utiliza los PDF revisados: no mezcla los poderes mayores de la lámina `02-DeathSleep.png`. Todas las láminas originales siguen accesibles en **Oficialidad y homebrew**.

Los datos se guardan con una clave exclusiva de Elarion. Si el navegador restringe `localStorage` en archivos locales, la hoja avisa y permite respaldos JSON manuales. Evita editar simultáneamente la misma hoja en varias ventanas. Si se detecta un cambio externo, se detiene el guardado de la ventana anterior para permitir exportarla.

Las notas se guardan al escribir; los campos numéricos y el inventario al confirmar el cambio o salir del campo. Los descansos y operaciones destructivas piden confirmación.

Consulta `INFORME.md` para la auditoría, cobertura de pruebas y límites conocidos. Los archivos de `qa` son evidencia de desarrollo; la hoja no depende de ellos.

Uso privado de mesa: las imágenes fueron proporcionadas por el usuario. No se declara una licencia de redistribución del arte ni se incluyen manuales oficiales completos.
