document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Toggle sliding menu
    const menuToggle = document.getElementById('menu-toggle');
    const slidingMenu = document.getElementById('sliding-menu');
    const overlay = document.getElementById('overlay');

    menuToggle.addEventListener('click', () => {
        slidingMenu.classList.toggle('show-menu');
        overlay.style.display = slidingMenu.classList.contains('show-menu') ? 'block' : 'none';
    });

    // Close menu when clicking outside
    overlay.addEventListener('click', () => {
        slidingMenu.classList.remove('show-menu');
        overlay.style.display = 'none';
    });

    // Example products
    const products = [
        { name: "GPK Product 1", price: 10.00, img: "https://via.placeholder.com/250x400" },
        { name: "GPK Product 2", price: 15.00, img: "https://via.placeholder.com/250x400" },
        { name: "GPK Product 3", price: 20.00, img: "https://via.placeholder.com/250x400" },
        { name: "GPK Product 4", price: 25.00, img: "https://via.placeholder.com/250x400" }
    ];

    // Dynamically create product items in the "All Products" section
    const allProductsContainer = document.getElementById('all-products');
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;
        allProductsContainer.appendChild(productItem);
    });

    // Function to add item to the cart
    function addToCart(productName, price) {
        const item = cart.find(i => i.name === productName);
        if (item) {
            item.quantity++;
        } else {
            cart.push({ name: productName, price: parseFloat(price), quantity: 1 });
        }
        updateCart();
        saveCart();
    }

    // Function to update the cart display
    function updateCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartCount = document.getElementById('cart-count');
        const cartTotal = document.getElementById('cart-total');
        
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p>${item.name} x ${item.quantity} - $${item.price.toFixed(2)} each</p>
                <p>$${itemTotal.toFixed(2)}</p>
                <button class="remove-item" data-name="${item.name}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartTotal.textContent = total.toFixed(2);

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemName = e.target.getAttribute('data-name');
                removeFromCart(itemName);
            });
        });
    }

    // Function to remove item from the cart
    function removeFromCart(productName) {
        cart = cart.filter(item => item.name !== productName);
        updateCart();
        saveCart();
    }

    // Function to save cart to local storage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Event listeners for "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productElement = e.target.closest('.product-item');
            const productName = productElement.querySelector('h3').textContent;
            const price = productElement.querySelector('p').textContent.replace('$', '');
            addToCart(productName, price);
        });
    });

    // Checkout button functionality
    document.getElementById('checkout-button').addEventListener('click', () => {
        if (cart.length > 0) {
            alert('Proceeding to checkout...');
            // Implement checkout logic here
        } else {
            alert('Your cart is empty.');
        }
    });

    // Load cart from local storage on page load
    updateCart();

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Dark Mode Toggle
    const toggleSwitch = document.getElementById('darkModeToggle');
    toggleSwitch.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Load Dark Mode Setting
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // Loading Animation
    window.addEventListener('load', () => {
        document.querySelector('.loading').style.display = 'none';
    });

    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
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

    // Scroll Animations
    const scrollElements = document.querySelectorAll('[data-scroll]');
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Initial check to show elements already in view
    handleScrollAnimation();

    // Search Functionality
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        document.querySelectorAll('.product-item').forEach(product => {
            const text = product.textContent.toLowerCase();
            product.style.display = text.includes(query) ? 'block' : 'none';
        });
    });

    // Image enlargement functionality
    document.querySelectorAll('.product-item img').forEach(img => {
        img.addEventListener('click', (e) => {
            img.style.transform = 'scale(1.25)';
        });

        document.addEventListener('click', (e) => {
            if (!img.contains(e.target)) {
                img.style.transform = 'scale(1)';
            }
        });
    });
});
