(function () {
  "use strict";

  // ── Rellenar cuando esté disponible ──────────────────────────────
  // Número de WhatsApp en formato internacional sin espacios, ej. "34600123456".
  // Mientras esté vacío, el botón de WhatsApp permanece oculto.
  var WHATSAPP_NUMBER = "";

  // ── Redes sociales ────────────────────────────────────────────────
  // Para activar TikTok cuando exista la cuenta: pon enabled:true y la url real.
  var SOCIAL_LINKS = {
    instagram: {
      enabled: true,
      url: "https://www.instagram.com/lasraices_modaflamenca/"
    },
    tiktok: {
      enabled: false,
      url: ""
    }
  };

  // ── WhatsApp ─────────────────────────────────────────────────────
  var whatsappBtn = document.getElementById("whatsappBtn");
  if (whatsappBtn && WHATSAPP_NUMBER) {
    whatsappBtn.href = "https://wa.me/" + WHATSAPP_NUMBER;
    whatsappBtn.target = "_blank";
    whatsappBtn.rel = "noopener";
    whatsappBtn.hidden = false;
  }

  // ── TikTok (por si en el futuro se quiere activar como enlace real) ─
  if (SOCIAL_LINKS.tiktok.enabled && SOCIAL_LINKS.tiktok.url) {
    var tiktokCard = document.querySelector(".tiktok-card");
    if (tiktokCard) {
      var link = document.createElement("a");
      link.href = SOCIAL_LINKS.tiktok.url;
      link.target = "_blank";
      link.rel = "noopener";
      link.className = tiktokCard.className.replace("tiktok-card", "tiktok-card tiktok-card--active");
      link.innerHTML = tiktokCard.innerHTML;
      link.querySelector(".tiktok-cta").textContent = "Síguenos en TikTok →";
      tiktokCard.replaceWith(link);
    }
  }

  // ── Guardar contacto (.vcf) ──────────────────────────────────────
  var saveContactBtn = document.getElementById("saveContactBtn");
  if (saveContactBtn) {
    saveContactBtn.addEventListener("click", function () {
      var lines = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        "N:;Las Raíces – Danza y Flamenco;;;",
        "FN:Las Raíces – Danza y Flamenco",
        "ORG:Las Raíces – Danza y Flamenco",
        "TEL;TYPE=WORK,VOICE:+34916546089",
        "EMAIL;TYPE=WORK:info@raicesdanzayflamenco.com",
        "ADR;TYPE=WORK:;;Calle del Fuego 57;Alcobendas;Madrid;28100;España",
        "URL:https://www.raicesdanzayflamenco.com",
        "END:VCARD"
      ];
      var vcard = lines.join("\r\n");
      var blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "Las-Raices-Danza-y-Flamenco.vcf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () {
        URL.revokeObjectURL(url);
      }, 1000);
    });
  }
})();
