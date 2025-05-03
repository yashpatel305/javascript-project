let temp = 0;
let totalPrice = 0;

const total = document.getElementById("total");
const list = document.getElementById("list");
const cart = document.getElementById("cart-sidebar");
const cartItem = document.getElementById("cart-icon");
const totalPriceDisplay = document.querySelector(".total");

const prices = {
  apple: 320,
  banana: 60,
  carrots: 120,
  tomato: 25,
};

const cartItems = {};

total.innerHTML = temp;

function add(product) {
  temp++;
  total.innerHTML = temp;
  totalPrice += prices[product];

  if (cartItems[product]) {
    cartItems[product].quantity++;
  } else {
    cartItems[product] = {
      name: product.charAt(0).toUpperCase() + product.slice(1),
      price: prices[product],
      quantity: 1
    };
  }

  renderCart();
}

function increment(product) {
  temp++;
  totalPrice += prices[product];
  cartItems[product].quantity++;
  updateUI();
}

function decrement(product) {
  if (!cartItems[product]) return;

  temp--;
  totalPrice -= prices[product];
  cartItems[product].quantity--;

  if (cartItems[product].quantity === 0) {
    delete cartItems[product];
  }

  updateUI();
}

function renderCart() {
  updateUI();
}

function updateUI() {
  total.innerHTML = temp;
  list.innerHTML = '';

  for (let key in cartItems) {
    const item = cartItems[key];
    const li = document.createElement("li");
    li.classList.add('cart-item');
    li.innerHTML = `
      <strong>${item.name}</strong><br>
      ₹${item.price.toFixed(2)} × ${item.quantity}
      <button onclick="decrement('${key}')">−</button>
      <button onclick="increment('${key}')">+</button>
    `;
    list.appendChild(li);
  }

  totalPriceDisplay.innerHTML = `Total Items: ${temp}<br>Total Price: ₹${totalPrice.toFixed(2)}`;
}
function buy(){
    alert("Thank you for your purchase!");
}
cartItem.addEventListener("click", function () {
  cart.style.display = cart.style.display === "block" ? "none" : "block";
});
