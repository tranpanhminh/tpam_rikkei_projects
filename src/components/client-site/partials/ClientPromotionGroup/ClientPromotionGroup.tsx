import naturalImage from "../../../../assets/images/natural.png";
import freeshippingImage from "../../../../assets/images/free-shipping.png";
import specialSaleImage from "../../../../assets/images/special-sale.jpg";
import styles from "../../ClientPage.module.css";

function ClientPromotionGroup() {
  return (
    <>
      <section className={styles["promotion-group"]}>
        <div className={styles["promotion-item"]}>
          <img src={naturalImage} alt="" />
          <div className={styles["promotion-content"]}>
            <p>100% Natural</p>
            <p>Eco-friendly products</p>
          </div>
        </div>

        <div className={styles["promotion-item"]}>
          <img src={freeshippingImage} alt="" />
          <div className={styles["promotion-content"]}>
            <p>Fast Delivery</p>
            <p>Fast delivery on all order</p>
          </div>
        </div>

        <div className={styles["promotion-item"]}>
          <img src={specialSaleImage} alt="" />
          <div className={styles["promotion-content"]}>
            <p>Special Sale</p>
            <p>Extra $9 off all items</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default ClientPromotionGroup;
