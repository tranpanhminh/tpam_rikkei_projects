import React from "react";
import aboutImage from "../../../../assets/images/about-store.jpg";
import styles from "../../ClientPage.module.css";

function ClientAboutStore() {
  return (
    <>
      <div className={styles["about-our-store"]}>
        <div className="container text-center">
          <div className="row align-items-start">
            <div className="col-12 col-sm-12 col-md-6 col-xl-6">
              <img src={aboutImage} alt="" className={styles["image-store"]} />
            </div>

            <div className="col-12 col-sm-12 col-md-6 col-xl-6">
              <div className={styles["about-store"]}>
                <h4 className={styles["headline-store"]}>About Our Store</h4>
                <p className={styles["headline-slogan"]}>
                  We Can Keep Them Happy
                </p>
                <p className={styles["our-store-description"]}>
                  100% complete and balanced, Range of wet and dry foods is
                  prepared with delicious high quality ingredients, containing
                  all the essential nutrients. your cat needs.
                </p>
                <button className={styles["read-more-btn"]}>
                  <a href="./about.html">READ MORE</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientAboutStore;
