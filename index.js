document.querySelectorAll('#sliding-menu ul li a').forEach(function(menuItem) {
    menuItem.addEventListener('click', function() {
        var menu = document.getElementById('sliding-menu');
        var overlay = document.getElementById('overlay');
        menu.classList.remove('show-menu');
        overlay.style.display = 'none';
    });
});
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

    document.getElementById('overlay').addEventListener('click', function() {
        var menu = document.getElementById('sliding-menu');
        var overlay = document.getElementById('overlay');
        menu.classList.remove('show-menu');
        overlay.style.display = 'none';
    });

    document.querySelectorAll('#sliding-menu ul li a').forEach(function(menuItem) {
        menuItem.addEventListener('click', function() {
            var menu = document.getElementById('sliding-menu');
            var overlay = document.getElementById('overlay');
            menu.classList.remove('show-menu');
            overlay.style.display = 'none';
        });
    });

document.addEventListener('DOMContentLoaded', () => {
    const cartCount = document.getElementById('cart-count');
    const backToTopButton = document.getElementById('back-to-top');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const currentCount = parseInt(cartCount.textContent, 10);
            cartCount.textContent = currentCount + 1;
        });
    });
// Add this to your existing JavaScript file
function fetchDataFromPython() {
    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            // Handle the data here
            console.log(data);
            // Update your UI as needed
        })
        .catch(error => console.error('Error:', error));
}

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
