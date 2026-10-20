# PROMPT MAESTRO — GENERADOR DE HOJAS DIGITALES PERSONALIZADAS PARA D&D

## 1. Rol y objetivo

Actúa como un desarrollador senior especializado en aplicaciones web interactivas, diseño de interfaces, modelado de reglas de Dungeons & Dragons y herramientas digitales de apoyo para juegos de rol de mesa.

Tu objetivo es **desarrollar una hoja digital de personaje completa, personalizada, interactiva, portable y funcional**, destinada a utilizarse directamente durante sesiones de Dungeons & Dragons.

La aplicación debe permitir que el jugador consulte su personaje, comprenda sus capacidades, planifique turnos, administre recursos, registre acontecimientos y conserve su progreso sin depender de plataformas externas.

No quiero una hoja genérica donde únicamente se sustituya el nombre del personaje.

**Quiero una aplicación individual que represente fielmente la identidad narrativa, visual y mecánica del personaje proporcionado.**

La herramienta deberá conservar una estructura funcional común entre personajes, pero todo su contenido específico deberá derivarse de la documentación efectivamente disponible.

---

## 2. Materiales de entrada

### Documento obligatorio

La hoja de personaje proporcionada por el usuario.

Puede presentarse como PDF, imagen, documento, archivo digital u otro formato legible.

Esta hoja constituye la fuente principal para identificar el personaje y establecer su configuración inicial.

### Material complementario opcional

El usuario podría proporcionar información adicional, pero no debes asumir de antemano que existe.

Si se proporciona material complementario, analízalo e incorpóralo según su relevancia:

- Documentos narrativos o historia del personaje.
- Descripciones de personalidad, apariencia o trasfondo.
- Imágenes o ilustraciones de referencia.
- Reglas de campaña o modificaciones del Dungeon Master.
- Documentos de objetos, habilidades o conjuros especiales.
- Manuales oficiales o suplementos de D&D.
- Inventarios, diarios o registros de sesiones.
- Archivos anteriores de la hoja digital.
- Cualquier otro material relacionado con el personaje.

Esta enumeración representa posibilidades, no requisitos.

**No presupongas la existencia de ninguno de estos archivos.**

Si únicamente se proporciona la hoja de personaje, debes poder construir una aplicación funcional utilizando exclusivamente los datos verificables que contenga y las reglas del sistema identificable.

Si un dato no está disponible, no lo inventes.

### Plantilla HTML opcional

Si se adjunta una hoja digital de referencia, como `index(4).html`, utilízala como autoridad para conservar la estructura, el lenguaje visual, la distribución y el alcance de la herramienta.

Si no se adjunta ningún HTML de referencia, utiliza directamente la especificación completa de este prompt.

**El HTML de referencia nunca debe utilizarse como fuente de estadísticas, historia, inventario o capacidades para un personaje diferente.**

---

## 3. Identificación y auditoría inicial del personaje

Antes de implementar la aplicación, examina todos los materiales recibidos.

Extrae y organiza los datos disponibles en las siguientes categorías:

### Identidad

- Nombre del personaje.
- Nombre secundario, título o sobrenombre, si existe.
- Raza, especie y subraza.
- Clase o combinación de clases.
- Subclase, tradición, dominio, escuela o especialización.
- Nivel total y niveles individuales.
- Trasfondo.
- Alineamiento, si figura.
- Campaña o escenario, si está identificado.
- Información narrativa y física documentada.

### Características

- Fuerza, Destreza, Constitución, Inteligencia, Sabiduría y Carisma.
- Modificadores.
- Bonificador de competencia.
- Tiradas de salvación.
- Habilidades y competencias.
- Percepción pasiva.
- Iniciativa.
- Clase de Armadura.
- Velocidad.
- Puntos de golpe actuales y máximos.
- Dados de golpe.
- Resistencias, inmunidades, vulnerabilidades y sentidos especiales documentados.

### Combate

- Armas disponibles.
- Bonificadores de ataque.
- Dados y tipos de daño.
- Alcances.
- Propiedades especiales.
- Ataques adicionales.
- Maniobras o capacidades especiales.
- Reacciones y acciones adicionales.
- Recursos consumidos por las capacidades.

### Magia

