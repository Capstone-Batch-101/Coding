document.addEventListener('DOMContentLoaded', () => {
    // Load the saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // Add event listener to the theme select dropdown
    const themeSelect = document.getElementById('theme');
    if (themeSelect) {
        themeSelect.value = savedTheme; // Set the dropdown to the saved theme
        themeSelect.addEventListener('change', (e) => {
            setTheme(e.target.value);
        });
    }
});

function setTheme(theme) {
    // Remove existing theme classes
    document.body.classList.remove('light', 'dark');

    // Add the selected theme class
    document.body.classList.add(theme);

    // Save the theme in localStorage
    localStorage.setItem('theme', theme);
}