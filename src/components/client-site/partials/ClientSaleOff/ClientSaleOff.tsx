import React from "react";
import leftBanner from "../../../../assets/images/dog-banner-homepage.jpg";
import rightBanner from "../../../../assets/images/cat-banner-homepage.jpg";
import styles from "../../ClientPage.module.css";
function ClientSaleOff() {
  return (
    <>
      {" "}
      <section className={styles["banner-couple"]}>
        <div className="container text-center">
          <div className="row" id={styles["discount-group"]}>
            {/* Left banner */}
            <div
              className="col-12 col-md-12 col-lg-6 col-xl-6  banner-single-left-col"
              id={styles["banner-single-col"]}
            >
              <div className={styles["banner-image-wrapper-left"]}>
                <img
                  src={leftBanner}
                  alt=""
                  className={styles["img-banner-couple-left"]}
                />
                <span className={styles["discount-label"]}>-10%</span>
                <div className={styles["group-shop-now-left"]}>
                  <span className={styles["text-shop-left"]}>
                    Save 10% on pets clothing
                  </span>
                  <a
                    href="/products-category.html"
                    className={styles["shop-now-banner-btn"]}
                  >
                    SHOP NOW
                  </a>
                </div>
              </div>
            </div>
            {/* Right banner */}
            <div
              className="col-12 col-md-12 col-lg-6 col-xl-6  banner-single-right-col"
              id={styles["banner-single-col-2"]}
            >
              <div className={styles["banner-image-wrapper-right"]}>
                <img
                  src={rightBanner}
                  alt=""
                  className={styles["img-banner-couple-right"]}
                />
                <div className={styles["group-shop-now-right"]}>
                  <span className={styles["text-shop-right"]}>
                    Best Toys for dogs!
                  </span>
                  <a
                    href="/products-category.html"
                    className={styles["shop-now-banner-btn"]}
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
