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

    // Parallax effect
    window.addEventListener('scroll', function() {
        document.querySelectorAll('.parallax').forEach(function(parallaxElement) {
            let offset = window.pageYOffset;
            parallaxElement.style.backgroundPositionY = offset * 0.7 + 'px';
        });
    });
});
transition: transform 0.3s ease, box-shadow 0.3s ease;
    font-size: 1.5rem;
    color: #ffa500; /* Solid orange color for the category and product items */
        });
    });
});
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

    // Parallax effect
    window.addEventListener('scroll', function() {
        document.querySelectorAll('.parallax').forEach(function(parallaxElement) {
            let offset = window.pageYOffset;
            parallaxElement.style.backgroundPositionY = offset * 0.7 + 'px';
        });
    });
});

