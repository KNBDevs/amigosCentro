export async function renderHistoria(container) {
  const res = await fetch('components/historia.html');
  const html = await res.text();
  container.innerHTML += html;
}
