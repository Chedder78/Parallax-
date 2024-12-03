from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Replace with a secret key of your choice

# Sample products
products = {
    1: {'name': 'Product 1', 'price': 10.00, 'image': 'product1.jpg', 'description': 'Description for product 1.'},
    2: {'name': 'Product 2', 'price': 20.00, 'image': 'product2.jpg', 'description': 'Description for product 2.'},
    3: {'name': 'Product 3', 'price': 30.00, 'image': 'product3.jpg', 'description': 'Description for product 3.'},
    4: {'name': 'Product 4', 'price': 40.00, 'image': 'product4.jpg', 'description': 'Description for product 4.'},
    # Add more products as needed
}

@app.route('/')
def index():
    return render_template('index.html', products=products)

@app.route('/add_to_cart/<int:product_id>')
def add_to_cart(product_id):
    if 'cart' not in session:
        session['cart'] = {}
    
    cart = session['cart']

    if product_id in cart:
        cart[product_id]['quantity'] += 1
    else:
        cart[product_id] = {'name': products[product_id]['name'], 'price': products[product_id]['price'], 'quantity': 1}

    session['cart'] = cart
    return redirect(url_for('cart'))

@app.route('/remove_from_cart/<int:product_id>')
def remove_from_cart(product_id):
    if 'cart' in session:
        cart = session['cart']
        if product_id in cart:
            cart[product_id]['quantity'] -= 1
            if cart[product_id]['quantity'] == 0:
                del cart[product_id]
        
        session['cart'] = cart
    return redirect(url_for('cart'))

@app.route('/cart')
def cart():
    cart = session.get('cart', {})
    total_price = sum(item['price'] * item['quantity'] for item in cart.values())
    return render_template('cart.html', cart=cart, total_price=total_price)

if __name__ == '__main__':
    app.run(debug=True)
