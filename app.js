const products = [
  { name: 'Coca-Cola 500ml', price: 40, stock: 5 },
  { name: 'Coca-Cola 250ml', price: 20, stock: 5 },
  { name: 'Fruti 500ml', price: 65, stock: 5 },
  { name: 'Fruti 80ml', price: 20, stock: 5 },
  { name: 'Lemonade 500ml', price: 250, stock: 5 },
  { name: 'Sprite 500ml', price: 40, stock: 5 },
  { name: 'Sprite 250ml', price: 20, stock: 5 },
  { name: 'Tomato Chips', price: 10, stock: 5 },
  { name: 'Tomato Chips (Large)', price: 20, stock: 5 },
  { name: 'Kurkure', price: 10, stock: 5 },
  { name: 'Kurkure (Large)', price: 20, stock: 5 },
  { name: 'Lays Chips', price: 10, stock: 5 },
  { name: 'Lays Chips (Large)', price: 20, stock: 5 },
  { name: 'Bingo Mad Angle', price: 10, stock: 5 },
  { name: 'Bingo Mad Angle (Large)', price: 20, stock: 5 },
  { name: 'Bhujia Shev', price: 10, stock: 5 },
  { name: 'Puffcorn', price: 10, stock: 5 }
];

let cart = [];
let totalAmount = 0;

const productList = document.getElementById('product-list');
const paymentInput = document.getElementById('payment');
const purchaseButton = document.getElementById('purchase-button');
const cartSummary = document.getElementById('cart-summary');
const messageDiv = document.getElementById('message');
const changeDiv = document.getElementById('change');
const receiptDiv = document.getElementById('receipt');

// Display products with add-to-cart buttons
function displayProducts() {
  productList.innerHTML = '';
  products.forEach((product, index) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: Rs ${product.price}</p>
      <p>Stock: ${product.stock}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    productList.appendChild(productDiv);
  });
}

// Add product to cart
function addToCart(index) {
  const product = products[index];
  if (product.stock > 0) {
    cart.push(product);
    product.stock -= 1;
    totalAmount += product.price;
    updateCart();
    displayProducts();
  } else {
    messageDiv.textContent = `${product.name} is out of stock!`;
  }
}

// Update cart summary
function updateCart() {
  cartSummary.innerHTML = '';
  cart.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.textContent = `${item.name} - Rs ${item.price}`;
    cartSummary.appendChild(itemDiv);
  });
  cartSummary.innerHTML += `<p>Total: Rs ${totalAmount}</p>`;
}

// Handle purchase
purchaseButton.addEventListener('click', () => {
  const payment = parseFloat(paymentInput.value);
  if (payment >= totalAmount) {
    const change = payment - totalAmount;
    messageDiv.textContent = `Purchase successful!`;
    changeDiv.textContent = `Change: Rs ${change}`;
    generateReceipt();
    cart = [];
    totalAmount = 0;
    updateCart();
  } else {
    messageDiv.textContent = `Insufficient funds! You need Rs ${totalAmount - payment} more.`;
    changeDiv.textContent = '';
  }
});

// Generate receipt
function generateReceipt() {
  receiptDiv.innerHTML = '';
  cart.forEach(item => {
    const receiptItem = document.createElement('p');
    receiptItem.textContent = `${item.name} - Rs ${item.price}`;
    receiptDiv.appendChild(receiptItem);
  });
  receiptDiv.innerHTML += `<p>Total: Rs ${totalAmount}</p>`;
  receiptDiv.innerHTML += `<p>Payment: Rs ${paymentInput.value}</p>`;
  receiptDiv.innerHTML += `<p>Change: Rs ${paymentInput.value - totalAmount}</p>`;
}

// Initialize product display
displayProducts();
