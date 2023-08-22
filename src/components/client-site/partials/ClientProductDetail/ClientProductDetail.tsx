import React from "react";

function ClientProductDetail() {
  return (
    <>
      <div className="product-detail">
        <div className="container text-center">
          <div className="row align-items-center">
            <div className="col-xl-8 col-sm-12">
              <div className="container text-center">
                <div className="row row-cols-2">
                  <div className="col">
                    <img
                      src="https://tm-shopify037-clothes.myshopify.com/cdn/shop/products/black_water_proofing_dog_boots_pet_shoes_dogs_snow_booties_1_365x365_crop_top.png?v=1625752672"
                      alt=""
                    />
                  </div>
                  <div className="col">
                    <img
                      src="https://tm-shopify037-clothes.myshopify.com/cdn/shop/products/black_water_proofing_dog_boots_pet_shoes_dogs_snow_booties_2_365x365_crop_top.png?v=1625752672"
                      alt=""
                    />
                  </div>
                  <div className="col">
                    <img
                      src="https://tm-shopify037-clothes.myshopify.com/cdn/shop/products/black_water_proofing_dog_boots_pet_shoes_dogs_snow_booties_3_365x365_crop_top.png?v=1625752672"
                      alt=""
                    />
                  </div>
                  <div className="col">
                    <img
                      src="https://tm-shopify037-clothes.myshopify.com/cdn/shop/products/black_water_proofing_dog_boots_pet_shoes_dogs_snow_booties_4_365x365_crop_top.png?v=1625752672"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-12">
              <div className="product-detail-info">
                <h2 className="product-title-name">
                  Black Water Proofing Dog Boots Pet Shoes Dogs Snow Booties
                </h2>
                <p className="product-description">
                  A charming animal world is already waiting for you! We are all
                  used to the fact that taking care of pets is our everyday
                  responsibility. It is natural because often you can't fi...
                </p>
                <div className="product-price">
                  <span>Price</span>
                  <span>$19.00</span>
                </div>
                <div className="product-vendor">
                  <span>Vendor:</span>
                  <span>Adidas</span>
                </div>
                <div className="product-sku">
                  <span>SKU:</span>
                  <span>327AE-6</span>
                </div>
                <div className="product-add-quantity">
                  <p>Quantity:</p>
                  <input type="number" min="0" />
                </div>
                <button className="product-detail-page-add-to-cart-btn">
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientProductDetail;
