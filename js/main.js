import { renderNavbar } from "./navbar.js";
import { renderHero } from "./hero.js";
import { renderCocina } from "./cocina.js";
import { renderHistoria } from "./historia.js";
import { renderRestaurante } from "./restaurante.js";
import { renderFooter } from "./footer.js";

// Contenedor principal
const app = document.getElementById("app");

document.addEventListener("DOMContentLoaded", async () => {
  // Inyectar secciones en orden
  await renderNavbar(app);
  await renderHero(app);
  await renderCocina(app);
  await renderHistoria(app);
  await renderRestaurante(app);
  await renderFooter(app);

  // Traducir todo una vez inyectado
  if (window.__translatePage) {
    window.__translatePage(document);
  }

  // Activar botones de idioma por si aún no lo hiciste
  if (window.setupLanguageSwitcher) {
    window.setupLanguageSwitcher();
  }
});
