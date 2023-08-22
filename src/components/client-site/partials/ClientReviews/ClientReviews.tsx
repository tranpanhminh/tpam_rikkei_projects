import React from "react";
import reviewImage1 from "../../../../assets/images/dogs-reviews-01.png";
import reviewImage2 from "../../../../assets/images/dogs-reviews-02.png";
import reviewImage3 from "../../../../assets/images/dogs-reviews-03.png";

function ClientReviews() {
  return (
    <section className="customer-reviews-section">
      <div className="group-title-category">
        <h3 className="headline-title-category">Customers Reviews</h3>
      </div>

      <div className="group-reviews">
        {/* Review 1 */}
        <div className="reviews-item">
          <div className="reviews-logo">
            <img src={reviewImage1} alt="" />
          </div>

          <div className="reviews-content">
            I can't say enough good things about PetShop! They have everything I
            need for my furry friends, from food and toys to grooming supplies.
            The website is user-friendly, and their customer service is
            exceptional. Plus, their prices are competitive. Highly recommend
            PetShop for all your pet's needs!
          </div>

          <div className="reviews-name">Finn Aosto</div>
          <div className="reviews-count">
            <i className="fa-solid fa-star star-rating"></i>
            <i className="fa-solid fa-star star-rating"></i>
            <i className="fa-solid fa-star star-rating"></i>
            <i className="fa-solid fa-star star-rating"></i>
            <i className="fa-solid fa-star star-rating"></i>
          </div>
        </div>

        {/* Review 2 */}
        <div className="reviews-item">
          <div className="reviews-logo">
            <img src={reviewImage2} alt="" />
          </div>

          <div className="reviews-content">
            I've been a loyal customer of PetShop for years, and they never
            disappoint. The quality of their products is outstanding, and I
            appreciate the variety they offer. Their shipping is fast, and their
            packaging ensures everything arrives in perfect condition. PetShop
            is my trusted source for pet supplies!
          </div>

          <div className="reviews-name">Solina Shester</div>
          <div className="reviews-count">
            <i className="fa-solid fa-star star-rating"></i>
            <i className="fa-solid fa-star star-rating"></i>
            <i className="fa-solid fa-star star-rating"></i>
            <i className="fa-solid fa-star star-rating"></i>
            <i className="fa-solid fa-star-half-stroke star-rating"></i>
          </div>
        </div>

        {/* Review 3 */}
        <div className="reviews-item">
          <div className="reviews-logo">
            <img src={reviewImage3} alt="" />
          </div>

          <div className="reviews-content">
            PetShop is a game-changer for pet owners like me. Shopping online is
            convenient, and their website is well-organized, making it easy to
            find what I need. The detailed product descriptions help me make
            informed decisions. I love the peace of mind knowing I can rely on
            PetShop for top-notch pet products.
          </div>

          <div className="reviews-name">Annabel Rohan</div>
          <div className="reviews-count">
            <i className="fa-solid fa-star star-rating"></i>
            <i className="fa-solid fa-star star-rating"></i>
            <i className="fa-solid fa-star star-rating"></i>
            <i className="fa-solid fa-star star-rating"></i>
            <i className="fa-solid fa-star star-rating"></i>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClientReviews;
