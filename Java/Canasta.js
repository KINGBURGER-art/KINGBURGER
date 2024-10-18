
document.addEventListener('DOMContentLoaded', function () {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    const generatePdfButton = document.getElementById('submit-button');
    const clearCartButton = document.getElementById('clear-cart');
    const customAlert = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('alert-message');
    let cartItems = [];
    let totalAmount = 0;

    // Función para mostrar el modal con un mensaje personalizado
    function showAlert(message) {
        alertMessage.textContent = message;
        customAlert.style.display = 'flex'; // Muestra el modal centrado
    }

    // Cerrar el modal cuando el usuario haga clic en el botón de cerrar o en la 'X'
    document.getElementById('close-alert').addEventListener('click', () => {
        customAlert.style.display = 'none';
    });

    document.querySelector('.close-btn').addEventListener('click', () => {
        customAlert.style.display = 'none';
    });

    window.onclick = function (event) {
        if (event.target === customAlert) {
            customAlert.style.display = 'none';
        }
    };

    function updateCartDisplay() {
        const tbody = document.getElementById('cart-items-body');
        tbody.innerHTML = '';

        cartItems.forEach((item, index) => {
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.textContent = item.name;
            row.appendChild(nameCell);

            const priceCell = document.createElement('td');
            priceCell.textContent = `$${item.price.toFixed(2)}`;
            row.appendChild(priceCell);

            const quantityCell = document.createElement('td');
            quantityCell.textContent = item.quantity;
            row.appendChild(quantityCell);

            const deleteCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.className = 'delete-button';
            deleteButton.addEventListener('click', () => removeFromCart(index));
            deleteCell.appendChild(deleteButton);
            row.appendChild(deleteCell);

            tbody.appendChild(row);
        });

        totalElement.textContent = `Total: $${totalAmount.toFixed(2)}`;
    }

    // Función que elimina un producto del carrito
    function removeFromCart(index) {
        if (index >= 0 && index < cartItems.length) {
            const item = cartItems[index];
            if (item.quantity > 1) {
                item.quantity -= 1;
                totalAmount -= item.price;
            } else {
                totalAmount -= item.price;
                cartItems.splice(index, 1);
            }
            updateCartDisplay();
        }
    }

    // Función para agregar productos al carrito
    function addToCart(name, price) {
        const existingItem = cartItems.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({
                name: name,
                price: parseFloat(price),
                quantity: 1
            });
        }
        totalAmount += parseFloat(price);
        updateCartDisplay();
    }

    function clearCart() {
        cartItems = [];
        totalAmount = 0;
        updateCartDisplay();
    }

    function isFormValid() {
        const toName = document.querySelector('input[name="to_name"]').value.trim();
        const toPhone = document.querySelector('input[name="to_phone"]').value.trim();
        const toEmail = document.querySelector('input[name="to_email"]').value.trim();
        return toName !== '' && toPhone !== '' && toEmail !== '';
    }

    // Nueva función para limpiar el formulario después del envío
    function clearForm() {
        document.querySelector('input[name="to_name"]').value = '';
        document.querySelector('input[name="to_phone"]').value = '';
        document.querySelector('input[name="to_email"]').value = '';
    }

    function sendInvoiceAndForm() {
        if (cartItems.length === 0) {
            showAlert('La canasta está vacía. Por favor, agrega productos a tu canasta antes de enviar la factura.​');
            return;
        }

        if (!isFormValid()) {
            showAlert('Por favor, completa todos los campos del formulario.');
            return;
        }

        const cartData = cartItems.map(item => ({
            description: item.name,
            unit_price: item.price.toFixed(2),
            quantity: item.quantity,
            price_total: (item.price * item.quantity).toFixed(2)
        }));

        const templateParams = {
            to_name: document.querySelector('input[name="to_name"]').value,
            to_phone: document.querySelector('input[name="to_phone"]').value,
            to_email: document.querySelector('input[name="to_email"]').value,
            current_time: new Date().toLocaleString(),
            cart_items: JSON.stringify(cartData),
            cart_total: totalAmount.toFixed(2),
            description1: cartData[0] ? cartData[0].description : '',
            unit_price1: cartData[0] ? cartData[0].unit_price : '',
            quantity1: cartData[0] ? cartData[0].quantity : '',
            price_total1: cartData[0] ? cartData[0].price_total : '',
            description2: cartData[1] ? cartData[1].description : '',
            unit_price2: cartData[1] ? cartData[1].unit_price : '',
            quantity2: cartData[1] ? cartData[1].quantity : '',
            price_total2: cartData[1] ? cartData[1].price_total : '',
            description3: cartData[2] ? cartData[2].description : '',
            unit_price3: cartData[2] ? cartData[2].unit_price : '',
            quantity3: cartData[2] ? cartData[2].quantity : '',
            price_total3: cartData[2] ? cartData[2].price_total : '',
            description4: cartData[3] ? cartData[3].description : '',
            unit_price4: cartData[3] ? cartData[3].unit_price : '',
            quantity4: cartData[3] ? cartData[3].quantity : '',
            price_total4: cartData[3] ? cartData[3].price_total : '',
            description5: cartData[4] ? cartData[4].description : '',
            unit_price5: cartData[4] ? cartData[4].unit_price : '',
            quantity5: cartData[4] ? cartData[4].quantity : '',
            price_total5: cartData[4] ? cartData[4].price_total : ''
        };

        emailjs.send('default_service', 'template_q7eensc', templateParams)
            .then(() => {
                return emailjs.send('default_service', 'template_q7eensc', {
                    to_email: 'kingburguer.sv@gmail.com',
                    current_time: new Date().toLocaleString(),
                    to_name: templateParams.to_name,
                    to_phone: templateParams.to_phone,
                    cart_total: templateParams.cart_total,
                    description1: templateParams.description1,
                    unit_price1: templateParams.unit_price1,
                    quantity1: templateParams.quantity1,
                    price_total1: templateParams.price_total1,
                    description2: templateParams.description2,
                    unit_price2: templateParams.unit_price2,
                    quantity2: templateParams.quantity2,
                    price_total2: templateParams.price_total2,
                    description3: templateParams.description3,
                    unit_price3: templateParams.unit_price3,
                    quantity3: templateParams.quantity3,
                    price_total3: templateParams.price_total3,
                    description4: templateParams.description4,
                    unit_price4: templateParams.unit_price4,
                    quantity4: templateParams.quantity4,
                    price_total4: templateParams.price_total4,
                    description5: templateParams.description5,
                    unit_price5: templateParams.unit_price5,
                    quantity5: templateParams.quantity5,
                    price_total5: templateParams.price_total5
                });
            })
        .then(() => {
            showAlert('Su factura ha sido enviada. ¡Gracias por comprar en KINGBURGER!');
            clearForm();  // Limpia el formulario después de enviar
            clearCart();  // Limpia el carrito después de enviar
        }, (err) => {
            showAlert('Error al enviar factura, intente nuevamente: ' + JSON.stringify(err));
        });
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const name = this.parentElement.querySelector('.product-name').textContent;
            const price = this.dataset.price;
            addToCart(name, price);
        });
    });

    generatePdfButton.addEventListener('click', (event) => {
        event.preventDefault();
        sendInvoiceAndForm();
    });

    clearCartButton.addEventListener('click', clearCart);
});
