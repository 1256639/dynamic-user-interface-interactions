function setupDropdown(dropdown) {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');

    toggle.addEventListener('click', function(event) {
        event.stopPropagation();
        menu.classList.toggle('visible');
    });

    document.addEventListener('click', function() {
        menu.classList.remove('visible');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.dropdown').forEach(setupDropdown);
});