document.addEventListener('DOMContentLoaded', function() {
    // Toggle the sliding menu
    document.getElementById('menu-toggle').addEventListener('click', function() {
        var menu = document.getElementById('sliding-menu');
        var overlay = document.getElementById('overlay');
        if (menu.classList.contains('show-menu')) {
            menu.classList.remove('show-menu');
            overlay.style.display = 'none';
        } else {
            menu.classList.add('show-menu');
            overlay.style.display = 'block';
        }
    });

    // Hide the sliding menu when clicking the overlay
    document.getElementById('overlay').addEventListener('click', function() {
        var menu = document.getElementById('sliding-menu');
        var overlay = document.getElementById('overlay');
        menu.classList.remove('show-menu');
        overlay.style.display = 'none';
    });

    // Smooth scroll to sections
    document.querySelectorAll('#sliding-menu ul li a').forEach(function(menuItem) {
        menuItem.addEventListener('click', function(event) {
            event.preventDefault();
            var targetId = this.getAttribute('href').substring(1);
            var targetSection = document.getElementById(targetId);
            var menu = document.getElementById('sliding-menu');
            var overlay = document.getElementById('overlay');
            menu.classList.remove('show-menu');
            overlay.style.display = 'none';

            window.scrollTo({
                top: targetSection.offsetTop - 60, // Adjust for fixed header
                behavior: 'smooth'
            });

            // Add selected class for LED edge lighting effect
            document.querySelectorAll('.glassmorphism').forEach(function(section) {
                section.classList.remove('selected');
            });
            if (targetSection) {
                targetSection.classList.add('selected');
            }
        });
    });

    // Parallax effect using Intersection Observer and requestAnimationFrame
    const parallaxElements = document.querySelectorAll('.parallax');

    const observerOptions = {
        root: null,
        threshold: 0,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const parallaxElement = entry.target;
                const updateParallax = () => {
                    const scrollPosition = window.scrollY;
                    const offset = parallaxElement.offsetTop;
                    parallaxElement.style.backgroundPositionY = `${(scrollPosition - offset) * 0.5}px`;
                    requestAnimationFrame(updateParallax);
                };
                updateParallax();
            }
        });
    }, observerOptions);

    parallaxElements.forEach(parallaxElement => {
        observer.observe(parallaxElement);
    });
});
