# Hoja de juego de Val Draven

Una aplicación local en español para Val Draven, tiefling bruja del Infernal de nivel 5, con Pacto de la Hoja. Configuración de D&D 5e 2014 transcrita de las dos imágenes proporcionadas.

## Abrir y empezar

1. Extrae **toda** la carpeta `HojaDeJuego_ValDraven` del ZIP. No abras el HTML directamente dentro del archivo comprimido.
2. Abre `index.html` con doble clic en un navegador moderno. No necesitas instalar nada, iniciar un servidor ni tener conexión.
3. En **Mesa y recursos**, registra los PG actuales, temporales, espacios y dados restantes. Si realmente empiezas al máximo, pulsa **Confirmar inicio con recursos completos** y confirma. Los recursos actuales están inicialmente pendientes.
4. Consulta las siete pestañas. Puedes desplazarte horizontalmente por las pestañas en móvil, o usar las flechas del teclado cuando una pestaña tenga el foco.
5. Al terminar la sesión, ve a **Bitácora y respaldos → Exportar respaldo JSON**. Conserva el JSON junto con la carpeta completa.

## Durante el combate

- La ficha muestra los datos registrados, los ataques y los recursos actuales.
- El **Compendio** explica acciones, límites, componentes, concentración y las capacidades de Val. Escribe en el buscador y abre las tarjetas.
- En el **Simulador**, carga un preset o elige tus acciones. Escribe el objetivo de Maleficio y verifica distancia, componentes, visibilidad y condiciones. La acción adicional de Maleficio o Paso brumoso se resuelve antes de la acción; el ataque con segunda daga se resuelve después.
- El resultado separa daño teórico de consumo de recursos. El promedio supone impactos normales, o salvación fallida para Bola de fuego. No estima probabilidades, críticos o daño real y excluye ataques de reacción y represalias.
- **Aplicar turno y consumo** pide confirmación. Una combinación inválida no se aplica. Solo se aplica una vez hasta que confirmes **Comenzar siguiente turno** al inicio de tu próximo turno.
- La reserva de Contrahechizo no gasta nada. Cuando ocurra el desencadenante, usa el simulador si todavía no aplicaste ese turno o registra en **Estado actual** el nuevo número de espacios y la reacción gastada. Solo consume cuando hayas decidido usarlo; revisa la restricción de conjuros de acción adicional si es en tu propio turno.
- Para dos dagas, debes sostener una en cada mano y tomar Atacar con una de ellas. La segunda, de acción adicional, no suma Destreza al daño. Las dagas arrojadas salen del inventario disponible; vuelve a añadir su cantidad cuando las recuperes en la ficción.
- La sección **Mesa** aplica daño y curación con las tiradas reales. La resistencia al fuego divide y redondea hacia abajo. Petrificada también aplica su resistencia al daño. Si otra regla modifica el daño, resuélvela con el DM antes de registrar el resultado; evita aplicar una resistencia dos veces.
- Una prueba de concentración pendiente queda guardada. Resuélvela antes de registrar otra fuente de daño o aplicar otro turno. El d20 se tira en mesa; con agotamiento de nivel 3 o superior, recuerda la desventaja en salvaciones.
- **Bendición del Oscuro** requiere confirmar que Val redujo un hostil a 0 PG. Sustituye los PG temporales por 9 si eliges aceptarlos. No se suman; sustituir los de Agathys termina su represalia.
- Las condiciones manuales persisten hasta que las retires. A 0 PG, el simulador considera a Val inconsciente automáticamente; esa consecuencia desaparece al recuperar PG, pero una condición Inconsciente marcada manualmente se mantiene hasta resolver su causa.

## Descansos

- **Corto:** confirma una hora válida y recupera los dos espacios. La curación no es automática: introduce cada d8 real en el control de dados de golpe; consume uno y suma Constitución +2.
- **Largo:** confirma los requisitos en tiempo de ficción, incluido empezar con al menos 1 PG y no haber recibido otro beneficio en 24 horas. Recupera PG, espacios y hasta **dos** dados de golpe gastados, no todos. Reduce un nivel de agotamiento únicamente si marcaste comida y bebida suficientes. Las demás condiciones se conservan.
- La fecha del último descanso es un registro del uso de la herramienta, no un temporizador del mundo de juego. Las duraciones se revisan con el DM.

## Guardado y respaldos

- Los cambios se guardan en `localStorage` del navegador con una clave exclusiva para esta configuración de Val.
- Abrir otra copia, cambiar la ruta de la carpeta o utilizar otro navegador puede mostrar un estado distinto. Para trasladarlo, exporta e importa el JSON.
- **Importar** valida el personaje, la versión, los límites, el inventario, las fechas y los tipos de datos antes de pedir confirmación. Se descarga una copia del estado anterior antes de reemplazarlo. Si el navegador bloquea descargas, usa primero **Exportar respaldo JSON** y verifica que el archivo exista.
- Los textos se insertan como texto escapado. Un respaldo no puede añadir scripts ni rutas arbitrarias de iconos.
- Si el navegador bloquea el almacenamiento, aparece un aviso y puedes seguir trabajando en memoria y exportar manualmente.
- Un guardado corrupto se conserva intacto, se detiene la escritura sobre él y se ofrece descargar el original en Bitácora. Otro aviso protege frente a modificaciones desde una segunda ventana.
- **Exportar bitácora TXT** produce un archivo legible. **Copiar estado** ofrece un cuadro para copia manual si el portapapeles no está disponible.
- El nombre de la campaña es opcional; cuando lo registres, se incluye en los nombres exportados.

## Contenido y límites

Las dos imágenes originales están incluidas y se pueden ampliar en **Oficialidad y Homebrew**. El retrato utiliza la ilustración aportada; los siete iconos de equipo y el sello se crearon en SVG para esta aplicación. Ningún icono añade un objeto al inventario.

Las estadísticas y el nivel corresponden a la instantánea de nivel 5. Inventario, PG máximos de referencia, notas, lore y bitácora son editables; no hay un asistente automático de subida de nivel. Las decisiones nuevas del DM pueden registrarse sin cambiar silenciosamente las reglas.

Lee `INFORME.md` para los materiales, auditoría, pruebas y pendientes. La aplicación contiene enlaces de consulta opcionales, pero su funcionamiento y contenido no necesitan red.

## Archivos

```text
HojaDeJuego_ValDraven/
├── index.html
├── style.css
├── data.js
├── engine.js
├── app.js
├── LEEME.md
├── INFORME.md
└── assets/
    ├── imagen/          # dos PNG proporcionados
    └── icono/
        ├── sello.svg
        └── inventario/  # siete SVG originales
```

El contenido de reglas que procede del SRD 5.1 incluye atribución CC BY 4.0 en la aplicación y en el informe. Las ilustraciones aportadas por el usuario conservan su procedencia propia.
