import React from "react";
import aboutImage from "../../../../assets/images/about-store.jpg";
import styles from "../../ClientPage.module.css";
import { NavLink } from "react-router-dom";

function AboutStore() {
  return (
    <>
      {/* <div className={styles["about-our-store"]} style={{ marginTop: 0 }}>
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
                  <NavLink to="/about">READ MORE</NavLink>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className={styles["about-our-store"]} style={{ marginTop: 0 }}>
        <div className="container text-center">
          <div className="row align-items-start">
            <div className="col-12 col-sm-12 col-md-6 col-xl-6">
              <img src={aboutImage} alt="" className={styles["image-store"]} />
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-xl-6">
              <div
                className={styles["about-store"]}
                style={{ marginTop: "40px" }}
              >
                <h4 className={styles["headline-store"]}>
                  About Our Pet Shop Store
                </h4>
                <p className={styles["headline-slogan"]}>
                  We Can Keep Them Happy
                </p>
                <p className={styles["justify-text"]}>
                  Welcome to PetShop, your ultimate destination for all your
                  pet's needs. We understand that your furry friends are not
                  just pets; they're cherished members of your family.
                </p>
                <p className={styles["justify-text"]}>
                  That's why we strive to provide a wide range of top-quality
                  products to ensure their health, happiness, and well-being.
                  From premium pet food and treats to stylish accessories, toys,
                  grooming supplies, and more, we have everything you need to
                  create a nurturing and engaging environment for your beloved
                  companions.
                </p>
                <p className={styles["justify-text"]}>
                  Our knowledgeable team is dedicated to helping you find the
                  perfect products tailored to your pet's specific needs.
                  Whether you're a proud cat parent, a doting dog lover, a
                  passionate bird enthusiast, or an aquatics aficionado, PetShop
                  has you covered.
                </p>
                <p className={styles["justify-text"]}>
                  Shop with confidence, knowing that we prioritize your pet's
                  happiness and strive to exceed your expectations. Experience
                  the joy of shopping at PetShop and give your pets the love
                  they deserve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutStore;
