import { useEffect, useState } from "react";
import styles from "../BlogPost.module.css";
import { NavLink } from "react-router-dom";
import ClientSearch from "../../ClientSearch/ClientSearch";
import { getAllProducts } from "../../../../../api/products.api";
import { getAllServices } from "../../../../../api/services.api";

// --------------------------------------------------

function BlogSidebar() {
  const [products, setProducts] = useState<any>([]);
  const [services, setServices] = useState<any>([]);

  const fetchProducts = async () => {
    const result = await getAllProducts();
    return setProducts(result);
  };

  const fetchServices = async () => {
    const result = await getAllServices();
    return setServices(result);
  };

  useEffect(() => {
    fetchProducts();
    fetchServices();
  }, []);

  return (
    <div className={styles["blog-sidebar"]}>
      <ClientSearch />
      <div className={styles["sidebar-featured-product"]}>
        <h3 className={styles["sidebar-featured-product-headline"]}>
          Featured Products
        </h3>
        {products?.slice(0, 3).map((product: any) => {
          return (
            <div className={styles["sidebar-featured-product-item"]}>
              <NavLink to={`/products/${product.id}`}>
                <img src={product.thumbnail_url} alt="" />
              </NavLink>

              <NavLink to={`/products/${product.id}`}>
                <p className={styles["sidebar-featured-product-name"]}>
                  {product.name}
                </p>
              </NavLink>
            </div>
          );
        })}
      </div>

      <div className={styles["sidebar-featured-product"]}>
        <h3 className={styles["sidebar-featured-product-headline"]}>
          Featured Services
        </h3>
        {services?.slice(0, 3).map((service: any) => {
          return (
            <div className={styles["sidebar-featured-product-item"]}>
              <NavLink to={`/services/${service.id}`}>
                <img src={service.service_image} alt="" />
              </NavLink>

              <NavLink to={`/services/${service.id}`}>
                <p className={styles["sidebar-featured-product-name"]}>
                  {service.name}
                </p>
              </NavLink>
            </div>
          );
        })}
      </div>

      <div className={styles["sidebar-featured-product"]}>
        <h3 className={styles["sidebar-featured-product-headline"]}>Banner</h3>
        <img
          className={styles["sidebar-banner-image"]}
          src="https://lh3.googleusercontent.com/pw/ADCreHcQT-2JCpQR3TjnWgEuykGkQSn9-nQUoBQc67y8lleyBf3ihjBLlvzggWXX-0WAduE9sShqZ8pLMJEBo157j5tFN-BzzzUHQFwUltiBWGehJf9Fj-cxRxGLojifmacwq3JGSQIIZbXRsEVuJp59DCKT52KCT_23O8RtFjd62HmXzKt6k-4bcyzBUbIJuJONZGWiB3u8Bd_uM2PdbMHXXm4RWXlmJ4y-i53-VP-avPdDgfu5JvwCPWcCFk7M1WcYY5m0dWZ3NDvki2XXqhhuqFRhKlHeGN0QbPzj1dulom6VVenD2ptV7mixfBIPWwpNja3M9Mr4oE0tZCt4qfbYy16G3mnC4cUTV4ysc3YIFe21SNF1ukwBLS2MSWjEMQVaf3_mN625K_qOlDhu7yz8hqNJff28dbIKQ1pcLTupjgqcKaZwETjFLy-6uuY8PHGUhVmzSkiDsW-mOqz5s3c_cbIMtCPE3B8NAO7BFSVwIjfMwoCBGWoTYn7dlXOapn-t5aORCqL_qeGHh5b1Qsh5RMnNFjNuQdLuU1VkfkWy7015IfmPLOdeIJSHuIB2Oc69fy84bLCzPVFd44rL7Sma-roDbpgWMAFQBdQg4yz0zxLAQqKV19P1vSHEkRd6Krv3uwHNoqWzd9vfcF28Z94JZGVFtvdVQlh9JfaWWvL00pWGjO5oKCrnAFdaTCFhELFaW1NSosnyzZ3wPwKzN7se5RPtdPf73FakE9qi3I_TLmlruGUI-5DK-V5Sni5K06sf0qUgpkNcRmeIhYWRp-Bv61xVE6FwoVQOfvyEc-bxAzO7mX7Df_-VSGX0IEd4jdf4oJOSOBUY2r16V017YXBsIWMKN7EJuHNv2SJ--AXyoCnjEZXK2auHSJBwYEPu5Yv62PYwSSB4B30AKgLQK6qY4eGSJw=w360-h640-s-no-gm?authuser=0"
          alt=""
        />
      </div>
    </div>
  );
}

export default BlogSidebar;
