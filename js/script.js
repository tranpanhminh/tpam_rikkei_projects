// Get Data của Products từ Local Storage về
const productsDatabase = JSON.parse(localStorage.getItem("productsDatabase"));
const authDatabase = JSON.parse(localStorage.getItem("auth"));
const openMenu = document.querySelector(".open");
const overlay = document.querySelector(".wrapper-mobile-menu");
const menuMobile = document.querySelector(".menu-mobile");
const hideMenuMobile = document.querySelector(".icon-close-menu");
let itemDetail;

openMenu.addEventListener("click", () => {
  overlay.classList.add("active");
  menuMobile.classList.add("active");
});

overlay.addEventListener("click", (e) => {
  overlay.classList.remove("active");
  menuMobile.classList.remove("active");
});

hideMenuMobile.addEventListener("click", (e) => {
  overlay.classList.remove("active");
  menuMobile.classList.remove("active");
});

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
            <a href="product-detail.html" onclick="handleToProductDetail(${
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
                    data-bs-target="#show-detail-product-homepage" onclick="handleDetailFromHome(${i})">
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

        <div class="product-stock">
        <span>Stock:</span>
        <span>${productsDatabase[i].quantity_stock}</span>
    </div>

        <div class="product-add-quantity">
            <p>Quantity:</p>
            <input type="number" min="1" id="product-add-quantity" value="1">
        </div>
    </div>
</div>`;
  modalDetailFromHomeElement.innerHTML = modalDetailFromHomeContent;
}

// Function handleAddToCartFromHomeDetail
let addToCartBtnNoAuth = document.querySelector(
  ".add-to-cart-detail-homepage-no-auth"
);
let addToCartBtnWithAuth = document.querySelector(
  ".add-to-cart-detail-homepage-with-auth"
);
if (authDatabase) {
  addToCartBtnNoAuth.style.display = "none";
  addToCartBtnWithAuth.style.display = "inline-block";
} else {
  addToCartBtnNoAuth.style.display = "inline-block";
  addToCartBtnWithAuth.style.display = "none";
}

function handleAddToCartFromHomeDetail() {
  let inputProductQuantity = document.querySelector(
    "#product-add-quantity"
  ).value;

  if (authDatabase && authDatabase.role == "customer") {
    const index = productsDatabase.findIndex(
      (product) => product.id === productsDatabase[itemDetail].id
    );

    if (index > -1) {
      alert("AA");
      // console.log(inputProductQuantity);
      // let addToCartInfo = {};

      // if (addToCart.length === 0) {
      //   addToCartInfo = {
      //     id: 0,
      //     user_id: authDatabase.id,
      //     product: productsDatabase[itemDetail].id,
      //     quantity: inputProductQuantity,
      //   };
      //   console.log(addToCartInfo);
      //   // alert("Mua thành công");
      // } else {
      //   console.log(cart[index].user_id, authDatabase.id);
      //   if (cart[itemDetail].user_id == authDatabase.id) {
      //     // cart.push(addToCartInfo);
      //     console.log("xxxx");
      //   }
      //   const maxId = Math.max(...addToCart.map((item) => item.id));
      //   addToCartInfo = {
      //     id: maxId + 1,
      //     user_id: authDatabase.id,
      //     product: productsDatabase[itemDetail],
      //     quantity: inputProductQuantity,
      //   };
      // }
      // addToCart.push(addToCartInfo);
    }
  }
  // localStorage.setItem("addToCart", JSON.stringify(addToCart));
}

// Function handleToProductDetail
function handleToProductDetail(id) {
  const item = productsDatabase.find((el) => el.id == id);
  const myArrayJson = JSON.stringify(item);
  localStorage.setItem("productDetail", myArrayJson);
  window.location.href = "./product-detail.html";
}
