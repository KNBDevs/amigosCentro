let currentLang = localStorage.getItem("lang");
if (!["es", "en"].includes(currentLang)) {
    currentLang = "es";
    localStorage.setItem("lang", "es");
}

let translations = {};

// Traduce todos los elementos con data-i18n dentro del contenedor (o document)
function translatePage(container = document) {
  console.log("Traduciendo elementos...");
  container.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const text = translations[key];
    if (text && el.innerText !== text) {
      el.innerText = text;
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

        translatePage();         // traducir elementos ya en el DOM
        setupLanguageSwitcher(); // reactivar botones

    } catch (err) {
        console.error("Error cargando idioma:", err);
    }
}

// Activa todos los botones ES/EN visibles (móvil y desktop)
function setupLanguageSwitcher() {
    document.querySelectorAll('[data-lang]').forEach((btn) => {
        const lang = btn.dataset.lang;
        if (!lang) return;

        const clone = btn.cloneNode(true);
        clone.dataset.lang = lang;

        clone.addEventListener("click", () => {
            console.log(`PULSADO → ${lang.toUpperCase()}`);
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
