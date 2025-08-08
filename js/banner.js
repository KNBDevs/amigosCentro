// js/banner.js
export const renderBanner = async (container) => {
  const section = document.createElement('section');

  // Full-bleed y altura reducida (recorta verticalmente)
  section.style.position = 'relative';
  section.style.width = '100vw';
  section.style.left = '50%';
  section.style.marginLeft = '-50vw';
  section.style.marginRight = '-50vw';
  section.style.height = '95vh'; // menos que pantalla completa
  section.style.overflow = 'hidden';

  // Fondo con zoom (recorte en bordes superior/inferior)
  section.style.backgroundImage = "url('assets/img/banner_2.jpg')";
  section.style.backgroundRepeat = 'no-repeat';
  section.style.backgroundPosition = '62% 50%'; // ajusta foco
  section.style.backgroundSize = 'cover';        // zoom (puedes subir/bajar este %)

  // Gradientes opcionales
  const topGrad = document.createElement('div');
  Object.assign(topGrad.style, {
    position: 'absolute', left: 0, right: 0, top: 0, height: '40px',
    pointerEvents: 'none',
    background: 'linear-gradient(to bottom, rgba(0,0,0,.45), rgba(0,0,0,0))'
  });
  const bottomGrad = document.createElement('div');
  Object.assign(bottomGrad.style, {
    position: 'absolute', left: 0, right: 0, bottom: 0, height: '40px',
    pointerEvents: 'none',
    background: 'linear-gradient(to top, rgba(0,0,0,.45), rgba(0,0,0,0))'
  });

  section.appendChild(topGrad);
  section.appendChild(bottomGrad);
  container.appendChild(section);
};
