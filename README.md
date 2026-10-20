# OneShots

**Aventuras de Dungeons & Dragons, herramientas para Dungeon Masters y hojas digitales interactivas de personaje.**

`OneShots` reúne material narrativo y multimedia para partidas de D&D junto con aplicaciones locales para dirigir sesiones y ayudar a los jugadores a consultar sus personajes, simular acciones y llevar el registro de sus recursos desde el navegador. El repositorio está organizado para incorporar nuevas aventuras y nuevos personajes sin tener que reconstruir cada proyecto existente.

**Proyecto actual:** **Deathsleep — El Dragón Verde**, con herramientas de dirección y un portal de selección de personaje pensado para teléfonos conectados a una red local.

> **Aviso sobre spoilers y distribución:** este repositorio contiene documentos y recursos destinados al Dungeon Master, incluidos encuentros, criaturas y acontecimientos de la aventura. **En el estado auditado del 20/10/2026 GitHub mostraba el repositorio como público.** El servidor LAN restringe lo que reciben los jugadores, pero esa restricción no controla quién puede consultar los archivos del repositorio en GitHub. Revisa su visibilidad antes de compartirlo con participantes.

## ¿Qué incluye?

### Aventuras y recursos para el DM

En [`El Dragon Verde/IniciarOneShot/`](El%20Dragon%20Verde/IniciarOneShot/) se encuentran los materiales operativos de **Deathsleep**:

- **Volúmenes I y II:** desarrollo de la aventura y material revisado de reglas y encuentros.
- **Escaleta integral del DM:** recorrido narrativo, escenas, encuentros, seguimiento y material visual.
- **Panel de banda sonora:** reproducción y gestión de música durante la partida.
- **Pantalla de jugadores:** visor de imágenes para una pantalla separada sin presentar directamente los controles del DM.
- **Biblioteca multimedia:** escenarios por acto, encuentros de combate, personajes, criaturas y dirección artística.

La carpeta [`El Dragon Verde/archivo/`](El%20Dragon%20Verde/archivo/) conserva material histórico y novelas gráficas relacionadas con el proyecto. No constituye un directorio de despliegue para los jugadores.

### Hojas digitales de juego

El directorio [`HojasDigitalesDeJuego/`](HojasDigitalesDeJuego/) contiene un [prompt maestro reutilizable](HojasDigitalesDeJuego/PromptDeGeneracioReutilizable.md) y aplicaciones personalizadas que conservan una experiencia de mesa común sin perder la identidad de cada personaje.

El conjunto actual se encuentra en:

[`HojasDigitalesDeJuego/Personajes/PersonajesNvl5v1/`](HojasDigitalesDeJuego/Personajes/PersonajesNvl5v1/)

| Personaje | Particularidad | Acceso desde el selector |
|---|---|---|
| **Eco** | Prototipo original de Apeiron; Monje/Bardo y mecánicas de su mesa | Disponible |
| **Onésimo** | Explorador con Fogini, compañero con reglas específicas | Disponible |
| **Elysara Velthaine** | Brujo, con conjuros y capacidades propias | Disponible |
| **Val Draven** | Bruja del Infernal, arma de pacto e invocaciones | Disponible |
| **Elarion** | Personaje especial, con variantes y material reservado | **Bloqueado**; su hoja no se publica por LAN |

La carpeta se llama `PersonajesNvl5v1` por su etapa de organización; **no significa que todos los perfiles internos sean de nivel cinco**.

Cada hoja conserva su propia implementación y recursos visuales. En conjunto, las herramientas contemplan siete áreas de uso: ficha principal, lore, compendio, simulador de turnos, mesa y recursos, bitácora y respaldos, y clasificación de procedencia de reglas/Homebrew. Los controles y mecánicas se ajustan a la ficha y a las decisiones documentadas de cada campaña. **La clasificación de procedencia no altera automáticamente las reglas de mesa.**

## Inicio rápido: portal de jugadores en red local

### Requisitos

- Una computadora con **Windows 10/11** y Windows PowerShell.
- Un navegador actualizado con JavaScript.
- Teléfonos y computadora conectados a la **misma red local de confianza**, sin aislamiento de clientes.
- El proyecto completo disponible en la computadora anfitriona.

**No necesitas Node.js, Python, una base de datos ni un servicio externo para jugar.** Esas herramientas pueden utilizarse por separado para pruebas o desarrollo.

### Iniciar

1. Abre `HojasDigitalesDeJuego/Personajes/PersonajesNvl5v1/`.
2. Haz doble clic en **`Iniciar_HojasDigitales.cmd`**.
3. El lanzador prepara una distribución limitada a jugadores, inicia el servidor y abre el portal en el equipo anfitrión.
4. Comparte con los jugadores la URL con IP privada que aparezca en la consola, por ejemplo `http://<IP-PRIVADA>:8000/`.
5. En el teléfono: **Iniciar partida → Seleccionar personaje → Confirmar → Hoja digital**.
6. Mantén abierta la consola durante la sesión. Presiona **Ctrl+C** para detener el servidor.

