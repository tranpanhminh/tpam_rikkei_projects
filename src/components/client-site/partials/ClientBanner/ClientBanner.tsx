import React from "react";
import styles from "../../ClientPage.module.css";

function ClientBanner() {
  return (
    <>
      <section className={styles["banner"]}>
        <div className={styles["container"]}>
          <div className={styles["banner-caption-group"]}>
            <p className={styles["caption-title"]}>
              <em>Best Brands</em>
            </p>
            <p className={styles["caption-discount"]}>25% OFF ORDERS $50+</p>
            <h2 className={styles["caption-headline"]}>Healthy Dog Food</h2>
            <p className={styles["caption-text"]}>
              Get 25% off your order of $50 or more when you buy online and
              pickup in-store!
            </p>
            <a
              href="./products-category.html"
              className={styles["shop-now-btn"]}
            >
              Shop now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default ClientBanner;
