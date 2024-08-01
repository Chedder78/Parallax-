// cart.js
document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');
    const checkoutButton = document.getElementById('checkout-button');

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    function renderCartItems() {
        if (!cartItemsContainer) return;

        cartItemsContainer.innerHTML = ''; // Clear existing items
        let total = 0;

        cartItems.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');

            cartItemElement.innerHTML = `
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p>Price: $${item.price}</p>
                </div>
                <div class="item-price">$${item.price}</div>
                <button class="remove-button" data-item-id="${item.id}">Remove</button>
            `;

            cartItemsContainer.appendChild(cartItemElement);

            total += parseFloat(item.price);
        });

        cartTotalElement.textContent = total.toFixed(2);

        // Remove item from cart
        document.querySelectorAll('.remove-button').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.getAttribute('data-item-id');
                removeItemFromCart(itemId);
            });
        });
    }

    function updateCartCount() {
        if (cartCountElement) {
            cartCountElement.textContent = cartItems.length;
        }
    }

    function addToCart(item) {
        cartItems.push(item);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartCount();
    }

    function removeItemFromCart(itemId) {
        cartItems = cartItems.filter(item => item.id !== itemId);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCartItems();
        updateCartCount();
    }

    // Example function to add items to the cart (to be used in your product pages)
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const item = {
                id: this.getAttribute('data-id'),
                name: this.getAttribute('data-name'),
                price: this.getAttribute('data-price')
            };
            addToCart(item);
            alert('Item added to cart!');
        });
    });

    // Initialize cart on page load
    renderCartItems();
    updateCartCount();

    // Checkout button functionality
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            alert('Proceeding to checkout with total: $' + cartTotalElement.textContent);
            // Add checkout logic here
        });
    }
});
