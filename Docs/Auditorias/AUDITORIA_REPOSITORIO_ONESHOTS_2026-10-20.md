# Auditoría técnica y documental — `CarlosAM03/OneShots`

**Fecha de corte:** 20 de octubre de 2026  
**Repositorio:** <https://github.com/CarlosAM03/OneShots>  
**Rama examinada:** `main`  
**Commit exacto auditado:** [`b12555d468c0c343c39d009bed6e964a60cd7f7c`](https://github.com/CarlosAM03/OneShots/commit/b12555d468c0c343c39d009bed6e964a60cd7f7c)  
**Naturaleza de la revisión:** lectura directa del repositorio remoto mediante la integración de GitHub, inspección de árbol, archivos de código, scripts, manifiestos, informes y resultados de QA versionados. **No se clonó ni ejecutó localmente este snapshot durante esta auditoría**. El resultado describe el estado **publicado en GitHub**, no posibles cambios todavía sin `push` en la PC.

## 1. Dictamen ejecutivo

El repositorio contiene ya un sistema útil y técnicamente coherente para preparar aventuras de D&D y ejecutar hojas digitales de personaje en dispositivos móviles mediante una red privada. El cierre de Deathsleep cuenta con una separación deliberada entre herramientas del Dungeon Master y publicación estática de las hojas disponibles, un lanzador nativo de Windows, un staging por lista permitida, una alternativa Docker y una colección amplia de pruebas documentadas.

**La mayor prioridad no es rediseñar las hojas: es controlar la publicación del propio repositorio y limpiar su ciclo de versionado.** En el momento de la auditoría, GitHub declara la visibilidad como **`public`**. El árbol público incluye los volúmenes del one-shot, encuentros, ilustraciones de criaturas y NPC, variantes de Elarion, novelas gráficas y extractos de fuentes consultadas. La restricción de Elarion en el servidor LAN **no** impide que una persona con acceso a GitHub consulte esos archivos. El estado público también exige revisar los derechos de redistribución de cualquier material de terceros.

El segundo problema es operacional: `.public-jugadores` —que la herramienta regenera— está versionado junto a sus fuentes, junto con numerosas evidencias generadas por QA. Eso incrementa las modificaciones accidentales, el tamaño del repositorio y la posibilidad de divergencia entre el código fuente y su distribución derivada.

**Dictamen:** producto de mesa avanzado y documentado; repositorio todavía **no cerrado en higiene de publicación, trazabilidad de entregables y reproducibilidad externa**. La ejecución desde un teléfono físico en la Wi-Fi de la sesión continúa **sin verificar**. No se asigna una puntuación numérica arbitraria a elementos que requieren decisiones del propietario.

## 2. Alcance, evidencia y limitaciones

### Evidencia inspeccionada directamente en GitHub

- Metadatos del repositorio y árbol Git recursivo del commit indicado (no truncado).
- Historial reciente: `2694c30` (`chore: initial OneShots repository`) y `b12555d` (`feat: integrate character selector and LAN launcher`).
- `.gitignore`, `PromptDeGeneracioReutilizable.md`, portal `index.html`.
- `INFORME_CIERRE_PORTAL.md`, `README_SERVIDOR_LOCAL.md` y manifiesto `public-manifest.json`.
- `Iniciar_HojasDigitales.cmd`, `Servidor_HojasDigitales.ps1`, `Preparar_Publicacion.ps1`.
- `Dockerfile`, `compose.yaml`, `.dockerignore`, `nginx-jugadores.conf`.
- Lanzador y servidor privados del DM, `Iniciar_Deathsleep.cmd` y `Deathsleep_Servidor_Local.ps1`.
- Resultados publicados: `qa-cierre/after/results.json`, `qa-cierre/functional.txt`, `qa-cierre/portal-lan.txt`, `qa-cierre/unit.txt`, `qa-cierre/public-tests/results.json`, `qa-cierre/cierre-servidor.json` y otros inventarios.

### No equivale a pruebas ejecutadas de nuevo

Esta auditoría **no** demuestra un funcionamiento actual en Android, iOS, Safari, Chrome móvil, router doméstico ni Docker: los números de QA citados son evidencia **publicada por la implementación anterior**. Tampoco constituye una segunda revisión exhaustiva de cada conjuro y fórmula contra todos los manuales: se evaluaron la trazabilidad y los hallazgos del informe documental, sin aprobar nuevas reglas del DM.

Para consultar las evidencias versionadas, la base de ruta es:

`HojasDigitalesDeJuego/Personajes/PersonajesNvl5v1/`

## 3. Identidad y administración del repositorio

| Control | Resultado comprobado | Evaluación |
|---|---|---|
| Propietario y repositorio | `CarlosAM03/OneShots` | Conforme |
| Rama por defecto | `main` | Conforme |
| Último commit remoto | `b12555d468c0c343c39d009bed6e964a60cd7f7c` | Conforme |
| Visibilidad GitHub | **Público** | **Crítico por spoilers/material DM**, sujeto a tu política de publicación |
| Repositorio archivado | No | Conforme |
| README en raíz | **No existe** en el commit auditado | Pendiente; incluido como segundo entregable |
| Archivo `LICENSE` | No existe | Pendiente de política de derechos, sin licencia explícita |
| Workflows `.github/workflows` | No aparecen | Pendiente si se desea CI automatizada |
| `.gitignore` | Existe, pero contiene texto literal de PowerShell | Corrección necesaria |
| ZIP grandes `00-Fuentes` | No presentes en `main` remoto auditado | Correcto para límite GitHub; fuentes locales no disponibles en un clon |

**Hallazgo G-01 — Criticidad alta:** las normas de acceso a GitHub y los recursos publicados deben decidirse deliberadamente. Convertir el repositorio en privado reduce la exposición, pero no sustituye una auditoría de archivos y permisos. Si un contenido ya fue público, volverlo privado no garantiza que nadie lo haya descargado. Evita enlaces públicos a secretos futuros.

## 4. Inventario del árbol remoto

El árbol Git API (`recursive=1`) devolvió `truncated: false`.

| Métrica | Valor |
|---|---:|
| Entradas de archivo (*blobs*) | **544** |
| Directorios (*trees*) | **118** |
| Tamaño lógico acumulado de archivos | **539.069.543 bytes (~514,1 MiB)** |
| Tamaño informado por metadatos GitHub | **273.920 KiB (~267,5 MiB)**; no equivale al peso lógico |
| Archivos en `El Dragon Verde/` | **118** |
| Archivos en `HojasDigitalesDeJuego/` | **425** |
| `.gitignore` de raíz | **1** |
| Archivos en `.public-jugadores/` | **80**, incluyendo el marcador oculto |
| Archivos en `qa-cierre/` | **120** |
| Grupos de contenido idéntico según blob SHA | **115** |
| Copias de ruta adicionales dentro de esos grupos | **144** |
| Tamaño lógico estimado de copias redundantes | **210.252.287 bytes (~200,5 MiB)** |

Los duplicados por SHA no son automáticamente un defecto —algunos recursos se copian legítimamente para distribuir hojas independientes—, pero **deben distinguirse las copias de runtime necesarias de las copias generadas y versionadas por error**. Git puede compartir objetos idénticos internamente; la cifra de 200,5 MiB **no es ahorro garantizado del tamaño empaquetado de Git**.

### Distribución de contenido

| Subárbol | Archivos | Tamaño lógico aprox. | Observación |
|---|---:|---:|---|
| `El Dragon Verde/IniciarOneShot/00-Volumenes/` | 3 | 1,8 MiB | Dos volúmenes PDF y guía |
| `El Dragon Verde/IniciarOneShot/imagenes/` | 71 | 185,3 MiB | Dirección artística, escenarios, encuentros y personajes |
| `El Dragon Verde/archivo/` | 29 | 77,7 MiB | Novelas gráficas y `papelera`; revisar si es archivo histórico a versionar |
| `PersonajesNvl5v1/.public-jugadores/` | 80 | 65,6 MiB | **Build generada versionada** |
| `PersonajesNvl5v1/qa-cierre/` | 120 | 35,8 MiB | Scripts útiles mezclados con evidencias temporales |
| `PersonajesNvl5v1/qa-responsive/` | 30 | 1,6 MiB | Scripts y resultados de hardening |
| `Personajes/QA/` | 30 | 3,1 MiB | Evidencias antiguas por personaje |

El árbol contiene 257 PNG, 57 JSON, 45 SVG, 42 TXT, 33 CJS, 29 JS, 17 HTML, 17 MD, 16 WebP, 10 CSS y cuatro PDF, además de los lanzadores y archivos Docker.

## 5. Arquitectura del proyecto y responsabilidades

```text
OneShots/
├── .gitignore
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
└── HojasDigitalesDeJuego/
    ├── PromptDeGeneracioReutilizable.md
    └── Personajes/
        ├── QA/
        └── PersonajesNvl5v1/
            ├── index.html
            ├── HojaDeJuego_Eco-v2/
            ├── HojaDeJuego_Elarion/
            ├── HojaDeJuego_ElysaraVelthaine/
            ├── HojaDeJuego_Onesimo/
            ├── HojaDeJuego_ValDraven/
            ├── Iniciar_HojasDigitales.cmd
            ├── Servidor_HojasDigitales.ps1
            ├── Preparar_Publicacion.ps1
            ├── public-manifest.json
            ├── .public-jugadores/       # artefacto generado actual
            ├── Dockerfile
            ├── compose.yaml
            ├── nginx-jugadores.conf
            ├── qa-responsive/
            ├── qa-cierre/
            ├── INFORME_RESPONSIVE.md
            ├── INFORME_CIERRE_PORTAL.md
            └── README_SERVIDOR_LOCAL.md
```

La separación conceptual es buena: los materiales del DM están fuera de las hojas del jugador y los cinco dashboards mantienen implementaciones propias. Eco constituye el prototipo de referencia desarrollado para Apeiron, aunque figura como personaje seleccionable en el portal de Deathsleep; **ello no convierte su trasfondo en canon de Deathsleep**. Elarion es un personaje especial con varias variantes y no debe describirse simplemente como otro PJ de nivel cinco: el informe de cierre documenta un perfil PJ Druida 6 / Mago 3, nivel nueve, además de otros perfiles.

### Cinco hojas

| Hoja | Organización comprobable | Estado publicado |
|---|---|---|
| Eco v2 | HTML + `css/styles.css` + `js/{app,character,rules,state}.js` | Disponible para jugadores; prototipo de Apeiron |
| Elarion | HTML + `app.js`, `content.js`, `engine.js`, CSS, fuentes y QA | **Bloqueado en selector y excluido del staging LAN**; fuente completa en GitHub público |
| Elysara Velthaine | HTML + `app.js`, `data.js`, `engine.js`, CSS y assets | Disponible |
| Onésimo y Fogini | HTML + `app.js`, `data.js`, `engine.js`, CSS y assets | Disponible |
| Val Draven | HTML + `app.js`, `data.js`, `engine.js`, CSS y assets | Disponible |

Cada proyecto contiene sus datos y lógica específicos: no hay motor universal compartido y **eso es una decisión válida respecto al contrato de generación**. El prompt reutilizable define siete secciones, adaptación visual y funcional, protección del estado y procedencia documental. No exige que todos los personajes compartan exactamente los mismos archivos JS.

## 6. Portal de jugadores y multimedia

El `index.html` del portal contiene pantalla de bienvenida, transición, catálogo de cinco personajes y modal nativo `<dialog>` de confirmación. Cuatro tarjetas disponibles son botones completos; Elarion se construye como tarjeta no seleccionable. La confirmación, no el clic sobre la tarjeta, efectúa la navegación mediante rutas relativas.

El informe e inventario de multimedia registran ocho ilustraciones adicionales: tres de Elysara, tres de Val y dos de Onésimo. Existen variantes WebP para mejorar carga móvil; se conservaron fuentes PNG. La ilustración conjunta original de Onésimo y Fogini sigue siendo su recurso identificador principal. Los cambios de imágenes no implican nuevos rasgos mecánicos.

**Hallazgo UX-01:** correcto a nivel estructural y según evidencia de pruebas. Verificar en el dispositivo físico la apertura de modal, regreso mediante Atrás, scroll, selección táctil, tamaño de fuentes e importación de archivos JSON. Los 574 chequeos de viewport en Chromium no son una certificación de Safari/iOS.

## 7. QA, pruebas y evidencia reproducible

Según `INFORME_CIERRE_PORTAL.md`, `qa-cierre/after/results.json` y los resultados individuales publicados:

| Suite | Evidencia versionada | Resultado publicado | Estado de esta auditoría |
|---|---|---|---|
| Responsive | `qa-cierre/after/results.json` | **574 mediciones**, sin overflow, errores JS o assets faltantes | JSON verificado; no reejecutado |
| Flujos portal y hojas | `qa-cierre/functional.txt` | **40 PASS** | Archivo inspeccionado; no reejecutado |
| Presentación | `qa-cierre/presentation/results.json` | **7** | Documentado; no reejecutado |
| Eco reglas | `qa-cierre/unit.txt` | **66** y matriz de **882 combinaciones** | Log inspeccionado; no reejecutado |
| Elarion motor/navegador | `qa-cierre/unit.txt`, `regression/Elarion` | **23 / 18** | Evidencia documentada |
| Elysara motor/navegador | `qa-cierre/unit.txt`, `regression/ElysaraVelthaine-playwright` | **28 / 32** | Evidencia documentada |
| Onésimo y Val | `qa-cierre/specific-results.json` | **12** nuevas | Evidencia documentada |
| Portal en HTTP nativo | `qa-cierre/public-tests/results.json` | **18** verificaciones localhost/IP anfitrión | JSON inspeccionado; no reejecutado |

El JSON de layout contiene mediciones para los anchos **320, 360, 375, 390, 414, 430, 600, 650, 768, 800, 1024, 1100, 1440** y **844 px horizontal**, repartidas entre portal y cinco hojas. Los registros no muestran `overflow`, `missing` ni `errors`. Esto es una evidencia positiva y verificable documentalmente.

**Hallazgo QA-01 — Medio:** no hay workflow CI en `.github/workflows`. Los scripts de navegador dependen de Playwright/Chromium instalado fuera del repositorio y no se observó un manifiesto raíz de dependencias; la reproducción en una PC recién clonada requiere preparación manual documentada o una estrategia de fixtures/dependencias de desarrollo. No es una dependencia para jugar.

**Hallazgo QA-02 — Medio:** los scripts de QA están junto a resultados generados, imágenes, descargas, texto extraído y respaldos de prueba. Se recomienda separar `qa/scripts` de `qa/artifacts` y excluir esta última ruta del control de versiones. Las pruebas existentes deben conservarse.

## 8. Operación local, LAN y Docker

### Jugadores — puerto 8000

`Iniciar_HojasDigitales.cmd` llama a `Servidor_HojasDigitales.ps1`. El servidor PowerShell/.NET prepara `.public-jugadores` por una lista permitida, escucha en `127.0.0.1` y la interfaz IPv4 privada elegida, imprime la URL y abre el navegador local. La herramienta valida rutas, rechaza otros métodos salvo GET/HEAD y no sirve el árbol completo de `OneShot`.

`public-manifest.json` registra **79 archivos permitidos**; el árbol Git presenta **80 archivos** en el staging porque agrega un archivo marcador oculto `.deathsleep-public.json`. No es una contradicción del manifiesto.

La distribución omite Elarion, herramientas del DM, respaldos, informes, QA, PDF y scripts de administración. Es una defensa razonable contra la revelación accidental de esos recursos **por el servidor LAN**, no contra quien accede al repositorio GitHub original.

### Dungeon Master — puerto 8765

`El Dragon Verde/IniciarOneShot/Iniciar_Deathsleep.cmd` ejecuta un servidor separado vinculado a `127.0.0.1:8765`, con enlaces a la escaleta y banda sonora. No debe confundirse con la raíz pública de los jugadores. La música incrustada mediante YouTube requiere acceso a Internet; las hojas y assets locales pueden funcionar en LAN sin conexión externa.

### Evidencia operativa y limitaciones

- Se registró arranque y parada, incluyendo puerto ocupado y cierre con Ctrl+C.
- La batería publicada confirma acceso por `localhost:8000` y por una IPv4 privada **desde el mismo anfitrión**, no desde otro teléfono.
- El equipo tenía perfil Wi-Fi **Público** durante las pruebas. No se cambiaron firewall, perfiles ni router.
- La IP `192.168.100.2` es **histórica de esa ejecución**, no una URL que deba fijarse en documentación futura.
- Los guardados están en `localStorage` de cada navegador y **no se sincronizan**; el DM no recibe estados del jugador automáticamente.
- Los orígenes `file://`, `localhost` e IP:puerto tienen almacenamiento independiente; deben utilizarse respaldos JSON al migrar.
- `compose.yaml` y Nginx están presentes como alternativa Docker; se documentó sintaxis válida, pero **no se ejecutó Docker** porque el daemon no estaba operativo.

**Hallazgo OPS-01 — Pendiente bloqueante para certificar mesa:** realizar un ensayo real desde al menos un teléfono conectado a la red de confianza. Comprobar DNS/IP, puerto, firewall, carga de recursos, modal, hoja y exportación de JSON. Hasta entonces, el acceso LAN externo sigue en estado **no verificable**.

## 9. Seguridad, spoilers y propiedad de material

### G-01 — Visibilidad del repositorio (alta)

GitHub reporta `visibility: public` y expone material del DM: volúmenes, ilustraciones de encuentros por acto, archivos de NPC, variantes de Elarion, novelas y documentación de QA. Los nombres de carpetas y archivos ya pueden revelar estructura narrativa; no se necesita abrir el HTML para encontrarlos.

**Acción recomendada:** decidir si `OneShots` será una biblioteca **privada de autor/DM**, o dividir el código y recursos destinados a jugadores del material secreto en repositorios separados. Para el diseño actual, la opción inicial más simple es volver el repositorio privado. Esto requiere una acción consciente del propietario; no se cambió ninguna configuración.

### G-02 — Redistribución y licencias (alta para publicación pública)

No aparece `LICENSE` en la raíz. Esto no autoriza automáticamente a terceros a reutilizar código o contenido. Existen materiales de D&D, imágenes y extractos de un manual en artefactos QA (`qa-cierre/extractos-reglas-consultadas.txt`, renders de páginas). No se ha determinado aquí el estatuto de licencia de cada fuente ni si todo el arte es original.

**Acción recomendada:** inventariar procedencia y permisos antes de hacer público el material. Separar recursos propios, documentación narrativa, referencias oficiales y archivos de terceros; no atribuirles una licencia uniforme sin revisión. El `.gitignore` excluye `/00-Fuentes/`, pero eso no elimina del repositorio los extractos o imágenes ya versionados.

### G-03 — Contrato de divulgación (medio)

La capa LAN aplica una lista de publicación explícita; es una buena decisión. Sin embargo, el archivo generado `.public-jugadores/` se encuentra versionado. Cualquier error futuro de staging podría permanecer en historial Git. Sería preferible generarlo siempre desde fuente y excluirlo del índice Git.

### G-04 — Exposición accidental de artefactos de QA (medio)

En el árbol hay descargas JSON de pruebas, logs, documentos extraídos y capturas. No se confirmó que contengan datos personales o secretos operativos, pero **deben revisarse** antes de mantenerlos públicos. Los respaldos de prueba no son equivalentes a guardados reales: no se debe afirmar una filtración de datos de jugadores sin evidencia.

## 10. Higiene Git, dependencia y mantenimiento

### G-05 — `.gitignore` contiene sintaxis de PowerShell (medio)

El archivo publicado **comienza literalmente** con `@'` y **termina** con `'@ | Set-Content -Path .gitignore -Encoding utf8`. Esos dos renglones no pertenecen al formato `.gitignore`. **Los patrones intermedios sí siguen siendo patrones válidos de Git**, por lo que sería inexacto decir que todo el `.gitignore` dejó de funcionar. Hay que eliminar únicamente las líneas de envoltura y completar exclusiones faltantes.

### G-06 — Artefactos generados versionados (medio)

`.public-jugadores/` representa una distribución regenerable, pero actualmente está en `main`. Conviene añadir al `.gitignore` una exclusión exacta para `**/.public-jugadores/` (o la ruta específica) y retirar el staging del **índice** de Git mediante `git rm -r --cached`, sin borrar los archivos locales. Mantener `public-manifest.json` solo si aporta valor para auditoría; su contenido cambia al regenerar por incluir `generatedAt`.

`qa-cierre/after`, `qa-cierre/regression`, `qa-cierre/public-tests`, `qa-cierre/modal-tests`, `qa-cierre/presentation` y las descargas de QA pueden moverse a carpetas ignoradas; conservar los scripts `.cjs`, `.py` y la documentación de pruebas. No eliminar evidencia arbitrariamente antes de definir política de auditoría.

### G-07 — Historial y snapshots (bajo/medio)

El remoto contiene dos commits principales en el historial revisado. No se identificaron archivos individuales superiores a 100 MiB en el árbol actual. El gran ZIP inicial rechazado no forma parte de la rama `main` examinada; aun así no se auditó cada rama local o referencia fuera del remoto. Recomendada una política de paquetes fuera de Git o Git LFS únicamente cuando exista un caso válido.

### G-08 — Nombres y escalabilidad (bajo)

La carpeta `PersonajesNvl5v1` contiene hojas con perfiles de nivel distinto (Elarion). El nombre refleja un hito histórico, no una garantía del nivel de todo el contenido. Para futuras aventuras, documentar explícitamente la convención de versiones, aventuras y elenco sin reorganizar la estructura actual de forma apresurada.

## 11. Matriz de conformidad

| Área | Estado | Base de la conclusión | Acción |
|---|---|---|---|
| Repo accesible y rama principal | Conforme | Metadatos y árbol GitHub | Ninguna |
| Documentación raíz | No conforme | Sin `README.md` de raíz | Incorporar segundo entregable |
| Cinco hojas independientes | Conforme | Árbol y estructura de módulos | Mantener |
| Selector y modal | Conforme con evidencia | HTML y pruebas publicadas | Ensayo táctil real |
| Elarion bloqueado en LAN | Conforme | Publicación permitida y manifiesto | Mantener política en futuras generaciones |
| Elarion secreto en GitHub público | **No conforme** si debe permanecer oculto | Fuente completa publicada | Repositorio privado o segmentación |
| Responsive mobile-first | Conforme según QA documentada | 574 medidas, cero overflow reportado | Confirmar en teléfonos reales |
| Simuladores, persistencia y respaldos | Conforme según QA documentada | 40 funcionales y suites específicas | Reproducir tras cambios futuros |
| Consistencia de fichas/reglas | Conforme con observaciones | Matriz DM por personaje | Resolver solo decisiones que el DM confirme |
| LAN desde equipo anfitrión | Conforme según QA documentada | HTTP por IP local y localhost | Ninguna inmediata |
| LAN desde teléfono externo | No verificable | Sin prueba física | Probar antes de la sesión |
| Docker en ejecución | No verificable | Compose revisado, daemon no ejecutado | Opcional |
| Derechos/licencias de contenido público | Pendiente | No hay licencia y existen fuentes/arte | Revisar permisos |
| `.gitignore` y builds | Conforme parcialmente | Envoltura PowerShell y staging rastreado | Limpiar |
| QA automatizada en CI | No implementada | No aparecen workflows | Opcional, recomendada a futuro |

## 12. Plan de remediación priorizado

### P0 — Antes de distribuir el enlace del repositorio

1. **Elegir visibilidad y política editorial.** Si los jugadores no deben ver spoilers, configurar el repo como privado. Si la aspiración es publicar herramientas, separar el material del DM de una publicación independiente de los jugadores. Recordar que GitHub público y LAN pública son superficies distintas.
2. **Auditar derechos de fuentes e imágenes publicadas.** Revisar especialmente PDFs, capturas de manuales y extractos textuales bajo `qa-cierre`.

### P1 — Antes de considerar estable el release para la sesión

3. **Ensayo móvil real** con uno o más teléfonos de la Wi-Fi doméstica: acceso por IP obtenida del lanzador, carga, confirmación, simulador, exportación/recarga.
4. **Corregir `.gitignore`**, quitando la envoltura PowerShell y agregando staging público/artefactos QA que no deban versionarse.
5. **Desrastrear copias generadas** solo después de verificar que `Preparar_Publicacion.ps1` las reconstruye correctamente. Ejemplo que no borra archivos locales, desde la raíz del repositorio:

   ```powershell
   git rm -r --cached -- HojasDigitalesDeJuego/Personajes/PersonajesNvl5v1/.public-jugadores
   git add .gitignore
   git status
   ```

   No ejecutar `git add .` indiscriminadamente hasta comprobar exclusiones. Una eliminación del índice en un commit nuevo **no borra** ese contenido de commits históricos; para retirada completa de material sensible del historial se requeriría otro procedimiento con revisión previa.
6. **Conservar el staging público solamente como resultado de build**, no como segunda fuente de verdad.

### P2 — Madurez para futuros One-Shots

7. Incorporar el README raíz y enlaces hacia guías específicas.
8. Separar scripts QA reproducibles de screenshots, respaldos y logs generados. Documentar dependencias de Playwright en entorno de desarrollo.
9. Definir convención estable para nuevas aventuras y nuevos elencos, sin forzar uniformidad de código en las hojas.
10. Valorar CI ligera para pruebas sintácticas, consistencia del manifiesto, imports/export y rutas, con ejecución de navegador en un entorno preparado.
11. Definir si tendrá licencia de código y, por separado, condiciones de uso del arte y narrativa.

## 13. Propuesta documental

El `README.md` raíz debe ser **un índice operativo y de producto**, no una copia de los 198 renglones del informe de cierre. Debe explicar propósito, estructura, personajes, lanzamiento del portal, herramientas DM, requisitos de red, persistencia, documentación existente, limitaciones y política de privacidad. No debe afirmar que Docker, teléfonos físicos o el control de acceso a GitHub están probados cuando no lo están. Tampoco debe presentarse como paquete oficial de Wizards of the Coast ni como motor universal compartido.

El segundo entregable (`README.md`) fue redactado conforme al **commit remoto `b12555d`** y debe sustituir a cualquier README preliminar redactado antes de esta inspección.

---

## 14. Fuentes auditables en GitHub

- [Repositorio y árbol](https://github.com/CarlosAM03/OneShots/tree/b12555d468c0c343c39d009bed6e964a60cd7f7c)
- [Último commit](https://github.com/CarlosAM03/OneShots/commit/b12555d468c0c343c39d009bed6e964a60cd7f7c)
- [`.gitignore`](https://github.com/CarlosAM03/OneShots/blob/b12555d468c0c343c39d009bed6e964a60cd7f7c/.gitignore)
- [Prompt de generación reutilizable](https://github.com/CarlosAM03/OneShots/blob/b12555d468c0c343c39d009bed6e964a60cd7f7c/HojasDigitalesDeJuego/PromptDeGeneracioReutilizable.md)
- [Informe de cierre del portal](https://github.com/CarlosAM03/OneShots/blob/b12555d468c0c343c39d009bed6e964a60cd7f7c/HojasDigitalesDeJuego/Personajes/PersonajesNvl5v1/INFORME_CIERRE_PORTAL.md)
- [Guía de servidor LAN](https://github.com/CarlosAM03/OneShots/blob/b12555d468c0c343c39d009bed6e964a60cd7f7c/HojasDigitalesDeJuego/Personajes/PersonajesNvl5v1/README_SERVIDOR_LOCAL.md)
- [Manifiesto de publicación](https://github.com/CarlosAM03/OneShots/blob/b12555d468c0c343c39d009bed6e964a60cd7f7c/HojasDigitalesDeJuego/Personajes/PersonajesNvl5v1/public-manifest.json)
- [QA responsive](https://github.com/CarlosAM03/OneShots/blob/b12555d468c0c343c39d009bed6e964a60cd7f7c/HojasDigitalesDeJuego/Personajes/PersonajesNvl5v1/qa-cierre/after/results.json)
- [QA funcional](https://github.com/CarlosAM03/OneShots/blob/b12555d468c0c343c39d009bed6e964a60cd7f7c/HojasDigitalesDeJuego/Personajes/PersonajesNvl5v1/qa-cierre/functional.txt)
- [Servidor local](https://github.com/CarlosAM03/OneShots/blob/b12555d468c0c343c39d009bed6e964a60cd7f7c/HojasDigitalesDeJuego/Personajes/PersonajesNvl5v1/Servidor_HojasDigitales.ps1)
- [Herramientas del DM](https://github.com/CarlosAM03/OneShots/tree/b12555d468c0c343c39d009bed6e964a60cd7f7c/El%20Dragon%20Verde/IniciarOneShot)

**Cierre:** análisis de solo lectura. No se ejecutaron modificaciones sobre el repositorio remoto, sus ramas, la configuración de visibilidad ni los archivos del usuario.
