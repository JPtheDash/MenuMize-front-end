const apiBaseUrl = "https://your-backend-url.com/api"; // Replace with your backend URL

// Fetch menu items
fetch(`${apiBaseUrl}/menu`)
    .then(response => response.json())
    .then(data => {
        let menuHtml = "";
        let categories = {};
        
        data.forEach(item => {
            if (!categories[item.category]) {
                categories[item.category] = [];
            }
            categories[item.category].push(item);
        });
        
        Object.keys(categories).forEach(category => {
            menuHtml += `<div class="menu-category">
                            <button class="category-toggle" onclick="toggleCategory('${category}')">${category} ⬇️</button>
                            <div id="${category}-list" class="menu-items hidden">`;
            
            categories[category].forEach(item => {
                menuHtml += `<div class="menu-item">
                                <p>${item.name} - ₹${item.price}</p>
                                <button class="add-btn" onclick="addToPlate('${item.name}', ${item.price})">➕ Add</button>
                             </div>`;
            });
            
            menuHtml += `</div></div>`;
        });
        
        document.getElementById("menu-list").innerHTML = menuHtml;
    });

function toggleCategory(categoryId) {
    document.getElementById(categoryId + "-list").classList.toggle("hidden");
}

let cart = [];

function addToPlate(itemName, price) {
    cart.push({ name: itemName, price: price });
    updatePlate();
}

function updatePlate() {
    const plateItems = document.getElementById("plate-items");
    const totalPrice = document.getElementById("total-price");
    plateItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - ₹${item.price}`;
        plateItems.appendChild(li);
        total += item.price;
    });

    totalPrice.textContent = total;
    document.getElementById("popup-total-price").textContent = total;
}

function showOrderPopup() {
    if (cart.length === 0) {
        alert("Your plate is empty! Add items before placing an order.");
        return;
    }
    document.getElementById("order-summary").innerHTML = cart.map(item => `<li>${item.name} - ₹${item.price}</li>`).join('');
    document.getElementById("order-popup").classList.add("show");
}

function closeOrderPopup() {
    document.getElementById("order-popup").classList.remove("show");
}

function placeOrder() {
    fetch(`${apiBaseUrl}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table: 1, items: cart })
    })
    .then(response => response.json())
    .then(data => {
        alert("Order Placed! Order ID: " + data.id);
        cart = [];
        updatePlate();
        closeOrderPopup();
    })
    .catch(error => alert("Error placing order!"));
}
