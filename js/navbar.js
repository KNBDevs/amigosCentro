export async function renderNavbar(container) {
    try {
        const res = await fetch('components/navbar.html');
        if (!res.ok) {
            console.error('No se pudo cargar navbar.html');
            return;
        }

        const html = await res.text();
        container.innerHTML = html;

        if (window.__translatePage) window.__translatePage();
        if (window.setupLanguageSwitcher) window.setupLanguageSwitcher();

        // Esperar a que el DOM inserte el contenido
        setTimeout(() => {
            const burgerBtn = document.querySelector('#burger-button');
            const burgerIcon = document.querySelector('#burger-icon');
            const mobileMenu = document.querySelector('#mobile-menu');

            if (!burgerBtn || !mobileMenu || !burgerIcon) return;

            let isOpen = false;

            const openMenu = () => {
                // Aseguramos transición
                mobileMenu.style.transition = 'transform 300ms ease';
                mobileMenu.style.transform = 'translateX(0)';          // <- aquí el “abrir”
                isOpen = true;
                updateIcon();
                document.addEventListener('keydown', handleKeyDown);
                document.addEventListener('click', handleClickOutside);
            };

            const closeMenu = () => {
                mobileMenu.style.transition = 'transform 300ms ease';
                mobileMenu.style.transform = 'translateX(100%)';       // <- aquí el “cerrar”
                isOpen = false;
                updateIcon();
                document.removeEventListener('keydown', handleKeyDown);
                document.removeEventListener('click', handleClickOutside);
            };


            const toggleMenu = () => {
                isOpen ? closeMenu() : openMenu();
            };

            const updateIcon = () => {
                if (isOpen) {
                    burgerIcon.innerHTML = `
            <path d="M6 18L18 6M6 6l12 12"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round" />
        `;
                } else {
                    burgerIcon.innerHTML = `
            <path d="M4 6h16M4 12h16M4 18h16"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round" />
        `;
                }
            };


            const handleClickOutside = (e) => {
                if (!mobileMenu.contains(e.target) && !burgerBtn.contains(e.target)) {
                    closeMenu();
                }
            };

            const handleKeyDown = (e) => {
                if (e.key === 'Escape') closeMenu();
            };

            burgerBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleMenu();
            });

            mobileMenu.querySelectorAll('a, button').forEach((el) => {
                el.addEventListener('click', () => closeMenu());
            });

            if (window.setupLanguageSwitcher) window.setupLanguageSwitcher();
        }, 50);
    } catch (error) {
        console.error('Error cargando el navbar:', error);
    }
}
