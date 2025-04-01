document.addEventListener('DOMContentLoaded', function () {
    console.log("Page loaded successfully!");

    const atcCart = [];
    const cartModal = document.getElementById("cart-modal"); // Get the modal element
    const cartIcon = document.querySelector(".fa-shopping-cart"); // Cart icon to open the modal
    const cartCloseBtn = document.querySelector("#cart-modal .atc-close"); // Close button inside the modal
    const atcItemsList = document.getElementById("cart-items"); // List where items are shown
    const atcTotal = document.getElementById("cart-total"); // Total price element

    // **Featured Items Section**
    const featuredContainer = document.querySelector(".featured-container");
    const atcButtons = featuredContainer.querySelectorAll(".add-cart-btn");

    // Function to update the cart modal with items and total price
    function updateAtcModal() {
        console.log("Updating cart modal...");

        atcItemsList.innerHTML = "";
        let total = 0;

        atcCart.forEach((item, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                ${item.name} - ₱${item.price.toFixed(2)}
                <button class="atc-remove-btn" data-index="${index}">Remove</button>
            `;
            atcItemsList.appendChild(listItem);
            total += item.price;
        });

        atcTotal.textContent = total.toFixed(2);
        console.log("Cart updated:", atcCart);

        // Add event listeners to remove buttons inside the modal
        document.querySelectorAll(".atc-remove-btn").forEach((btn) => {
            btn.addEventListener("click", function () {
                const index = parseInt(this.getAttribute("data-index"));
                atcCart.splice(index, 1); // Remove item from cart
                updateAtcModal(); // Re-update the modal
            });
        });
    }

    // Function to add an item to the cart
    function addAtcItem(name, price) {
        atcCart.push({ name, price });
        updateAtcModal();

        const atcNotification = document.createElement("div");
        atcNotification.textContent = "Added to cart!";
        atcNotification.classList.add("atc-notification");
        document.body.appendChild(atcNotification);

        setTimeout(() => {
            atcNotification.remove();
        }, 2000);
    }

    // **Fix: Only listen for "Add to Cart" buttons inside Featured**
    atcButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.stopPropagation();

            const atcProductCard = e.target.closest(".featured-card");
            if (!atcProductCard) {
                console.error("Product card not found.");
                return;
            }

            const atcName = atcProductCard.querySelector("h3")?.textContent.trim();
            const atcPriceElement = atcProductCard.querySelector(".price-btn");

            if (!atcPriceElement) {
                console.error("Price element not found in product card.");
                return;
            }

            const priceText = atcPriceElement.textContent.replace(/[^\d.]/g, "").trim();
            const atcPrice = parseFloat(priceText);

            if (isNaN(atcPrice)) {
                console.error("Invalid price detected:", priceText);
                return;
            }

            console.log(`Adding item: ${atcName} - ₱${atcPrice}`);
            addAtcItem(atcName, atcPrice);
        });
    });

    // **Item Boxes Section**
    const itemBoxes = document.querySelectorAll(".item .cart-btn");

    itemBoxes.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.stopPropagation();

            const itemBox = e.target.closest(".item");
            if (!itemBox) {
                console.error("Item box not found.");
                return;
            }

            const atcName = itemBox.getAttribute("data-name");
            const priceText = itemBox.getAttribute("data-price").replace(/[^\d.]/g, "").trim();
            const atcPrice = parseFloat(priceText);

            if (isNaN(atcPrice)) {
                console.error("Invalid price detected:", priceText);
                return;
            }

            console.log(`Adding item: ${atcName} - ₱${atcPrice}`);
            addAtcItem(atcName, atcPrice);
        });
    });

    // **Cart Modal Functionality**
    // Open Cart Modal when Cart Icon is clicked
    cartIcon.addEventListener("click", () => {
        cartModal.style.display = "flex"; // Show the modal
        console.log("Cart modal opened, display is set to:", cartModal.style.display); // Debugging
        updateAtcModal();
    });

    // Close Cart Modal when close button is clicked
    cartCloseBtn.addEventListener("click", () => {
        cartModal.style.display = "none"; // Hide the modal
    });

    // Close Cart Modal when clicking outside of the modal content
    window.addEventListener("click", (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = "none"; // Hide the modal if clicking outside
        }
    });
});


// -----------------------------
// Modal Elements for Featured
// -----------------------------
const modal = document.getElementById("modal");
const featuredBoxes = document.querySelectorAll(".featured-card");
const closeBtn = document.querySelector(".close");

featuredBoxes.forEach((featuredBox) => {
    featuredBox.addEventListener("click", (e) => {
        // Prevent modal from opening when clicking the "Add to Cart" button
        if (!e.target.classList.contains("atc-btn")) {
            modal.style.display = "block";
        }
    });
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

document.addEventListener('DOMContentLoaded', function () {
    console.log("Page loaded successfully!");
});


document.addEventListener('DOMContentLoaded', function () {
    console.log("Page loaded successfully!");
});

document.addEventListener('DOMContentLoaded', function () {
    console.log("Page loaded successfully!");
});


// -----------------------------
// Modal Elements for Item Boxes
// -----------------------------
const itemModal = document.getElementById('item-modal');
const itemModalImg = document.getElementById('modal-img');
const itemModalTitle = document.getElementById('modal-title');
const itemModalPrice = document.getElementById('modal-price');
const itemModalDetails = document.getElementById('modal-details');
const itemCloseBtn = document.querySelector('.close-item');

const items = document.querySelectorAll('.item');

items.forEach(item => {
    item.addEventListener('click', (e) => {
        e.stopPropagation();
        const name = item.getAttribute('data-name');
        const price = item.getAttribute('data-price');
        const imgSrc = item.getAttribute('data-img');
        const details = JSON.parse(item.getAttribute('data-details'));

        itemModalImg.src = imgSrc;
        itemModalTitle.innerText = name;
        itemModalPrice.innerText = price;

        itemModalDetails.innerHTML = '';
        details.forEach(detail => {
            const detailItem = document.createElement('div');
            detailItem.classList.add('modal-detail-item');
            detailItem.innerHTML = `
                <img src="${detail.img}" alt="${detail.name}">
                <span>${detail.name}</span>
            `;
            itemModalDetails.appendChild(detailItem);
        });

        itemModal.style.display = 'block';
    });
});

itemCloseBtn.addEventListener('click', () => {
    itemModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === itemModal) {
        itemModal.style.display = 'none';
    }
});

//-------------------//
//Modal for Pokecoins//
//-------------------//
const pokecoinsModal = document.getElementById("pokecoins-modal");
const pokecoinsClose = document.querySelector(".pokecoins-close");

document.querySelectorAll(".pokecoins-item").forEach((item) => {
    item.addEventListener("click", (e) => {
        e.stopPropagation();
        const name = item.getAttribute("data-name");
        const price = item.getAttribute("data-price");
        const img = item.getAttribute("data-img");
        const bonus = item.getAttribute("data-bonus");
        const total = item.getAttribute("data-total");

        document.getElementById("pokecoins-modal-title").innerText = name;
        document.getElementById("pokecoins-modal-img").src = img;
        document.getElementById("pokecoins-modal-price").innerText = price;

        const detailsHTML = `
            <p>${bonus}</p>
            <p>${total}</p>
        `;
        document.getElementById("pokecoins-modal-details").innerHTML = detailsHTML;

        pokecoinsModal.style.display = "block";
    });
});

document.querySelector(".pokecoins-modal-content").addEventListener("click", (e) => {
    e.stopPropagation();
});

pokecoinsClose.addEventListener("click", () => {
    pokecoinsModal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === pokecoinsModal) {
        pokecoinsModal.style.display = "none";
    }
});

// -----------------------------
// Modal for Other Items
// -----------------------------
document.querySelectorAll(".item:not(.pokecoins-item)").forEach((item) => {
    item.addEventListener("click", (e) => {
        e.stopPropagation();
        const name = item.getAttribute("data-name");
        const price = item.getAttribute("data-price");
        const imgSrc = item.getAttribute("data-img");
        const details = JSON.parse(item.getAttribute("data-details"));

        itemModalImg.src = imgSrc;
        itemModalTitle.innerText = name;
        itemModalPrice.innerText = price;

        itemModalDetails.innerHTML = "";
        details.forEach((detail) => {
            const detailItem = document.createElement("div");
            detailItem.classList.add("modal-detail-item");
            detailItem.innerHTML = `
                <img src="${detail.img}" alt="${detail.name}">
                <span>${detail.name}</span>
            `;
            itemModalDetails.appendChild(detailItem);
        });

        itemModal.style.display = "block";
    });
});

itemCloseBtn.addEventListener("click", () => {
    itemModal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === itemModal) {
        itemModal.style.display = "none";
    }
});

//--------------------
// Daily Bundle Modal
//--------------------
document.querySelectorAll(".dailybundle-item").forEach((item) => {
    item.addEventListener("click", () => {
        const modal = document.getElementById("dailybundle-modal");
        const modalImg = document.getElementById("dailybundle-modal-img");
        const modalTitle = document.getElementById("dailybundle-modal-title");
        const modalDetails = document.getElementById("dailybundle-modal-details");
        const modalPrice = document.getElementById("dailybundle-modal-price");

        modalImg.src = item.getAttribute("data-img");
        modalTitle.innerText = item.getAttribute("data-name");
        modalDetails.innerText = item.getAttribute("data-details");
        modalPrice.innerText = item.getAttribute("data-price");

        modal.style.display = "flex";
    });
});

document.querySelector(".dailybundle-modal .dailybundle-close").addEventListener("click", () => {
    document.getElementById("dailybundle-modal").style.display = "none";
});

window.addEventListener("click", (e) => {
    const modal = document.getElementById("dailybundle-modal");
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
