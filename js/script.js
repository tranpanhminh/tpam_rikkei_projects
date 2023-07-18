// Get Data của Products từ Local Storage về
const productsDatabase = JSON.parse(localStorage.getItem("productsDatabase"));
const authDatabaseHomepage = JSON.parse(localStorage.getItem("auth"));
let itemDetail;

// Script Render Product Homepage
function renderProductHomepage(productsDatabase) {
  let containerElement = document.querySelector("#container-product-homepage");
  let containerContent = "";
  for (let i = 0; i < productsDatabase.length; i++) {
    containerContent += `
    <div class="col-12 col-sm-12 col-md-6 col-xl-3 mt-5 px-2">
        <div class="card">
        <a href="product-detail.html?product-id-${
          productsDatabase[i].id
        }" onclick="handleToProductDetail(${productsDatabase[i].id})">
            <img src="${
              productsDatabase[i].productImage[0]
            }" class="card-img-top" alt="..."></a>
            <div class="card-body">
            <a href="product-detail.html?product-id-${
              productsDatabase[i].id
            }" onclick="handleToProductDetail(${
      productsDatabase[i].id
    })"><h5 class="product-title-name">${productsDatabase[i].name}</h5></a>
                <p class="card-price">Price: $${Number(
                  productsDatabase[i].price
                ).toLocaleString()}</p>
            </div>
            <div class="card-foot">
                <button onclick="handleToProductDetail(${
                  productsDatabase[i].id
                })" type="button" class="btn btn-primary detail-btn" 
                    >
                    Detail
                </button>
            </div>
        </div>
    </div>
</div>`;
  }
  containerElement.innerHTML = containerContent;
}
renderProductHomepage(productsDatabase);

// <----------------------> //

// Function handleDetail
function handleDetailFromHome(i) {
  itemDetail = i;
  const productsDatabase = JSON.parse(localStorage.getItem("productsDatabase"));
  let modalDetailFromHomeElement = document.querySelector(
    "#modal-detail-from-homepage"
  );
  let modalDetailFromHomeContent = "";
  modalDetailFromHomeContent += `<div class="col-xl-8 col-sm-12">
    <div class="container text-center">
        <div class="row row-cols-2">
        <div class="col"><img src="${productsDatabase[i].productImage[0]}"
        alt=""></div><div class="col"><img src="${
          productsDatabase[i].productImage[1]
        }"alt=""></div><div class="col"><img src="${
    productsDatabase[i].productImage[2]
  }"alt=""></div><div class="col"><img src="${
    productsDatabase[i].productImage[3]
  }"alt=""></div>
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
            <span>$${Number(productsDatabase[i].price).toLocaleString()}</span>
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
    </div>
</div>`;
  modalDetailFromHomeElement.innerHTML = modalDetailFromHomeContent;
}

// Function handleAddToCartFromHomeDetail
// function handleAddToCartFromHomeDetail() {
//   let addToCartBtnFromHome = document.querySelector(
//     ".add-to-cart-detail-homepage"
//     const item = productsDatabase.find((el) => el.id == id);
//     const myArrayJson = JSON.stringify(item);
//     localStorage.setItem("productDetail", myArrayJson);
//     window.location.href = "./product-detail.html";
//   );
// }

// Function handleToProductDetail
console.log(productsDatabase);
function handleToProductDetail(id) {
  const item = productsDatabase.find((el) => el.id == id);
  const myArrayJson = JSON.stringify(item);
  localStorage.setItem("productDetail", myArrayJson);
  window.location.href = `./product-detail.html?product-id-${id}`;
}
