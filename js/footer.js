// Script Render Footer
function renderFooter() {
  let footer = document.querySelector("footer");
  footerContent = "";
  footerContent += `<div class="container">
  <div class="row">
      <div class="col-12 col-sm-12 col-md-12 col-xl-3">
          <p class="footer-headline">CONTACT US</p>
          <div class="group-footer-logo">
              <img src="http://127.0.0.1:5501/assets/images/pet-shop.png" alt="" class="footer-logo">
              <p class="footer-description">
                  Your one-stop destination for all your pet needs. Discover a wide range of adorable
                  companions
                  and
                  quality pet products at our pet shop.
              </p>
          </div>
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-xl-3">
          <p class="footer-headline">HELP & INFORMATION</p>
          <ul>
              <li><a href="http://127.0.0.1:5501/about.html">About Us</a></li>
              <li><a href="http://127.0.0.1:5501/special-page/contact-us.html">Contact Us</a></li>
              <li><a href="http://127.0.0.1:5501/special-page/faqs.html">FAQs</a></li>
              <li><a href="http://127.0.0.1:5501/special-page/secure-shopping.html">Secure Shopping</a></li>
          </ul>
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-xl-3">
          <p class="footer-headline">CUSTOMER SERVICE</p>
          <ul>
              <li><a href="http://127.0.0.1:5501/special-page/return-policy.html">Return Policy</a></li>
              <li><a href="http://127.0.0.1:5501/special-page/refund-policy.html">Refund Policy</a></li>
              <li><a href="http://127.0.0.1:5501/special-page/privacy-policy.html">Privacy Policy</a></li>
              <li><a href="http://127.0.0.1:5501/special-page/shipping-policy.html">Shipping Policy</a></li>
          </ul>
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-xl-3">
          <p class="footer-headline">SITE NAVIGATION</p>
          <ul>
              <li><a href="http://127.0.0.1:5501/special-page/billing-terms.html">Billing Terms & Conditions</a></li>
              <li><a href="http://127.0.0.1:5501/special-page/copyright-dispute-policy.html">Copyright Dispute Policy</a></li>
              <li><a href="http://127.0.0.1:5501/special-page/terms-of-service.html">Terms of Service</a></li>
          </ul>
      </div>
  </div>
</div>`;
  footer.innerHTML = footerContent;
}
renderFooter();
