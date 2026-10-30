const products = [
    {
        id: "cpu-1",
        name: "AMD Ryzen 7 7800X3D",
        category: "CPU",
        price: 364.89
    },
    {
        id: "cooler-1",
        name: "CPU Cooler",
        category: "Cooling",
        price: 34.90
    },
    {
        id: "motherboard-1",
        name: "Gigabyte B650 GAMING X AX",
        category: "Motherboard",
        price: 161.19
    },
    {
        id: "ram-1",
        name: "G.Skill Flare RAM",
        category: "RAM",
        price: 507.99
    },
    {
        id: "storage-1",
        name: "WD Black SN770 1TB NVMe SSD",
        category: "Storage",
        price: 274.89
    },
    {
        id: "gpu-1",
        name: "ASRock Phantom Gaming GPU",
        category: "GPU",
        price: 1008.14
    },
    {
        id: "power-1",
        name: "Gigabyte 1000 W Power Supply",
        category: "Power Supply",
        price: 105.96
    }
]

const productGrid = document.getElementById("product-grid");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const sortFilter = document.getElementById("sort-filter");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const headerCartCount = document.getElementById("header-cart-count");
const cartStatus = document.getElementById("cart-status");
const clearCartButton = document.getElementById("clear-cart-button");

let cart = [];

// display products
function displayProducts() {
    let filteredProducts = [...products];

    // Search products
    const search = searchInput.value.toLowerCase();

    filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(search)
    );

    // Filter by category
    if (categoryFilter.value !== "all") {
        filteredProducts = filteredProducts.filter(product =>
            product.category === categoryFilter.value
        );
    }

    // Sort products
    if (sortFilter.value === "price-low") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortFilter.value === "price-high") {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortFilter.value === "name") {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Display results
    productGrid.innerHTML = "";

    document.getElementById("results-summary").textContent = 
        filteredProducts.length + " parts found";

    if (filteredProducts.length === 0) {
        productGrid.innerHTML = "<p>No products found.</p>";
        return;
    }

    filteredProducts.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        const heading = document.createElement("h3");
        heading.textContent = product.name;

        const category = document.createElement("p");
        category.textContent = "Category: " + product.category;

        const price = document.createElement("p");
        price.textContent = "$" + product.price.toFixed(2);

        const button = document.createElement("button");
        button.textContent = "Add to Cart";
        button.setAttribute("aria-label", "Add " + product.name + " to cart");

        button.addEventListener("click", () => {
            addToCart(product, button);
        });

        card.appendChild(heading);
        card.appendChild(category);
        card.appendChild(price);
        card.appendChild(button);
        productGrid.appendChild(card);
    });
}

// Add product to cart
function addToCart(product, button) {
    if (button.disabled) return;

    button.disabled = true;
    button.textContent = "Adding...";

    cartStatus.textContent = "Adding " + product.name + "...";

    // Simulate a delay
    setTimeout(() => {
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        displayCart();

        button.disabled = false;
        button.textContent = "Add to Cart";

        cartStatus.textContent = product.name + " added to cart.";
    }, 500);
}

// Dispaly cart
function displayCart() {
    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        const div = document.createElement("div");
        div.className = "cart-item";

        const name = document.createElement("p");
        name.textContent = item.name;

        const quantity = document.createElement("p");
        quantity.textContent = "Quantity: " + item.quantity +
        " | Price: $" + (item.price * item.quantity).toFixed(2);

        const decrease = document.createElement("button");
        decrease.textContent = "-";
        decrease.setAttribute("aria-label", "Decrease quantity of " + item.name);

        decrease.addEventListener("click", () => {
            changeQuantity(item.id, -1);
        });

        const increase = document.createElement("button");
        increase.textContent = "+";
        increase.setAttribute("aria-label", "Increase quantity of " + item.name);

        increase.addEventListener("click", () => {
            changeQuantity(item.id, 1);
        });

        const remove = document.createElement("button");
        remove.textContent = "Remove";

        remove.addEventListener("click", () => {
            removeItem(item.id);
        });

        div.append(name, quantity, decrease, increase, remove);
        cartItems.appendChild(div);
    });

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    }

    cartTotal.textContent = "Total: $" + total.toFixed(2);
    cartCount.textContent = count;
    headerCartCount.textContent = count;

    clearCartButton.disabled = cart.length === 0;
}

// Change quantity
function changeQuantity(id, amount) {
    const item = cart.find(item => item.id === id);

    if (item) {
        item.quantity += amount;

        if (item.quantity <= 0) {
            removeItem(id);
        } else {
            displayCart();
        }
    }
}

// Remove item
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    displayCart();
    cartStatus.textContent = "Item removed from your cart.";
}

// Clart cart
clearCartButton.addEventListener("click", () => {
    cart = [];
    displayCart();
    cartStatus.textContent = "Cart cleared.";
});

// Search & filter
searchInput.addEventListener("input", displayProducts);
categoryFilter.addEventListener("change", displayProducts);
sortFilter.addEventListener("change", displayProducts);

// Reset filters
document.getElementById("reset-filters").addEventListener("click", () => {
    searchInput.value = "";
    categoryFilter.value = "all";
    sortFilter.value = "default";

    displayProducts();
});

// Initial display
displayProducts();
displayCart();