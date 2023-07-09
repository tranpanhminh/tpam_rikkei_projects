// Get Data của Accounts từ Local Storage về
const productsDatabaseAdmin = getDataFromLocal("productsDatabase") ?? [];

// Function Render Products vào Manage Products
function renderManageProductsPage(productsDatabaseAdmin) {
  let tableProducts = document.querySelector("#table-products-manage-page");
  tableProductsContent = "";
  tableProductsContent = `<tr>
  <td>#</td>
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
  const productsDatabase = JSON.parse(localStorage.getItem("productsDatabase"));

  let saveAddProductBtn = document.querySelector("#save-add-product-btn");
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
    id: productsDatabase.length + 1,
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

  if (
    inputImage_1 == "" ||
    inputImage_2 == "" ||
    inputImage_3 == "" ||
    inputImage_4 == "" ||
    inputTitle == "" ||
    inputDescription == "" ||
    inputPrice == "" ||
    inputVendor == "" ||
    inputSKU == "" ||
    inputStock == ""
  ) {
    alert("Please fill all information");
  } else {
    saveAddProductBtn.setAttribute("data-bs-dismiss", "modal");
    productsDatabase.push(newProduct);
    window.location.href = "http://127.0.0.1:5501/admin/manage-products.html";
  }
  renderManageProductsPage(productsDatabase);
  setDataToLocal("productsDatabase", productsDatabase);
}

// Function Delete Product
function handleDeleteProduct(i) {
  const productsDatabase = JSON.parse(localStorage.getItem("productsDatabase"));
  console.log("Index:", i);
  console.log("Products Database:", productsDatabase);
  productsDatabase.splice(i, 1);
  setDataToLocal("productsDatabase", productsDatabase);
  renderManageProductsPage(productsDatabase);
}

// Function Detail Product
function handleDetailtProduct(i) {
  const productsDatabase = JSON.parse(localStorage.getItem("productsDatabase"));
  console.log(i);
  let modalDetailFromAdminElement = document.querySelector(
    "#modal-detail-from-manage-products-page"
  );
  let modalDetailFromAdminContent = "";
  modalDetailFromAdminContent += `
  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Product Detail</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="product-detail">
                        <div class="container text-center">
                            <div class="row align-items-center" >
  <div class="col-xl-8 col-sm-12">
    <div class="container text-center">
        <div class="row row-cols-2">
        <div class="col"><img
                                                    src="${
                                                      productsDatabase[i]
                                                        .productImage[0]
                                                    }"
                                                    alt=""></div>
                                                    <div class="col"><img
                                                    src="${
                                                      productsDatabase[i]
                                                        .productImage[1]
                                                    }"
                                                    alt=""></div>
                                                    <div class="col"><img
                                                    src="${
                                                      productsDatabase[i]
                                                        .productImage[2]
                                                    }"
                                                    alt=""></div>
                                                    <div class="col"><img
                                                    src="${
                                                      productsDatabase[i]
                                                        .productImage[3]
                                                    }"
                                                    alt=""></div>
        </div>
    </div>
</div>
<div class="col-xl-4 col-sm-12">
    <div class="product-detail-info">
        <h2 class="product-title-name">${productsDatabase[i].name}</h2>

        <p class="product-description">${productsDatabase[i].description}</p>

        <div class="product-price">
            <span>Price</span>
            <span>$${Number(productsDatabase[i].price)}</span>
        </div>

        <div class="product-vendor">
            <span>Vendor:</span>
            <span>${productsDatabase[i].vendor}</span>
        </div>

        <div class="product-sku">
            <span>SKU:</span>
            <span>${productsDatabase[i].sku}</span>
        </div>

        <div class="product-add-quantity">
            <p>Quantity:</p>
            <span>${productsDatabase[i].quantity_stock}</span>
        </div>
    </div>
