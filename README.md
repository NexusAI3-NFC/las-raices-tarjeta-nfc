# Las Raíces — Tarjeta digital NFC

Landing de una sola página (HTML/CSS/JS plano, sin build) pensada para abrirse
al acercar la tarjeta NFC al móvil. Despliegue en Vercel desde un repositorio
privado de GitHub.

## Pendiente de rellenar

- **WhatsApp**: editar `WHATSAPP_NUMBER` en `script.js` (formato
  internacional sin espacios, ej. `"34600123456"`). Mientras esté vacío, el
  botón permanece oculto en la tarjeta.
- **TikTok**: cuando exista la cuenta, en `script.js` cambiar
  `SOCIAL_LINKS.tiktok.enabled` a `true` y rellenar `url`. La tarjeta de
  TikTok pasa automáticamente de "Muy pronto" a enlace activo.
- **Horario de la tienda**: en `index.html`, buscar
  `[Horario pendiente de confirmar]` y sustituirlo por el horario real.

## Desarrollo local

Al ser HTML/CSS/JS estático, basta con abrir `index.html` en el navegador, o
servirlo con cualquier servidor estático, por ejemplo:

```
npx serve .
```

## Despliegue

Conectado a Vercel como proyecto estático (sin framework). Cualquier push a
`main` en GitHub despliega automáticamente.
