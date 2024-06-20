document.addEventListener('DOMContentLoaded', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    const handleParallax = () => {
        const scrollPosition = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed');
            element.style.backgroundPositionY = `${-(scrollPosition * speed)}px`;
        });
    };

    window.addEventListener('scroll', handleParallax);
});
document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggle-button');
    const glassBox = document.getElementById('glassmorphism-box');

    toggleButton.addEventListener('click', function () {
        if (glassBox.classList.contains('hidden')) {
            glassBox.classList.remove('hidden');
            toggleButton.textContent = 'Hide About';
        } else {
            glassBox.classList.add('hidden');
            toggleButton.textContent = 'Show About';
        }
    });
});
