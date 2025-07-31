export async function renderRestaurante(container) {
  const res = await fetch('components/restaurante.html');
  const html = await res.text();
  container.innerHTML += html;
}
