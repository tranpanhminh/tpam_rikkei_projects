// Get Data của Products từ Local Storage về
const productsDatabase = getDataFromLocal("productsDatabase") ?? [];

// Script Render Product Homepage

function renderProductHomepage(productsDatabase) {
  let containerElement = document.querySelector("#container-product-homepage");
  let containerContent = "";
  for (let i = 0; i < productsDatabase.length; i++) {
    containerContent += `
    <div class="col-12 col-sm-12 col-md-6 col-xl-3 mt-5 px-2">
        <div class="card">
            <img src="${
              productsDatabase[i].productImage[0]
            }" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${productsDatabase[i].name}</h5>
                <p class="card-price">Price: $${Number(
                  productsDatabase[i].price
                ).toLocaleString()}</p>
            </div>
            <div class="card-foot">
                <a href="#" class="btn btn-primary add-to-cart-btn" onclick="handleAddToCartFromHome(${i})">Add To Cart</a>
                <button type="button" class="btn btn-primary detail-btn" data-bs-toggle="modal"
                    data-bs-target="#exampleModal" onclick="handleDetailFromHome(${i})">
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
  const productsDatabase = getDataFromLocal("productsDatabase") ?? [];
  let modalDetailFromHomeElement = document.querySelector(
    "#modal-detail-from-homepage"
  );
  let modalDetailFromHomeContent = "";
  modalDetailFromHomeContent += `<div class="col-xl-8 col-sm-12">
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
            <input type="number" min="0">
        </div>
    </div>
</div>`;
  modalDetailFromHomeElement.innerHTML = modalDetailFromHomeContent;
}
