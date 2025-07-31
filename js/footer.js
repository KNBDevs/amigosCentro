export async function renderFooter(container) {
  const res = await fetch('components/footer.html');
  const html = await res.text();
  container.innerHTML += html;
}