Cuando corresponda:

- Característica de lanzamiento.
- CD de salvación.
- Bonificador de ataque de conjuro.
- Trucos y conjuros conocidos.
- Conjuros preparados.
- Espacios de conjuro por nivel.
- Recursos mágicos alternativos.
- Componentes, duración, alcance y concentración.
- Condiciones para utilizar cada conjuro.

### Inventario y recursos

- Equipo poseído.
- Cantidades y munición.
- Objetos consumibles.
- Objetos mágicos.
- Monedas.
- Herramientas y equipo de exploración.
- Recursos especiales de clase.
- Usos disponibles y mecanismos de recuperación.

### Narrativa

- Historia personal.
- Relaciones importantes.
- Objetivos.
- Motivaciones.
- Personalidad.
- Ideales, vínculos y defectos.
- Experiencias relevantes.
- Características de interpretación documentadas.

No conviertas campos vacíos en hechos confirmados.

Cuando existan datos ilegibles, incompletos o contradictorios, identifícalos.

Los elementos calculables únicamente podrán derivarse si se conocen las reglas aplicables y todos los datos necesarios. Deben distinguirse los valores transcritos de los calculados.

---

## 4. Autoridad de información y reglas

Debes distinguir entre cuatro categorías:

**A. Datos registrados en la hoja:** información directamente proporcionada por el jugador.

**B. Reglas oficiales:** capacidades, propiedades y procedimientos publicados para la edición y fuentes identificadas.

**C. Reglas de campaña o autorizaciones del DM:** modificaciones, excepciones y capacidades personalizadas cuya aprobación está documentada.

**D. Información pendiente:** datos incompletos, diferencias no justificadas o decisiones todavía no confirmadas.

La hoja del jugador establece la configuración documentada del personaje, pero no demuestra por sí sola que una modificación sea una regla oficial.

Determina qué edición se utiliza únicamente si los documentos permiten identificarla.

No asumas automáticamente que todas las campañas utilizan D&D 5e 2014 o D&D 5e 2024.

Si la edición es indispensable para implementar una mecánica y no puede identificarse con seguridad, solicita esa aclaración puntual.

No mezcles características de distintas ediciones sin autorización.

No atribuyas reglas de suplementos a un manual diferente.

Si dispones de fuentes oficiales verificables, utilízalas para explicar el funcionamiento de las capacidades. Si no, evita inventar referencias o páginas.

### Restricción de decisiones

No cambies automáticamente las características confirmadas de un personaje para hacerlas coincidir con las reglas oficiales.

Cuando exista una diferencia, documenta:

- Valor registrado.
- Regla oficial correspondiente.
- Diferencia detectada.
- Origen o aprobación, si consta.
- Estado pendiente cuando corresponda.

La sección de clasificación es informativa; no debe modificar silenciosamente los cálculos ni las capacidades utilizadas durante la mesa.

---

# 5. Contrato funcional de la aplicación

La aplicación debe conservar exactamente siete secciones principales, representadas mediante pestañas de navegación.

El nombre y contenido específico de sus tarjetas pueden adaptarse al personaje, pero la estructura y finalidad de cada sección deben mantenerse.

## SECCIÓN 1 — Ficha principal

Debe funcionar como el tablero general del personaje.

Incluir:

### Identidad y características
Las características, modificadores, competencias y datos generales documentados.

### Estadísticas de combate
CA, iniciativa, velocidad, puntos de golpe, competencia, salvaciones y cualquier indicador de combate que corresponda.

### Armamento y ataques
Una tabla visual que permita identificar rápidamente:

- Arma o ataque.
- Bonificador de impacto.
- Dados de daño.
- Tipo de daño.
- Alcance.
- Propiedades especiales.

### Recursos actuales
Resumen dinámico de puntos de golpe, habilidades consumibles y otros recursos aplicables.

### Magia o capacidades principales
Si el personaje utiliza magia, presentar sus conjuros.

Si no utiliza magia, dedicar este espacio a las habilidades relevantes de su clase, como maniobras, técnicas, poderes, rasgos especiales o capacidades de combate.

No mostrar conjuros inventados ni paneles mágicos que no correspondan.

La organización debe permitir entender rápidamente el estado del personaje antes de iniciar un turno.