La dirección IP es dinámica: utiliza **la URL que muestre el lanzador**, no una IP copiada de capturas o documentos históricos. El puerto predeterminado es **8000**. Si hay problemas de conexión, revisa primero que el perfil de Windows de esa Wi-Fi de confianza esté configurado como **Privado** y que el firewall permita el programa y puerto solo en redes privadas. No desactives el firewall ni abras puertos del router.

**VALIDADO POR EL PROPIETARIO — PRUEBA FÍSICA DE ACCESO LAN:** el propietario confirmó que un teléfono físico conectado a la misma Wi-Fi doméstica accedió al portal y utilizó correctamente las hojas digitales. Esta confirmación fue aportada en la solicitud de auditoría local del 20/10/2026; no es una prueba ejecutada por Codex ni atribuye modelo, navegador o fecha exacta al ensayo. Complementa las pruebas anteriores desde el anfitrión con `localhost` y su IP privada. Las guías de aquella entrega conservan su alcance histórico, anterior a esta confirmación.

Consulta las instrucciones completas de red, firewall, manejo de puertos, Docker y respaldos en el **[README del servidor local](HojasDigitalesDeJuego/Personajes/PersonajesNvl5v1/README_SERVIDOR_LOCAL.md)**.

También puedes iniciarlo desde PowerShell, situado en la raíz del repositorio:

```powershell
& ".\HojasDigitalesDeJuego\Personajes\PersonajesNvl5v1\Iniciar_HojasDigitales.cmd"
```

## Inicio del entorno del Dungeon Master

Las herramientas del DM tienen **un servidor distinto**, restringido al propio equipo:

1. Abre `El Dragon Verde/IniciarOneShot/`.
2. Ejecuta **`Iniciar_Deathsleep.cmd`**.
3. Se iniciará el servidor de escaleta y banda sonora en **`127.0.0.1:8765`**.
4. Controla las escenas desde el equipo del DM y utiliza la pantalla de jugadores para proyectar ilustraciones cuando corresponda.

Este servidor **no es el portal de hojas digitales** y no está pensado para conexiones de los teléfonos. La música integrada mediante YouTube sí puede necesitar conexión a Internet.

Desde PowerShell en la raíz:

```powershell
& ".\El Dragon Verde\IniciarOneShot\Iniciar_Deathsleep.cmd"
```

## Arquitectura y organización

```text
OneShots/
├── .gitignore
├── README.md
├── 00-Fuentes/                       # Fuentes locales, ignoradas por Git
├── codex/                            # Evidencias de auditoría local, ignoradas
├── AUDITORIA_REPOSITORIO_ONESHOTS_2026-10-20.md
├── El Dragon Verde/
│   ├── IniciarOneShot/
│   │   ├── 00-Volumenes/
│   │   ├── imagenes/
│   │   ├── Iniciar_Deathsleep.cmd
│   │   ├── Deathsleep_Servidor_Local.ps1
│   │   ├── Deathsleep_Escaleta_Integral_DM.html
│   │   ├── Deathsleep_Banda_Sonora_Panel_DM.html
│   │   └── Deathsleep_Pantalla_Jugadoras.html
│   └── archivo/
│
└── HojasDigitalesDeJuego/
    ├── PromptDeGeneracioReutilizable.md
    └── Personajes/
        ├── QA/
        └── PersonajesNvl5v1/
            ├── index.html                  # Portal de selección
            ├── HojaDeJuego_Eco-v2/
            ├── HojaDeJuego_Elarion/
            ├── HojaDeJuego_ElysaraVelthaine/
            ├── HojaDeJuego_Onesimo/
            ├── HojaDeJuego_ValDraven/
            ├── Iniciar_HojasDigitales.cmd
            ├── Preparar_Publicacion.ps1
            ├── Servidor_HojasDigitales.ps1
            ├── public-manifest.json
            ├── .public-jugadores/          # Distribución generada
            ├── qa-responsive/
            ├── qa-cierre/
            ├── INFORME_CIERRE_PORTAL.md
            └── README_SERVIDOR_LOCAL.md
```

La estructura interna de cada hoja puede variar. Actualmente se utilizan **HTML, CSS y JavaScript**, con recursos gráficos locales y `localStorage`; no existe un backend común ni sincronización centralizada. El portal y las hojas se sirven estáticamente.

La distribución de jugadores se genera mediante `Preparar_Publicacion.ps1` a partir de una **lista permitida**: incluye el portal y las cuatro hojas disponibles, pero excluye la hoja de Elarion y los materiales internos del DM. La carpeta `.public-jugadores/` es un **resultado derivado**; no debe editarse como fuente de verdad. `.gitignore` excluye esta salida y su manifiesto del nuevo seguimiento. Los archivos que ya estaban rastreados siguen en Git hasta una revisión explícita del índice; no se ha ejecutado esa limpieza.

### Alternativa Docker

