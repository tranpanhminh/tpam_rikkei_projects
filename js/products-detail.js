const productsDatabase = JSON.parse(localStorage.getItem("productsDatabase"));
const authDatabase = JSON.parse(localStorage.getItem("auth"));
const productDetail = JSON.parse(localStorage.getItem("productDetail"));
const accountsDatabase = JSON.parse(localStorage.getItem("accountsDatabase"));
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
      <a href="http://127.0.0.1:5501/products-category.html">Products</a>
      <span> / </span>
      <a href="http://127.0.0.1:5501/product-detail.html?product-id-${
        productDetail.id
      }">${productDetail.name}</a>
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

                  <div class="product-id">
                  <span>Product ID:</span>
                  <span>${productDetail.id}</span>
              </div>
                  
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
                      <input type="number" min="1" value="1" id="input-quantity-from-product-detail">
                  </div>
                  <button data-bs-toggle="modal" data-bs-target="#add-to-cart-modal" class="product-detail-page-add-to-cart-btn product-detail-page-add-to-cart-btn-no-auth">ADD TO CART</button>
                  
                  <button class="product-detail-page-add-to-cart-btn product-detail-page-add-to-cart-btn-with-auth" id="add-to-cart-big-btn" onclick="handleAddToCartBigBtn(${
                    productDetail.id
                  })">ADD TO CART</button>
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
              <a href="product-detail.html?product-id-${
                productsDatabase[i].id
              }" onclick="handleToProductDetailFromDetailPage(${
      productsDatabase[i].id
    })"><h5 class="product-title-name">${productsDatabase[i].name}</h5></a>
                  <p class="card-price">Price: $${Number(
                    productsDatabase[i].price
                  ).toLocaleString()}</p>
              </div>
              <div class="card-foot">
<button onclick="handleToProductDetailFromDetailPage(${
      productsDatabase[i].id
    })" type="button" class="btn btn-primary detail-btn" >
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
  
          <div class="product-id">
          <span>Product ID</span>
          <span>${Number(productsDatabase[i].id)}</span>
      </div>

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
let bigAddToCartBtnNoAuth = document.querySelector(
  ".product-detail-page-add-to-cart-btn-no-auth"
);
let bigAddToCartBtnWithAuth = document.querySelector(
  ".product-detail-page-add-to-cart-btn-with-auth"
);
// let addToCartBtnNoAuth = document.querySelector(
//   ".add-to-cart-from-product-detail-no-auth"
// );
// let addToCartBtnWithAuth = document.querySelector(
//   ".add-to-cart-from-product-detail-with-auth"
// );
if (authDatabase) {
  // addToCartBtnNoAuth.style.display = "none";
  // addToCartBtnWithAuth.style.display = "inline-block";
  bigAddToCartBtnNoAuth.style.display = "none";
  bigAddToCartBtnWithAuth.style.display = "inline-block";
} else {
  // addToCartBtnNoAuth.style.display = "inline-block";
  // addToCartBtnWithAuth.style.display = "none";
  bigAddToCartBtnNoAuth.style.display = "inline-block";
  bigAddToCartBtnWithAuth.style.display = "none";
}

// function handleAddToCartFromProductDetail() {
//   if (authDatabase && authDatabase.role == "customer") {
//     alert("AAA");
//   }
// }

// Function handleToProductDetailFromDetailPage
function handleToProductDetailFromDetailPage(id) {
  const item = productsDatabase.find((el) => el.id == id);
  const myArrayJson = JSON.stringify(item);
  localStorage.setItem("productDetail", myArrayJson);
  window.location.href = `./product-detail.html?product-id-${id}`;
}

let cart = [];
cart.push(...authDatabase?.cart);
// Function handleAddToCartBigBtn()
function handleAddToCartBigBtn(id) {
  if (authDatabase && authDatabase.status === "Inactive") {
    alert("Your Account is Inactive, please wait for admin's verifcation");
  } else {
    let inputAddQuantity = Number(
      document.querySelector("#input-quantity-from-product-detail").value
    );

    // Lấy cart trên local về

    let checkCartOrder = cart.find((item) => {
      return item.id == id;
    });

    if (checkCartOrder) {
      cart.map((item) => {
        if (item.id == checkCartOrder.id) {
          item.quantity += inputAddQuantity;
        }
      });
    } else {
      let findProduct = productsDatabase.find((item) => {
        return item.id == id;
      });
      findProduct.quantity = inputAddQuantity;
      console.log(findProduct);
      cart.push(findProduct);
    }
    console.log(cart);
    // Kiểm tra xem Auth và Accounts Database có giống nhau không
    accountsDatabase.map((item) => {
      if (item.id == authDatabase.id) {
        item.cart = cart;
      }
    });

    authDatabase.cart = cart;

    console.log(authDatabase);
    console.log(accountsDatabase);

    localStorage.setItem("auth", JSON.stringify(authDatabase));
    localStorage.setItem("accountsDatabase", JSON.stringify(accountsDatabase));
    alert("Product Added");
  }
}