---

## SECCIÓN 2 — Lore y personaje

Esta sección desarrolla la identidad del personaje como individuo dentro de su campaña.

Debe incluir, cuando exista información suficiente:

- Historia y origen.
- Descripción física.
- Personalidad y temperamento.
- Relaciones.
- Familia o vínculos relevantes.
- Motivaciones y objetivos.
- Conflictos personales.
- Experiencias importantes.
- Filosofía o estilo personal.
- Evolución narrativa.

Toda afirmación narrativa debe estar respaldada por la hoja o los materiales adicionales.

**No inventes familiares, acontecimientos, tragedias, relaciones, diálogos, aspiraciones, traumas o motivaciones.**

Si únicamente se conocen rasgos básicos, construye una presentación elegante y fiel a esos datos.

Mantén una sección de notas narrativas editable donde el jugador pueda desarrollar su personaje durante la campaña.

El usuario debe poder guardar nuevos hechos, decisiones, relaciones y cambios del personaje.

---

## SECCIÓN 3 — Compendio de reglas

Esta sección funcionará como manual personal de consulta rápida para el jugador.

Debe explicar de manera clara y precisa las capacidades reales de su personaje.

Incluye:

- Economía de acciones.
- Movimiento.
- Acción adicional.
- Reacciones.
- Ataques y sus condiciones.
- Rasgos de clase.
- Rasgos raciales o de especie.
- Especializaciones.
- Recursos especiales.
- Descansos y recuperación.
- Conjuros o poderes, cuando correspondan.
- Limitaciones, condiciones y excepciones.

Cada capacidad debe explicar, cuando corresponda:

**Qué hace, cuándo puede utilizarse, qué acción consume, cuánto cuesta, qué dados utiliza, qué condiciones exige y cuándo recupera sus usos.**

El contenido debe estar adaptado al nivel actual del personaje.

No presentar características de niveles futuros como si ya estuvieran disponibles.

Para facilitar su uso por principiantes, utilizar textos comprensibles y elementos expandibles, conservando la terminología oficial de las reglas.

Los apartados deben ser detallados, pero permitir consultas rápidas durante la partida.

---

## SECCIÓN 4 — Simulador de turnos

Esta es una de las funcionalidades centrales y debe implementarse realmente, no solamente representarse visualmente.

Debe ser un simulador adaptado a las capacidades del personaje.

### Entradas mínimas

- Distancia al objetivo.
- Contexto del turno.
- Acción principal.
- Acción adicional.
- Movimiento previsto.
- Reacción disponible o prevista.
- Capacidades especiales aplicables.
- Recursos que se desea utilizar.
- Condiciones relevantes para la combinación.

### Resultado

Debe calcular y presentar:

- Acción seleccionada.
- Acción adicional seleccionada.
- Ataques disponibles.
- Bonificadores.
- Dados de daño.
- Tipos de daño.
- Promedio matemático cuando sea calculable.
- Recursos necesarios.
- Movimiento disponible.
- Alcances.
- Restricciones.
- Combinaciones válidas e inválidas.
- Advertencias contextuales.

### Validación mecánica

El simulador debe respetar:

- Economía de acciones.
- Restricciones de clase.
- Ataques adicionales realmente disponibles.
- Condiciones de las habilidades.
- Recursos restantes.
- Compatibilidad entre capacidades.
- Concentración, si corresponde.
- Requisitos de alcance.
- Condiciones especiales verificables.

No todos los personajes tienen las mismas opciones.

Por ejemplo, un guerrero puede utilizar Ataque Extra cuando su nivel se lo permita; un monje puede gastar Ki o el recurso correspondiente a su edición; un hechicero puede tener Metamagia; un bárbaro puede utilizar Furia.

Estos son ejemplos de adaptación, no instrucciones para agregar dichas capacidades a todos los personajes.

### Presets tácticos

Crear accesos rápidos a combinaciones útiles basadas exclusivamente en las capacidades disponibles.

Los presets deben tener nombres y configuraciones propios del personaje.

No reutilizar combinaciones de Eco ni habilidades de clases que no le correspondan.

### Aplicación del turno

Mantener el botón para aplicar el consumo de recursos, junto con confirmación.

