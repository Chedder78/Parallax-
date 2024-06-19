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
