// Get Data của Accounts từ Local Storage về
const productsDatabaseAdmin = getDataFromLocal("productsDatabase") ?? [];

// Function Render Products vào Manage Products
function renderManageProductsPage(productsDatabaseAdmin) {
  let tableProducts = document.querySelector("#table-products-manage-page");
  tableProductsContent = "";
  tableProductsContent = `<tr>
  <td>STT</td>
  <td>Image</td>
  <td>Name</td>
  <td>Price</td>
  <td>Quantity</td>
  <td>Action</td>
</tr>`;
  for (let i = 0; i < productsDatabaseAdmin.length; i++) {
    tableProductsContent += `<tr>
    <td>${i + 1}</td>
    <td><img src="${productsDatabaseAdmin[i].productImage[0]}" alt=""></td>
    <td>${productsDatabaseAdmin[i].name}</td>
    <td>$${Number(productsDatabaseAdmin[i].price).toLocaleString()}</td>
    <td>${Number(productsDatabaseAdmin[i].quantity_stock)}</td>
    <td><button data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="handleDetailtProduct(${i})"
            class="detail-product-btn">Detail</button>
        <button onclick="handleDeleteProduct(${i})" class="delete-product-btn">Delete</button>
    </td>
</tr>`;
  }
  tableProducts.innerHTML = tableProductsContent;
}
renderManageProductsPage(productsDatabaseAdmin);

// Function Add Product
function handleSaveAddProduct() {
  const productsDatabase = getDataFromLocal("productsDatabase") ?? [];
  let inputTitle = document.querySelector(".product-title-add").value;
  let inputDescription = document.querySelector(
    ".product-description-add"
  ).value;
  let inputPrice = Number(document.querySelector(".product-price-add").value);
  let inputVendor = document.querySelector(".product-vendor-add").value;
  let inputSKU = document.querySelector(".product-sku-add").value;
  let inputStock = document.querySelector(".product-stock-add").value;
  let inputImage_1 = document.querySelector(
    "#product-detail-add-new-image-01"
  ).value;
  let inputImage_2 = document.querySelector(
    "#product-detail-add-new-image-02"
  ).value;
  let inputImage_3 = document.querySelector(
    "#product-detail-add-new-image-03"
  ).value;
  let inputImage_4 = document.querySelector(
    "#product-detail-add-new-image-04"
  ).value;
  let newProduct = {
    productImage: [
      (productImage_1 = inputImage_1),
      (productImage_2 = inputImage_2),
      (productImage_3 = inputImage_3),
      (productImage_4 = inputImage_4),
    ],
    name: inputTitle,
    description: inputDescription,
    price: inputPrice,
    vendor: inputVendor,
    sku: inputSKU,
    quantity_stock: inputStock,
  };

  productsDatabase.push(newProduct);
  renderManageProductsPage(productsDatabase);
  setDataToLocal("productsDatabase", productsDatabase);
}

// Function Delete Product
function handleDeleteProduct(i) {
  console.log("Index:", i);
  const productsDatabase = getDataFromLocal("productsDatabase") ?? [];
  console.log("Products Database:", productsDatabase);
  productsDatabase.splice(i, 1);
  setDataToLocal("productsDatabase", productsDatabase);
  renderManageProductsPage(productsDatabase);
}
