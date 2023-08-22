import React from "react";

function ClientEditProfile() {
  return (
    <>
      <div className="breadcrumb">
        <h2 className="page-title">Edit Profile</h2>
        <p className="page-description">PetShop User Panel</p>
      </div>

      <div className="col-12 right-cart" id="user-info-summary">
        <h2 className="cart-title">User Info</h2>

        <div className="cart-shipping">
          <h4 className="cart-shipping-title">User ID</h4>
          <input type="text" placeholder="" />
        </div>

        <div className="cart-shipping">
          <h4 className="cart-shipping-title">Email</h4>
          <input type="text" placeholder="" />
        </div>

        <div className="cart-shipping">
          <h4 className="cart-shipping-title">Name</h4>
          <input type="text" placeholder="" />
        </div>

        <button
          type="button"
          className="btn btn-primary edit-user-btn"
          data-bs-toggle="modal"
          data-bs-target="#detailUser"
        >
          Edit User
        </button>
      </div>
    </>
  );
}

export default ClientEditProfile;
