export async function renderNavbar(container) {
    try {
        const res = await fetch('components/navbar.html');
        if (!res.ok) {
            console.error('No se pudo cargar navbar.html');
            return;
        }

        const html = await res.text();
        container.innerHTML += html;

        if (window.__translatePage) window.__translatePage();
        if (window.setupLanguageSwitcher) window.setupLanguageSwitcher();

        requestAnimationFrame(() => {
            const burgerBtn = document.querySelector('#burger-button');
            const burgerIcon = document.querySelector('#burger-icon');
            const mobileMenu = document.querySelector('#mobile-menu');

            if (!burgerBtn || !mobileMenu || !burgerIcon) return;

            let isOpen = false;

            const openMenu = () => {
                mobileMenu.classList.remove('translate-x-full');
                mobileMenu.classList.add('translate-x-0');
                isOpen = true;
                updateIcon();
                document.addEventListener('keydown', handleKeyDown);
                document.addEventListener('click', handleClickOutside);
            };

            const closeMenu = () => {
                mobileMenu.classList.remove('translate-x-0');
                mobileMenu.classList.add('translate-x-full');
                isOpen = false;
                updateIcon();
                document.removeEventListener('keydown', handleKeyDown);
                document.removeEventListener('click', handleClickOutside);
            };

            const toggleMenu = () => {
                isOpen ? closeMenu() : openMenu();
            };

            const updateIcon = () => {
                burgerIcon.innerHTML = isOpen
                    ? '<path d="M6 18L18 6M6 6l12 12" />' // X
                    : '<path d="M4 6h16M4 12h16M4 18h16" />'; // hamburguesa
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

            // ✅ Reactiva el cambio de idioma en botones del menú móvil
            if (window.setupLanguageSwitcher) window.setupLanguageSwitcher();

        });
    } catch (error) {
        console.error('Error cargando el navbar:', error);
    }
}
