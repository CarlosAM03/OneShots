# Reproductor de Deathsleep

Haz doble clic en **Iniciar_Deathsleep.cmd**. Abre los dos HTML originales en Opera (si está instalado) o en tu navegador predeterminado. Conserva la ventana del servidor abierta durante la partida; ciérrala para detenerlo. No requiere instalar paquetes, Python ni Node.

El servidor escucha exclusivamente en `127.0.0.1:8765`. No publica el proyecto en Internet. YouTube sí necesita conexión a Internet. Puedes abrir manualmente estas direcciones en Opera o Chrome:

- http://127.0.0.1:8765/Deathsleep_Banda_Sonora_Panel_DM.html
- http://127.0.0.1:8765/Deathsleep_Escaleta_Integral_DM.html

Si el puerto está ocupado, cierra la otra ventana de este lanzador. Un puerto alternativo puede indicarse al ejecutar `Deathsleep_Servidor_Local.ps1 -Port 8767`; usa siempre el mismo puerto para conservar el mismo origen del navegador.

## Causa y reparación

En las pruebas originales, **Marketplace devolvió Error 153 desde file:/// en ambos HTML**. Faltaba la identificación del cliente mediante Referer. No era un bloqueo general de las pistas: Marketplace y la segunda pista funcionaron mediante HTTP local.

Además, la cabina usaba postMessage sin escuchar los estados y reconstruía el escenario retirando el iframe del documento. La escaleta consideraba iniciada la reproducción al insertar el iframe.

Se modificaron `start`, `pause`, `updateStatus` y la parte de `renderStage` que contenía el reproductor en la cabina; `startMusic`, `stopMusic` y los controles musicales en la escaleta. Cada archivo incorpora su propio controlador `createMusicPlayer`, independiente, con la API oficial de YouTube, origen HTTP real, política de Referer y eventos `onReady`, `onStateChange`, `onError` y `onAutoplayBlocked`.

Solo `onStateChange` con estado PLAYING muestra «Reproduciendo». Los cambios de escena actualizan el contenido sin desconectar el iframe; otra pista se carga en el mismo reproductor. Silencio destruye el reproductor y cancela cualquier inicio pendiente. Los errores muestran un enlace a la pista que falló, incluso si ya seleccionaste otra escena. Los enlaces externos originales siguen intactos.

Se conservaron estilos, imágenes, PDF, datos narrativos, notas, favoritos y código de progreso. La pantalla de jugadoras no se modificó. Las copias anteriores de ambos paneles están en `pruebas_reproductor/*.antes`.

**Datos guardados:** el navegador separa localStorage por origen. Lo guardado anteriormente bajo file:/// permanece allí; HTTP local tiene su propio almacenamiento. El lanzador no borra ni traslada notas, progreso o favoritos. Utiliza siempre el mismo navegador, perfil y puerto.

## Prueba manual de audio

Prueba un panel a la vez y siléncialo antes de probar el otro:

1. Selecciona la primera escena del acto I, Marketplace, y pulsa Reproducir. Espera «Reproduciendo: Marketplace» y comprueba que escuchas la música.
2. Pulsa Pausar / reanudar: debe mostrar «Pausado» y cesar el sonido. Pulsa de nuevo: debe continuar desde el mismo punto.
3. Cambia de escena y de acto sin pulsar Reproducir: Marketplace debe continuar.
4. Selecciona la segunda escena del acto I y pulsa Reproducir: debe sonar «1 Hour of Combat Music for D&D» y quedar un solo reproductor.
5. Pulsa Silencio: debe cesar el sonido. Reproducir debe permitir iniciar de nuevo.
6. Si aparece «Inicio bloqueado», pulsa ▶ dentro del vídeo. Si no se oye pese a avanzar el tiempo, comprueba el volumen del reproductor, la pestaña y la salida de audio de Windows.

Para repetir la prueba de restricción sin cambiar la biblioteca, abre las herramientas de desarrollador del panel HTTP y ejecuta en la consola:

```js
music.play({videoId:'Sagg08DrO5U', title:'Prueba temporal de restricción'})
```

En la prueba realizada, YouTube devolvió **150**, con el mensaje «El propietario no permite reproducir este vídeo incrustado» y el enlace correcto de respaldo. La disponibilidad y los permisos del vídeo pueden cambiar. Después pulsa Silencio y vuelve a Marketplace.

## Evidencia automática

Las pruebas principales se ejecutaron contra el servidor entregado utilizando el ejecutable instalado de **Opera**, con perfil de prueba aislado. Motor reportado: `152.0.7977.134`. No se alteró la política de autoplay ni el perfil habitual del usuario.

En ambos HTML se verificaron Marketplace, pausa y reanudación, cambio a la segunda pista, cambio de escena y acto sin recargar el iframe, un solo reproductor, detención y error real 150 con enlace de respaldo. No hubo errores JavaScript de página.

En Marketplace, el elemento multimedia estaba sin silenciar, con volumen 1, tiempo avanzando y bytes de audio decodificados crecientes (cabina: 14 283 → 51 587; escaleta: 15 816 → 53 035). Esto comprueba reproducción multimedia con audio, no únicamente la carga visual del iframe. No comprueba físicamente los altavoces ni sustituye la escucha manual anterior.

Los eventos y mediciones están en `pruebas_reproductor/resultado.json`; el script es `verificar.cjs`. Los scripts de prueba utilizan Playwright ya disponible en el equipo; **la aplicación y el lanzador no dependen de él**. Para ejecutarlos en otro entorno, configura `PLAYWRIGHT_MODULE` con un módulo Playwright instalado y `DEATHSLEEP_URL` si usas otro puerto.

También pasaron las pruebas adicionales de error 153 con los HTML corregidos desde file:///, detención mientras carga la API, fallo y recuperación de la API y selección rápida de varias pistas sin duplicar reproductores. Evidencia: `pruebas_reproductor/resultado_adicional.json`.

Permanecen las restricciones externas de YouTube: incrustación desactivada por el propietario, retirada o privacidad del vídeo, restricciones regionales o de edad, anuncios, red y políticas de reproducción del navegador. No se descarga ni extrae audio ni se eluden restricciones.

Referencia oficial: https://developers.google.com/youtube/iframe_api_reference y https://developers.google.com/youtube/terms/required-minimum-functionality#embedded-player-api-client-identity
