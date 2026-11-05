# Una vida contigo — Colección Atelier

Invitación de boda editorial en HTML, CSS y JavaScript puro. Sin frameworks, sin compilación y sin dependencias JavaScript.

## Abrir y editar

Abre `index.html` directamente o utiliza un servidor estático (por ejemplo, Live Server). Para portapapeles, mapas y despliegue final utiliza HTTPS. Google Fonts y Google Maps requieren conexión; las fotografías están incluidas localmente.

- `index.html`: composición, nombres visibles, textos, fechas visibles y secciones.
- `style.css`: sistema visual, paleta, tipografía, tamaños, animaciones y puntos de adaptación móvil.
- `script.js`: sobre, audio, personalización, cuenta regresiva, calendario, mapas, galería, portapapeles y RSVP.
- `config.js`: datos funcionales, destinos, fotos, banco y ajustes de audio.
- `assets/`: fotografías de muestra descargadas de Unsplash.

## Adaptar a una pareja

1. Edita nombres, iniciales, fecha visible, ciudad, horarios, fecha límite y textos en `index.html`. Busca Sofía, Carlos, 2027 y San Miguel. Edita también el título y la descripción del documento.
2. Actualiza `couple`, `date` y `endDate` en `config.js`. Incluye el desfase horario correcto; el ejemplo utiliza UTC−06:00. La cuenta regresiva y el archivo de calendario utilizan estas fechas. Las fechas visibles/editoriales del HTML deben coincidir.
3. Sustituye las fotografías desde `photos`, conservando sus claves. Actualiza también los atributos `src` y `alt` del HTML para la presentación sin JS y el contenido accesible. Las imágenes de los lugares son inspiración, NO fotografías verificadas de los lugares nombrados.
4. Actualiza nombres, direcciones y búsquedas de los lugares en `ceremony` y `reception`; ajusta además las etiquetas de ciudad e itinerario del HTML.
5. En `whatsapp`, coloca el número internacional sin + ni espacios; México: 52 y 10 dígitos. En blanco se muestra una vista previa sin enviar nada. La confirmación final requiere que el invitado envíe el mensaje en WhatsApp. No existe base de datos ni confirmación automática de recepción.
6. Añade los enlaces reales de cada mesa en `registries`. Mientras estén vacíos, el botón indica que el enlace está pendiente.
7. Completa `bank` con datos autorizados. La copia se habilita solo para una CLABE de 18 dígitos; esta validación no verifica su titular ni validez bancaria.
8. Elimina el bloque `.demo-note` del pie y la descarga de plantilla antes de entregar una invitación real al cliente. No publiques el ZIP del código si no deseas compartirlo con sus invitados.

## Personalización de invitados

Ejemplo:
`https://tu-dominio.com/?invitado=Familia+Morales+Pérez&pases=2`

El nombre se inserta con `textContent`, no como HTML. El número de pases admite enteros entre 1 y `maxPasses` (10 por defecto). Sin parámetros, el saludo es genérico y el formulario ofrece `defaultPasses` (1 por defecto). Cambia ese valor si lo necesitas.

Los parámetros URL son presentación editable por el visitante: **no son control de acceso ni una asignación de pases autenticada**. Si necesitas lista cerrada, tokens firmados, seguimiento, prevención de reservas duplicadas o panel de invitados, se requiere una capa de servidor. No incluyas secretos en config.js: es público.

## Música

La versión entregada sintetiza una secuencia original suave con Web Audio tras abrir el sobre. No usa grabaciones de terceros. El control superior permite pausarla/reanudarla. Para una pista definitiva, carga un archivo con derechos de uso y configura `audio.url`, por ejemplo `assets/nuestra-cancion.mp3`. El audio nunca se inicia antes de una interacción del visitante.

## Funciones incluidas

- Sobre CSS 3D, sello dorado y transición a la invitación.
- Fotografía en arco con doble marco, monograma, textura y botánica SVG.
- Mensaje por URL, límite visual de pases y selección del número de asistentes.
- Cuenta regresiva sin números negativos al terminar.
- Descarga `.ics` para calendarios compatibles (Apple, Outlook, importación Google).
- Mapas embebidos desplegables; enlaces de búsqueda a Google Maps y Waze para ambos lugares.
- Galería con modal, flechas, navegación de teclado y cierre con Escape.
- Moodboard con paleta interactiva.
- Mesa de regalos y transferencia configurables.
- RSVP para asistir o declinar, preferencias de alimentación y detalles por persona.
- Adaptación móvil, foco visible, etiquetas de formulario y respeto a movimiento reducido.

## Recursos

Fotografías de muestra de Unsplash, identificadores originales conservados como nombres de archivo:
- https://images.unsplash.com/photo-1519741497674-611481863552 (ramo)
- https://images.unsplash.com/photo-1532712938310-34cb3982ef74 (pareja en montañas)
- https://images.unsplash.com/photo-1511285560929-80b456fea0bc (celebración)
- https://images.unsplash.com/photo-1523438885200-e635ba2c371e (ceremonia)
- https://images.unsplash.com/photo-1511795409834-ef04bbd61622 (recepción)
- https://images.unsplash.com/photo-1595777457583-95e059d581b8 (vestido)
- https://images.unsplash.com/photo-1594938298603-c8148c4dae35 (traje)

Reemplaza estas fotografías por las de la misma pareja para una entrega comercial coherente; son referencias visuales y no representan una boda real de Sofía y Carlos. Usa material que el cliente te autorice. Fuentes: Cormorant Garamond y Manrope mediante Google Fonts. No se incluyen analítica, almacenamiento de datos del formulario ni cookies propias.

## Despliegue

Sube los archivos de esta carpeta a cualquier alojamiento estático HTTPS. No necesitas npm. Mantén las rutas relativas y `assets/` junto a `index.html`. Prueba una invitación personalizada y el número real de WhatsApp antes de distribuirla.
