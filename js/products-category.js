const productsDatabase = JSON.parse(localStorage.getItem("productsDatabase"));
const authDatabase = JSON.parse(localStorage.getItem("auth"));

// Render List Products
function renderProductCategory(productsDatabase) {
  let containerElement = document.querySelector("#container-product-category");
  let containerContent = "";
  for (let i = 0; i < productsDatabase.length; i++) {
    containerContent += `
      <div class="col-12 col-sm-12 col-md-6 col-xl-3 mt-5 px-2">
          <div class="card">
              <img src="${
                productsDatabase[i].productImage[0]
              }" class="card-img-top" alt="...">
              <div class="card-body">
              <a href="product-detail.html?product-id-${
                productsDatabase[i].id
              }" onclick="handleToProductDetailFromCategory(${
      productsDatabase[i].id
    })"><h5 class="product-title-name">${productsDatabase[i].name}</h5></a>
                  <p class="card-price">Price: $${Number(
                    productsDatabase[i].price
                  ).toLocaleString()}</p>
              </div>
              <div class="card-foot">
                 <button type="button" class="btn btn-primary detail-btn" data-bs-toggle="modal"
                      data-bs-target="#exampleModal" onclick="handleDetailFromCategory(${i})">
                      Detail
                  </button>
              </div>
          </div>
      </div>
  </div>`;
  }
  containerElement.innerHTML = containerContent;
}
renderProductCategory(productsDatabase);

// Render Products Detail
function handleDetailFromCategory(i) {
  const productsDatabase = JSON.parse(localStorage.getItem("productsDatabase"));
  let modalDetailFromCategoryElement = document.querySelector(
    "#modal-detail-from-products-category"
  );
  let modalDetailFromCategoryContent = "";
  modalDetailFromCategoryContent += `<div class="col-xl-8 col-sm-12">
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
  
          <div class="product-id">
          <span>Product ID</span>
          <span>${Number(productsDatabase[i].id)}</span>
      </div>

          <div class="product-price">
              <span>Price</span>
              <span>$${Number(
                productsDatabase[i].price
              ).toLocaleString()}</span>
          </div>
  
          <div class="product-vendor">
              <span>Vendor:</span>
              <span>${productsDatabase[i].vendor}</span>
          </div>
  
          <div class="product-sku">
              <span>SKU:</span>
              <span>${productsDatabase[i].sku}</span>
          </div>

          <div class="product-stock">
          <span>Stock:</span>
          <span>${productsDatabase[i].quantity_stock}</span>
      </div>
  
          <div class="product-add-quantity">
              <p>Quantity:</p>
              <input type="number" min="0" value="1">
          </div>
      </div>
  </div>`;
  modalDetailFromCategoryElement.innerHTML = modalDetailFromCategoryContent;
}

// Function handleAddToCartFromCateogryDetail
let addToCartBtnNoAuth = document.querySelector(
  ".add-to-cart-detail-category-no-auth"
);
let addToCartBtnWithAuth = document.querySelector(
  ".add-to-cart-detail-category-with-auth"
);
if (authDatabase) {
  addToCartBtnNoAuth.style.display = "none";
  addToCartBtnWithAuth.style.display = "inline-block";
} else {
  addToCartBtnNoAuth.style.display = "inline-block";
  addToCartBtnWithAuth.style.display = "none";
}

function handleAddToCartFromCateogryDetail() {
  if (authDatabase && authDatabase.role == "customer") {
    alert("AAA");
  }
}

// Function handleToProductDetail
function handleToProductDetailFromCategory(id) {
  const item = productsDatabase.find((el) => el.id == id);
  const myArrayJson = JSON.stringify(item);
  localStorage.setItem("productDetail", myArrayJson);
  window.location.href = "./product-detail.html";
}
