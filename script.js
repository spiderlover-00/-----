let products = []; // Масив всіх товарів
let cart = []; // Масив товарів у кошику

async function fetchProducts() {
const response = await fetch('store\.json');
const data = await response.json();
products = data; // Оновлюємо глобальний масив для роботи addToCart
displayProducts(data);
}

function displayProducts(products) {
productsBlock.innerHTML = ''; // Очищаємо блок товарів
products.forEach(product => {
const card = createProductCard(product);
productsBlock.innerHTML += card;
});
}

function createProductCard (product) {
return `<div class="card" style="width: 18rem;">
<img src="img/${product.image}" class="card-img-top">
<div class="card-body">
<h5 class="card-title">${product.title}</h5>
<p class="card-text text-primary fw-bold">${product.price} грн </p>
<button onclick="addToCart(${product.id})" class="add-cart">
В кошик </button>
</div>
</div>`;
}

function addToCart(productId) {
const product = products.find(
p => p.id === productId);
if (!product) return;
}

const cartItem = cart.find(item => item.id ===productId);
if (cartItem) {
cartItem.quantity += 1;
} else {
cart.push({ ...product, quantity: 1 });
}
console.log(cart);












