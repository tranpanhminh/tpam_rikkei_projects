const productsDatabase = JSON.parse(localStorage.getItem("productsDatabase"));
const authDatabase = JSON.parse(localStorage.getItem("auth"));
const productDetail = JSON.parse(localStorage.getItem("productDetail"));
console.log(productDetail);

// Function Render Product Detail
function renderProductDetail() {
  let containerElement = document.querySelector(".container-product-detail");
  let containerContent = "";
  containerContent += `<div class="page-info">
  <h2 class="category-title">Products</h2>
  <div class="breadcrumb-page">
      <a href="./index.html">Home</a>
      <span> / </span>
      <a href="./index.html">Products</a>
      <span> / </span>
      <a href="./index.html">${productDetail.name}</a>
  </div>
</div>

<div class="product-detail">
  <div class="container text-center">
      <div class="row align-items-center">
          <div class="col-xl-8 col-sm-12">
              <div class="container text-center">
                  <div class="row row-cols-2">
                      <div class="col"><img
                              src="${productDetail.productImage[0]}"
                              alt=""></div>
                      <div class="col"><img
                              src="${productDetail.productImage[1]}"
                              alt=""></div>
                      <div class="col"><img
                              src="${productDetail.productImage[2]}"
                              alt=""></div>
                      <div class="col"><img
                              src="${productDetail.productImage[3]}"
                              alt=""></div>
                  </div>
              </div>
          </div>
          <div class="col-xl-4 col-sm-12">
              <div class="product-detail-info">
                  <h2 class="product-title-name">${productDetail.name}
                  </h2>

                  <p class="product-description">${
                    productDetail.description
                  }</p>

                  <div class="product-price">
                      <span>Price</span>
                      <span>$${Number(
                        productDetail.price
                      ).toLocaleString()}</span>
                  </div>

                  <div class="product-vendor">
                      <span>Vendor:</span>
                      <span>${productDetail.vendor}</span>
                  </div>

                  <div class="product-sku">
                      <span>SKU:</span>
                      <span>${productDetail.sku}</span>
                  </div>

                  <div class="product-stock">
                  <span>Stock</span>
                  <span>${Number(productDetail.quantity_stock)}</span>
              </div>

                  <div class="product-add-quantity">
                      <p>Quantity:</p>
                      <input type="number" min="1" value="1">
                  </div>
                  <button class="product-detail-page-add-to-cart-btn">ADD TO CART</button>
              </div>
          </div>
      </div>
  </div>
</div>`;
  containerElement.innerHTML = containerContent;
}
renderProductDetail();

// Render List Products
function renderProductRelated(productsDatabase) {
  let containerElement = document.querySelector("#container-product-related");
  let containerContent = "";
  for (let i = 0; i < 4; i++) {
    containerContent += `
      <div class="col-12 col-sm-12 col-md-6 col-xl-3 mt-5 px-2">
          <div class="card">
              <img src="${
                productsDatabase[i].productImage[0]
              }" class="card-img-top" alt="...">
              <div class="card-body">
              <a href="product-detail.html" onclick="handleToProductDetailFromDetailPage(${
                productsDatabase[i].id
              })"><h5 class="product-title-name">${
      productsDatabase[i].name
    }</h5></a>
                  <p class="card-price">Price: $${Number(
                    productsDatabase[i].price
                  ).toLocaleString()}</p>
              </div>
              <div class="card-foot">
                                   <button type="button" class="btn btn-primary detail-btn" data-bs-toggle="modal"
                      data-bs-target="#exampleModal" onclick="handleDetailFromDetailPage(${i})">
                      Detail
                  </button>
              </div>
          </div>
      </div>
  </div>`;
  }
  containerElement.innerHTML = containerContent;
}
renderProductRelated(productsDatabase);

// Render Products Detail
function handleDetailFromDetailPage(i) {
  const productsDatabase = JSON.parse(localStorage.getItem("productsDatabase"));
  let modalDetailFromDetailElement = document.querySelector(
    "#modal-detail-from-products-detail-page"
  );
  let modalDetailFromDetailContent = "";
  modalDetailFromDetailContent += `<div class="col-xl-8 col-sm-12">
      <div class="container text-center">
          <div class="row row-cols-2">
          <div class="col"><img src="${
            productsDatabase[i].productImage[0]
          }" alt="">    
          </div> <div class="col"><img src="${
            productsDatabase[i].productImage[1]
          }"alt=""></div>
           <div class="col"><img src="${
             productsDatabase[i].productImage[2]
           }" alt=""></div> <div class="col"><img src="${
    productsDatabase[i].productImage[3]
  }" alt=""></div>
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
  
          <div class="product-sku">
          <span>Stock:</span>
          <span>${productsDatabase[i].quantity_stock}</span>
      </div>

          <div class="product-add-quantity">
              <p>Quantity:</p>
              <input type="number" min="0" value="1">
          </div>
      </div>
  </div>`;
  modalDetailFromDetailElement.innerHTML = modalDetailFromDetailContent;
}

// Function handleAddToCartFromProductDetail
let addToCartBtnNoAuth = document.querySelector(
  ".add-to-cart-from-product-detail-no-auth"
);
let addToCartBtnWithAuth = document.querySelector(
  ".add-to-cart-from-product-detail-with-auth"
);
if (authDatabase) {
  addToCartBtnNoAuth.style.display = "none";
  addToCartBtnWithAuth.style.display = "inline-block";
} else {
  addToCartBtnNoAuth.style.display = "inline-block";
  addToCartBtnWithAuth.style.display = "none";
}

function handleAddToCartFromProductDetail() {
  if (authDatabase && authDatabase.role == "customer") {
    alert("AAA");
  }
}

// Function handleToProductDetailFromDetailPage
function handleToProductDetailFromDetailPage(id) {
  const item = productsDatabase.find((el) => el.id == id);
  const myArrayJson = JSON.stringify(item);
  localStorage.setItem("productDetail", myArrayJson);
  window.location.href = "./product-detail.html";
}
