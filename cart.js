function updateCartBadge() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-badge');
    if (badge) {
        badge.innerText = totalItems;
        badge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartBadge();

    if (cart.length === 0) {
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = `
                <div style="text-align: center; padding: 40px 0;">
                    <h3 style="color: #777; margin-bottom: 15px;">سلة المشتريات فارغة</h3>
                    <a href="./index.html" class="btn-dark" style="display: inline-block;">العودة للتسوق</a>
                </div>
            `;
        }
        if (cartTotalElement) cartTotalElement.innerText = '0';
        return; 
    }

    if (cartItemsContainer) cartItemsContainer.innerHTML = ''; 
    let totalPrice = 0;

    cart.forEach((item, index) => {
        let cleanPrice = item.price.replace(/[^\d]/g, ''); 
        let priceNumber = parseInt(cleanPrice) || 0;
        totalPrice += priceNumber * item.quantity; 

        if (cartItemsContainer) {
            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <img src="${item.img}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        
                        <div style="display: flex; align-items: center; gap: 10px; margin-top: 10px;">
                            <button onclick="decreaseQuantity(${index})" style="padding: 5px 12px; cursor: pointer; border: 1px solid #ccc; border-radius: 5px; background: #fff; font-weight: bold;">-</button>
                            <span style="font-size: 16px; font-weight: bold;">${item.quantity}</span>
                            <button onclick="increaseQuantity(${index})" style="padding: 5px 12px; cursor: pointer; border: 1px solid #ccc; border-radius: 5px; background: #fff; font-weight: bold;">+</button>
                        </div>

                    </div>
                    <div class="cart-item-price">${item.price}</div>
                    <button class="btn-remove" onclick="removeItem(${index})">حذف</button>
                </div>
            `;
        }
    });

    if (cartTotalElement) {
        cartTotalElement.innerText = totalPrice.toLocaleString();
    }
}

window.increaseQuantity = function(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
};

window.decreaseQuantity = function(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1); 
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
};

window.removeItem = function(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); 
    localStorage.setItem('cart', JSON.stringify(cart)); 
    loadCart(); 
};

loadCart();