No descontar recursos si la combinación es inválida.

Los consumos condicionales deben confirmarse solamente cuando ocurra su condición.

El simulador no debe confundir daño teórico, daño esperado y daño realmente infligido.

Si falta información indispensable, mostrar la limitación sin inventar una fórmula.

---

## SECCIÓN 5 — Mesa y recursos

Debe ser el panel operativo utilizado durante la sesión.

### Recursos

Implementar controles para:

- PG actuales y máximos.
- PG temporales.
- Dados de golpe.
- Recursos de clase.
- Espacios de conjuro, si aplican.
- Usos de habilidades.
- Munición o consumibles relevantes.
- Otros recursos documentados.

Solo deben mostrarse recursos que correspondan al personaje.

Las capacidades con límites deben impedir consumos que excedan los recursos disponibles.

### Descansos

Implementar descanso corto y descanso largo, aplicando únicamente recuperaciones verificadas para la edición, nivel y características del personaje.

No restablecer indiscriminadamente todas las capacidades.

Cuando la recuperación requiera tiradas, decisiones o condiciones externas, proporcionar controles adecuados o señalar que debe registrarse manualmente.

### Condiciones y seguimiento

Incluir:

- Condiciones de estado.
- Concentración, cuando aplique.
- Posición táctica.
- Información de combate.
- Notas rápidas de sesión.

### Inventario

Conservar un inventario editable y persistente.

Debe permitir registrar los objetos que realmente posee el personaje.

La interfaz puede incluir una galería visual con representaciones de su equipo.

Distinguir claramente:

- Objetos poseídos.
- Objetos ilustrativos.
- Objetos disponibles como referencia.
- Objetos personalizados.

No incorporar un artículo al inventario real solamente porque aparezca en una galería.

---

## SECCIÓN 6 — Bitácora y respaldos

Implementar un sistema de registro de sesiones.

Cada entrada debe admitir:

- Fecha.
- Sesión o capítulo.
- Tipo de acontecimiento.
- Título.
- Contenido narrativo.
- Información relevante para continuidad.

Permitir registrar combates, exploraciones, relaciones, descubrimientos, recompensas y decisiones del DM.

### Funciones obligatorias

- Crear registros.
- Visualizar historial.
- Buscar registros.
- Eliminar entradas con confirmación.
- Mantener registros persistentes.
- Exportar bitácora como texto.
- Exportar datos completos como JSON.
- Importar respaldos JSON.
- Copiar el estado del personaje para compartirlo.
- Restablecer los datos con confirmación.

El nombre del personaje y de la campaña debe reflejarse en los nombres de los archivos exportados cuando estén disponibles.

Los respaldos deben conservar un esquema coherente y versionado.

La aplicación no deberá sobrescribir los datos de otros personajes al utilizarse en el mismo navegador.

---

## SECCIÓN 7 — Oficialidad y Homebrew

Esta sección tiene una finalidad estrictamente documental.

Debe distinguir la procedencia de los elementos del personaje sin cambiar sus capacidades ni los cálculos de la aplicación.

### Clasificación

**Oficial:** contenido respaldado por las reglas oficiales correspondientes a la edición identificada.

**Modificado o autorizado por el DM:** excepciones, concesiones y reglas personalizadas cuya autorización esté documentada.

**Homebrew:** contenido creado para la campaña, con indicación de si está aprobado o simplemente propuesto.

**Pendiente de confirmar:** información cuyo origen o aprobación no puede establecerse.

### Apartados

A. Raza, clases, subclases, trasfondo y características.

B. Armas, armaduras, equipamiento y objetos especiales.

C. Habilidades, técnicas, rasgos y poderes.

D. Conjuros y capacidades mágicas, si corresponden; para personajes sin magia, usar este espacio para las capacidades especializadas de su configuración.

E. Contenido exclusivo de la campaña o personaje.

F. Diferencias, dudas y decisiones pendientes.

Cuando resulte apropiado, incluir tablas comparativas:

| Elemento | Regla oficial | Configuración del personaje | Procedencia |
|---|---|---|---|
| Dato documentado | Referencia verificada | Valor utilizado | Estado identificado |

No inventar referencias bibliográficas.

