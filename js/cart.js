document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    function renderCartItems() {
        cartItemsContainer.innerHTML = ''; // Clear existing items
        let total = 0;

        cartItems.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <h3>${item.name}</h3>
                <p>$${item.price}</p>
            `;
            cartItemsContainer.appendChild(cartItemElement);
            total += parseFloat(item.price);
        });

        cartTotalElement.textContent = total.toFixed(2);
    }

    renderCartItems(); // Initialize cart on page load
});
