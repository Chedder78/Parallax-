document.addEventListener('DOMContentLoaded', function() {
    // Toggle the sliding menu
    const menuToggle = document.getElementById('menu-toggle');
    const slidingMenu = document.getElementById('sliding-menu');
    const overlay = document.getElementById('overlay');
    
    menuToggle.addEventListener('click', function() {
        slidingMenu.classList.toggle('show-menu');
        overlay.style.display = slidingMenu.classList.contains('show-menu') ? 'block' : 'none';
    });

    // Hide menu on overlay click
    overlay.addEventListener('click', function() {
        slidingMenu.classList.remove('show-menu');
        overlay.style.display = 'none';
    });

    // Smooth scroll and LED effect on menu item click
    document.querySelectorAll('#sliding-menu ul li a').forEach(menuItem => {
        menuItem.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            slidingMenu.classList.remove('show-menu');
            overlay.style.display = 'none';

            window.scrollTo({
                top: targetSection.offsetTop - 60, // Adjust for fixed header
                behavior: 'smooth'
            });

            document.querySelectorAll('.glassmorphism').forEach(section => section.classList.remove('selected'));
            targetSection.classList.add('selected');
        });
    });

    // Parallax effect with Intersection Observer
    const parallaxElements = document.querySelectorAll('.parallax');
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
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

    parallaxElements.forEach(el => observer.observe(el));

    // Scroll-triggered animations (reveal sections)
    const sections = document.querySelectorAll('.section');
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < windowHeight - 50) {
                section.classList.add('in-view');
            }
        });
    });

    // 3D model viewing with Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gpk-3d-viewer') });

    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 5;

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    };

    animate();

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        document.querySelector('header').classList.toggle('dark-mode');
    });

    // Scroll-triggered animations (reveal sections)
    const scrollElements = document.querySelectorAll('.scroll-animate');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    scrollElements.forEach(el => scrollObserver.observe(el));
});
