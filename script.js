
const savedCart = localStorage.getItem("mamaGraceCart");
const cart = savedCart ? JSON.parse(savedCart) : [];

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const emptyCart = document.getElementById("empty-cart");
const clearCartButton = document.getElementById("clear-cart");

const addButtons = document.querySelectorAll(".add-to-cart");

// Listen for clicks on every Add to Cart button
addButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const productCard = button.closest(".product-card");

    const name = productCard.dataset.name;
    const price = Number(productCard.dataset.price);
    const unit = productCard.dataset.unit;

    // Check whether this product is already in the cart
    const existingItem = cart.find(function (item) {
      return item.name === name;
    });

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        name: name,
        price: price,
        unit: unit,
        quantity: 1
      });
    }

    updateCart();
  });
});

// Display the cart and calculate the total
function updateCart() {
  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach(function (item) {
    const listItem = document.createElement("li");

    
const productInfo = document.createElement("span");

productInfo.textContent =
    item.name + " (" + item.unit + ") — KSh " +
    item.price * item.quantity + " ";

const decreaseButton = document.createElement("button");
decreaseButton.textContent = "-";
decreaseButton.type = "button";

decreaseButton.addEventListener("click", function () {
    item.quantity -= 1;

    if (item.quantity <= 0) {
        const index = cart.indexOf(item);
        cart.splice(index, 1);
    }

    updateCart();
increaseButton.addEventListener("click", function () {
    item.quantity += 1;
    updateCart();
});    
});

const quantityText = document.createElement("span");
quantityText.textContent = " Quantity: " + item.quantity + " ";

const increaseButton = document.createElement("button");
increaseButton.textContent = "+";
increaseButton.type = "button";

increaseButton.addEventListener("click", function () {
    item.quantity += 1;
    updateCart();
});

const removeButton = document.createElement("button");
removeButton.textContent = "Remove";
removeButton.type = "button";

removeButton.addEventListener("click", function () {
    const index = cart.indexOf(item);

    if (index !== -1) {
        cart.splice(index, 1);
    }

    updateCart();

});


listItem.appendChild(productInfo);
listItem.appendChild(decreaseButton);
listItem.appendChild(quantityText);
listItem.appendChild(increaseButton);
listItem.appendChild(removeButton);

cartItems.appendChild(listItem);



    total += item.price * item.quantity;
  });

  console.log("Cart saved:", cart);cartTotal.textContent = total;
  localStorage.setItem("mamaGraceCart", JSON.stringify(cart));
  console.log("Cart saved:", cart);
  emptyCart.style.display = cart.length === 0 ? "block" : "none";
}

// Clear all items from the cart
clearCartButton.addEventListener("click", function () {
  cart.length = 0;
  updateCart();
});
updateCart();


const orderForm = document.getElementById("customer-order-form");

// Replace this example with your WhatsApp number.
const shopWhatsAppNumber = "254706799474";

orderForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const customerName =
    document.getElementById("customer-name").value.trim();

  const customerPhone =
    document.getElementById("customer-phone").value.trim();

  const deliveryLocation =
    document.getElementById("delivery-location").value.trim();

  if (cart.length === 0) {
    alert("Please add groceries to your cart before placing an order.");
    return;
  }

  const orderTotal = cart.reduce(function (total, item) {
    return total + item.price * item.quantity;
  }, 0);

  let message = "MAMA GRACE GROCERIES - NEW ORDER\n\n";

  message += "Customer: " + customerName + "\n";
  message += "Phone: " + customerPhone + "\n";
  message += "Delivery location: " + deliveryLocation + "\n\n";
  message += "ORDER DETAILS:\n";

  cart.forEach(function (item) {
    message += "- " + item.name +
      " x " + item.quantity +
      " (" + item.unit + ")" +
      " = KSh " + (item.price * item.quantity) + "\n";
  });

  message += "\nTotal: KSh " + orderTotal;

  const whatsappURL =
    "https://wa.me/" + shopWhatsAppNumber +
    "?text=" + encodeURIComponent(message);

  window.open(whatsappURL, "_blank");
});


orderForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const customerName =
    document.getElementById("customer-name").value.trim();

  const customerPhone =
    document.getElementById("customer-phone").value.trim();

  const deliveryLocation =
    document.getElementById("delivery-location").value.trim();

  if (cart.length === 0) {
    alert("Please add groceries to your cart before placing an order.");
    return;
  }

  alert(
    "Thank you, " + customerName + "!\n\n" +
    "Phone: " + customerPhone + "\n" +
    "Delivery location: " + deliveryLocation + "\n" +
    "Order total: KSh " + cart.reduce(function (total, item) {
      return total + item.price * item.quantity;
    }, 0)
  );
});
