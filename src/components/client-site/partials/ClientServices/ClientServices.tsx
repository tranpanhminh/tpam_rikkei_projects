import React from "react";
import veterianarian from "../../../../assets/images/veterinary-service.jpg";
import petGrooming from "../../../../assets/images/dog-grooming-service.jpg";
import petSitting from "../../../../assets/images/pet-sitting-service.png";

function ClientServices() {
  return (
    <>
      <div className="for-your-pet">
        <div className="group-title-category">
          <h3 className="headline-title-category">For your pets!</h3>
          <p className="headline-category">Our Favorite Services</p>
        </div>

        <div className="container text-center">
          <div className="row align-items-start">
            <div className="col-12 col-sm-12 col-md-6 col-xl-4 px-3 my-2">
              <div className="collection-item">
                <img src={veterianarian} alt="" className="collection-image" />
                <div className="collection-caption">
                  <p className="collection-title">Veterinarian</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-xl-4 px-3 my-2">
              <div className="collection-item">
                <img src={petGrooming} alt="" className="collection-image" />
                <div className="collection-caption">
                  <p className="collection-title">Pet Grooming</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-xl-4 px-3 my-2">
              <div className="collection-item">
                <img src={petSitting} alt="" className="collection-image" />
                <div className="collection-caption">
                  <p className="collection-title">Pet Sitting</p>
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
