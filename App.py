import os
from flask import Flask, render_template, request, redirect, url_for, session, flash
from dotenv import load_dotenv

# Load environment variables from .env file (optional, for local use)
load_dotenv()

# Create Flask instance
app = Flask(__name__)
app.secret_key = os.getenv('FLASK_SECRET_KEY', 'default_secret_key')  # Use environment variable for the secret key

# Sample product data (you can replace this with a database or other data source later)
products = {
    1: {'name': 'Product 1', 'price': 10.00, 'image': 'images/20210804_060225.jpg', 'description': 'Description for product 1'},
    2: {'name': 'Product 2', 'price': 20.00, 'image': 'images/20220506_115059.jpg', 'description': 'Description for product 2'},
    3: {'name': 'Product 3', 'price': 30.00, 'image': 'images/GlowCardsSheet.jpg', 'description': 'Description for product 3'},
    4: {'name': 'Product 4', 'price': 40.00, 'image': 'images/Stoned Sean merch.png', 'description': 'Description for product 4'}
}

# Route to serve the index page
@app.route('/')
def index():
    return render_template('index.html', products=products)

# Route to add items to the shopping cart
@app.route('/add_to_cart/<int:product_id>')
def add_to_cart(product_id):
    if 'cart' not in session:
        session['cart'] = {}

    cart = session['cart']

    if str(product_id) in cart:
        cart[str(product_id)]['quantity'] += 1
    else:
        product = products.get(product_id)
        if product:
            cart[str(product_id)] = {
                'name': product['name'],
                'price': product['price'],
                'quantity': 1
            }

    session['cart'] = cart
    flash(f"{products[product_id]['name']} added to cart!")
    return redirect(url_for('cart'))

# Route to remove items from the shopping cart
@app.route('/remove_from_cart/<int:product_id>')
def remove_from_cart(product_id):
    if 'cart' in session:
        cart = session['cart']
        if str(product_id) in cart:
            cart[str(product_id)]['quantity'] -= 1
            if cart[str(product_id)]['quantity'] == 0:
                del cart[str(product_id)]

        session['cart'] = cart
        flash(f"{products[product_id]['name']} removed from cart!")

    return redirect(url_for('cart'))

# Route to display the cart page
@app.route('/cart')
def cart():
    cart = session.get('cart', {})
    total_price = sum(item['price'] * item['quantity'] for item in cart.values())
    return render_template('cart.html', cart=cart, total_price=total_price)

# Route to handle the contact form submission
@app.route('/contact', methods=['POST'])
def contact():
    name = request.form['name']
    email = request.form['email']
    message = request.form['message']
    # Here you would normally send an email, save the message to a database, etc.
    flash(f"Thank you for reaching out, {name}! We will get back to you shortly.")
    return redirect(url_for('index'))

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
