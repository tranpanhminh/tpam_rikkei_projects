import React from "react";
import aboutImage from "../../../../assets/images/about-store.jpg";

function ClientAboutStore() {
  return (
    <>
      <div className="about-our-store">
        <div className="container text-center">
          <div className="row align-items-start">
            <div className="col-12 col-sm-12 col-md-6 col-xl-6">
              <img src={aboutImage} alt="" className="image-store" />
            </div>

            <div className="col-12 col-sm-12 col-md-6 col-xl-6">
              <div className="about-store">
                <h4 className="headline-store">About Our Store</h4>
                <p className="headline-slogan">We Can Keep Them Happy</p>
                <p className="our-store-description">
                  100% complete and balanced, Range of wet and dry foods is
                  prepared with delicious high quality ingredients, containing
                  all the essential nutrients. your cat needs.
                </p>
                <button className="read-more-btn">
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