Distinguir que una habilidad exista oficialmente de que el personaje tenga derecho a obtenerla en su nivel y configuración actuales.

**Esta sección nunca debe modificar por sí misma el estado del personaje ni su simulador.**

---

# 6. Diseño visual y experiencia de usuario

La hoja debe conservar el lenguaje visual de la aplicación de referencia:

- Encabezado de personaje con identidad destacada.
- Retrato principal en la esquina superior derecha.
- Navegación horizontal por pestañas.
- Fondo oscuro de fantasía.
- Tarjetas con bordes suaves.
- Jerarquía tipográfica clara.
- Indicadores numéricos prominentes.
- Tablas legibles.
- Barras de recursos.
- Controles compactos.
- Secciones expandibles.
- Ilustraciones temáticas.
- Diseño responsive.

Sin embargo, **la identidad estética debe personalizarse completamente según el personaje**.

### Personalización estética

Utilizar únicamente características respaldadas por los materiales disponibles.

Considerar, cuando estén documentados:

- Apariencia.
- Raza y clase.
- Cultura.
- Origen.
- Personalidad.
- Vestimenta.
- Historia.
- Símbolos importantes.
- Afinidades temáticas.
- Estilo de combate.
- Imágenes de referencia.

Seleccionar una paleta cromática, ornamentos, composición de imágenes e identidad visual coherente con ese personaje.

La hoja puede conservar los mismos componentes de Eco sin conservar sus colores, símbolos ni temática ígnea.

No reutilizar su nombre, historia, armas, iconografía o imágenes.

### Ilustraciones

Si el usuario proporciona imágenes, deben respetarse como referencias visuales de acuerdo con sus indicaciones.

Si no proporciona imágenes, no debes asumir una apariencia física que no esté documentada.

Cuando exista suficiente información visual o descriptiva y estén disponibles herramientas de generación de imágenes, puedes crear ilustraciones originales para las distintas secciones de la hoja.

Priorizar:

- Retrato principal cuadrado.
- Ilustración de ficha.
- Ilustración narrativa.
- Ilustración de habilidades.
- Ilustración de combate.
- Ilustración de recursos.
- Ilustración de bitácora.

Estas imágenes son deseables, pero no constituyen un requisito previo para obtener una aplicación funcional.

Si faltan referencias esenciales o no existen herramientas de generación visual, utilizar una presentación tipográfica y ornamental coherente, sin sustituir la identidad del personaje por una ilustración inventada.

No presentar una apariencia generada como canon confirmado sin aprobación del jugador.

---

# 7. Biblioteca mínima de inventario

El único contenido visual reutilizable y genérico permitido será una biblioteca mínima de objetos y equipo.

Esta biblioteca deberá construirse en función de:

1. Los artículos registrados en la hoja del personaje.
2. Los objetos directamente relevantes para sus capacidades.
3. Categorías básicas de equipamiento contempladas por las fuentes oficiales aplicables.

Puede incluir ilustraciones originales de armas, escudos, armaduras, mochilas, munición, herramientas, pociones y otros objetos pertinentes.

No generes catálogos extensos sin utilidad para el personaje.

No inventes objetos mágicos, recompensas ni posesiones.

No descargues ni reutilices ilustraciones oficiales protegidas como si fueran recursos de libre distribución.

Puedes generar iconos o ilustraciones originales inspiradas en categorías de objetos oficiales, distinguiendo siempre la procedencia de las reglas de la procedencia del arte.

---

# 8. Arquitectura técnica

La aplicación deberá poder ejecutarse localmente.

### Tecnologías

- HTML5.
- CSS3.
- JavaScript.
- `localStorage`.
- JSON para respaldos.
- Recursos gráficos locales.

No utilizar backend, base de datos remota, servicios de autenticación, CDNs ni dependencias externas.

Mantener una arquitectura sencilla, portable y fácil de distribuir.

### Estructura de archivos

```text
HojaDeJuego_NombrePersonaje/
│
├── index.html
│
└── assets/
    ├── imagen/
    └── icono/
        ├── personaje/
        └── inventario/
```

Los nombres concretos deberán derivarse del personaje y de los recursos realmente generados.

La estructura puede omitir carpetas vacías si no existen recursos correspondientes.

