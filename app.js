(function() {
    let cart = [];
    let total = 0;

    document.addEventListener('DOMContentLoaded', function() {
        // Handle "Add Booth" button clicks
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('add-booth')) {
                addBooth(e.target);
            }

            if (e.target.classList.contains('remove-item')) {
                removeBooth(e.target);
            }
        });

        // Handle "Clear Cart" button
        const clearButton = document.getElementById('clear-cart');
        if (clearButton) {
            clearButton.addEventListener('click', clearCart);
        }
    });

    // Add booth to cart
    function addBooth(button) {
        const booth = button.closest('.booth');
        if (!booth) return;

        // Check if pre-booked
        if (booth.classList.contains('pre-booked')) {
            showMessage('This booth is pre-booked!');
            return;
        }

        const boothId = booth.dataset.booth;
        const price = parseInt(booth.dataset.price) || 0;

        // Check if already in cart (prevent duplicates)
        if (cart.find(item => item.id === boothId)) {
            showMessage('Booth already selected!');
            return;
        }

        // Add to cart
        cart.push({ id: boothId, price: price });
        total += price;

        // Mark as selected
        booth.classList.add('selected');

        // Update display
        updateCart();
    }

    // Remove booth from cart
    function removeBooth(button) {
        const cartItem = button.closest('.cart-item');
        if (!cartItem) return;

        const boothId = cartItem.dataset.booth;

        // Find in cart and remove
        const index = cart.findIndex(item => item.id === boothId);
        if (index > -1) {
            total -= cart[index].price;
            cart.splice(index, 1);
        }

        // Remove selected class
        const booth = document.querySelector(`[data-booth="${boothId}"]`);
        if (booth) {
            booth.classList.remove('selected');
        }

        // Update display
        updateCart();
    }

    // Clear entire cart
    function clearCart() {
        // Remove selected class from all booths
        cart.forEach(item => {
            const booth = document.querySelector(`[data-booth="${item.id}"]`);
            if (booth) {
                booth.classList.remove('selected');
            }
        });

        // Clear data
        cart = [];
        total = 0;

        // Update display
        updateCart();
    }

    // Update cart display using DOM methods
    function updateCart() {
        const cartContainer = document.getElementById('cart-items');
        const totalElement = document.getElementById('total-price');

        if (!cartContainer || !totalElement) return;

        // Clear cart display
        cartContainer.textContent = '';

        if (cart.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.className = 'empty-cart';
            emptyMessage.textContent = 'No booths selected';
            cartContainer.appendChild(emptyMessage);
        } else {
            // Add each cart item
            cart.forEach(item => {
                // Create cart item container
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.dataset.booth = item.id;

                // Create booth label
                const label = document.createElement('span');
                label.className = 'item-label';
                label.textContent = `Booth ${item.id}`;

                // Create price
                const price = document.createElement('span');
                price.className = 'item-price';
                price.textContent = `KD ${item.price}`;

                // Create remove button
                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-item';
                removeBtn.textContent = 'Remove';

                // Assemble cart item
                cartItem.appendChild(label);
                cartItem.appendChild(price);
                cartItem.appendChild(removeBtn);

                // Add to cart container
                cartContainer.appendChild(cartItem);
            });
        }

        // Update total
        totalElement.textContent = total;
    }

    // Simple alert message
    function showMessage(text) {
        alert(text);
    }

})();
