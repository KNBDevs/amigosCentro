let currentLang = localStorage.getItem("lang");
if (!["es", "en"].includes(currentLang)) {
  currentLang = "es";
  localStorage.setItem("lang", "es");
}

let translations = {};

// Renderiza un valor en un elemento:
function renderValue(el, value) {
  if (Array.isArray(value)) {
    el.innerHTML = value.map(line => `<span class="block">${line}</span>`).join("");
  } else if (typeof value === "string") {
    el.textContent = value;
  } else {
  }
}

// Traduce todos los elementos con data-i18n
function translatePage(container = document) {
  container.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key) return;

    const value = translations[key];
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      const newHTML = value.map(line => `<span class="block">${line}</span>`).join("");
      if (el.innerHTML !== newHTML) el.innerHTML = newHTML;
    } else {
      if (el.textContent !== String(value)) el.textContent = String(value);
    }
  });
}

// Carga el archivo de idioma y aplica traducción
async function loadTranslations(lang) {
  try {
    const res = await fetch(`assets/lang/${lang}.json`);
    if (!res.ok) {
      console.error(`Error al cargar el idioma: ${lang}`);
      return;
    }

    translations = await res.json();
    currentLang = lang;
    localStorage.setItem("lang", lang);
    document.documentElement.setAttribute("lang", lang);

    translatePage(document);
    setupLanguageSwitcher(); 

  } catch (err) {
    console.error("Error cargando idioma:", err);
  }
}

// Activa todos los botones ES/EN visibles (móvil y desktop)
function setupLanguageSwitcher() {
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    const lang = btn.dataset.lang;
    if (!lang) return;

    const clone = btn.cloneNode(true);
    clone.dataset.lang = lang;

    clone.addEventListener("click", () => {
      loadTranslations(lang);
    });

    btn.replaceWith(clone);
  });
}

// Exportar para poder usarlas desde otros scripts
window.__translatePage = translatePage;
window.setupLanguageSwitcher = setupLanguageSwitcher;

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  loadTranslations(currentLang);
});
