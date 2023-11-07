import React from "react";
import rabbitImage from "../../../../assets/images/rabbits.jpg";
import catImage from "../../../../assets/images/cat.jpg";
import dogImage from "../../../../assets/images/dog.jpg";
import parrotImage from "../../../../assets/images/parrot.jpg";
import styles from "../../ClientPage.module.css";
function ClientFeaturedCategories() {
  return (
    <>
      <div className={styles["for-your-pet"]}>
        <div className={styles["group-title-category"]}>
          <h3 className={styles["headline-title-category"]}>For your pets!</h3>
          <p className={styles["headline-category"]}>Our Favorite Categories</p>
        </div>

        <div className="container text-center">
          <div className="row align-items-start">
            <div className="col-6 col-sm-12 col-md-6 col-xl-3 px-3 my-2">
              <div className={styles["collection-item"]}>
                <img
                  src={rabbitImage}
                  alt=""
                  className={styles["collection-image"]}
                />
                <div className={styles["collection-caption"]}>
                  <p className={styles["collection-title"]}>Rabbits</p>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-12 col-md-6 col-xl-3 px-3 my-2">
              <div className={styles["collection-item"]}>
                <img
                  src={catImage}
                  alt=""
                  className={styles["collection-image"]}
                />
                <div className={styles["collection-caption"]}>
                  <p className={styles["collection-title"]}>Cats</p>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-12 col-md-6 col-xl-3 px-3 my-2">
              <div className={styles["collection-item"]}>
                <img
                  src={dogImage}
                  alt=""
                  className={styles["collection-image"]}
                />
                <div className={styles["collection-caption"]}>
                  <p className={styles["collection-title"]}>Dogs</p>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-12 col-md-6 col-xl-3 px-3 my-2">
              <div className={styles["collection-item"]}>
                <img
                  src={parrotImage}
                  alt=""
                  className={styles["collection-image"]}
                />
                <div className={styles["collection-caption"]}>
                  <p className={styles["collection-title"]}>Parrots</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientFeaturedCategories;
