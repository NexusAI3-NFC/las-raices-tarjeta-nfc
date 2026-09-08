# Las Raíces — Tarjeta digital NFC

Landing de una sola página (HTML/CSS/JS plano, sin build) pensada para abrirse
al acercar la tarjeta NFC al móvil. Despliegue en Vercel desde un repositorio
privado de GitHub.

## Pendiente de rellenar

- **WhatsApp / móvil**: editar `WHATSAPP_NUMBER` en `script.js` (formato
  internacional sin espacios, ej. `"34600123456"`) y opcionalmente
  `WHATSAPP_DISPLAY` (ej. `"600 123 456"`). Mientras esté vacío: el botón de
  WhatsApp de acciones rápidas y la línea "Móvil · WhatsApp" del bloque
  "Contacto directo" permanecen ocultos, y el botón "Guardar contacto" solo
  añade el fijo. Al rellenarlo se activan ambos y el botón pasa a "Guardar
  los dos contactos" (incluyendo el móvil en el .vcf).
- **TikTok**: cuando exista la cuenta, en `script.js` cambiar
  `SOCIAL_LINKS.tiktok.enabled` a `true` y rellenar `url`. La tarjeta de
  TikTok pasa automáticamente de "Muy pronto" a enlace activo.

## Desarrollo local

Al ser HTML/CSS/JS estático, basta con abrir `index.html` en el navegador, o
servirlo con cualquier servidor estático, por ejemplo:

```
npx serve .
```

## Despliegue

Conectado a Vercel como proyecto estático (sin framework). Cualquier push a
`main` en GitHub despliega automáticamente.