Todas las referencias gráficas deberán utilizar rutas relativas.

La aplicación deberá poder abrirse directamente mediante `index.html`.

### Estado y persistencia

Diseñar el modelo de datos según las características concretas del personaje.

No reutilizar valores, arreglos de habilidades, conjuros, recursos o ataques de Eco.

Evitar identificadores de almacenamiento compartidos entre distintos personajes.

La persistencia debe contemplar:

- Estado actual.
- Recursos.
- Inventario.
- Condiciones.
- Notas.
- Lore editable.
- Bitácora.
- Fecha de actualización.
- Versión de esquema.

Al importar respaldos, validar su estructura y pertenencia al personaje antes de reemplazar el estado.

Considerar que el almacenamiento local puede estar restringido en algunos navegadores o contextos `file://`; informar cuando no esté disponible y permitir que el usuario conserve respaldos manuales.

---

# 9. Adaptación para jugadores principiantes

La aplicación está pensada especialmente para personas que comienzan a jugar D&D.

Debe resultar accesible sin sacrificar precisión mecánica.

### Principios

- Explicar qué puede hacer el personaje.
- Mostrar cómo ejecutar sus ataques.
- Identificar los dados necesarios.
- Explicar cuándo puede utilizar habilidades.
- Mostrar qué recursos consume cada acción.
- Diferenciar acciones, acciones adicionales y reacciones.
- Mostrar los límites de las habilidades.
- Evitar que el usuario tenga que memorizar todas las reglas.
- Mantener visibles los valores importantes durante el combate.
- Permitir registrar el avance de cada sesión.

Las explicaciones deben utilizar español claro y terminología técnica cuando sea necesaria.

No simplificar reglas de manera que cambie su funcionamiento.

La herramienta debe ser un asistente de consulta y seguimiento, no un sustituto de las decisiones del Dungeon Master.

---

# 10. Implementación del simulador personalizado

El simulador no puede contener acciones codificadas para una clase específica y mostrarlas indiscriminadamente a todos los personajes.

Debes construir su configuración a partir del personaje analizado.

Modela, cuando corresponda:

- Acciones disponibles.
- Tipo y coste de acción.
- Ataques.
- Bonificadores.
- Fórmulas de daño.
- Alcances.
- Requisitos de ejecución.
- Recursos necesarios.
- Recuperaciones.
- Condiciones.
- Efectos especiales.
- Dependencias entre habilidades.

Las habilidades sin información suficiente no podrán tratarse como mecánicas verificadas.

Usar validaciones explícitas y resultados comprensibles.

Incluir presets personalizados para situaciones reales de uso.

Distinguir entre combinaciones legales, restricciones automáticas y condiciones que requieren resolución del DM.

Los resultados matemáticos deben calcularse dinámicamente desde la configuración del personaje, no mediante valores fijos tomados de otra hoja.

---

# 11. Gestión de información incompleta

La aplicación debe ser utilizable incluso si la hoja proporcionada contiene poco trasfondo o información complementaria.

Aplica las siguientes reglas:

### Datos conocidos

Incorporarlos fielmente.

### Datos calculables

Calcularlos cuando exista una fórmula verificada y se conozcan todos los parámetros necesarios, identificándolos como derivados cuando sea relevante.

### Datos desconocidos

Mostrar un valor pendiente, una explicación o un campo editable, según corresponda.

### Datos contradictorios

Conservar el registro original y señalar la contradicción.

### Datos opcionales ausentes

No inventarlos ni exigirlos para construir la aplicación.

### Datos esenciales ausentes

Solicitar únicamente las aclaraciones indispensables para evitar una implementación mecánicamente incorrecta.

No detener todo el trabajo por información narrativa o estética no esencial.

Si es posible desarrollar una versión funcional con los datos disponibles, hazlo y documenta sus limitaciones.

No considerar que los recursos actuales están al máximo simplemente porque se conocen sus valores máximos, salvo que la hoja lo indique o el usuario confirme el estado inicial.

---

# 12. Calidad y pruebas

Antes de entregar, verificar:

### Estructura

- Siete pestañas funcionales.
- Navegación correcta.
- Encabezado personalizado.
- Diseño responsive.
- Recursos visuales correctamente integrados.

### Mecánicas

