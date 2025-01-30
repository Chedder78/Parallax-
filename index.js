// script.js
document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.querySelector(".card-container");

  // Add event listener to flip the card on click
  cardContainer.addEventListener("click", () => {
    cardContainer.classList.toggle("flipped");
  });

  // Create a Three.js scene for depth effect
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 300 / 400, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(300, 400);
  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.top = "0";
  renderer.domElement.style.left = "0";
  renderer.domElement.style.pointerEvents = "none"; // Allow clicks to pass through
  cardContainer.appendChild(renderer.domElement);

  // Add a depth layer inside the card
  const geometry = new THREE.BoxGeometry(2.8, 3.8, 0.2);
  const material = new THREE.MeshBasicMaterial({ color: 0xcccccc, transparent: true, opacity: 0.5 });
  const depthLayer = new THREE.Mesh(geometry, material);
  depthLayer.position.z = -0.5; // Position inside the card
  scene.add(depthLayer);

  // Position the camera
  camera.position.z = 5;

  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);
    depthLayer.rotation.y += 0.01; // Rotate the depth layer for a dynamic effect
    renderer.render(scene, camera);
  };
  animate();
});

document.addEventListener('DOMContentLoaded', () => {
    // Add Ripple Effect on Buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;
            ripple.classList.add('ripple-effect');
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Scroll-triggered Animations
    const scrollElements = document.querySelectorAll('.product-card, .category, .testimonial-card');
    const scrollObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
            }
        });
    }, { threshold: 0.2 });

    scrollElements.forEach(element => scrollObserver.observe(element));

    // Cart Functionality
    const cart = [];
    const cartModal = document.createElement('div');
    cartModal.classList.add('cart-modal');
    cartModal.innerHTML = `
        <div class="cart-content">
            <h2>Your Cart</h2>
            <ul class="cart-items"></ul>
            <div class="cart-summary">
                <p>Total: $<span class="cart-total">0.00</span></p>
                <button class="checkout-btn">Checkout</button>
            </div>
            <button class="close-cart">&times;</button>
        </div>
    `;
    document.body.appendChild(cartModal);

    const updateCart = () => {
        const cartItemsElement = document.querySelector('.cart-items');
        const cartTotalElement = document.querySelector('.cart-total');

        cartItemsElement.innerHTML = ''; // Clear cart

        let total = 0;
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.classList.add('cart-item');
            li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.dataset.index = index;
            removeButton.classList.add('remove-item');
            removeButton.addEventListener('click', () => {
                cart.splice(index, 1);
                updateCart();
            });
            li.appendChild(removeButton);
            cartItemsElement.appendChild(li);
            total += item.price;
        });

        cartTotalElement.textContent = total.toFixed(2);
    };

    document.querySelectorAll('.product-card button').forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseFloat(productCard.querySelector('p').textContent.replace('$', ''));

            cart.push({ name: productName, price: productPrice });
            updateCart();
        });
    });

    document.querySelector('.checkout-btn').addEventListener('click', () => {
        alert(`Thank you for your purchase! Total: $${document.querySelector('.cart-total').textContent}`);
        cart.length = 0; // Clear cart
        updateCart();
        cartModal.style.display = 'none';
    });

    document.querySelector('.close-cart').addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Modal Functions
    function openModal(productId) {
        document.getElementById('productModal').style.display = 'block';
        document.getElementById(productId).style.display = 'block';
    }

    function closeModal() {
        document.getElementById('productModal').style.display = 'none';
        const slides = document.getElementsByClassName('modal-slide');
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }
    }

    // Service Worker Registration
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker
                .register("/service-worker.js") // Ensure this path matches your actual service worker file location.
                .then((registration) => {
                    console.log("Service Worker registered with scope:", registration.scope);
                })
                .catch((error) => {
                    console.error("Service Worker registration failed:", error);
                });
        });
    }

    // Fetch and Render Products
    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            if (!response.ok) throw new Error(`Error fetching products: ${response.status}`);
            const products = await response.json();

            const productContainer = document.querySelector('.product-grid');
            productContainer.innerHTML = ''; // Clear previous products

            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card', 'glass');

                const img = document.createElement('img');
                img.src = product.image_url;
                img.alt = product.name;
                img.loading = 'lazy';
                productCard.appendChild(img);

                const name = document.createElement('h3');
                name.textContent = product.name;
                productCard.appendChild(name);

                const price = document.createElement('p');
                price.textContent = `$${product.price.toFixed(2)}`;
                productCard.appendChild(price);

                const button = document.createElement('button');
                button.textContent = 'Add to Cart';
                button.addEventListener('click', () => addToCart(product.id));
                productCard.appendChild(button);

                productContainer.appendChild(productCard);
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    fetchProducts();
});
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function StoreModel() {
  const gltfRef = useRef();
  const [model, setModel] = useState(null);

  useFrame(() => {
    if (gltfRef.current) {
      gltfRef.current.rotation.y += 0.01; // Rotate the model
    }
  });

  const loader = new GLTFLoader();
  loader.load('/models/store.glb', (gltf) => {
    setModel(gltf.scene);
  });

  return model ? <primitive object={model} ref={gltfRef} /> : null;
}

export default function VirtualStore() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <StoreModel />
    </Canvas>
  );
}
