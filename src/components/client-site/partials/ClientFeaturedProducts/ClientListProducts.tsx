import React, { useState } from "react";
import {
  initProductsDatabase,
  getDataFromLocal,
  setDataToLocal,
  Product,
} from "../../../../database";

function ClientListProducts() {
  const [productsDatabase, setProductsDatabase] =
    useState(initProductsDatabase);
  const [products, setProducts] = useState<Product[]>(
    getDataFromLocal("productsDatabase") || []
  );
  return (
    <div className="category-products">
      <div className="container text-center">
        <div className="row align-items-start" id="container-product-category">
          {products.map((product) => {
            return (
              <div className="col-12 col-sm-12 col-md-6 col-xl-3 mt-5 px-2">
                <div className="card">
                  <img
                    src={require(`../../../../assets/images/product-images/${product.productImage[0]}`)}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="product-title-name">{product.name}</h5>
                    <p className="card-price">
                      Price: ${product.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="card-foot">
                    <button
                      type="button"
                      className="btn btn-primary detail-btn"
                    >
                      Detail
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ClientListProducts;
