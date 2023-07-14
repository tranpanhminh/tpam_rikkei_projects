const productDetailSearch = JSON.parse(localStorage.getItem("productDetail"));


// Function Search
function handleSearch() {
  const productsDatabase = JSON.parse(localStorage.getItem("productsDatabase"));
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
  localStorage.setItem("myProductSearch", JSON.stringify(filterProduct));
  window.location.href = `./search-page.html?search=${inputSearch}`;
}

// Function renderSearchPage
function renderSearchPage() {
  // const productsDatabase = JSON.parse(localStorage.getItem("productsDatabase"));

  const myProductSearch = JSON.parse(localStorage.getItem("myProductSearch"));
  let containerSearchElement = document.querySelector(
    "#container-search-product-page"
  );
  let containerSearchContent = "";
  containerSearchContent = `<div class="page-info">
  <p class="search-result-text">Search Results: ${myProductSearch.length}</p>
</div>`;
  for (let i = 0; i < myProductSearch.length; i++) {
    containerSearchContent += `
        <div class="col-12 col-sm-12 col-md-6 col-xl-3 mt-5 px-2">
            <div class="card">
                <img src="${
                  myProductSearch[i].productImage[0]
                }" class="card-img-top" alt="...">
                <div class="card-body">
                <a href="product-detail.html?product-id-${
                  myProductSearch[i].id
                }" onclick="handleToProductDetailFromSearchPage(${
      myProductSearch[i].id
    })"><h5 class="product-title-name">${myProductSearch[i].name}</h5></a>
                    <p class="card-price">Price: $${Number(
                      myProductSearch[i].price
                    ).toLocaleString()}</p>
                </div>
                <div class="card-foot">
                   <button type="button" class="btn btn-primary detail-btn" onclick="handleToProductDetailFromSearchPage(${
                     myProductSearch[i].id
                   })">
                        Detail
                    </button>
                </div>
            </div>
        </div>
    </div>`;
  }
  containerSearchElement.innerHTML = containerSearchContent;
}
renderSearchPage();

// Function handleToProductDetailFromDetailPage
function handleToProductDetailFromSearchPage(id) {
  const productsDatabase = JSON.parse(localStorage.getItem("productsDatabase"));
  const item = productsDatabase.find((el) => el.id == id);
  const myArrayJson = JSON.stringify(item);
  localStorage.setItem("productDetail", myArrayJson);
  window.location.href = `./product-detail.html?product-id-${id}`;
}

// Function Search Mobile
function handleSearchMobile() {
  const productsDatabase = JSON.parse(localStorage.getItem("productsDatabase"));
  let inputSearch = document.querySelector(".search-bar-mobile").value.toLowerCase();
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
  localStorage.setItem("myProductSearch", JSON.stringify(filterProduct));
  window.location.href = `./search-page.html?search=${inputSearch}`;
}