- Características correctas.
- Bonificadores correctos.
- Ataques correctos.
- Fórmulas de daño correctas.
- Recursos y recuperaciones válidos.
- Combinaciones de turnos verificadas.
- Restricciones de clase respetadas.
- Ausencia de habilidades ajenas al personaje.

### Persistencia

- Guardado.
- Restauración.
- Importación.
- Exportación.
- Bitácora.
- Inventario.
- Condiciones.
- Recursos.

### Compatibilidad

- Ejecución sin conexión.
- Rutas relativas.
- Sin referencias a archivos inexistentes.
- Sin errores de inicialización JavaScript.
- Sin desbordamientos visuales.
- Controles utilizables en móvil.
- Sin pérdidas silenciosas de información.

### Seguridad e integridad

- Validación de respaldos importados.
- Escape de contenido editable antes de insertarlo en HTML.
- Confirmación para operaciones destructivas.
- No sobrescribir datos de otros personajes.
- No ejecutar código procedente de entradas o respaldos.

Si el entorno permite pruebas automatizadas o ejecución en navegador, realizarlas.

No declarar validaciones exitosas que no hayan sido ejecutadas.

---

# 13. Entregables

Genera una carpeta completa para el personaje.

Formato:

```text
HojaDeJuego_NombrePersonaje/
├── index.html
└── assets/
    ├── imagen/
    └── icono/
```

Incluye todos los recursos gráficos que hayan sido generados o efectivamente proporcionados y utilizados.

Entrega un archivo ZIP con la carpeta completa.

Si únicamente es posible generar el HTML, entrégalo claramente e identifica los recursos faltantes sin simular que están empaquetados.

El HTML debe quedar completamente desarrollado y ser ejecutable, no consistir en un boceto o demostración parcial.

### Informe final

Incluye:

1. Nombre y configuración identificada del personaje.
2. Materiales efectivamente utilizados.
3. Características implementadas.
4. Capacidades configuradas en el simulador.
5. Recursos e inventario integrados.
6. Personalización visual aplicada.
7. Resultados de pruebas.
8. Información pendiente de confirmación.
9. Instrucciones para abrir y utilizar la hoja.

---

# 14. Criterios de aceptación

La implementación se considerará terminada únicamente cuando cumpla estas condiciones:

**Identidad:** la aplicación representa al personaje proporcionado, no a otro personaje ni a una plantilla rellenada superficialmente.

**Fidelidad:** las estadísticas y capacidades proceden de información verificable, reglas aplicables o decisiones documentadas.

**Funcionalidad:** las herramientas de combate, administración y seguimiento funcionan realmente.

**Personalización:** el diseño visual y narrativo responde a la identidad documentada del personaje.

**Accesibilidad:** una persona que comienza a jugar puede comprender y utilizar su hoja durante una sesión.

**Portabilidad:** los archivos pueden trasladarse y utilizarse localmente, con mecanismos adecuados de respaldo.

**Extensibilidad:** la hoja permite registrar la evolución futura del personaje sin perder los datos existentes.

**Independencia:** no necesita la hoja de Eco ni ningún otro personaje para ejecutarse.

---

# 15. Instrucción final de ejecución

Comienza analizando la hoja de personaje realmente adjunta.

Identifica sus datos, edición, capacidades, recursos y posibles diferencias mecánicas.

Utiliza los documentos adicionales solamente cuando existan y aporten información relevante.

Construye la aplicación completa respetando las siete secciones, el diseño estructural y todas las capacidades operativas descritas.

Personaliza su contenido, interfaz, reglas aplicables, inventario y simulador para el personaje específico.

No copies nombres, estadísticas, narrativas, colores obligatorios, habilidades o recursos de otros personajes.

No inventes información para aparentar mayor detalle.

No solicites recursos adicionales que no sean estrictamente necesarios.

Cuando una decisión mecánica dependa de una autorización no documentada del DM, identifica el punto y solicita confirmación antes de implementarla como regla activa.

**El resultado esperado es una hoja digital personal de D&D, detallada, visualmente cuidada, mecánicamente confiable y lista para utilizarse durante una sesión real de juego.**

Entrega los archivos finales y no únicamente una explicación de cómo desarrollarlos.
