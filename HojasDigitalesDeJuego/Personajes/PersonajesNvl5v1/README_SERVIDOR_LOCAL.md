# Deathsleep · Servidor local de jugadores

## Inicio rápido

1. Conecta la computadora del DM y los teléfonos a la misma red Wi-Fi de confianza. Evita la red de invitados y su aislamiento entre dispositivos.
2. En Windows, comprueba **Configuración → Red e Internet → Wi-Fi → propiedades de tu red → Tipo de perfil de red → Privada**. Cambia el perfil solo si esa red es de confianza. En la validación de esta entrega figuraba como **Pública**; el lanzador muestra un aviso y no lo cambia.
3. Haz doble clic en **`Iniciar_HojasDigitales.cmd`**.
4. Espera el mensaje «Servidor iniciado». Se abre el portal en el navegador del anfitrión. Mantén la ventana del servidor abierta durante la sesión.
5. Comparte con los jugadores la URL **que imprime el lanzador**. En la prueba del 20/10/2026 fue `http://192.168.100.2:8000/`. Esa dirección puede cambiar con el DHCP del router.
6. En el teléfono: abrir URL → Iniciar partida → seleccionar tarjeta → confirmar → jugar. Elarion permanece bloqueado y su aplicación privada no se publica.

En la computadora del DM puede utilizarse `http://localhost:8000/`. En los teléfonos, **localhost apunta al teléfono**, no a la computadora: deben usar la IP privada del anfitrión.

## Requisitos y portabilidad

- Windows 10/11 con Windows PowerShell 5.1 o PowerShell 7; navegador moderno con JavaScript y `<dialog>`.
- Permiso para escuchar en el puerto 8000 y acceso a los archivos del proyecto.
- No requiere Python, Node, instalación de paquetes, nube, DNS público, backend ni base de datos. Python del sistema no estaba utilizable mediante `py -3` en este equipo; por eso se eligió una implementación nativa de .NET/PowerShell, coherente con el servidor existente del DM.
- Para trasladarlo, copia **toda la carpeta `PersonajesNvl5v1`** a otra computadora Windows. El inicio usa `$PSScriptRoot`, sin rutas absolutas del equipo del autor. No es necesario copiar `qa-cierre` ni `qa-responsive` para jugar, pero conserva los informes si deseas mantener la evidencia.
- Los PNG fuente y los proyectos originales permanecen en sus carpetas. No cambies sus nombres.

## Inicio manual y elección de interfaz

Desde esta carpeta:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\Servidor_HojasDigitales.ps1
```

Parámetros opcionales:

```powershell
# Elegir entre interfaces cuando hay varias con puerta de enlace:
.\Servidor_HojasDigitales.ps1 -InterfaceAlias "Wi-Fi"

# Mantener el servidor sin abrir otra ventana del navegador:
.\Servidor_HojasDigitales.ps1 -NoBrowser

# Solo para pruebas en la computadora, sin acceso de los jugadores:
.\Servidor_HojasDigitales.ps1 -LocalOnly -NoBrowser
```

El script enumera IPv4 RFC1918 de interfaces activas y elige la única con puerta de enlace. Si hay varias o ninguna, muestra sus nombres y direcciones; solicita `-InterfaceAlias` o `-LocalOnly`, sin adivinar una IP.

El puerto predeterminado es **8000**. Si está ocupado, aborta con un mensaje y no mata otros procesos ni cambia de puerto. Se puede elegir `-Port 8001` de manera consciente, recordando que cambia el origen de los guardados. El servidor previo del DM utiliza **127.0.0.1:8765**: se mantiene separado y no fue modificado.

## Red y firewall

El servidor nativo escucha en **127.0.0.1 y en la IPv4 privada seleccionada**, no en una dirección IPv6 global ni en todas las interfaces. Rechaza clientes con origen IPv4 público. No abre puertos del router ni configura port forwarding.

No desactives Windows Defender Firewall. No marques redes públicas ni crees una regla de acceso Público. Si Windows pregunta al iniciar, permite el acceso solo en **Redes privadas**.

Si el teléfono no puede entrar:

1. Comprueba que el servidor siga abierto y que la URL coincida con la impresa.
2. Comprueba misma Wi-Fi, perfil Privado y ausencia de aislamiento de clientes/red de invitados. Una VPN puede cambiar las rutas.
3. Prueba primero `http://localhost:8000/` en la computadora y después la URL con IP privada. Que ambas funcionen en la computadora no demuestra acceso desde otro dispositivo.
4. Revisa las reglas de entrada para el programa que ejecuta el servidor. No se crean reglas automáticamente.

Una excepción mínima, **solo si el administrador decide crearla**, limita puerto, perfil y origen. Este comando es documentación; no lo ejecuta el lanzador:

```powershell
# Ejecutar como administrador únicamente tras revisar y autorizar la excepción.
New-NetFirewallRule -DisplayName 'Deathsleep jugadores TCP 8000 privado' `
  -Direction Inbound -Action Allow -Protocol TCP -LocalPort 8000 `
  -Profile Private -RemoteAddress LocalSubnet `
  -Program "$env:SystemRoot\System32\WindowsPowerShell\v1.0\powershell.exe"
