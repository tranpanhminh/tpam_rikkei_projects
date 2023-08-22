import React from "react";
import naturalImage from "../../../../assets/images/natural.png";
import freeshippingImage from "../../../../assets/images/free-shipping.png";
import specialSaleImage from "../../../../assets/images/special-sale.jpg";

function ClientPromotionGroup() {
  return (
    <>
      <section className="promotion-group">
        <div className="promotion-item">
          <img src={naturalImage} alt="" />
          <div className="promotion-content">
            <p>100% Natural</p>
            <p>Eco-friendly products</p>
          </div>
        </div>

        <div className="promotion-item">
          <img src={freeshippingImage} alt="" />
          <div className="promotion-content">
            <p>Free Shipping</p>
            <p>Free shipping on all order</p>
          </div>
        </div>

        <div className="promotion-item">
          <img src={specialSaleImage} alt="" />
          <div className="promotion-content">
            <p>Special Sale</p>
            <p>Extra $9 off all items</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default ClientPromotionGroup;
