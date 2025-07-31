export async function renderCocina(container) {
  const res = await fetch('components/cocina.html');
  const html = await res.text();
  container.innerHTML += html;
}
