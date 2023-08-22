import React from "react";
import leftBanner from "../../../../assets/images/dog-banner-homepage.jpg";
import rightBanner from "../../../../assets/images/cat-banner-homepage.jpg";

function ClientSaleOff() {
  return (
    <>
      {" "}
      <section className="banner-couple">
        <div className="container text-center">
          <div className="row discount-group">
            {/* Left banner */}
            <div className="col-12 col-md-12 col-lg-6 col-xl-6 banner-single-col banner-single-left-col">
              <div className="banner-image-wrapper-left">
                <img
                  src={leftBanner}
                  alt=""
                  className="img-banner-couple-left"
                />
                <span className="discount-label">-10%</span>
                <div className="group-shop-now-left">
                  <span className="text-shop-left">
                    Save 10% on pets clothing
                  </span>
                  <a
                    href="/products-category.html"
                    className="shop-now-banner-btn"
                  >
                    SHOP NOW
                  </a>
                </div>
              </div>
            </div>
            {/* Right banner */}
            <div className="col-12 col-md-12 col-lg-6 col-xl-6 banner-single-col banner-single-right-col">
              <div className="banner-image-wrapper-right">
                <img
                  src={rightBanner}
                  alt=""
                  className="img-banner-couple-right"
                />
                <div className="group-shop-now-right">
                  <span className="text-shop-right">Best Toys for dogs!</span>
                  <a
                    href="/products-category.html"
                    className="shop-now-banner-btn"
                  >
                    SHOP NOW
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ClientSaleOff;
