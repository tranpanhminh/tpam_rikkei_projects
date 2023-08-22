import React from "react";

function ClientNewsletter() {
  return (
    <>
      <section className="newsletter">
        <h3>Our Newsletter</h3>
        <p>
          You may unsubscribe at any moment. For that purpose, please find our
          contact info in the legal notice.
        </p>
        <div className="newsletter-email">
          <input type="text" />
          <button className="newsletter-btn">Receive Newsletter</button>
        </div>
      </section>
    </>
  );
}

export default ClientNewsletter;