</div>
<div class="edit-product-manage-page">
                        <h2 class="edit-product-ttitle-manage-page">Edit Panel</h2>

                        <div class="product-details-info-manage-page">
                        <h4 class="product-detail-edit-title">ID</h4>
                        <input type="text" placeholder="${
                          i + 1
                        }" class="product-id-edit" disabled>
                    </div>

                        <div class="product-details-info-manage-page">
                            <h4 class="product-detail-edit-title">Title</h4>
                            <input type="text" placeholder="" class="product-title-edit">
                        </div>

                        <div class="product-details-info-manage-page">
                            <h4 class="product-detail-edit-title">Description</h4>
                            <input type="text" placeholder="" class="product-description-edit">
                        </div>

                        <div class="product-details-info-manage-page">
                            <h4 class="product-detail-edit-title">Price</h4>
                            <input type="text" placeholder="" class="product-price-edit">
                        </div>

                        <div class="product-details-info-manage-page">
                            <h4 class="product-detail-edit-title">Vendor</h4>
                            <input type="text" placeholder="" class="product-vendor-edit">
                        </div>

                        <div class="product-details-info-manage-page">
                            <h4 class="product-detail-edit-title">SKU</h4>
                            <input type="text" placeholder="" class="product-sku-edit">
                        </div>

                        <div class="product-details-info-manage-page">
                            <h4 class="product-detail-edit-title">Stock</h4>
                            <input type="text" placeholder="" class="product-stock-edit">
                        </div>

                        <div class="product-details-info-manage-page">
                            <h4 class="product-detail-edit-title">Image 1</h4>
                            <input type="text" placeholder="" id="product-detail-edit-image-01">
                        </div>

                        <div class="product-details-info-manage-page">
                            <h4 class="product-detail-edit-title">Image 2</h4>
                            <input type="text" placeholder="" id="product-detail-edit-image-02">
                        </div>

                        <div class="product-details-info-manage-page">
                            <h4 class="product-detail-edit-title">Image 3</h4>
                            <input type="text" placeholder="" id="product-detail-edit-image-03">
                        </div>

                        <div class="product-details-info-manage-page">
                            <h4 class="product-detail-edit-title">Image 4</h4>
                            <input type="text" placeholder="" id="product-detail-edit-image-04">
                        </div>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="save-edit-product-btn"
                        onclick="handleSaveEditProduct(${i})">Save changes</button>
                </div>`;
  modalDetailFromAdminElement.innerHTML = modalDetailFromAdminContent;
}

// Function handleSaveEditProduct
function handleSaveEditProduct(i) {
  const productsDatabase = JSON.parse(localStorage.getItem("productsDatabase"));
  let productIndex = Number(document.querySelector(".product-id-edit").value);
  let saveEditProductBtn = document.querySelector("#save-edit-product-btn");
  let inputTitle = document.querySelector(".product-title-edit").value;
  console.log(typeof inputTitle);
  let inputDescription = document.querySelector(
    ".product-description-edit"
  ).value;
  let inputPrice = Number(document.querySelector(".product-price-edit").value);
  let inputVendor = document.querySelector(".product-vendor-edit").value;
  let inputSKU = document.querySelector(".product-sku-edit").value;
  let inputStock = document.querySelector(".product-stock-edit").value;
  let inputImage_1 = document.querySelector(
    "#product-detail-edit-image-01"
  ).value;
  let inputImage_2 = document.querySelector(
    "#product-detail-edit-image-02"
  ).value;
  let inputImage_3 = document.querySelector(
    "#product-detail-edit-image-03"
  ).value;
  let inputImage_4 = document.querySelector(
    "#product-detail-edit-image-04"
  ).value;

  for (let i = 0; i < productsDatabase.length; i++) {
    if (inputImage_1 === "") {
      inputImage_1 = productsDatabase[productIndex].productImage[i];
    }
    if (inputImage_2 === "") {
      inputImage_2 = productsDatabase[productIndex].productImage[i + 1];
    }
    if (inputImage_1 === "") {
      inputImage_3 = productsDatabase[productIndex].productImage[i + 2];
    }
    if (inputImage_1 === "") {
      inputImage_4 = productsDatabase[productIndex].productImage[i + 3];
    }
    if (inputTitle === "") {
      inputTitle = productsDatabase[productIndex].name;
    }
    if (inputDescription === "") {
      inputDescription = productsDatabase[productIndex].description;
    }
    if (inputPrice === "") {
      inputPrice = productsDatabase[productIndex].price;
    }
    if (inputVendor === "") {
      inputVendor = productsDatabase[productIndex].vendor;
    }
    if (inputSKU === "") {
      inputSKU = productsDatabase[productIndex].sku;
    }
    if (inputStock === "") {
      inputStock = productsDatabase[productIndex].quantity_stock;
    }
  }

  let editProduct = {
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

  if (productIndex !== "") {
    productsDatabase.splice(productIndex, 1, editProduct);
  }

  saveEditProductBtn.setAttribute("data-bs-dismiss", "modal");
  productsDatabase.splice(i, 1, editProduct);
  // window.location.href = "http://127.0.0.1:5501/admin/manage-products.html";

  renderManageProductsPage(productsDatabase);
  setDataToLocal("productsDatabase", productsDatabase);
}

// Function Search Product
function handleSearctProduct() {
  const productsDatabase = JSON.parse(localStorage.getItem("productsDatabase"));
  let searchResult = document.querySelector(".search-result");
  let inputSearch = document.querySelector("#search-bar").value.toLowerCase();
  console.log(inputSearch);
  let filterProduct = productsDatabase.filter(function (product) {
    if (
      product.name.toLowerCase().includes(inputSearch) ||
      product.description.toLowerCase().includes(inputSearch) ||
      product.vendor.toLowerCase().includes(inputSearch) ||
      product.sku.toString().toLowerCase() === inputSearch ||
      product.quantity_stock.toString().toLowerCase() === inputSearch ||
      product.price.toString().toLowerCase() === inputSearch
    ) {
      return true;
    }
    return false;
  });
  console.log(filterProduct);
  searchResult.innerHTML = `There are ${filterProduct.length} results`;
  searchResult.style.display = "block";
  renderManageProductsPage(filterProduct);
}
