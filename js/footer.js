export async function renderFooter(container) {
  const res = await fetch('components/footer.html');
  const html = await res.text();
  container.innerHTML += html;

  setTimeout(() => {
    // Smooth para enlaces con hash
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        const target = id === '#' ? document.body : document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.pushState(null, '', id);
        }
      });
    });

    // Smooth explícito para el logo del footer (href="/")
    const logoTop = document.querySelector('footer a[title="Volver al inicio"]');
    if (logoTop) {
      logoTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
     
      });
    }
  }, 50);
}
