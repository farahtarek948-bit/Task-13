function updateCartBadge() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const badge = document.getElementById('cart-badge');
    if (badge) {
        badge.innerText = totalItems;
        badge.style.display = totalItems > 0 ? 'flex' : 'none'; 
    }
}

updateCartBadge();

const addButtons = document.querySelectorAll('.btn-outline');

addButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); 
        
        const card = event.target.closest('.product-card');
        if (!card) return;

        const product = {
            name: card.querySelector('h3').innerText,
            price: card.querySelector('.price').innerText,
            img: card.querySelector('img').src,
            quantity: 1
        };
        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        const existingProduct = cart.find(item => item.name === product.name);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push(product);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        
        updateCartBadge(); 
    });
});