Se incluyen `Dockerfile`, `compose.yaml` y configuración Nginx como alternativa opcional. No es necesaria para el flujo Windows. Debe prepararse la distribución estática antes de construir:

```powershell
cd HojasDigitalesDeJuego/Personajes/PersonajesNvl5v1
.\Preparar_Publicacion.ps1
docker compose up --build
```

Por defecto, Compose utiliza `127.0.0.1:8000`; para permitir LAN es necesario configurar deliberadamente `DEATHSLEEP_BIND_IP` con la IP privada real. **La configuración fue revisada, pero no existe evidencia de ejecución de Docker con su daemon activo en la entrega auditada.** Consulta la guía del servidor antes de utilizarlo.

## Guardado y progreso de los personajes

Las hojas utilizan almacenamiento local del navegador:

- Cada jugador conserva su **propio estado**; no hay actualización en tiempo real entre teléfonos ni en el ordenador del DM.
- Cambiar de navegador, perfil, dominio, IP, puerto o de `file://` a HTTP cambia el origen de almacenamiento; el progreso **no migra automáticamente**.
- Utiliza las funciones de **Bitácora y respaldos → Exportar JSON / Importar JSON** para transferir el estado.
- Se recomienda exportar un respaldo después de cada sesión y antes de cambiar de dispositivo.
- No guardes respaldos reales de jugadores dentro de una carpeta pública del servidor ni los subas a Git sin revisar su contenido.

## Cómo crear nuevas hojas y aventuras

Para un nuevo personaje, parte de [`PromptDeGeneracioReutilizable.md`](HojasDigitalesDeJuego/PromptDeGeneracioReutilizable.md) junto con **su propia hoja de personaje** y, opcionalmente, referencias visuales, fuentes de campaña o autorizaciones del DM. La especificación busca conservar el alcance de la experiencia digital mientras personaliza la interfaz, las reglas y el simulador.

Para un nuevo One-Shot, crea una carpeta independiente dentro de la colección y conserva por separado la documentación narrativa, los recursos multimedia del DM y cualquier contenido destinado a jugadores. Nuevas hojas pueden alojarse en `HojasDigitalesDeJuego/Personajes/` sin fusionar obligatoriamente los proyectos existentes. La integración en el portal actual requiere actualizar explícitamente su catálogo y política de publicación; añadir una carpeta por sí solo **no** la publica automáticamente.

## Pruebas y documentación

El cierre del portal tiene evidencia versionada de **574 mediciones de layout** sin errores o desbordamiento reportados, **40 pruebas funcionales**, regresiones mecánicas por personaje y verificaciones HTTP del staging. Los registros y capturas se encuentran en `qa-cierre/` y `qa-responsive/`.

Estos números corresponden a las pruebas documentadas de la implementación; no son un certificado de compatibilidad de cualquier navegador o teléfono futuro.

Documentos de referencia:

- [Informe de cierre, integridad y pruebas](HojasDigitalesDeJuego/Personajes/PersonajesNvl5v1/INFORME_CIERRE_PORTAL.md)
- [Guía del servidor de jugadores y Docker](HojasDigitalesDeJuego/Personajes/PersonajesNvl5v1/README_SERVIDOR_LOCAL.md)
- [Prompt maestro para nuevas hojas](HojasDigitalesDeJuego/PromptDeGeneracioReutilizable.md)
- Informes y documentos `README.md`/`LEEME.md` dentro de cada personaje
- Guías operativas en `El Dragon Verde/IniciarOneShot/`

## Publicación, derechos y alcance

Este repositorio combina software original, material narrativo, ilustraciones y referencias a Dungeons & Dragons. **No es un producto oficial ni está afiliado con Wizards of the Coast.** Las reglas de campaña, el contenido Homebrew y los permisos del DM se identifican dentro de las respectivas hojas y documentos; no deben interpretarse como reglas universales de D&D.

En el estado auditado **no existe un archivo `LICENSE` en la raíz**. No se concede por implicación una licencia libre uniforme para el código, las ilustraciones, los documentos narrativos o recursos de terceros. Antes de redistribuir contenido o aceptar contribuciones públicas, es necesario establecer una política de licencias y revisar las fuentes incorporadas.

El repositorio puede crecer con aventuras futuras, pero debe conservar una regla esencial: **los recursos privados del DM no deben confundirse con los archivos publicados a los jugadores**. Proteger la distribución LAN no equivale a restringir el acceso al propio repositorio de GitHub.

---

**Estado actual:** documentación local revisada el 20/10/2026; base técnica de `main` en [`b12555d`](https://github.com/CarlosAM03/OneShots/commit/b12555d468c0c343c39d009bed6e964a60cd7f7c), coincidente con la punta remota consultada. Las pruebas automáticas citadas son evidencia de la implementación anterior; la validación física LAN fue informada por el propietario. La auditoría local y sus inventarios se conservan en `codex/`, fuera del seguimiento de Git. Esta actualización documental no crea un commit ni modifica las aplicaciones.
