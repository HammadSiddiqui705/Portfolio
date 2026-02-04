document.addEventListener('DOMContentLoaded', function () {

    // Animations
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
        disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });


    // Dark mode Toggle
    const themeToggles = document.querySelectorAll('.themeToggle');
    const html = document.documentElement;

    function updateIcons(theme) {
        themeToggles.forEach(btn => {
            const icon = btn.querySelector('i');
            if (!icon) return;

            if (theme === 'dark') {
                icon.classList.remove('bi-moon-fill');
                icon.classList.add('bi-sun-fill');
                btn.setAttribute('aria-label', 'Switch to light mode');
            } else {
                icon.classList.remove('bi-sun-fill');
                icon.classList.add('bi-moon-fill');
                btn.setAttribute('aria-label', 'Switch to dark mode');
            }
        });
    }

    function setTheme(theme) {
        html.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
        updateIcons(theme);
    }

    /* Load saved theme (default = dark) */
    const savedTheme = localStorage.getItem('theme');

    setTheme(savedTheme ? savedTheme : 'dark');

    /* Click event for ALL buttons */
    themeToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    });

    /* System theme change */
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
});
