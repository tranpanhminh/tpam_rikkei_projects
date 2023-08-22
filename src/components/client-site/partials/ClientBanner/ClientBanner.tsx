import React from "react";

function ClientBanner() {
  return (
    <>
      <section className="banner">
        <div className="container">
          <div className="banner-caption-group">
            <p className="caption-title">
              <em>Best Brands</em>
            </p>
            <p className="caption-discount">25% OFF ORDERS $50+</p>
            <h2 className="caption-headline">Healthy Dog Food</h2>
            <p className="caption-text">
              Get 25% off your order of $50 or more when you buy online and
              pickup in-store!
            </p>
            <a href="./products-category.html" className="shop-now-btn">
              Shop now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default ClientBanner;
