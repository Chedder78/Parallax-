// Cart Functionality
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-button');

// Sample data for items
const items = [
    { name: 'Item 1', price: 20.0 },
    { name: 'Item 2', price: 15.0 }
];

let total = 0;

// Render items
items.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
        <div class="item-details">
            <h3>${item.name}</h3>
            <p>Price: $${item.price.toFixed(2)}</p>
        </div>
    `;
    cartItems.appendChild(div);
    total += item.price;
});

cartTotal.textContent = total.toFixed(2);

// Checkout Button Alert
checkoutButton.addEventListener('click', () => {
    alert('Proceeding to checkout');
});
