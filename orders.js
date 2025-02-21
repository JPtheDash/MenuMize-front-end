const apiBaseUrl = "https://your-backend-url.com/api"; // Replace with your backend URL

// Admin login check
function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    if (user === "Admin" && pass === "adm123") {
        document.getElementById("login-section").style.display = "none";
        document.getElementById("orders-section").style.display = "block";
        fetchOrders();
    } else {
        document.getElementById("login-error").style.display = "block";
    }
}

// Fetch orders from backend
function fetchOrders() {
    fetch(`${apiBaseUrl}/orders`)
        .then(response => response.json())
        .then(data => {
            let ordersHtml = "";
            data.forEach(order => {
                ordersHtml += `<div class="order-item">
                                <p>🆔 Order #${order.id} - Table ${order.table}</p>
                                <ul>${order.items.map(item => `<li>${item.name} - ₹${item.price}</li>`).join("")}</ul>
                                <button onclick="markServed(${order.id})">✅ Mark Served</button>
                               </div>`;
            });
            document.getElementById("orders-list").innerHTML = ordersHtml;
        });
}

// Mark order as served
function markServed(orderId) {
    fetch(`${apiBaseUrl}/orders/${orderId}/serve`, { method: "POST" })
        .then(() => {
            alert("Order served!");
            fetchOrders(); // Refresh order list
        });
}
