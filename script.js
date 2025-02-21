const apiBaseUrl = "https://your-backend-url.com/api"; // Replace with your backend URL

// Fetch menu items
fetch(`${apiBaseUrl}/menu`)
    .then(response => response.json())
    .then(data => {
        let menuHtml = "";
        data.forEach(item => {
            menuHtml += `<div class="menu-item">
                            <p>${item.name} - ₹${item.price}</p>
                            <button onclick="addToCart('${item.name}', ${item.price})">➕ Add</button>
                         </div>`;
        });
        document.getElementById("menu-list").innerHTML = menuHtml;
    });

let cart = [];
function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById("cart-items");
    cartList.innerHTML = "";
    cart.forEach((item, index) => {
        cartList.innerHTML += `<li>${item.name} - ₹${item.price} <button onclick="removeFromCart(${index})">❌</button></li>`;
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function placeOrder() {
    fetch(`${apiBaseUrl}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table: 1, items: cart })
    })
    .then(response => response.json())
    .then(data => alert("Order Placed! Order ID: " + data.id));
}
