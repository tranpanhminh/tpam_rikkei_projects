import React from "react";
import veterianarian from "../../../../assets/images/veterinary-service.jpg";
import petGrooming from "../../../../assets/images/dog-grooming-service.jpg";
import petSitting from "../../../../assets/images/pet-sitting-service.png";
import styles from "../../ClientPage.module.css";
function ClientServices() {
  return (
    <>
      <div className={styles["for-your-pet"]}>
        <div className={styles["group-title-category"]}>
          <h3 className={styles["headline-title-category"]}>For your pets!</h3>
          <p className={styles["headline-category"]}>Our Favorite Services</p>
        </div>

        <div className="container text-center">
          <div className="row align-items-start">
            <div className="col-12 col-sm-12 col-md-6 col-xl-4 px-3 my-2">
              <div className={styles["collection-item"]}>
                <img src={veterianarian} alt="" className="collection-image" />
                <div className={styles["collection-caption"]}>
                  <p className={styles["collection-title"]}>Veterinarian</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-xl-4 px-3 my-2">
              <div className={styles["collection-item"]}>
                <img src={petGrooming} alt="" className="collection-image" />
                <div className={styles["collection-caption"]}>
                  <p className={styles["collection-title"]}>Pet Grooming</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-xl-4 px-3 my-2">
              <div className={styles["collection-item"]}>
                <img src={petSitting} alt="" className="collection-image" />
                <div className={styles["collection-caption"]}>
                  <p className={styles["collection-title"]}>Pet Sitting</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientServices;
