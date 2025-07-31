// js/banner.js

export const renderBanner = async (container) => {
  const section = document.createElement('section');
  section.className = 'w-full overflow-hidden';

  section.innerHTML = `
    <img 
      src="assets/img/banner_2.jpg" 
      alt="Ambiente del restaurante"
      class="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover object-[40%_center] shadow-lg"
      loading="lazy"
    />
  `;

  container.appendChild(section);
};