```

Si inicias con PowerShell 7, el filtro de programa debe apuntar a su ejecutable real. Para retirar una regla creada expresamente con ese nombre:

```powershell
Remove-NetFirewallRule -DisplayName 'Deathsleep jugadores TCP 8000 privado'
```

La aplicación es HTTP de confianza para una sesión LAN; no contiene autenticación. No la publiques mediante un túnel, router o servicio externo. La privacidad de Elarion procede de **excluir sus archivos de la distribución**, no de ocultar un enlace.

## Contenido servido y regeneración

En cada inicio, `Preparar_Publicacion.ps1` regenera **`.public-jugadores`** desde una lista permitida:

- Portal y sus dos imágenes locales necesarias.
- HTML, CSS y scripts de ejecución de Eco, Elysara, Onésimo y Val.
- Assets gráficos y tipográficos de esas cuatro hojas. Los ocho PNG nuevos sin uso de runtime se omiten en favor de sus WebP; los PNG fuente se conservan en origen.

No publica la carpeta `OneShot`, las herramientas del DM, volúmenes, encuentros, Elarion, pruebas, informes, ZIP, respaldos, archivos ocultos ni scripts de administración. No hay listado de directorios. Las rutas inválidas, traversal, enlaces de sistema y métodos distintos de GET/HEAD se rechazan. La generación falla si encuentra enlaces en los assets o si intenta reemplazar una carpeta pública sin su marcador propio.

Para regenerar sin iniciar un servidor:

```powershell
.\Preparar_Publicacion.ps1
```

`public-manifest.json`, fuera de la raíz servida, registra los archivos publicados. No agregues archivos manualmente a `.public-jugadores`: se regenera. Al cambiar multimedia o código, **detén el servidor y vuelve a iniciarlo**. El lanzador no actualiza los estados guardados de los jugadores.

Para desbloquear a Elarion en una intervención futura será necesario revisar tanto el catálogo como la lista de publicación. Editar solo el botón no publica su hoja.

## Guardados y respaldos

- Cada hoja conserva sus claves y esquema de `localStorage`. Cada navegador, perfil y dispositivo mantiene un estado independiente. No hay sincronización con la computadora del DM.
- `file://`, `http://localhost:8000`, `http://127.0.0.1:8000` y `http://192.168.100.2:8000` son orígenes distintos. Cambiar protocolo, host o puerto **no transfiere** guardados.
- Antes de trasladar una partida, abre la hoja en el origen anterior y usa **Bitácora y respaldos → Exportar JSON**. En el origen nuevo abre el mismo personaje y usa Importar, revisando la confirmación.
- Exporta un JSON al final de cada sesión y antes de cambiar de teléfono, navegador, IP o puerto. TXT es lectura de bitácora; no sustituye al JSON completo.
- No uses modo incógnito para la partida real. No borres datos del sitio sin exportar antes. Los respaldos descargados pertenecen al jugador; no se copian a la distribución pública.
- Conviene reservar la misma IP al anfitrión mediante DHCP del router. Es una operación manual ajena al lanzador; no se configura automáticamente.

## Detener y comprobar

Presiona **Ctrl+C** en la ventana del servidor. Se ejecuta el bloque `finally`, se cierran los listeners y aparece «Servidor detenido». Si `cmd` pregunta si deseas terminar el trabajo por lotes, confirma. Cerrar la ventana también termina el proceso. Los estados permanecen en cada navegador; el servidor no los almacena.

La entrega se probó desde la propia computadora usando localhost y su IPv4 privada. **No se conectó un teléfono físico ni otro equipo.** Debe comprobarse una vez desde un teléfono antes de la partida, especialmente porque el perfil observado era Público. No se cambiaron reglas del firewall.

## Alternativa Docker opcional

Se incluyen `Dockerfile`, `compose.yaml`, `.dockerignore` y `nginx-jugadores.conf`. Un contenedor Nginx sirve exclusivamente la distribución generada, sin privilegios, con filesystem de solo lectura y sin directorios privados montados. Docker no es necesario para el lanzador Windows.

```powershell
# Preparar la misma distribución segura antes de construir:
.\Preparar_Publicacion.ps1
docker compose up --build

# En otra terminal, para terminar:
docker compose down
```

Por defecto Docker publica solo `127.0.0.1:8000`. Para LAN, establece **tu IP privada real** antes de `up`:

```powershell
$env:DEATHSLEEP_BIND_IP = '192.168.100.2' # sustituir si cambió
docker compose up --build
```

Detén antes el servidor Windows para liberar 8000. No se descargaron imágenes ni se instaló Docker. `docker compose config --quiet` validó la configuración; **no se ejecutó el contenedor porque el daemon de Docker Desktop no estaba disponible**. Construir la imagen por primera vez requiere acceso al registro de Docker; una vez disponible la imagen, los jugadores no necesitan servicios externos.

| Aspecto | Lanzador Windows, principal | Docker, opcional |
|---|---|---|
| Instalación | PowerShell incluido en Windows | Docker Engine/Desktop en ejecución |
| Inicio | Doble clic; prepara y abre portal | Preparar distribución y `compose up` |
| Portabilidad | Carpeta portable entre Windows | Distribución estática portable a hosts Docker; preparación incluida en PowerShell |
| LAN | IP privada detectada y mostrada | IP de enlace configurada expresamente |
| Mantenimiento | Regeneración al iniciar, sin paquetes | Regenerar, reconstruir imagen y mantener Docker |
| Complejidad | Baja, un proceso | Mayor: motor y contenedor, un puerto |
| Prueba actual | HTTP, navegación, privados y cierre comprobados | Sintaxis comprobada; ejecución no verificable |

Para esta sesión presencial se recomienda el lanzador nativo: no añade instalaciones y usa el modelo ya existente en las herramientas del DM, manteniendo ambas raíces y puertos separados.
