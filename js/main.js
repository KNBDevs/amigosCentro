import { renderNavbar } from "./navbar.js";
import { renderHero } from "./hero.js";
import { renderCocina } from "./cocina.js";
import { renderBanner } from "./banner.js";
import { renderHistoria } from "./historia.js";
import { renderRestaurante } from "./restaurante.js";
import { renderRestauranteFooter } from "./restauranteFooter.js"; // <- nuevo import
import { renderFooter } from "./footer.js";

const app = document.getElementById("app");

document.addEventListener("DOMContentLoaded", async () => {
  await renderNavbar(app);
  await renderHero(app);
  await renderCocina(app);
  await renderHistoria(app);
  await renderBanner(app);
  await renderRestaurante(app);
  await renderRestauranteFooter(app); // <- inserta aquí
  await renderFooter(app);

  if (window.__translatePage) {
    window.__translatePage(document);
  }
  if (window.setupLanguageSwitcher) {
    window.setupLanguageSwitcher();
  }
});
