let products = []; 
 


async function fetchProducts() {
    try {
        const response = await responseCheck('store.json');
        const data = await response.json();
        products = data; 
        

        const productsBlock = document.getElementById('productsBlock');
        if (productsBlock) {
            displayProducts(data);
        }
    } catch (error) {
        console.log('Помилка завантаження товарів:', error);
    }
}

async function responseCheck(url) {
    return await fetch(url);
}

function displayProducts(productsList) {
    const productsBlock = document.getElementById('productsBlock');
    productsBlock.innerHTML = ''; 
    
    productsList.forEach(product => {
        const card = createProductCard(product);
        productsBlock.innerHTML += card;
    });
}

function createProductCard(product) {
    return `
        <div class="card">
            <img src="img/${product.image || 'default.png'}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text fw-bold">${product.price} грн</p>
                <button onclick="addToCart(${product.id})" class="add-cart">В кошик</button>
            </div>
        </div>
    `;
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];


function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Товар "${product.name}" додано до кошика!`);
}


fetchProducts();

function renderCart() {
    const container = document.getElementById("cart-container");

    if (!container) return;

    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<h2>Кошик порожній 🛒</h2>";
        return;
    }

    cart.forEach(product => {
        container.innerHTML += `
            <div class="cart-item">
                <h3>${product.name}</h3>
                <p>Ціна: ${product.price} грн</p>
                <p>Кількість: ${product.quantity}</p>
                <button onclick="removeFromCart(${product.id})">
                    Видалити
                </button>
            </div>
        `;
    });

    const total = cart.reduce((sum, product) => {
        return sum + product.price * product.quantity;
    }, 0);

    container.innerHTML += `<h2>Загальна сума: ${total} грн</h2>`;
}

function removeFromCart(productId) {
    cart = cart.filter(product => product.id !== productId);

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
}

renderCart();

