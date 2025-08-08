export async function renderRestauranteFooter(container) {
  const res = await fetch('components/restauranteFooter.html');
  const html = await res.text();
  container.innerHTML += html;
}
