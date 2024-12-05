document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.add-to-cart');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            
            // Fetch call to Flask route to add item to cart
            fetch(`/add_to_cart/${productId}`, {
                method: 'GET'
            }).then(response => {
                if (response.ok) {
                    alert(`Product ID ${productId} has been added to your cart.`);
                    // Update the cart count dynamically
                    updateCartCount();
                } else {
                    alert('Failed to add item to cart.');
                }
            });
        });
    });
});

function updateCartCount() {
    fetch('/cart', {
        method: 'GET'
    }).then(response => response.json()).then(data => {
        const cartCount = Object.keys(data.cart).length;
        document.getElementById('cart-count').innerText = cartCount;
    });
}
