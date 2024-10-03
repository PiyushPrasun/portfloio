let totalPrice = 0;

function addItem() {
    const nameInput = document.getElementById('itemNameInput');
    const priceInput = document.getElementById('itemPriceInput');
    const categoryInput = document.getElementById('itemCategoryInput');
    const gridContainer = document.getElementById('gridContainer');

    const itemName = nameInput.value.trim();
    const itemPrice = parseFloat(priceInput.value);
    const itemCategory = categoryInput.value;

    if (itemName !== "" && !isNaN(itemPrice)) {
        const newItem = document.createElement('div');
        newItem.classList.add('grid-item');
        newItem.dataset.category = itemCategory;
        newItem.dataset.price = itemPrice.toFixed(2);
        newItem.innerHTML = `
            <strong>${itemName}</strong><br>
            $${itemPrice.toFixed(2)}<br>
            ${itemCategory}
            <button class="delete-button" onclick="deleteItem(this)">&#128465;</button>
        `;
        gridContainer.appendChild(newItem);

        totalPrice += itemPrice;
        updateTotalPrice();

        nameInput.value = "";
        priceInput.value = "";
    } else {
        alert("Please enter a valid item name and price.");
    }
}

function deleteItem(button) {
    const item = button.parentElement;
    const itemPrice = parseFloat(item.dataset.price);

    totalPrice -= itemPrice;
    updateTotalPrice();

    item.remove();
    filterItems();
}

function updateTotalPrice() {
    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
}

function filterItems() {
    const filterCategory = document.getElementById('filterCategoryInput').value;
    const gridContainer = document.getElementById('gridContainer').children;

    totalPrice = 0;

    for (const item of gridContainer) {
        if (filterCategory === "All" || item.dataset.category === filterCategory) {
            item.style.display = "block";
            totalPrice += parseFloat(item.dataset.price);
        } else {
            item.style.display = "none";
        }
    }

    updateTotalPrice();
}
