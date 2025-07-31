export async function renderHero(container) {
  const res = await fetch('components/hero.html');
  const html = await res.text();
  container.innerHTML += html;
}
