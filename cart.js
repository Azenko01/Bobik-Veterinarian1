document.addEventListener('DOMContentLoaded', function() {
    // Sample cart data
    const cartItems = [
        {
            id: 1,
            name: 'Premium Dog Food',
            price: 29.99,
            quantity: 2,
            image: '/images/dog-food.jpg'
        },
        {
            id: 2,
            name: 'Cat Scratching Post',
            price: 49.99,
            quantity: 1,
            image: '/images/cat-post.jpg'
        },
        {
            id: 3,
            name: 'Pet Vitamins',
            price: 19.99,
            quantity: 3,
            image: '/images/pet-vitamins.jpg'
        }
    ];

    // DOM elements
    const cartItemsContainer = document.getElementById('cart-items');
    const cartEmptyMessage = document.getElementById('cart-empty');
    const cartTotals = document.getElementById('cart-totals');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.querySelector('.cart-count');
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutForm = document.getElementById('checkout-form');
    const backToCartBtn = document.getElementById('back-to-cart');
    const paymentSelect = document.getElementById('payment');
    const creditCardFields = document.getElementById('credit-card-fields');
    const orderForm = document.getElementById('orderForm');
    const orderConfirmation = document.getElementById('order-confirmation');
    
    // Initialize cart
    function initCart() {
        if (cartItems.length === 0) {
            cartEmptyMessage.classList.remove('hidden');
            cartTotals.classList.add('hidden');
            cartCountElement.textContent = '0';
        } else {
            cartEmptyMessage.classList.add('hidden');
            cartTotals.classList.remove('hidden');
            renderCartItems();
            updateCartTotal();
            cartCountElement.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
        }
    }
    
    // Render cart items
    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        
        cartItems.forEach(item => {
            const itemRow = document.createElement('div');
            itemRow.className = 'cart-row';
            itemRow.dataset.id = item.id;
            
            itemRow.innerHTML = `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>Item #: PET-${1000 + item.id}</p>
                    </div>
                </div>
                <div class="cart-price" data-label="Price:">$${item.price.toFixed(2)}</div>
                <div class="cart-quantity" data-label="Quantity:">
                    <input type="number" min="1" value="${item.quantity}" class="quantity-input">
                </div>
                <div class="cart-subtotal">$${(item.price * item.quantity).toFixed(2)}</div>
                <div class="cart-remove">
                    <button class="remove-item" aria-label="Remove item">×</button>
                </div>
            `;
            
            cartItemsContainer.appendChild(itemRow);
        });
        
        // Add event listeners to quantity inputs and remove buttons
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', handleQuantityChange);
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', handleRemoveItem);
        });
    }
    
    // Update cart total
    function updateCartTotal() {
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalElement.textContent = `$${total.toFixed(2)}`;
        
        // Update hidden input for checkout
        if (document.getElementById('order-total')) {
            document.getElementById('order-total').value = total.toFixed(2);
        }
    }
    
    // Handle quantity change
    function handleQuantityChange(e) {
        const input = e.target;
        const newQuantity = parseInt(input.value);
        const itemRow = input.closest('.cart-row');
        const itemId = parseInt(itemRow.dataset.id);
        
        if (newQuantity < 1) {
            input.value = 1;
            return;
        }
        
        // Update quantity in cart items array
        const itemIndex = cartItems.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
            cartItems[itemIndex].quantity = newQuantity;
            
            // Update subtotal display
            const subtotalElement = itemRow.querySelector('.cart-subtotal');
            subtotalElement.textContent = `$${(cartItems[itemIndex].price * newQuantity).toFixed(2)}`;
            
            updateCartTotal();
            cartCountElement.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
        }
    }
    
    // Handle remove item
    function handleRemoveItem(e) {
        const button = e.target;
        const itemRow = button.closest('.cart-row');
        const itemId = parseInt(itemRow.dataset.id);
        
        // Remove item from cart items array
        const itemIndex = cartItems.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
            cartItems.splice(itemIndex, 1);
            
            // Remove row from DOM
            itemRow.remove();
            
            // Update cart
            if (cartItems.length === 0) {
                cartEmptyMessage.classList.remove('hidden');
                cartTotals.classList.add('hidden');
            }
            
            updateCartTotal();
            cartCountElement.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
        }
    }
    
    // Toggle checkout form
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            document.getElementById('cart-container').classList.add('hidden');
            checkoutForm.classList.remove('hidden');
            
            // Populate order items hidden input
            document.getElementById('order-items').value = JSON.stringify(cartItems);
        });
    }
    
    // Back to cart button
    if (backToCartBtn) {
        backToCartBtn.addEventListener('click', function() {
            checkoutForm.classList.add('hidden');
            document.getElementById('cart-container').classList.remove('hidden');
        });
    }
    
    // Toggle credit card fields based on payment method
    if (paymentSelect) {
        paymentSelect.addEventListener('change', function() {
            if (this.value === 'credit') {
                creditCardFields.classList.remove('hidden');
            } else {
                creditCardFields.classList.add('hidden');
            }
        });
    }
    
    // Handle form submission
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, you would send the form data to the server here
            // For this demo, we'll just show the confirmation
            
            checkoutForm.classList.add('hidden');
            orderConfirmation.classList.remove('hidden');
            
            // Set confirmation details
            document.getElementById('order-number').textContent = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
            document.getElementById('order-date').textContent = new Date().toLocaleDateString();
            document.getElementById('order-amount').textContent = cartTotalElement.textContent;
            document.getElementById('order-payment').textContent = paymentSelect.options[paymentSelect.selectedIndex].text;
        });
    }
    
    // Initialize mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.setAttribute('aria-expanded', 
                mobileMenuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
            );
        });
    }
    
    // Initialize the cart
    initCart();
});