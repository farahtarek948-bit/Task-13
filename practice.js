let products = [
    { name: "Classic Watch", price: 500 },
    { name: "Gold Necklace", price: 150 },
    { name: "Silver Ring", price: 350 },
];

let editIndex = -1;

const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const createBtn = document.getElementById("createBtn");
const productTable = document.getElementById("productTable");
const searchInput = document.getElementById("searchInput");
const totalPrices = document.getElementById("totalPrices");

function displayProducts(list = products) {
    productTable.innerHTML = "";

    list.forEach(function(product, index) {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${products.indexOf(product) + 1}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>
                <button class="edit-btn" onclick="editProduct(${products.indexOf(product)})">Edit</button>
                <button class="delete-btn" onclick="deleteProduct(${products.indexOf(product)})">Delete</button>
            </td>
        `;

        productTable.appendChild(row);
    });

    let total = products.reduce(function(sum, product) {
        return sum + product.price;
    }, 0);

    totalPrices.textContent = "Total Prices: " + total + " EGP";
}

createBtn.addEventListener("click", function() {
    let name = productName.value.trim();
    let price = Number(productPrice.value);

    if (name === "" || productPrice.value === "" || price <= 0) {
        alert("Please enter a product name and a valid price.");
        return;
    }

    if (editIndex === -1) {
        products.push({
            name: name,
            price: price
        });
    } else {
        products[editIndex].name = name;
        products[editIndex].price = price;

        editIndex = -1;
        createBtn.textContent = "Create Product";
    }

    productName.value = "";
    productPrice.value = "";

    displayProducts();
});

function editProduct(index) {
    productName.value = products[index].name;
    productPrice.value = products[index].price;

    editIndex = index;
    createBtn.textContent = "Update Product";
}

function deleteProduct(index) {
    let confirmDelete = confirm("Are you sure you want to delete this product?");

    if (confirmDelete) {
        products.splice(index, 1);

        if (editIndex === index) {
            editIndex = -1;
            productName.value = "";
            productPrice.value = "";
            createBtn.textContent = "Create Product";
        } else if (editIndex > index) {
            editIndex--;
        }

        displayProducts();
    }
}

searchInput.addEventListener("input", function() {
    let searchValue = searchInput.value.toLowerCase();

    let filteredProducts = products.filter(function(product) {
        return product.name.toLowerCase().includes(searchValue);
    });

    displayProducts(filteredProducts);
});

displayProducts();