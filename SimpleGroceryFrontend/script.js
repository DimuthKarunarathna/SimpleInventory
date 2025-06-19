// --- Configuration ---
const API_BASE_URL = 'http://localhost:5181/api/Products'; // <<< REPLACE WITH YOUR ACTUAL BACKEND API URL

// --- DOM Elements ---
const productsContainer = document.getElementById('productsContainer');
const productForm = document.getElementById('productForm');
const productNameSelect = document.getElementById('productNameSelect'); // Updated ID
const productPriceInput = document.getElementById('productPrice');
const productQuantityInput = document.getElementById('productQuantity');

// --- Functions ---

// 1. Fetch and display all products
async function fetchProducts() {
    productsContainer.innerHTML = '<p>Loading products...</p>'; // Show loading message
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        productsContainer.innerHTML = '<p style="color: red;">Failed to load products. Is the backend API running?</p>';
    }
}

// 2. Render products into the HTML
function renderProducts(products) {
    productsContainer.innerHTML = ''; // Clear previous content
    if (products.length === 0) {
        productsContainer.innerHTML = '<p>No veggie products available yet. Add some above!</p>';
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.setAttribute('data-id', product.id); // Store ID for actions

        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <p>Quantity: ${product.quantity}</p>
            <div class="actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });

    // Attach event listeners for delete and edit buttons
    attachProductCardListeners();
}

// 3. Handle adding a new product
async function addProduct(event) {
    event.preventDefault(); // Prevent default form submission

    const name = productNameSelect.value; // Get value from select
    const price = parseFloat(productPriceInput.value);
    const quantity = parseInt(productQuantityInput.value);

    // Basic validation
    if (!name || name === "" || isNaN(price) || isNaN(quantity) || price < 0 || quantity < 0) {
        alert('Please select a veggie and enter valid price and quantity (positive numbers).');
        return;
    }

    const newProduct = { name, price, quantity };

    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const addedProduct = await response.json();
        console.log('Product added:', addedProduct);
        alert('Product added successfully!');
        productForm.reset(); // Clear the form
        fetchProducts(); // Refresh the list of products
    } catch (error) {
        console.error('Error adding product:', error);
        alert('Failed to add product. Check console for details.');
    }
}

// 4. Handle deleting a product
async function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/${productId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log(`Product ${productId} deleted.`);
        alert('Product deleted successfully!');
        fetchProducts(); // Refresh the list
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product. Check console for details.');
    }
}

// 5. Handle editing a product (simplified: opens prompt)
async function editProduct(productId, currentName, currentPrice, currentQuantity) {
    // For simplicity with the select, we'll still use a prompt for editing the name,
    // as changing the select value dynamically would be more complex for this quick build.
    // In a real app, you'd use a modal with dynamic select/input.
    const newName = prompt('Enter new name:', currentName);
    if (newName === null || newName === "") return; // User cancelled or entered empty name

    const newPriceStr = prompt('Enter new price:', currentPrice);
    const newPrice = parseFloat(newPriceStr);
    if (newPriceStr === null || isNaN(newPrice) || newPrice < 0) {
        alert('Invalid price.');
        return;
    }

    const newQuantityStr = prompt('Enter new quantity:', currentQuantity);
    const newQuantity = parseInt(newQuantityStr);
    if (newQuantityStr === null || isNaN(newQuantity) || newQuantity < 0) {
        alert('Invalid quantity.');
        return;
    }

    const updatedProduct = {
        id: productId, // Must include ID for PUT
        name: newName,
        price: newPrice,
        quantity: newQuantity
    };

    try {
        const response = await fetch(`${API_BASE_URL}/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        });

        // PUT usually returns 204 No Content for success
        if (response.status === 204) {
            console.log(`Product ${productId} updated.`);
            alert('Product updated successfully!');
            fetchProducts(); // Refresh the list
        } else if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error updating product:', error);
        alert('Failed to update product. Check console for details.');
    }
}

// 6. Attach listeners to dynamically created product cards
function attachProductCardListeners() {
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.onclick = (e) => {
            const card = e.target.closest('.product-card');
            const productId = parseInt(card.getAttribute('data-id'));
            deleteProduct(productId);
        };
    });

    document.querySelectorAll('.edit-btn').forEach(button => {
        button.onclick = (e) => {
            const card = e.target.closest('.product-card');
            const productId = parseInt(card.getAttribute('data-id'));
            const name = card.querySelector('h3').textContent;
            // Ensure you get the numeric value for price and quantity for the prompt
            const price = parseFloat(card.querySelector('p:nth-child(2)').textContent.replace('Price: $', ''));
            const quantity = parseInt(card.querySelector('p:nth-child(3)').textContent.replace('Quantity: ', ''));
            editProduct(productId, name, price, quantity);
        };
    });
}


// --- Event Listeners ---
productForm.addEventListener('submit', addProduct);

// --- Initial Load ---
document.addEventListener('DOMContentLoaded', fetchProducts); // Fetch products when the page loads