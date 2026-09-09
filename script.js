(function () {
  "use strict";

  // ── Rellenar cuando esté disponible ──────────────────────────────
  // Número de WhatsApp/móvil en formato internacional sin espacios, ej. "34600123456".
  // Mientras esté vacío, el botón de WhatsApp y la tarjeta de "Móvil" permanecen ocultos.
  var WHATSAPP_NUMBER = "";
  // Cómo se muestra el número en la tarjeta, ej. "600 123 456". Si se deja vacío
  // se usa WHATSAPP_NUMBER tal cual con un "+" delante.
  var WHATSAPP_DISPLAY = "";

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

  // ── Datos de contacto (una fuente para las vCards individuales) ───
  var CONTACTS = {
    fijo: {
      name: "Las Raíces – Danza y Flamenco (Fijo)",
      org: "Las Raíces – Danza y Flamenco",
      tel: "+34916546089",
      telType: "WORK,VOICE",
      email: "info@raicesdanzayflamenco.com",
      adr: ";;Calle del Fuego 57;Alcobendas;Madrid;28100;España",
      url: "https://www.raicesdanzayflamenco.com"
    }
    // "movil" se añade dinámicamente más abajo si WHATSAPP_NUMBER tiene valor.
  };

  function buildVCard(c) {
    var lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "N:;" + c.name + ";;;",
      "FN:" + c.name,
      "ORG:" + c.org,
      "TEL;TYPE=" + c.telType + ":" + c.tel,
      "EMAIL;TYPE=WORK:" + c.email,
      "ADR;TYPE=WORK:" + c.adr,
      "URL:" + c.url,
      "END:VCARD"
    ];
    return lines.join("\r\n");
  }

  function downloadVCard(c) {
    var blob = new Blob([buildVCard(c)], { type: "text/vcard;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = c.name.replace(/[()]/g, "") + ".vcf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
  }

  function saveContact(key) {
    var c = CONTACTS[key];
    if (c) downloadVCard(c);
  }

  // ── Móvil (tarjeta de contacto directo) ───────────────────────────
  var mobileCard = document.getElementById("mobileCard");
  var mobileNumberEl = document.getElementById("mobileNumber");
  var mobileCallBtn = document.getElementById("mobileCallBtn");
  var saveContactLabel = document.getElementById("saveContactLabel");
  var saveContactHint = document.getElementById("saveContactHint");

  if (mobileCard && WHATSAPP_NUMBER) {
    CONTACTS.movil = {
      name: "Las Raíces – Danza y Flamenco (Móvil / WhatsApp)",
      org: "Las Raíces – Danza y Flamenco",
      tel: "+" + WHATSAPP_NUMBER,
      telType: "CELL",
      email: "info@raicesdanzayflamenco.com",
      adr: ";;Calle del Fuego 57;Alcobendas;Madrid;28100;España",
      url: "https://www.raicesdanzayflamenco.com"
    };

    mobileNumberEl.textContent = WHATSAPP_DISPLAY || "+" + WHATSAPP_NUMBER;
    mobileCallBtn.href = "tel:+" + WHATSAPP_NUMBER;
    mobileCard.hidden = false;

    if (saveContactLabel) saveContactLabel.textContent = "Guardar los dos contactos";
    if (saveContactHint) saveContactHint.textContent = "Añade el fijo y el móvil a tu agenda sin escribir nada a mano";
  }

  // ── Botones de guardar individuales (uno por tarjeta) ─────────────
  var saveButtons = document.querySelectorAll("[data-save]");
  for (var i = 0; i < saveButtons.length; i++) {
    saveButtons[i].addEventListener("click", function (e) {
      saveContact(e.currentTarget.getAttribute("data-save"));
    });
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

  // ── Guardar contacto(s) — botón ancho ──────────────────────────────
  var saveContactBtn = document.getElementById("saveContactBtn");
  if (saveContactBtn) {
    saveContactBtn.addEventListener("click", function () {
      saveContact("fijo");
      if (CONTACTS.movil) saveContact("movil");
    });
  }
})();
