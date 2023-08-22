import React from "react";

function ProductsCategoryBreadCrumb() {
  return (
    <>
      <div className="page-info">
        <h2 className="category-title">Products</h2>
        <div className="breadcrumb-page">
          <a href="./index.html">Home</a>
          <span> / </span>
          <a href="./products-category.html">Products</a>
        </div>
      </div>
    </>
  );
}

export default ProductsCategoryBreadCrumb;
