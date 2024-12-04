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
// static/js/index.js

// Keep your existing JavaScript code and add these new functions

// Function to fetch data from Python backend
async function fetchData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        updateContent(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to update content
function updateContent(data) {
    // Update your UI with the received data
    // Example:
    if (data.data.sections) {
        data.data.sections.forEach(section => {
            const element = document.getElementById(`section-${section.id}`);
            if (element) {
                element.textContent = section.content;
            }
        });
    }
}

// Function to handle form submissions
async function handleSubmit(formData) {
    try {
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        const result = await response.json();
        // Handle the response
        console.log(result);
    } catch (error) {
        console.error('Error submitting form:', error);
    }
}

// Call fetchData when the page loads
document.addEventListener('DOMContentLoaded', fetchData);
